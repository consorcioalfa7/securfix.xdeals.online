import { NextRequest, NextResponse } from 'next/server';
import { getOrder } from '@/lib/orders-store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = getOrder(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve order' },
      { status: 500 }
    );
  }
}
