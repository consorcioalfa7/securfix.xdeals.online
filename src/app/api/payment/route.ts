import { NextRequest, NextResponse } from 'next/server';

// ─── NeXFlowX Payment Link Creation ─────────────────────────────────────────
// POST /api/payment
// Server-to-Server call to NeXFlowX API to generate a payment link.
// Frontend receives the shareable_url and REDIRECTS the user to it.

const NEXFLOWX_API_URL = 'https://api.nexflowx.tech/api/v1/payment-links';
const FETCH_TIMEOUT_MS = 15000; // 15s timeout for external API call

export async function POST(request: NextRequest) {
  console.log('[NeXFlowX] /api/payment — received request');

  // ── Step 0: Parse request body (isolated try/catch) ───────────────────────
  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    console.log('[NeXFlowX] Raw body received, length:', rawBody.length);
    body = JSON.parse(rawBody);
  } catch (parseErr) {
    console.error('[NeXFlowX] Failed to parse request body:', parseErr);
    return NextResponse.json(
      { error: 'Invalid request body. Expected JSON.' },
      { status: 400 }
    );
  }

  const { amount, currency, customer_name, items, orderId } = body;

  // ── Step 1: Validate API Key ──────────────────────────────────────────────
  const apiKey = process.env.NEXFLOWX_API_KEY;
  console.log('[NeXFlowX] API Key present:', !!apiKey, '| Length:', apiKey ? apiKey.length : 0);

  if (!apiKey) {
    console.error('[NeXFlowX] ❌ NEXFLOWX_API_KEY is NOT configured in environment');
    return NextResponse.json(
      { error: 'Payment service not configured. NEXFLOWX_API_KEY is missing on server.' },
      { status: 503 }
    );
  }

  // ── Step 2: Validate Amount ───────────────────────────────────────────────
  const numAmount = Number(amount);
  if (!numAmount || numAmount <= 0 || isNaN(numAmount)) {
    console.error('[NeXFlowX] Invalid amount:', amount);
    return NextResponse.json(
      { error: `Invalid amount: ${amount}. Must be a positive number.` },
      { status: 400 }
    );
  }

  console.log('[NeXFlowX] Amount validated:', numAmount, currency || 'EUR');

  // ── Step 3: Build request payload ─────────────────────────────────────────
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const redirectUrl = baseUrl ? `${baseUrl}?payment=success` : undefined;
  const internalOrderId = (orderId as string) || `SEC-${String(Date.now()).slice(-5)}`;

  // NeXFlowX Multi-Tenant: send ONLY amount, currency, store_name (NO provider_name)
  // NeXFlowX routes automatically based on store configuration.
  const payloadToNeXFlowX = {
    amount: Math.round(numAmount * 100) / 100,
    currency: (currency as string) || 'EUR',
    store_name: 'Securfix',
    redirect_url: redirectUrl,
    metadata: {
      order_id: internalOrderId,
      customer_name: (customer_name as string) || '',
      items: (items as unknown[]) || [],
      source: 'securfix-xdeals-online',
    },
  };

  console.log('[NeXFlowX] Calling NeXFlowX API...', {
    url: NEXFLOWX_API_URL,
    orderId: internalOrderId,
    amount: payloadToNeXFlowX.amount,
    currency: payloadToNeXFlowX.currency,
  });

  // ── Step 4: Call NeXFlowX API with timeout ────────────────────────────────
  let response: Response;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    response = await fetch(NEXFLOWX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(payloadToNeXFlowX),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('[NeXFlowX] API responded with status:', response.status, response.statusText);
  } catch (fetchErr: unknown) {
    const errMsg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
    const isTimeout = errMsg.includes('abort') || errMsg.includes('timeout');
    console.error('[NeXFlowX] ❌ Fetch to NeXFlowX failed:', errMsg);

    return NextResponse.json(
      {
        error: `Could not reach payment provider: ${isTimeout ? 'Request timed out' : errMsg}`,
        code: isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR',
      },
      { status: 500 }
    );
  }

  // ── Step 5: Handle non-2xx responses from NeXFlowX ────────────────────────
  if (!response.ok) {
    let errorBody = 'unknown';
    try {
      errorBody = await response.text();
    } catch {
      // ignore — we already have a fallback
    }
    console.error('[NeXFlowX] ❌ API returned error', response.status, ':', errorBody);

    return NextResponse.json(
      {
        error: `Payment provider error (${response.status})`,
        details: errorBody.substring(0, 500),
      },
      { status: 502 }
    );
  }

  // ── Step 6: Parse NeXFlowX response (isolated try/catch) ──────────────────
  let data: Record<string, unknown>;
  try {
    const responseText = await response.text();
    console.log('[NeXFlowX] Raw response length:', responseText.length);
    data = JSON.parse(responseText);
  } catch (jsonErr) {
    console.error('[NeXFlowX] ❌ Failed to parse NeXFlowX response as JSON:', jsonErr);
    return NextResponse.json(
      { error: 'Payment provider returned invalid response.' },
      { status: 502 }
    );
  }

  // ── Step 7: Extract shareable_url ─────────────────────────────────────────
  // NeXFlowX returns: { data: { id, shareable_url: "https://checkout.nexflowx.tech/?txId=..." } }
  // CORRECT format: https://checkout.nexflowx.tech/?txId=cmnfrz...tx123
  // We accept the URL as-is from NeXFlowX (query parameter format).
  const nestedData = data.data as Record<string, unknown> | undefined;
  const shareableUrl =
    (nestedData && nestedData.shareable_url as string) ||
    (data.shareable_url as string) ||
    (data.url as string) ||
    (data.checkout_url as string) ||
    '';

  // Validate URL format: must be from checkout.nexflowx.tech domain
  if (shareableUrl && !shareableUrl.includes('checkout.nexflowx.tech')) {
    console.warn('[NeXFlowX] ⚠️ shareable_url domain unexpected:', shareableUrl);
  }

  if (!shareableUrl || typeof shareableUrl !== 'string') {
    console.error('[NeXFlowX] ❌ Response missing shareable_url. Keys:', Object.keys(data));
    return NextResponse.json(
      {
        error: 'Payment provider did not return a checkout URL.',
        response_keys: Object.keys(data),
      },
      { status: 502 }
    );
  }

  const txId = (data.id as string) || (nestedData && nestedData.id as string) || '';

  console.log('[NeXFlowX] ✅ Payment link created successfully', {
    order_id: internalOrderId,
    tx_id: txId,
    url: shareableUrl.substring(0, 60) + '...',
  });

  // ── Step 8: Return to frontend ────────────────────────────────────────────
  return NextResponse.json({
    shareable_url: shareableUrl,
    id: txId,
    order_id: internalOrderId,
  });
}
