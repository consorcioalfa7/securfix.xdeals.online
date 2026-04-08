import { NextRequest, NextResponse } from 'next/server';

// ─── NeXFlowX Payment Link Creation ─────────────────────────────────────────
// POST /api/payment
// When the client clicks "Finalizar Compra", the backend creates a NeXFlowX
// payment link and returns the shareable_url for iframe checkout.

const NEXFLOWX_API_URL = 'https://api.nexflowx.tech/api/v1/payment-links';

interface PaymentRequestBody {
  amount: number;
  currency?: string;
  customer_email?: string;
  items?: { name: string; quantity: number; price: number }[];
  orderId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequestBody = await request.json();
    const { amount, currency, customer_email, items, orderId } = body;

    // ── 1. Validate API Key ──────────────────────────────────────────────────
    const apiKey = process.env.NEXFLOWX_API_KEY;
    if (!apiKey) {
      console.error('[NeXFlowX] NEXFLOWX_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Payment service is not configured. Please set NEXFLOWX_API_KEY environment variable.' },
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
      ? `${baseUrl}/encomenda-sucesso`
      : undefined;

    // ── 4. Generate internal order ID if not provided ────────────────────────
    const internalOrderId = orderId || `SEC-${String(Date.now()).slice(-5)}`;

    // ── 5. Call NeXFlowX API ─────────────────────────────────────────────────
    // POST https://api.nexflowx.tech/api/v1/payment-links
    // Headers: Content-Type: application/json, x-api-key: <API_KEY>
    // Body: { amount, currency, store_name, metadata }
    const response = await fetch(NEXFLOWX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        amount: Math.round(numAmount * 100) / 100, // Ensure 2 decimal places
        currency: currency || 'EUR',
        store_name: 'Securfix', // OBRIGATÓRIO: Branding no checkout
        redirect_url: redirectUrl,
        metadata: {
          order_id: internalOrderId,
          customer_email: customer_email || '',
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
    const data = await response.json();

    // NeXFlowX may return the URL at different paths:
    // - { data: { shareable_url: "..." } }
    // - { shareable_url: "..." }
    // - { url: "..." }
    // - { checkout_url: "..." }
    const shareableUrl =
      (data.data?.shareable_url) ||
      data.shareable_url ||
      data.url ||
      data.checkout_url ||
      data.data?.url;

    if (!shareableUrl) {
      console.error('[NeXFlowX] Response missing shareable_url:', JSON.stringify(data));
      return NextResponse.json(
        { error: 'Invalid response from payment service' },
        { status: 502 }
      );
    }

    // ── 8. Return to Frontend ────────────────────────────────────────────────
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
