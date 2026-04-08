import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { createOrder, getOrder, updateOrderStatus } from '@/lib/orders-store';

// ─── NeXFlowX Webhook Handler ───────────────────────────────────────────────
// POST /api/webhooks/nexflowx
// Receives automatic payment confirmation from NeXFlowX after customer pays.
//
// Security: HMAC SHA256 signature validation.
// Header: x-nexflowx-signature
// Computed: HMAC-SHA256(req.body as string, NEXFLOWX_WEBHOOK_SECRET)
//
// Expected payload:
// {
//   "event": "payment.gateway_confirmed",
//   "transaction_id": "cltx...",
//   "amount": 99.90,
//   "currency": "EUR",
//   "customer_details": {
//     "order_id": "SEC-2026-10045"
//   }
// }

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  try {
    const expectedBuf = Buffer.from(expectedSignature, 'hex');
    const receivedBuf = Buffer.from(signature, 'hex');
    if (expectedBuf.length !== receivedBuf.length) return false;
    return timingSafeEqual(expectedBuf, receivedBuf);
  } catch {
    return expectedSignature === signature;
  }
}

export async function POST(request: NextRequest) {
  try {
    // ── 1. Read raw body (needed for HMAC verification) ──────────────────────
    const rawBody = await request.text();
    const signature = request.headers.get('x-nexflowx-signature') || '';

    // ── 2. Get webhook secret ────────────────────────────────────────────────
    const webhookSecret =
      process.env.NEXFLOWX_WEBHOOK_SECRET ||
      process.env.WEBHOOK_SECRET ||
      '';

    // ── 3. Validate signature ────────────────────────────────────────────────
    if (!webhookSecret) {
      console.error('[Webhook] NEXFLOWX_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    if (!signature) {
      console.error('[Webhook] Missing x-nexflowx-signature header');
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 401 }
      );
    }

    if (!verifySignature(rawBody, signature, webhookSecret)) {
      console.error('[Webhook] Invalid signature — possible tampering');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // ── 4. Parse event payload ───────────────────────────────────────────────
    let event: Record<string, unknown>;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const eventType = event.event || event.type || event.event_type;
    console.log(`[Webhook] Received event: ${eventType || 'unknown'}`);

    // ── 5. Process payment.gateway_confirmed ─────────────────────────────────
    if (eventType === 'payment.gateway_confirmed' || eventType === 'payment_confirmed') {
      // Read order_id from customer_details (which mirrors our metadata)
      const customerDetails = (event.customer_details as Record<string, unknown>) || {};
      const metadata = (event.metadata as Record<string, unknown>) || {};

      const orderId =
        (customerDetails.order_id as string) ||
        (metadata.order_id as string) ||
        (event.order_id as string) ||
        '';

      if (!orderId) {
        console.error('[Webhook] No order_id found in payload', JSON.stringify(event));
        return NextResponse.json(
          { error: 'Missing order_id' },
          { status: 400 }
        );
      }

      // Extract transaction details from webhook payload
      const txId = (event.transaction_id as string) || (event.id as string) || '';
      const amount = Number(event.amount || 0);
      const currency = (event.currency as string) || 'EUR';

      console.log(`[Webhook] Payment confirmed: order=${orderId}, tx=${txId}, amount=${amount}${currency}`);

      // Check if order already exists in our system
      const existing = getOrder(orderId);

      if (existing) {
        // Update existing order status to "ready" (payment confirmed)
        updateOrderStatus(orderId, 'ready', 'Payment confirmed by NeXFlowX gateway');
        console.log(`[Webhook] Order ${orderId} updated → status: ready`);
        return NextResponse.json({ received: true, orderId, updated: true });
      }

      // Create new order from webhook data
      const order = createOrder({
        txId,
        amount,
        currency,
        items: (metadata.items as { name: string; quantity: number; price: number }[]) || [],
        customerEmail: (customerDetails.customer_email as string) || (metadata.customer_email as string) || '',
      });
      console.log(`[Webhook] New order created: ${order.id} (tx: ${txId})`);
      return NextResponse.json({ received: true, orderId: order.id, created: true });
    }

    // ── 6. Acknowledge other events ──────────────────────────────────────────
    console.log(`[Webhook] Acknowledged event: ${eventType}`);
    return NextResponse.json({ received: true, event: eventType });

  } catch (error) {
    console.error('[Webhook] Processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// ── Health check ──────────────────────────────────────────────────────────────
export async function GET() {
  const hasSecret = !!(process.env.NEXFLOWX_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET);
  return NextResponse.json({
    status: 'ok',
    service: 'NeXFlowX Webhook Handler',
    signature_validation: hasSecret ? 'enabled' : 'disabled',
  });
}
