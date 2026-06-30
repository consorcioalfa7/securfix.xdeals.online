// ─── Order Tracking Store (in-memory) ─────────────────────────────────────────
// Orders are stored in memory and optionally persisted via simple JSON

export type OrderStatus = 'preparation' | 'ready' | 'transit' | 'distribution' | 'delivered';

// Payment status is tracked INDEPENDENTLY from fulfillment status.
// An order can be `paid` (payment confirmed) while still `preparation` (fulfillment).
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface OrderEvent {
  status: OrderStatus;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string;
  txId: string;
  amount: number;
  currency: string;
  items: { name: string; quantity: number; price: number }[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: 'xpayments' | 'nexflowx';
  paidAt?: string;
  events: OrderEvent[];
  createdAt: string;
  customerEmail?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

// Simple in-memory order store
const orders = new Map<string, Order>();

export function createOrder(params: {
  id?: string;
  txId: string;
  amount: number;
  currency: string;
  items: { name: string; quantity: number; price: number }[];
  customerEmail?: string;
  paymentMethod?: 'xpayments' | 'nexflowx';
}): Order {
  // Use the caller-provided id (e.g. SEC-2026-12345) when available so webhooks
  // can locate the order by the orderId sent to the payment provider.
  const id = params.id || `SF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
  const now = new Date().toISOString();

  const order: Order = {
    id,
    txId: params.txId,
    amount: params.amount,
    currency: params.currency,
    items: params.items,
    status: 'preparation',
    paymentStatus: 'pending',
    paymentMethod: params.paymentMethod,
    events: [
      { status: 'preparation', timestamp: now, description: 'Order received and being prepared' },
    ],
    createdAt: now,
    customerEmail: params.customerEmail,
    trackingNumber: id,
  };

  orders.set(id, order);

  // Simulate order progression over time
  simulateOrderProgression(id);

  return order;
}

export function getOrder(orderId: string): Order | undefined {
  return orders.get(orderId);
}

export function getOrderByTxId(txId: string): Order | undefined {
  for (const order of orders.values()) {
    if (order.txId === txId) return order;
  }
  return undefined;
}

export function updateOrderStatus(orderId: string, status: OrderStatus, description: string): Order | undefined {
  const order = orders.get(orderId);
  if (!order) return undefined;
  
  // Don't go backwards
  const statusOrder: OrderStatus[] = ['preparation', 'ready', 'transit', 'distribution', 'delivered'];
  const currentIdx = statusOrder.indexOf(order.status);
  const newIdx = statusOrder.indexOf(status);
  if (newIdx <= currentIdx) return order;
  
  order.status = status;
  order.events.push({
    status,
    timestamp: new Date().toISOString(),
    description,
  });

  return order;
}

// ── Mark an order as PAID (called by payment webhooks) ──────────────────────
// Idempotent: re-marking an already-paid order is a no-op (prevents double
// processing of duplicate/replayed webhooks).
export function markOrderPaid(
  orderId: string,
  details: { txId?: string; paymentMethod?: 'xpayments' | 'nexflowx'; amount?: number; currency?: string },
): Order | undefined {
  const order = orders.get(orderId);
  if (!order) return undefined;

  if (order.paymentStatus === 'paid') {
    // Idempotent — already confirmed
    return order;
  }

  order.paymentStatus = 'paid';
  order.paidAt = new Date().toISOString();
  if (details.paymentMethod) order.paymentMethod = details.paymentMethod;
  if (details.txId) order.txId = details.txId;
  order.events.push({
    status: order.status,
    timestamp: order.paidAt,
    description: `Payment confirmed via ${details.paymentMethod || 'gateway'} (tx: ${details.txId || order.txId})`,
  });

  console.log(`[orders-store] Order ${orderId} marked as PAID (tx: ${order.txId})`);
  return order;
}

function simulateOrderProgression(orderId: string) {
  const delays = [30000, 60000, 120000, 180000]; // 30s, 1min, 2min, 3min for demo
  
  const statuses: { status: OrderStatus; description: string }[] = [
    { status: 'ready', description: 'Order prepared and ready for shipping' },
    { status: 'transit', description: 'Order in transit - on the way' },
    { status: 'distribution', description: 'Order arrived at local distribution centre' },
    { status: 'delivered', description: 'Order delivered successfully' },
  ];
  
  statuses.forEach((s, i) => {
    setTimeout(() => {
      updateOrderStatus(orderId, s.status, s.description);
    }, delays[i] || 180000);
  });
}

// Get delivery estimate based on destination
export function getDeliveryEstimate(country?: string): { days: number; labelKey: string } {
  if (!country) return { days: 7, labelKey: 'tracking.other_europe' };
  
  const lower = country.toLowerCase();
  const ptEs = ['pt', 'es', 'portugal', 'spain', 'españa', 'portugal'];
  const frIt = ['fr', 'it', 'france', 'italy', 'italia', 'francia'];
  
  if (ptEs.some(c => lower.includes(c))) return { days: 3, labelKey: 'tracking.portugal_spain' };
  if (frIt.some(c => lower.includes(c))) return { days: 5, labelKey: 'tracking.france_italy' };
  
  const nearby = ['de', 'nl', 'be', 'lu', 'uk', 'gb', 'ie', 'at', 'ch', 'germany', 'netherlands', 'belgium', 'luxembourg', 'austria', 'switzerland'];
  if (nearby.some(c => lower.includes(c))) return { days: 7, labelKey: 'tracking.other_europe' };
  
  return { days: 15, labelKey: 'tracking.far_europe' };
}
