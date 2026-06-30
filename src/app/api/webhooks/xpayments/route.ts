import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { createOrder, getOrder, markOrderPaid } from '@/lib/orders-store';

// ─── XPayments Webhook Handler ─────────────────────────────────────────────
// POST /api/webhooks/xpayments
//
// Receives the `payment.success` event from XPayments after a customer pays.
// Marks the corresponding order as PAID in the local database.
//
// Security:
//   - If XPAYMENTS_WEBHOOK_SECRET is set, the raw body is verified against the
//     `x-xpayments-signature` header using HMAC-SHA256 (timing-safe compare).
//     ALWAYS set this secret in production.
//   - If the secret is empty (initial testing), the webhook still processes but
//     logs a prominent warning — never ship to production without the secret.
//
// Expected payload (event: payment.success):
// {
//   "event": "payment.success",
//   "transaction_id": "xp_...",
//   "orderId": "SEC-2026-12345",          // the orderId we sent at session creation
//   "amountFiat": 25.35,
//   "currency": "EUR",
//   "status": "success",
//   "metadata": { "order_id": "SEC-2026-12345", ... }
// }

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
  try {
    const expectedBuf = Buffer.from(expected, 'hex');
    const receivedBuf = Buffer.from(signature, 'hex');
    if (expectedBuf.length !== receivedBuf.length) return false;
    return timingSafeEqual(expectedBuf, receivedBuf);
  } catch {
    // Fallback: also accept the raw hex comparison
    return expected === signature;
  }
}

export async function POST(request: NextRequest) {
  try {
    // ── 1. Read raw body (required for HMAC verification) ─────────────────────
    const rawBody = await request.text();
    const signature = request.headers.get('x-xpayments-signature') || '';

    // ── 2. Resolve webhook secret ─────────────────────────────────────────────
    const webhookSecret = process.env.XPAYMENTS_WEBHOOK_SECRET || '';

    // ── 3. Signature verification ─────────────────────────────────────────────
    if (webhookSecret) {
      if (!signature) {
        console.error('[XPayments Webhook] ❌ Missing x-xpayments-signature header');
        return NextResponse.json({ error: 'Missing signature header' }, { status: 401 });
      }
      if (!verifySignature(rawBody, signature, webhookSecret)) {
        console.error('[XPayments Webhook] ❌ Invalid signature — possible tampering');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    } else {
      // ⚠️ No secret configured — processing WITHOUT signature verification.
      //    This is acceptable only for initial local testing.
      console.warn(
        '[XPayments Webhook] ⚠️ XPAYMENTS_WEBHOOK_SECRET not set — accepting unsigned webhook. Set the secret for production!',
      );
    }

    // ── 4. Parse JSON payload ─────────────────────────────────────────────────
    let event: Record<string, unknown>;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const eventType =
      (event.event as string) || (event.type as string) || (event.event_type as string) || '';
    console.log(`[XPayments Webhook] Received event: ${eventType || 'unknown'}`);

    // ── 5. Process `payment.success` ──────────────────────────────────────────
    if (eventType === 'payment.success' || eventType === 'payment_success') {
      const metadata = (event.metadata as Record<string, unknown>) || {};
      const data = (event.data as Record<string, unknown>) || {};

      // Locate the orderId — it may be at the top level, in metadata, or in data.
      const orderId =
        (event.orderId as string) ||
        (event.order_id as string) ||
        (metadata.order_id as string) ||
        (metadata.orderId as string) ||
        (data.orderId as string) ||
        (data.order_id as string) ||
        '';

      const txId =
        (event.transaction_id as string) ||
        (event.transactionId as string) ||
        (event.id as string) ||
        (data.transaction_id as string) ||
        (data.id as string) ||
        '';

      const amount = Number(event.amountFiat ?? event.amount ?? data.amount ?? 0);
      const currency =
        (event.currency as string) || (data.currency as string) || 'EUR';

      if (!orderId) {
        console.error(
          '[XPayments Webhook] No orderId found in payload',
          JSON.stringify(event).substring(0, 500),
        );
        return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
      }

      console.log(
        `[XPayments Webhook] Payment success: order=${orderId}, tx=${txId}, amount=${amount}${currency}`,
      );

      // Find the order we persisted at checkout-session creation time.
      let order = getOrder(orderId);

      if (order) {
        // Idempotency: if already paid, acknowledge without duplicating work.
        if (order.paymentStatus === 'paid') {
          console.log(`[XPayments Webhook] Order ${orderId} already PAID — idempotent ack`);
          return NextResponse.json({
            received: true,
            orderId,
            paymentStatus: 'paid',
            alreadyPaid: true,
          });
        }

        // Mark it PAID (idempotent — safe for duplicate/replayed webhooks).
        markOrderPaid(orderId, {
          txId,
          paymentMethod: 'xpayments',
          amount,
          currency,
        });
        console.log(`[XPayments Webhook] ✅ Order ${orderId} marked as PAID`);
        return NextResponse.json({
          received: true,
          orderId,
          paymentStatus: 'paid',
          updated: true,
        });
      }

      // Edge case: webhook arrived but we have no local record (e.g. server
      // restarted and in-memory store was wiped, or session was created by an
      // older deployment). Create the order retroactively and mark it PAID.
      order = createOrder({
        id: orderId,
        txId,
        amount,
        currency,
        items: (metadata.items as { name: string; quantity: number; price: number }[]) || [],
        paymentMethod: 'xpayments',
      });
      markOrderPaid(orderId, { txId, paymentMethod: 'xpayments', amount, currency });
      console.log(`[XPayments Webhook] ✅ Created + marked PAID: ${order.id}`);
      return NextResponse.json({
        received: true,
        orderId: order.id,
        paymentStatus: 'paid',
        created: true,
      });
    }

    // ── 6. Acknowledge other event types (e.g. payment.failed) ────────────────
    if (eventType === 'payment.failed' || eventType === 'payment_failed') {
      const orderId =
        (event.orderId as string) ||
        (event.order_id as string) ||
        (((event.metadata as Record<string, unknown>) || {}).order_id as string) ||
        '';
      if (orderId && getOrder(orderId)) {
        const order = getOrder(orderId)!;
        order.paymentStatus = 'failed';
        order.events.push({
          status: order.status,
          timestamp: new Date().toISOString(),
          description: 'Payment failed via XPayments',
        });
      }
      console.log(`[XPayments Webhook] Payment failed recorded for ${orderId || 'unknown'}`);
    }

    console.log(`[XPayments Webhook] Acknowledged event: ${eventType}`);
    return NextResponse.json({ received: true, event: eventType });
  } catch (error) {
    console.error('[XPayments Webhook] Processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// ── Health check ──────────────────────────────────────────────────────────────
export async function GET() {
  const hasSecret = !!process.env.XPAYMENTS_WEBHOOK_SECRET;
  return NextResponse.json({
    status: 'ok',
    service: 'XPayments Webhook Handler',
    signature_validation: hasSecret ? 'enabled' : 'disabled (set XPAYMENTS_WEBHOOK_SECRET)',
  });
}
