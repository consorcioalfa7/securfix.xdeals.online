import { NextRequest, NextResponse } from 'next/server';

// ─── NeXFlowX Payment Link Creation ─────────────────────────────────────────
// POST /api/payment
// Server-to-Server call to NeXFlowX API to generate a payment link.
// Frontend receives the shareable_url and REDIRECTS the user to it.

const NEXFLOWX_API_URL = 'https://api.nexflowx.tech/api/v1/payment-links';

interface PaymentRequestBody {
  amount: number;
  currency?: string;
  customer_name?: string;
  items?: { name: string; quantity: number; price: number }[];
  orderId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequestBody = await request.json();
    const { amount, currency, customer_name, items, orderId } = body;

    // ── 1. Validate API Key ──────────────────────────────────────────────────
    const apiKey = process.env.NEXFLOWX_API_KEY;
    if (!apiKey) {
      console.error('[NeXFlowX] NEXFLOWX_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Payment service is not configured. Please set NEXFLOWX_API_KEY.' },
        { status: 503 }
      );
    }

    // ── 2. Validate Amount ───────────────────────────────────────────────────
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Amount must be a positive number.' },
        { status: 400 }
      );
    }

    // ── 3. Build redirect URL for post-payment ───────────────────────────────
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const redirectUrl = baseUrl
      ? `${baseUrl}?payment=success`
      : undefined;

    // ── 4. Generate internal order ID if not provided ────────────────────────
    const internalOrderId = orderId || `SEC-${String(Date.now()).slice(-5)}`;

    // ── 5. Call NeXFlowX API ─────────────────────────────────────────────────
    // POST https://api.nexflowx.tech/api/v1/payment-links
    // Headers: Content-Type: application/json, x-api-key: {NEXFLOWX_API_KEY}
    const response = await fetch(NEXFLOWX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        amount: Math.round(numAmount * 100) / 100,
        currency: currency || 'EUR',
        store_name: 'Securfix',
        provider_name: 'stripe',
        redirect_url: redirectUrl,
        metadata: {
          order_id: internalOrderId,
          customer_name: customer_name || '',
          items: items || [],
          source: 'securfix-xdeals-online',
        },
      }),
    });

    // ── 6. Handle API Errors ─────────────────────────────────────────────────
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[NeXFlowX] API error ${response.status}:`, errorText);
      return NextResponse.json(
        { error: `Payment service error: ${response.status}` },
        { status: 502 }
      );
    }

    // ── 7. Parse Response ────────────────────────────────────────────────────
    // Expected: { data: { id: "cltx...", shareable_url: "https://checkout.nexflowx.tech/?txId=..." } }
    const data = await response.json();

    const shareableUrl =
      data.data?.shareable_url ||
      data.shareable_url ||
      data.url ||
      data.checkout_url;

    if (!shareableUrl) {
      console.error('[NeXFlowX] Response missing shareable_url:', JSON.stringify(data));
      return NextResponse.json(
        { error: 'Invalid response from payment service' },
        { status: 502 }
      );
    }

    // ── 8. Return shareable_url to frontend ──────────────────────────────────
    return NextResponse.json({
      shareable_url: shareableUrl,
      id: data.id || data.data?.id,
      order_id: internalOrderId,
    });
  } catch (error) {
    console.error('[NeXFlowX] Payment API error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}
