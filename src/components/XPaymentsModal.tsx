'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Loader2, ExternalLink, ShieldCheck } from 'lucide-react';

// ─── XPayments Seamless Checkout Modal ─────────────────────────────────────
// Opens the XPayments hosted checkout URL inside an <iframe> overlay on top of
// the site (NO redirect away from the store).
//
// Auto-close: listens for the success signal from the iframe via postMessage.
//   window.addEventListener('message', (e) => {
//     if (e.data === 'XPAYMENTS_PAYMENT_SUCCESS') fecharIframe();
//   });
//
// Security note on postMessage:
//   The XPayments iframe posts the literal string 'XPAYMENTS_PAYMENT_SUCCESS'
//   on success. We accept that exact value. For additional defense-in-depth we
//   also sanity-check that the message origin is an https URL and log it, so it
//   can be tightened to an allowlist once the XPayments checkout domain is known.

interface XPaymentsModalProps {
  /** The hosted checkout URL returned by /api/xpayments/checkout. */
  checkoutUrl: string | null;
  /** Internal order id (SEC-YYYY-NNNNN) for tracking after success. */
  orderId: string | null;
  /** Fired when the iframe signals XPAYMENTS_PAYMENT_SUCCESS. */
  onSuccess: (orderId: string) => void;
  /** Fired when the user closes the modal without paying. */
  onClose: () => void;
}

export default function XPaymentsModal({
  checkoutUrl,
  orderId,
  onSuccess,
  onClose,
}: XPaymentsModalProps) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const closedRef = useRef(false);

  const fecharIframe = useCallback(() => {
    if (closedRef.current) return;
    closedRef.current = true;
    onClose();
  }, [onClose]);

  // ── Auto-close listener: watch for the success signal from the iframe ──────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!checkoutUrl) return; // only listen while the modal is open

    const handleMessage = (e: MessageEvent) => {
      // Primary: exact string signal requested by the integration spec.
      if (e.data === 'XPAYMENTS_PAYMENT_SUCCESS') {
        console.log('[XPayments] Success signal received from origin:', e.origin);
        if (orderId) onSuccess(orderId);
        fecharIframe();
        return;
      }

      // Defensive: some providers send an object instead of a bare string.
      const data = e.data as unknown;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const obj = data as Record<string, unknown>;
        const matches =
          obj.type === 'XPAYMENTS_PAYMENT_SUCCESS' ||
          obj.event === 'payment.success' ||
          obj.status === 'success';
        if (matches) {
          console.log('[XPayments] Success object received from origin:', e.origin, obj);
          if (orderId) onSuccess(orderId);
          fecharIframe();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [checkoutUrl, orderId, onSuccess, fecharIframe]);

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!checkoutUrl) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [checkoutUrl]);

  // Close on Escape (only before success)
  useEffect(() => {
    if (!checkoutUrl) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharIframe();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [checkoutUrl, fecharIframe]);

  if (!checkoutUrl) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Pagamento seguro XPayments"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={fecharIframe}
        aria-hidden="true"
      />

      {/* Modal frame */}
      <div className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ea6663]">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                Pagamento seguro
              </p>
              <p className="text-[11px] text-gray-500 truncate">
                Processado por XPayments {orderId ? `· ${orderId}` : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Abrir em nova aba
            </a>
            <button
              onClick={fecharIframe}
              className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Fechar pagamento"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Iframe container */}
        <div className="relative flex-1 bg-gray-50">
          {iframeLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
              <Loader2 className="h-8 w-8 animate-spin text-[#ea6663]" />
              <p className="text-sm text-gray-500">A carregar o checkout seguro…</p>
            </div>
          )}

          {/*
            Sandbox: allow-scripts + allow-forms + allow-same-origin are required
            for the hosted checkout to function. allow-popups permits 3-D Secure
            challenges. We deliberately OMIT allow-top-navigation so the iframe
            cannot redirect the parent store — it must signal via postMessage.
          */}
          <iframe
            src={checkoutUrl}
            title="XPayments Secure Checkout"
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
            onLoad={() => setIframeLoading(false)}
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
