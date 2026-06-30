import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/orders-store';

// ─── XPayments Checkout Session Creation ───────────────────────────────────
// POST /api/xpayments/checkout
//
// Server-to-Server call to XPayments API to create a checkout session.
// Returns the hosted checkout URL to the frontend, which opens it inside a
// seamless modal <iframe> (NO redirect away from the site).
//
// Security:
//   - XPAYMENTS_SECRET_KEY and XPAYMENTS_STORE_ID live ONLY in the server env.
//     They are never exposed to the client (no NEXT_PUBLIC_ prefix).
//   - The secret key is sent to XPayments via `Authorization: Bearer <key>`.
//
// XPayments API: https://api.xpayments.digital/api/v1/checkout/sessions
// Required payload: { storeId, amountFiat, currency, orderId }

const XPAYMENTS_API_URL = 'https://api.xpayments.digital/api/v1/checkout/sessions';
const FETCH_TIMEOUT_MS = 15000;

export async function POST(request: NextRequest) {
  console.log('[XPayments] /api/xpayments/checkout — received request');

  // ── 0. Parse request body ──────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    body = JSON.parse(rawBody);
  } catch (parseErr) {
    console.error('[XPayments] Failed to parse request body:', parseErr);
    return NextResponse.json(
      { error: 'Invalid request body. Expected JSON.' },
      { status: 400 },
    );
  }

  const { amount, currency, orderId, items, customer_name } = body;

  // ── 1. Validate server-side credentials ────────────────────────────────────
  const secretKey = process.env.XPAYMENTS_SECRET_KEY;
  const storeId = process.env.XPAYMENTS_STORE_ID;

  if (!secretKey || !storeId) {
    console.error('[XPayments] ❌ Missing XPAYMENTS_SECRET_KEY or XPAYMENTS_STORE_ID in env');
    return NextResponse.json(
      { error: 'Payment service not configured (server credentials missing).' },
      { status: 503 },
    );
  }

  // ── 2. Validate amount ─────────────────────────────────────────────────────
  const numAmount = Number(amount);
  if (!numAmount || numAmount <= 0 || isNaN(numAmount)) {
    console.error('[XPayments] Invalid amount:', amount);
    return NextResponse.json(
      { error: `Invalid amount: ${amount}. Must be a positive number.` },
      { status: 400 },
    );
  }

  // ── 3. Validate orderId ────────────────────────────────────────────────────
  const internalOrderId =
    (orderId as string) || `SEC-${new Date().getFullYear()}-${String(Date.now()).slice(-8)}`;
  if (typeof orderId === 'string' && !/^[A-Za-z0-9_-]{3,64}$/.test(orderId)) {
    return NextResponse.json(
      { error: 'Invalid orderId format.' },
      { status: 400 },
    );
  }

  console.log('[XPayments] Creating session:', {
    orderId: internalOrderId,
    amount: numAmount,
    currency: currency || 'EUR',
  });

  // ── 4. Persist the order locally as `pending` BEFORE calling XPayments ─────
  //    This guarantees the webhook can locate & mark it PAID even if it arrives
  //    before the session response (race) or if the customer closes the modal.
  const normalizedItems = (items as { name: string; quantity: number; price: number }[]) || [];
  createOrder({
    id: internalOrderId,
    txId: 'pending',
    amount: numAmount,
    currency: (currency as string) || 'EUR',
    items: normalizedItems,
    paymentMethod: 'xpayments',
  });

  // ── 5. Build XPayments payload (storeId, amountFiat, currency, orderId) ────
  const payload = {
    storeId,
    amountFiat: Math.round(numAmount * 100) / 100,
    currency: (currency as string) || 'EUR',
    orderId: internalOrderId,
    // Optional metadata for reconciliation in the XPayments dashboard.
    metadata: {
      order_id: internalOrderId,
      customer_name: (customer_name as string) || '',
      items: normalizedItems,
      source: 'securfix-xdeals-online',
    },
  };

  // ── 6. Call XPayments API (Authorization: Bearer) ──────────────────────────
  let response: Response;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    response = await fetch(XPAYMENTS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('[XPayments] API responded:', response.status, response.statusText);
  } catch (fetchErr: unknown) {
    const errMsg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
    const isTimeout = errMsg.includes('abort') || errMsg.includes('timeout');
    console.error('[XPayments] ❌ Fetch failed:', errMsg);
    return NextResponse.json(
      {
        error: `Could not reach payment provider: ${isTimeout ? 'Request timed out' : errMsg}`,
        code: isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR',
      },
      { status: 500 },
    );
  }

  // ── 7. Handle non-2xx responses ───────────────────────────────────────────
  if (!response.ok) {
    let errorBody = 'unknown';
    try {
      errorBody = await response.text();
    } catch {
      /* ignore */
    }
    console.error('[XPayments] ❌ API error', response.status, ':', errorBody);
    return NextResponse.json(
      {
        error: `Payment provider error (${response.status})`,
        details: errorBody.substring(0, 500),
      },
      { status: 502 },
    );
  }

  // ── 8. Parse response & extract the checkout URL ───────────────────────────
  let data: Record<string, unknown>;
  try {
    const responseText = await response.text();
    data = JSON.parse(responseText);
  } catch (jsonErr) {
    console.error('[XPayments] ❌ Invalid JSON response:', jsonErr);
    return NextResponse.json(
      { error: 'Payment provider returned an invalid response.' },
      { status: 502 },
    );
  }

  // XPayments may return the hosted URL under several field names depending on
  // API version. Extract defensively and validate it is an http(s) URL.
  const nestedData =
    (data.data as Record<string, unknown>) ||
    (data.session as Record<string, unknown>) ||
    undefined;
  const candidateUrl =
    (nestedData && (nestedData.url as string)) ||
    (nestedData && (nestedData.checkout_url as string)) ||
    (nestedData && (nestedData.checkoutUrl as string)) ||
    (nestedData && (nestedData.session_url as string)) ||
    (nestedData && (nestedData.hosted_url as string)) ||
    (data.url as string) ||
    (data.checkout_url as string) ||
    (data.checkoutUrl as string) ||
    (data.session_url as string) ||
    (data.sessionUrl as string) ||
    (data.hosted_url as string) ||
    (data.payment_url as string) ||
    '';

  const checkoutUrl =
    typeof candidateUrl === 'string' && /^https?:\/\//i.test(candidateUrl) ? candidateUrl : '';

  const sessionId =
    (nestedData && (nestedData.id as string)) ||
    (data.id as string) ||
    (data.session_id as string) ||
    (data.sessionId as string) ||
    '';

  if (!checkoutUrl) {
    console.error('[XPayments] ❌ No checkout URL in response. Keys:', Object.keys(data));
    return NextResponse.json(
      {
        error: 'Payment provider did not return a checkout URL.',
        response_keys: Object.keys(data),
      },
      { status: 502 },
    );
  }

  console.log('[XPayments] ✅ Checkout session created', {
    order_id: internalOrderId,
    session_id: sessionId,
    url: checkoutUrl.substring(0, 60) + '...',
  });

  // ── 9. Return URL to frontend (opens in modal <iframe>) ────────────────────
  return NextResponse.json({
    checkout_url: checkoutUrl,
    session_id: sessionId,
    order_id: internalOrderId,
  });
}

// ── Health check ──────────────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'XPayments Checkout',
    configured: !!(process.env.XPAYMENTS_SECRET_KEY && process.env.XPAYMENTS_STORE_ID),
  });
}
