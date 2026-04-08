'use client';

import { useState } from 'react';
import {
  Search,
  Package,
  Clock,
  Truck,
  MapPin,
  CheckCircle2,
  Circle,
  XCircle,
  Loader2,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import type { Order, OrderStatus } from '@/lib/orders-store';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

const STATUS_STEPS: OrderStatus[] = ['preparation', 'ready', 'transit', 'distribution', 'delivered'];

function StepIcon({ status, currentStatus, isActive }: { status: OrderStatus; currentStatus: OrderStatus; isActive: boolean }) {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus);
  const stepIndex = STATUS_STEPS.indexOf(status);
  const isCompleted = stepIndex < currentIndex;
  const isCurrent = stepIndex === currentIndex;

  if (isCompleted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
        <CheckCircle2 className="h-5 w-5" />
      </div>
    );
  }
  if (isCurrent) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ea6663] text-white shadow-md shadow-[#ea6663]/30">
        {isActive ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Circle className="h-5 w-5 fill-current" />
        )}
      </div>
    );
  }
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-300">
      <Circle className="h-5 w-5" />
    </div>
  );
}

function StepConnector({ status, currentStatus }: { status: OrderStatus; currentStatus: OrderStatus }) {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus);
  const stepIndex = STATUS_STEPS.indexOf(status);
  const isCompleted = stepIndex < currentIndex;

  return (
    <div
      className={`h-1 w-full rounded-full transition-colors duration-500 ${
        isCompleted ? 'bg-green-500' : 'bg-gray-200'
      }`}
    />
  );
}

export default function OrderTrackingModal({ isOpen, onClose, initialOrderId }: OrderTrackingModalProps) {
  const { t } = useI18n();
  const [searchInput, setSearchInput] = useState(initialOrderId || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(searchInput.trim())}`);
      if (!res.ok) {
        setError('Order not found');
        return;
      }
      const data = await res.json();
      setOrder(data);
    } catch {
      setError(t('general.error'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label={t('tracking.title')}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-md p-2.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label={t('general.close')}
        >
          <XCircle className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Truck className="h-6 w-6 text-[#ea6663]" />
            <h2 className="text-xl font-bold text-gray-900">{t('tracking.title')}</h2>
          </div>
          <p className="text-sm text-gray-500">{t('tracking.enter_code')}</p>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t('tracking.placeholder')}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#ea6663] focus:bg-white focus:ring-2 focus:ring-[#ea6663]/20"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !searchInput.trim()}
            className="flex items-center gap-2 rounded-lg bg-[#ea6663] px-5 py-3 min-h-[44px] text-sm font-bold text-white transition-colors hover:bg-[#d94f4c] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            <span className="sm:inline">{t('tracking.search')}</span>
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            <XCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{t('tracking.order')}</p>
                  <p className="text-sm font-bold text-gray-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{t('tracking.status')}</p>
                  <p className="text-sm font-bold text-[#ea6663]">{t(`tracking.${order.status}`)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Data</p>
                  <p className="text-sm text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString('pt-PT', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Total</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: order.currency }).format(order.amount)}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wide">
                {t('tracking.status')}
              </h3>
              <div className="space-y-0">
                {STATUS_STEPS.map((status, idx) => {
                  const event = order.events.find((e) => e.status === status);
                  const isLast = idx === STATUS_STEPS.length - 1;
                  const statusLabels: Record<OrderStatus, string> = {
                    preparation: t('tracking.preparation'),
                    ready: t('tracking.ready'),
                    transit: t('tracking.transit'),
                    distribution: t('tracking.distribution'),
                    delivered: t('tracking.delivered'),
                  };
                  const statusDescs: Record<OrderStatus, string> = {
                    preparation: t('tracking.preparation_desc'),
                    ready: t('tracking.ready_desc'),
                    transit: t('tracking.transit_desc'),
                    distribution: t('tracking.distribution_desc'),
                    delivered: t('tracking.delivered_desc'),
                  };
                  const statusIcons: Record<OrderStatus, typeof Package> = {
                    preparation: Package,
                    ready: Clock,
                    transit: Truck,
                    distribution: MapPin,
                    delivered: CheckCircle2,
                  };
                  const IconComponent = statusIcons[status];

                  return (
                    <div key={status}>
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <StepIcon status={status} currentStatus={order.status} isActive={status === order.status} />
                          {!isLast && (
                            <div className="py-2">
                              <StepConnector status={STATUS_STEPS[idx + 1]} currentStatus={order.status} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 pb-6">
                          <div className="flex items-center gap-2">
                            <IconComponent
                              className={`h-4 w-4 flex-shrink-0 ${
                                STATUS_STEPS.indexOf(status) <= STATUS_STEPS.indexOf(order.status)
                                  ? 'text-[#ea6663]'
                                  : 'text-gray-300'
                              }`}
                            />
                            <p
                              className={`text-sm font-semibold break-words ${
                                STATUS_STEPS.indexOf(status) <= STATUS_STEPS.indexOf(order.status)
                                  ? 'text-gray-900'
                                  : 'text-gray-400'
                              }`}
                            >
                              {statusLabels[status]}
                            </p>
                          </div>
                          <p
                            className={`mt-0.5 text-xs ${
                              STATUS_STEPS.indexOf(status) <= STATUS_STEPS.indexOf(order.status)
                                ? 'text-gray-600'
                                : 'text-gray-400'
                            }`}
                          >
                            {statusDescs[status]}
                          </p>
                          {event && (
                            <p className="mt-1 text-xs text-gray-400">
                              {new Date(event.timestamp).toLocaleDateString('pt-PT', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Estimate */}
            <div className="rounded-lg border border-[#ea6663]/20 bg-[#ea6663]/5 p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Clock className="h-4 w-4 text-[#ea6663]" />
                {t('tracking.estimated')}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-sm text-gray-700">{t('tracking.portugal_spain')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <p className="text-sm text-gray-700">{t('tracking.france_italy')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <p className="text-sm text-gray-700">{t('tracking.other_europe')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  <p className="text-sm text-gray-700">{t('tracking.far_europe')}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            {order.items && order.items.length > 0 && (
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {t('cart.title')}
                </h3>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-gray-900">
                        {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: order.currency }).format(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
