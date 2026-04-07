import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { createOrder, updateOrderStatus } from '@/lib/orders-store';

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = createHmac('sha256', secret).update(payload).digest('hex');
  return expectedSignature === signature;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-nexflowx-signature') || '';

    // Validate webhook signature if webhook secret is configured
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      if (!verifySignature(rawBody, signature, webhookSecret)) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    let event: Record<string, unknown>;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    const eventType = event.type || event.event_type;

    // Process payment confirmation events
    if (eventType === 'payment.gateway_confirmed' || eventType === 'payment_confirmed') {
      const metadata = (event.metadata as Record<string, unknown>) || {};
      const orderId = (metadata.orderId as string) || (event.orderId as string) || '';

      if (orderId) {
        const txId = (event.id as string) || (event.transaction_id as string) || '';
        const amount = Number(event.amount || 0);
        const currency = (event.currency as string) || 'EUR';
        const items = (metadata.items as { name: string; quantity: number; price: number }[]) || [];

        // Check if order already exists
        const { getOrder } = await import('@/lib/orders-store');
        const existing = getOrder(orderId);

        if (existing) {
          // Update existing order status
          updateOrderStatus(orderId, 'ready', 'Payment confirmed by gateway');
          return NextResponse.json({ received: true, orderId, updated: true });
        }

        // Create new order from webhook data
        createOrder({
          txId,
          amount,
          currency,
          items,
          customerEmail: metadata.customerEmail as string | undefined,
        });

        return NextResponse.json({ received: true, orderId, created: true });
      }
    }

    return NextResponse.json({ received: true, event: eventType });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
