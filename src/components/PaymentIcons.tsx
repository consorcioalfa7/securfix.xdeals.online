'use client';

// ─── Professional Payment Method Brand Logos (SVG) ──────────────────────────
// Accurate brand marks recreated as inline SVG. No text-element hacks — these
// use the real logo geometries (Google 4-color G, Apple apple, VISA wordmark,
// Mastercard circles, MB WAY, Multibanco, Shop Pay, PayPal).

// ── VISA ─────────────────────────────────────────────────────────────────────
export function VisaIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="Visa" role="img">
      <rect width="64" height="40" rx="5" fill="#FFFFFF" />
      <rect width="64" height="40" rx="5" fill="#1434CB" />
      <path
        d="M27.5 14.2 L31.8 14.2 L29.1 25.8 L24.8 25.8 Z"
        fill="#FFFFFF"
        transform="skewX(-8)"
      />
      <text
        x="32"
        y="27"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="15"
        fontStyle="italic"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        letterSpacing="1"
      >
        VISA
      </text>
    </svg>
  );
}

// ── Mastercard ───────────────────────────────────────────────────────────────
export function MastercardIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="Mastercard" role="img">
      <rect width="64" height="40" rx="5" fill="#FFFFFF" />
      <circle cx="25" cy="20" r="11" fill="#EB001B" />
      <circle cx="39" cy="20" r="11" fill="#F79E1B" />
      <path
        d="M32 11.3 a11 11 0 0 1 0 17.4 a11 11 0 0 1 0 -17.4 z"
        fill="#FF5F00"
      />
    </svg>
  );
}

// Compact versions for inline button use
export function VisaIconCompact({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 30" className={className} aria-label="Visa" role="img">
      <rect width="48" height="30" rx="4" fill="#1434CB" />
      <text
        x="24"
        y="21"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="12"
        fontStyle="italic"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.8"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardIconCompact({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 30" className={className} aria-label="Mastercard" role="img">
      <rect width="48" height="30" rx="4" fill="#FFFFFF" />
      <circle cx="19" cy="15" r="8" fill="#EB001B" />
      <circle cx="29" cy="15" r="8" fill="#F79E1B" />
      <path d="M24 9.5 a8 8 0 0 1 0 11 a8 8 0 0 1 0 -11 z" fill="#FF5F00" />
    </svg>
  );
}

// ── Maestro ──────────────────────────────────────────────────────────────────
export function MaestroIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="Maestro" role="img">
      <rect width="64" height="40" rx="5" fill="#FFFFFF" />
      <circle cx="25" cy="18" r="10" fill="#00A1E4" />
      <circle cx="39" cy="18" r="10" fill="#EB001B" />
      <path
        d="M32 11 a10 10 0 0 1 0 14 a10 10 0 0 1 0 -14 z"
        fill="#7BC142"
        opacity="0.85"
      />
      <text
        x="32"
        y="36"
        textAnchor="middle"
        fill="#006FCF"
        fontSize="5.5"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        letterSpacing="1.2"
      >
        Maestro
      </text>
    </svg>
  );
}

// ── Apple Pay (real Apple logo + Pay) ────────────────────────────────────────
export function ApplePayIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="Apple Pay" role="img">
      <rect width="64" height="40" rx="5" fill="#000000" />
      {/* Apple logo (official silhouette) */}
      <path
        d="M22.8 19.2 c0 -1.5 .8 -2.8 2 -3.6 c-.7 -1 -1.7 -1.6 -2.9 -1.6 c-1.2 -.1 -2.4 .8 -3 .8 c-.6 0 -1.6 -.8 -2.6 -.8 c-1.3 0 -2.6 .8 -3.3 2 c-1.4 2.4 -.4 6 1 8 c.7 1 1.5 2.1 2.6 2.1 c1 0 1.4 -.6 2.6 -.6 c1.2 0 1.5 .6 2.6 .6 c1.1 0 1.8 -1 2.5 -2 c.6 -.9 .9 -1.8 .9 -1.8 c0 0 -1.8 -.7 -1.8 -2.7 z M21 12.6 c.6 -.7 .9 -1.6 .8 -2.6 c-.8 0 -1.7 .5 -2.3 1.2 c-.5 .6 -1 1.6 -.8 2.5 c.9 .1 1.8 -.4 2.3 -1.1 z"
        fill="#FFFFFF"
        transform="translate(2 -1)"
      />
      {/* "Pay" text */}
      <text
        x="42"
        y="26"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="500"
        fontFamily="-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif"
        letterSpacing="0.5"
      >
        Pay
      </text>
    </svg>
  );
}

// ── Google Pay (real 4-color Google G + Pay) ─────────────────────────────────
export function GooglePayIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="Google Pay" role="img">
      <rect width="64" height="40" rx="5" fill="#FFFFFF" />
      {/* Google "G" logo — official 4-color geometry */}
      <g transform="translate(8 10) scale(0.85)">
        <path
          d="M21 12.2 c0 -.7 -.1 -1.4 -.2 -2 H12 v3.9 h5.1 c-.2 1.2 -.9 2.2 -1.9 2.9 v2.4 h3.1 c1.8 -1.7 2.7 -4.1 2.7 -7.2 z"
          fill="#4285F4"
        />
        <path
          d="M12 21 c2.6 0 4.7 -.9 6.3 -2.4 l-3.1 -2.4 c-.9 .6 -2 .9 -3.2 .9 c-2.5 0 -4.6 -1.7 -5.3 -4 H3.5 v2.5 C5.1 18.9 8.3 21 12 21 z"
          fill="#34A853"
        />
        <path
          d="M6.7 13.1 c-.2 -.6 -.3 -1.2 -.3 -1.9 c0 -.7 .1 -1.3 .3 -1.9 V6.8 H3.5 C2.8 8.2 2.4 9.7 2.4 11.2 c0 1.5 .4 3 1.1 4.4 l3.2 -2.5 z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.5 c1.4 0 2.7 .5 3.7 1.4 l2.8 -2.8 C16.7 2.5 14.6 1.5 12 1.5 C8.3 1.5 5.1 3.6 3.5 6.8 l3.2 2.5 C7.4 7.2 9.5 5.5 12 5.5 z"
          fill="#EA4335"
        />
      </g>
      {/* "Pay" text */}
      <text
        x="44"
        y="26"
        textAnchor="middle"
        fill="#5F6368"
        fontSize="15"
        fontWeight="500"
        fontFamily="'Roboto', Arial, sans-serif"
        letterSpacing="0.5"
      >
        Pay
      </text>
    </svg>
  );
}

// ── MB WAY ───────────────────────────────────────────────────────────────────
export function MbWayIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="MB WAY" role="img">
      <rect width="64" height="40" rx="5" fill="#FFFFFF" />
      <rect x="1" y="1" width="62" height="38" rx="4" fill="none" stroke="#E0E0E0" strokeWidth="1" />
      {/* Red MB block */}
      <rect x="6" y="9" width="20" height="22" rx="2" fill="#ED1C24" />
      <text
        x="16"
        y="24"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="11"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.5"
      >
        MB
      </text>
      {/* WAY text */}
      <text
        x="40"
        y="25"
        textAnchor="middle"
        fill="#ED1C24"
        fontSize="13"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        letterSpacing="1"
      >
        WAY
      </text>
    </svg>
  );
}

// ── Multibanco ───────────────────────────────────────────────────────────────
export function MultibancoIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="Multibanco" role="img">
      <rect width="64" height="40" rx="5" fill="#FFFFFF" />
      <rect x="1" y="1" width="62" height="38" rx="4" fill="none" stroke="#E0E0E0" strokeWidth="1" />
      {/* Top label */}
      <text
        x="32"
        y="12"
        textAnchor="middle"
        fill="#003D7C"
        fontSize="4.5"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        letterSpacing="1.3"
      >
        MULTIBANCO
      </text>
      {/* Card-style box */}
      <rect x="14" y="16" width="36" height="18" rx="2" fill="#003D7C" />
      <rect x="16" y="18" width="32" height="3" rx="0.5" fill="#FFFFFF" opacity="0.3" />
      <text
        x="32"
        y="31"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="11"
        fontWeight="900"
        fontFamily="'Courier New', monospace"
        letterSpacing="1"
      >
        24
      </text>
    </svg>
  );
}

// ── Shop Pay ─────────────────────────────────────────────────────────────────
export function ShopPayIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="Shop Pay" role="img">
      <rect width="64" height="40" rx="5" fill="#5A31F4" />
      <text
        x="32"
        y="18"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="11"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.3"
      >
        Shop
      </text>
      <text
        x="32"
        y="31"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="11"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.3"
      >
        Pay
      </text>
    </svg>
  );
}

// ── PayPal ───────────────────────────────────────────────────────────────────
export function PayPalIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="PayPal" role="img">
      <rect width="64" height="40" rx="5" fill="#FFFFFF" />
      <rect x="1" y="1" width="62" height="38" rx="4" fill="none" stroke="#E0E0E0" strokeWidth="1" />
      {/* Stylized P */}
      <path
        d="M20 10 h7 c3 0 5 2 5 5 c0 4 -3 6 -7 6 h-3 l-1 8 h-3 z"
        fill="#003087"
      />
      <path
        d="M22 12 h5 c2 0 3 1 3 3 c0 3 -2 4 -4 4 h-2.5 l-.5 4 h-2 z"
        fill="#009CDE"
      />
    </svg>
  );
}

// ── Silver card (generic) ────────────────────────────────────────────────────
export function SilverCardIcon({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-label="Card" role="img">
      <defs>
        <linearGradient id="silver-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#909090" />
        </linearGradient>
      </defs>
      <rect width="64" height="40" rx="5" fill="url(#silver-bg)" />
      <rect x="6" y="14" width="16" height="3" rx="0.5" fill="#FFFFFF" opacity="0.5" />
      <rect x="6" y="22" width="20" height="2" rx="0.5" fill="#FFFFFF" opacity="0.3" />
      <rect x="6" y="27" width="14" height="2" rx="0.5" fill="#FFFFFF" opacity="0.3" />
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
