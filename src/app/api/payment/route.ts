import { NextRequest, NextResponse } from 'next/server';

const NEXFLOWX_API_URL = 'https://api.nexflowx.tech/api/v1/payment-links';
const NEXFLOWX_CHECKOUT_BASE = process.env.NEXFLOWX_CHECKOUT_URL || 'https://checkout.nexflowx.tech';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, items, orderId } = body;

    // Validate required API key
    const apiKey = process.env.NEXFLOWX_API_KEY;
    if (!apiKey) {
      console.error('NEXFLOWX_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Payment service is not configured. Please set NEXFLOWX_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    // Validate amount
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Build redirect URL for post-payment
    const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}?payment=success`
      : undefined;

    // Call NeXFlowX API
    const response = await fetch(NEXFLOWX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        amount: numAmount,
        currency: currency || 'EUR',
        redirect_url: redirectUrl,
        metadata: {
          orderId: orderId || 'unknown',
          items: items || [],
          source: 'securfix-xdeals-online',
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`NeXFlowX API error ${response.status}:`, errorText);
      return NextResponse.json(
        { error: `Payment service error: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const shareableUrl = data.shareable_url || data.url || data.checkout_url;

    if (!shareableUrl) {
      console.error('NeXFlowX API response missing shareable_url:', data);
      return NextResponse.json(
        { error: 'Invalid response from payment service' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      shareable_url: shareableUrl,
      id: data.id,
    });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}
