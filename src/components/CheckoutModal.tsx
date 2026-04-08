'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2, CheckCircle2, XCircle, Package, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { VisaIconCompact, MastercardIconCompact } from '@/components/PaymentIcons';

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
  customerEmail?: string;
  onPaymentSuccess?: (orderId?: string) => void;
}

type CheckoutState = 'idle' | 'loading' | 'checkout' | 'success' | 'error';

function generateOrderId(): string {
  return `SEC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
}

export default function CheckoutModal({ isOpen, onClose, items, totalAmount, customerEmail, onPaymentSuccess }: CheckoutModalProps) {
  const { t } = useI18n();
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');
  const [state, setState] = useState<CheckoutState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const paymentInitiatedRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Stable order ID for this checkout session
  const [currentOrderId] = useState(generateOrderId);

  // ── Initiate payment on mount ──────────────────────────────────────────────
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
            amount: totalAmount || 0,
            currency: 'EUR',
            customer_email: customerEmail || '',
            items: (items || []).map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
            orderId: currentOrderId,
          }),
        });

        const data = await res.json();

        if (res.ok && data.shareable_url) {
          setCheckoutUrl(data.shareable_url);
          setState('checkout');
        } else {
          setState('error');
          setErrorMessage(data.error || t('checkout.error'));
        }
      } catch {
        setState('error');
        setErrorMessage(t('general.error'));
      }
    };

    createPayment();
  }, [isOpen, totalAmount, items, currentOrderId, customerEmail, t]);

  // ── Listen for NeXFlowX postMessage (payment success) ─────────────────────
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // Only accept messages from the official NeXFlowX checkout domain
      if (event.origin !== 'https://checkout.nexflowx.tech') return;

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (data.status === 'success') {
          setState('success');
          const txId = data.txId || data.transaction_id || '';

          // Notify parent of success
          if (onPaymentSuccess && currentOrderId) {
            onPaymentSuccess(currentOrderId);
          }

          // Redirect to success page with transaction ID
          // (works in production; in sandbox the modal handles the UI)
          if (txId && typeof window !== 'undefined') {
            try {
              window.location.href = `/encomenda-sucesso?tx=${txId}&order=${currentOrderId}`;
            } catch {
              // If redirect fails, the success modal state is already set
            }
          }
        }
      } catch {
        // Ignore non-JSON messages from the iframe
      }
    },
    [onPaymentSuccess, currentOrderId]
  );

  useEffect(() => {
    if (checkoutUrl && state === 'checkout') {
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [checkoutUrl, state, handleMessage]);

  // ── Retry handler ──────────────────────────────────────────────────────────
  const handleRetry = () => {
    setErrorMessage('');
    setCheckoutUrl('');
    setState('idle');
    paymentInitiatedRef.current = false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-4 sm:p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={t('checkout.title')}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-md p-2 sm:p-2.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 z-10"
          aria-label={t('checkout.close')}
        >
          <XCircle className="h-5 w-5" />
        </button>

        {/* ── Loading State ────────────────────────────────────────────────── */}
        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <Loader2 className="h-10 w-10 animate-spin text-[#ea6663]" />
            <p className="text-sm font-medium text-gray-600">{t('checkout.processing')}</p>
            <p className="text-xs text-gray-400">A ligar ao gateway de pagamento...</p>
          </div>
        )}

        {/* ── Checkout State (Iframe) ─────────────────────────────────────── */}
        {state === 'checkout' && (
          <div className="flex flex-col items-center gap-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1 w-full">
              <CreditCard className="h-5 w-5 text-[#ea6663]" />
              <h2 className="text-lg font-bold text-gray-900">{t('checkout.title')}</h2>
            </div>

            {/* Payment method badges */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-1">
                <VisaIconCompact className="h-5 w-auto" />
                <MastercardIconCompact className="h-5 w-auto" />
              </div>
              <p className="text-xs text-gray-500">Pagamento seguro via NeXFlowX</p>
            </div>

            {/* Order summary */}
            <div className="w-full rounded-lg bg-gray-50 px-4 py-2.5 flex items-center justify-between">
              <span className="text-sm text-gray-500">Encomenda <span className="font-mono font-semibold text-gray-700">{currentOrderId}</span></span>
              <span className="text-sm font-bold text-gray-900">{totalAmount?.toFixed(2)} €</span>
            </div>

            {/* NeXFlowX Iframe — renders the payment form directly on our page */}
            <iframe
              ref={iframeRef}
              src={checkoutUrl}
              style={{
                width: '100%',
                maxWidth: '100%',
                height: '500px',
                border: 'none',
                borderRadius: '12px',
              }}
              title="NeXFlowX Secure Checkout"
              allow="payment"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
            />
          </div>
        )}

        {/* ── Success State ───────────────────────────────────────────────── */}
        {state === 'success' && (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t('checkout.success')}</h2>
            <p className="text-sm text-gray-500">{t('checkout.success_desc')}</p>

            <div className="rounded-lg bg-gray-50 px-4 py-3 w-full">
              <p className="text-xs text-gray-400">{t('checkout.order_id')}</p>
              <p className="text-lg font-bold text-gray-900 font-mono">{currentOrderId}</p>
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

        {/* ── Error State ─────────────────────────────────────────────────── */}
        {state === 'error' && (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t('checkout.error')}</h2>
            <p className="text-sm text-gray-500">{errorMessage || t('general.error')}</p>

            <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
              <button
                onClick={handleRetry}
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
