'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2, CheckCircle2, XCircle, Package, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

interface CartItemData {
  name: string;
  quantity: number;
  price: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItemData[];
  totalAmount?: number;
  onPaymentSuccess?: (orderId?: string) => void;
}

type CheckoutState = 'idle' | 'checkout' | 'success' | 'error';

function generateOrderId(): string {
  return `SF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
}

export default function CheckoutModal({ isOpen, onClose, items, totalAmount, onPaymentSuccess }: CheckoutModalProps) {
  const { t } = useI18n();
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');
  const [state, setState] = useState<CheckoutState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const paymentInitiatedRef = useRef(false);
  // Stable order ID for this checkout session (component remounts via key)
  const [currentOrderId] = useState(generateOrderId);

  // Initiate payment on mount (since component remounts via key pattern)
  useEffect(() => {
    if (!isOpen) return;
    if (paymentInitiatedRef.current) return;
    paymentInitiatedRef.current = true;

    const createPayment = async () => {
      try {
        const res = await fetch('/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount || 100,
            currency: 'EUR',
            items: (items || []).map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
            orderId: currentOrderId,
          }),
        });
        const data = await res.json();
        if (res.ok && data.shareable_url) {
          setCheckoutUrl(data.shareable_url);
        } else {
          setState('error');
          setErrorMessage(data.error || t('general.error'));
        }
      } catch {
        setState('error');
        setErrorMessage(t('general.error'));
      }
    };

    createPayment();
  }, [isOpen, totalAmount, items, currentOrderId, t]);

  // Listen for NeXFlowX postMessage
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin === 'https://checkout.nexflowx.tech') {
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          if (data.status === 'success') {
            setState('success');
            if (onPaymentSuccess && currentOrderId) {
              onPaymentSuccess(currentOrderId);
            }
          }
        } catch {
          // Ignore non-JSON messages
        }
      }
    },
    [onPaymentSuccess, currentOrderId]
  );

  useEffect(() => {
    if (checkoutUrl) {
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [checkoutUrl, handleMessage]);

  const isLoading = !checkoutUrl && state !== 'error' && state !== 'success';
  const isCheckout = !!checkoutUrl && state !== 'error' && state !== 'success';

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
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-4 sm:p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={t('checkout.title')}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-md p-2.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label={t('checkout.close')}
        >
          <XCircle className="h-5 w-5" />
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <Loader2 className="h-10 w-10 animate-spin text-[#ea6663]" />
            <p className="text-sm font-medium text-gray-600">{t('checkout.processing')}</p>
          </div>
        )}

        {/* Checkout State */}
        {isCheckout && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="h-5 w-5 text-[#ea6663]" />
              <h2 className="text-lg font-bold text-gray-900">{t('checkout.title')}</h2>
            </div>
            <p className="text-sm text-gray-500 mb-2">{t('checkout.express_desc')}</p>
            <iframe
              src={checkoutUrl}
              style={{
                width: '100%',
                maxWidth: '100%',
                height: '450px',
                border: 'none',
                borderRadius: '12px',
              }}
              title="NeXFlowX Checkout"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        )}

        {/* Success State */}
        {state === 'success' && (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t('checkout.success')}</h2>
            <p className="text-sm text-gray-500">{t('checkout.success_desc')}</p>
            <div className="rounded-lg bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400">{t('checkout.order_id')}</p>
              <p className="text-lg font-bold text-gray-900">{currentOrderId}</p>
            </div>
            <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
              <button
                onClick={() => onPaymentSuccess?.(currentOrderId)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ea6663] px-4 py-3.5 min-h-[44px] text-sm font-bold text-white transition-colors hover:bg-[#d94f4c]"
              >
                <Package className="h-4 w-4" />
                {t('checkout.track_order')}
              </button>
              <button
                onClick={onClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-200 px-4 py-3.5 min-h-[44px] text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('checkout.continue')}
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {state === 'error' && (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t('checkout.error')}</h2>
            <p className="text-sm text-gray-500">{errorMessage || t('general.error')}</p>
            <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
              <button
                onClick={() => {
                  setErrorMessage('');
                  setCheckoutUrl('');
                  setState('idle');
                  paymentInitiatedRef.current = false;
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ea6663] px-4 py-3.5 min-h-[44px] text-sm font-bold text-white transition-colors hover:bg-[#d94f4c]"
              >
                {t('checkout.retry')}
              </button>
              <button
                onClick={onClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-200 px-4 py-3.5 min-h-[44px] text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('checkout.continue')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
