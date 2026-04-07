import { NextRequest, NextResponse } from 'next/server';

const NEXFLOWX_API_URL = 'https://api.nexflowx.tech/api/v1/payment-links';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, items, orderId } = body;

    const apiKey = process.env.NEXFLOWX_API_KEY;

    if (apiKey) {
      // Real API call to NeXFlowX
      try {
        const response = await fetch(NEXFLOWX_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
          body: JSON.stringify({
            amount: Number(amount),
            currency: currency || 'EUR',
            metadata: {
              orderId: orderId || 'unknown',
              items: items || [],
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({
            shareable_url: data.shareable_url || data.url || data.checkout_url,
            id: data.id,
          });
        }

        // API call failed, fall through to demo mode
        console.error('NeXFlowX API error:', response.status, await response.text());
      } catch (err) {
        console.error('NeXFlowX API fetch error:', err);
      }
    }

    // Demo mode: return a fake payment URL
    const demoOrderId = orderId || `SF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
    const demoUrl = `https://checkout.nexflowx.tech/demo?orderId=${encodeURIComponent(demoOrderId)}&amount=${Number(amount)}&currency=${currency || 'EUR'}`;

    return NextResponse.json({
      shareable_url: demoUrl,
      id: `demo_${demoOrderId}`,
      demo: true,
    });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}
