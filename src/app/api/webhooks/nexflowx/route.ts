import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { createOrder, getOrder, updateOrderStatus } from '@/lib/orders-store';

// ─── NeXFlowX Webhook Handler ───────────────────────────────────────────────
// POST /api/webhooks/nexflowx
// Receives automatic payment confirmation events from NeXFlowX.
//
// Security: HMAC SHA256 signature validation using NEXFLOWX_WEBHOOK_SECRET.
// The signature is sent in the header: x-nexflowx-signature
// It is computed as: HMAC-SHA256(raw_body, NEXFLOWX_WEBHOOK_SECRET)
//
// Supported events:
//   - payment.gateway_confirmed → Marks order as "ready" (payment confirmed)

/**
 * Verify the HMAC SHA256 signature from NeXFlowX webhook.
 * @param payload - Raw request body string
 * @param signature - Value from x-nexflowx-signature header
 * @param secret - NEXFLOWX_WEBHOOK_SECRET
 * @returns true if signature matches, false otherwise
 */
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  // Use timing-safe comparison to prevent timing attacks
  try {
    const expectedBuf = Buffer.from(expectedSignature, 'hex');
    const receivedBuf = Buffer.from(signature, 'hex');
    if (expectedBuf.length !== receivedBuf.length) return false;
    return timingSafeEqual(expectedBuf, receivedBuf);
  } catch {
    // Fallback: direct comparison (shouldn't happen in Node 16+)
    return expectedSignature === signature;
  }
}

export async function POST(request: NextRequest) {
  try {
    // ── 1. Read raw body (needed for HMAC verification) ──────────────────────
    const rawBody = await request.text();
    const signature = request.headers.get('x-nexflowx-signature') || '';

    // ── 2. Get webhook secret ────────────────────────────────────────────────
    // Support both NEXFLOWX_WEBHOOK_SECRET (new) and WEBHOOK_SECRET (legacy)
    const webhookSecret =
      process.env.NEXFLOWX_WEBHOOK_SECRET ||
      process.env.WEBHOOK_SECRET ||
      '';

    // ── 3. Validate signature if secret is configured ────────────────────────
    if (webhookSecret) {
      if (!signature) {
        console.error('[Webhook] Missing x-nexflowx-signature header');
        return NextResponse.json(
          { error: 'Missing signature header' },
          { status: 401 }
        );
      }

      if (!verifySignature(rawBody, signature, webhookSecret)) {
        console.error('[Webhook] Invalid signature - possible tampering detected');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    } else {
      // Log warning in development if no secret configured
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[Webhook] No NEXFLOWX_WEBHOOK_SECRET configured — skipping signature validation');
      }
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

    const eventType = event.type || event.event_type;
    console.log(`[Webhook] Received event: ${eventType || 'unknown'}`);

    // ── 5. Process payment confirmation events ───────────────────────────────
    if (eventType === 'payment.gateway_confirmed' || eventType === 'payment_confirmed') {
      const metadata = (event.metadata as Record<string, unknown>) || {};
      const orderId =
        (metadata.order_id as string) ||
        (metadata.orderId as string) ||
        (event.order_id as string) ||
        (event.orderId as string) ||
        '';

      if (!orderId) {
        console.error('[Webhook] No order_id in event payload');
        return NextResponse.json(
          { error: 'Missing order_id' },
          { status: 400 }
        );
      }

      // Extract transaction details
      const txId = (event.id as string) || (event.transaction_id as string) || (event.tx_id as string) || '';
      const amount = Number(event.amount || 0);
      const currency = (event.currency as string) || 'EUR';
      const items = (metadata.items as { name: string; quantity: number; price: number }[]) || [];
      const customerEmail = (metadata.customer_email as string) || (metadata.customerEmail as string) || '';

      // Check if order already exists in our system
      const existing = getOrder(orderId);

      if (existing) {
        // Update existing order status to "ready"
        updateOrderStatus(orderId, 'ready', 'Payment confirmed by NeXFlowX gateway');
        console.log(`[Webhook] Order ${orderId} status updated to 'ready'`);
        return NextResponse.json({ received: true, orderId, updated: true });
      }

      // Create new order from webhook data
      const order = createOrder({
        txId,
        amount,
        currency,
        items,
        customerEmail,
      });
      console.log(`[Webhook] New order created: ${order.id} (original: ${orderId})`);
      return NextResponse.json({ received: true, orderId: order.id, created: true });
    }

    // ── 6. Acknowledge other event types ─────────────────────────────────────
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

// ── Health check for webhook endpoint ────────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'NeXFlowX Webhook Handler',
    version: '1.0.0',
  });
}
