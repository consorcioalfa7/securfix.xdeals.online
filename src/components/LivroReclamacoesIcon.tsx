'use client';

// ─── Livro de Reclamações Digital (Portuguese Official Logo) ─────────────────
// Recreated as inline SVG. The official logo features a book/document icon
// with the Portuguese flag colors and the text "LIVRO DE RECLAMAÇÕES DIGITAL".
//
// Usage: links to https://www.livroreclamacoes.pt/ (the official portal).

export function LivroReclamacoesIcon({
  className = 'h-12 w-auto',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 52"
      className={className}
      role="img"
      aria-label="Livro de Reclamações Digital"
    >
      <defs>
        <linearGradient id="lrd-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B7A43" />
          <stop offset="100%" stopColor="#145A30" />
        </linearGradient>
        <linearGradient id="lred-pt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DA291C" />
          <stop offset="100%" stopColor="#B71C1C" />
        </linearGradient>
      </defs>

      {/* White rounded badge background */}
      <rect x="0.5" y="0.5" width="119" height="51" rx="6" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />

      {/* Left: book icon in a green circle */}
      <circle cx="24" cy="26" r="17" fill="url(#lrd-green)" />

      {/* Open book pages */}
      <path
        d="M14 20 c3 -1.5 6 -1.5 9 0 c0 4 0 8 0 12 c-3 -1.5 -6 -1.5 -9 0 z"
        fill="#FFFFFF"
      />
      <path
        d="M34 20 c-3 -1.5 -6 -1.5 -9 0 c0 4 0 8 0 12 c3 -1.5 6 -1.5 9 0 z"
        fill="#FFFFFF"
      />
      {/* Page lines */}
      <line x1="16" y1="24" x2="21" y2="23.2" stroke="#1B7A43" strokeWidth="0.7" />
      <line x1="16" y1="27" x2="21" y2="26.2" stroke="#1B7A43" strokeWidth="0.7" />
      <line x1="16" y1="30" x2="21" y2="29.2" stroke="#1B7A43" strokeWidth="0.7" />
      <line x1="27" y1="23.2" x2="32" y2="24" stroke="#1B7A43" strokeWidth="0.7" />
      <line x1="27" y1="26.2" x2="32" y2="27" stroke="#1B7A43" strokeWidth="0.7" />
      <line x1="27" y1="29.2" x2="32" y2="30" stroke="#1B7A43" strokeWidth="0.7" />

      {/* Small Portuguese flag accent on the book spine */}
      <rect x="22.5" y="19.5" width="3" height="2.2" rx="0.3" fill="url(#lred-pt)" />

      {/* Right: text */}
      <text
        x="48"
        y="20"
        fill="#1B7A43"
        fontSize="8.5"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.3"
      >
        LIVRO DE
      </text>
      <text
        x="48"
        y="30"
        fill="#1B7A43"
        fontSize="8.5"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.3"
      >
        RECLAMAÇÕES
      </text>
      <text
        x="48"
        y="40"
        fill="#DA291C"
        fontSize="7"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        letterSpacing="1.5"
      >
        DIGITAL
      </text>
    </svg>
  );
}
