'use client';

// ─── High-Quality Payment Method SVG Icons ─────────────────────────────────
// Clean, professional card-shaped icons for VISA, Mastercard, and others

export function VisaIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="visa-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A1F71" />
          <stop offset="100%" stopColor="#2B3A8E" />
        </linearGradient>
      </defs>
      <rect width="64" height="40" rx="5" fill="url(#visa-bg)" />
      <text x="32" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="2">VISA</text>
    </svg>
  );
}

export function MastercardIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A1F71" />
          <stop offset="100%" stopColor="#2B3A8E" />
        </linearGradient>
      </defs>
      <rect width="64" height="40" rx="5" fill="url(#mc-bg)" />
      <circle cx="25" cy="20" r="11" fill="#EB001B" opacity="0.9" />
      <circle cx="39" cy="20" r="11" fill="#F79E1B" opacity="0.9" />
      <path d="M32 11.5a11 11 0 0 1 0 17 11 11 0 0 1 0-17z" fill="#FF5F00" />
    </svg>
  );
}

// Compact versions for inline button use
export function VisaIconCompact({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 30" className={className} aria-hidden="true">
      <rect width="48" height="30" rx="4" fill="#1A1F71" />
      <text x="24" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="1.5">VISA</text>
    </svg>
  );
}

export function MastercardIconCompact({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 30" className={className} aria-hidden="true">
      <rect width="48" height="30" rx="4" fill="#1A1F71" />
      <circle cx="19" cy="15" r="8" fill="#EB001B" opacity="0.9" />
      <circle cx="29" cy="15" r="8" fill="#F79E1B" opacity="0.9" />
      <path d="M24 9.5a8 8 0 0 1 0 11 8 8 0 0 1 0-11z" fill="#FF5F00" />
    </svg>
  );
}

// Footer payment icons — larger, cleaner versions
export function MaestroIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <rect width="64" height="40" rx="5" fill="#006FCF" />
      <circle cx="25" cy="20" r="10" fill="#00A1E4" />
      <circle cx="39" cy="20" r="10" fill="#FBBD09" />
      <path d="M32 13a10 10 0 0 1 0 14 10 10 0 0 1 0-14z" fill="#7BC142" />
      <text x="32" y="37" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="6" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="1">MAESTRO</text>
    </svg>
  );
}

export function ApplePayIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <rect width="64" height="40" rx="5" fill="#000000" />
      <path d="M26.5 13c.6.7 1.4 1.3 2.5 1.2.1-1-.3-1.7-.9-2.3-.5-.6-1.4-1.1-2.2-1.1-.1 1 .3 1.6.6 2.2zm.9 1.3c-1.3 0-1.9.9-2.2.9s-1.2-.8-2-.8c-1 0-1.9.6-2.4 1.5-1 1.8-.3 4.5.7 6 .5.7 1 1.5 1.8 1.5s1-.6 1.8-.6 1.1.6 1.8.6 1.2-.7 1.7-1.3c.3-.5.5-.9.6-1.3l-.2-.1c-.7-.3-1.6-1.3-1.6-2.7 0-1.2.7-1.8 1-2 .3-.2.6-.3.8-.3l.3-.9zm3.1-.4h2.2v5.8h-2.2v-5.8zm1.1-.9c.7 0 1.3-.6 1.3-1.3s-.5-1.3-1.3-1.3-1.3.5-1.3 1.3.6 1.3 1.3 1.3z" fill="#FFFFFF" />
      <text x="40" y="21" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" fontFamily="Arial, sans-serif">Pay</text>
    </svg>
  );
}

export function GooglePayIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <rect width="64" height="40" rx="5" fill="#FFFFFF" />
      <text x="10" y="24" fill="#3C4043" fontSize="11" fontWeight="bold" fontFamily="Product Sans, Arial, sans-serif" letterSpacing="0.5">G</text>
      <text x="20" y="24" fill="#EA4335" fontSize="11" fontWeight="bold" fontFamily="Product Sans, Arial, sans-serif">o</text>
      <text x="29" y="24" fill="#FBBC05" fontSize="11" fontWeight="bold" fontFamily="Product Sans, Arial, sans-serif">o</text>
      <text x="38" y="24" fill="#4285F4" fontSize="11" fontWeight="bold" fontFamily="Product Sans, Arial, sans-serif">g</text>
      <text x="48" y="24" fill="#34A853" fontSize="11" fontWeight="bold" fontFamily="Product Sans, Arial, sans-serif">l</text>
      <text x="53" y="24" fill="#EA4335" fontSize="11" fontWeight="bold" fontFamily="Product Sans, Arial, sans-serif">e</text>
      <text x="20" y="34" fill="#5F6368" fontSize="7" fontWeight="bold" fontFamily="Product Sans, Arial, sans-serif">Pay</text>
    </svg>
  );
}

export function MbWayIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mbway-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CF0A2C" />
          <stop offset="100%" stopColor="#FF2D55" />
        </linearGradient>
      </defs>
      <rect width="64" height="40" rx="5" fill="url(#mbway-bg)" />
      <text x="32" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">MB</text>
      <text x="32" y="35" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="8" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="2">WAY</text>
    </svg>
  );
}

export function MultibancoIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#003D7C" />
          <stop offset="100%" stopColor="#0062B8" />
        </linearGradient>
      </defs>
      <rect width="64" height="40" rx="5" fill="url(#mb-bg)" />
      <text x="32" y="17" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="5.5" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1.5">MULTIBANCO</text>
      <rect x="17" y="20" width="30" height="14" rx="3" fill="rgba(255,255,255,0.15)" />
      <text x="32" y="32" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="'Courier New', monospace">24</text>
    </svg>
  );
}

export function ShopPayIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5A31F4" />
          <stop offset="100%" stopColor="#7C5CFC" />
        </linearGradient>
      </defs>
      <rect width="64" height="40" rx="5" fill="url(#sp-bg)" />
      <text x="32" y="23" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="0.5">Shop</text>
      <text x="32" y="34" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="8" fontWeight="600" fontFamily="Arial, sans-serif" letterSpacing="1">Pay</text>
    </svg>
  );
}

// Footer icons array
export const FOOTER_PAYMENT_ICONS = [
  { key: 'visa', Component: VisaIcon },
  { key: 'mastercard', Component: MastercardIcon },
  { key: 'maestro', Component: MaestroIcon },
  { key: 'mbway', Component: MbWayIcon },
  { key: 'multibanco', Component: MultibancoIcon },
  { key: 'applepay', Component: ApplePayIcon },
  { key: 'googlepay', Component: GooglePayIcon },
  { key: 'shoppay', Component: ShopPayIcon },
];
