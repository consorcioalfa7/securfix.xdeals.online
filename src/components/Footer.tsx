'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  Shield,
  Truck,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

// ─── Real Payment Method SVG Icons ────────────────────────────────────────────

function VisaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#1A1F71"/>
      <path d="M17.5 21h-3l1.9-10.5h3L17.5 21zm12.7-10.3c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.5-5.1 3.7 0 1.6 1.5 2.5 2.6 3.1 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.2-1.9 1.2-1.3 0-2-.2-3-.6l-.4-.2-.5 2.9c.7.3 2.1.6 3.5.6 3.2 0 5.2-1.5 5.2-3.9 0-1.3-.8-2.3-2.5-3.1-1-.5-1.7-.9-1.7-1.4 0-.5.5-1 1.7-1 1 0 1.8.2 2.4.5l.3.1.4-2.8zm8 0h-2.3c-.7 0-1.3.2-1.6.9l-4.5 10.4h3.2l.6-1.7h3.9l.4 1.7H42l-3.8-10.3zm-3.7 7l1.3-3.3.7 3.3h-2zM14.3 10.7l-2.8 7.2-.3-1.5c-.5-1.7-2.1-3.6-3.9-4.5l2.6 9.1h3.2l4.7-10.3h-3.5z" fill="#FFFFFF"/>
      <path d="M8.9 10.7H4.2L4.2 11c3.7.9 6.1 3.1 7.1 5.7l-1-5.1c-.2-.7-.7-.9-1.4-.9z" fill="#F9A533"/>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#1A1F71"/>
      <circle cx="19" cy="16" r="8" fill="#EB001B" opacity="0.9"/>
      <circle cx="29" cy="16" r="8" fill="#F79E1B" opacity="0.9"/>
      <path d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z" fill="#FF5F00"/>
    </svg>
  );
}

function MaestroIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#006FCF"/>
      <circle cx="19" cy="16" r="8" fill="#00A1E4"/>
      <circle cx="29" cy="16" r="8" fill="#FBBD09"/>
      <path d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z" fill="#7BC142"/>
      <text x="24" y="28" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">Maestro</text>
    </svg>
  );
}

function ApplePayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#000000"/>
      <path d="M20.5 10.4c.5.6 1.2 1.1 2.2 1 .1-.9-.3-1.6-.8-2.2-.5-.6-1.3-1-2.1-1-.1 1 .3 1.5.7 2.2zm.8 1.2c-1.2 0-1.8.8-2.1.8s-1.1-.8-1.8-.8c-.9 0-1.8.5-2.2 1.4-.9 1.7-.2 4.1.7 5.5.5.7 1 1.4 1.8 1.4s.9-.6 1.8-.6 1 .6 1.8.6 1.2-.7 1.7-1.3c.3-.4.4-.8.6-1.2l-.2-.1c-.6-.3-1.5-1.3-1.5-2.6 0-1.1.7-1.7 1-2 .3-.2.6-.3.8-.3l.2-.8zm2.8-.4h2.1v5.5h-2.1v-5.5zm1.1-.8c.7 0 1.2-.6 1.2-1.2s-.5-1.2-1.2-1.2-1.2.5-1.2 1.2.5 1.2 1.2 1.2z" fill="#FFFFFF"/>
    <text x="34" y="19" textAnchor="middle" fill="white" fontSize="5" fontWeight="600">Pay</text>
    </svg>
  );
}

function GooglePayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#1A73E8"/>
      <path d="M12 11.5h4.5c.8 0 1.5.2 2.1.6.6.4 1 1 1.3 1.6.3.7.5 1.4.5 2.2s-.2 1.5-.5 2.2c-.3.7-.8 1.2-1.3 1.6-.6.4-1.3.6-2.1.6H12V11.5zm2.3 6.5h2c.5 0 .9-.2 1.3-.5.3-.3.5-.8.5-1.5s-.2-1.1-.5-1.5c-.3-.3-.7-.5-1.3-.5h-2v4z" fill="white"/>
      <path d="M24 11.5l-2.5 8.7h2l1.8-6.5 1.8 6.5h2L27.6 11.5H24z" fill="white"/>
      <circle cx="33" cy="15" r="1.5" fill="#EA4335"/>
      <circle cx="36" cy="15" r="1.5" fill="#FBBC05"/>
      <circle cx="34.5" cy="17.5" r="1.5" fill="#34A853"/>
      <circle cx="34.5" cy="12.5" r="1.5" fill="#4285F4"/>
    </svg>
  );
}

function ShopPayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#5A31F4"/>
      <text x="24" y="18" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Shop</text>
      <text x="24" y="26" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif">Pay</text>
    </svg>
  );
}

function MbWayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#FF0000"/>
      <text x="24" y="18" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif">MB</text>
      <text x="24" y="26" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif">WAY</text>
    </svg>
  );
}

function MultibancoIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-hidden="true">
      <rect width="48" height="32" rx="4" fill="#003D7C"/>
      <text x="24" y="14" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="sans-serif">MULTIBANCO</text>
      <rect x="14" y="17" width="20" height="10" rx="2" fill="#FFFFFF" opacity="0.2"/>
      <text x="24" y="25" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="monospace">24</text>
    </svg>
  );
}

const PAYMENT_ICONS = [
  { key: 'visa', Component: VisaIcon },
  { key: 'mastercard', Component: MastercardIcon },
  { key: 'maestro', Component: MaestroIcon },
  { key: 'applepay', Component: ApplePayIcon },
  { key: 'googlepay', Component: GooglePayIcon },
  { key: 'shoppay', Component: ShopPayIcon },
  { key: 'mbway', Component: MbWayIcon },
  { key: 'multibanco', Component: MultibancoIcon },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  pageKey: string;
}

interface FooterColumn {
  titleKey: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface FooterProps {
  onOpenPage: (pageKey: string, title: string) => void;
}

export default function Footer({ onOpenPage }: FooterProps) {
  const { t } = useI18n();
  const [email, setEmail] = useState<string>('');

  const empresaLinks: FooterLink[] = [
    { label: t('footer.about_us'), pageKey: 'about' },
    { label: t('footer.contact_us'), pageKey: 'contact' },
    { label: t('footer.tutorials'), pageKey: 'tutorials' },
    { label: t('footer.blog'), pageKey: 'blog' },
    { label: t('footer.faq'), pageKey: 'faq' },
    { label: t('footer.work_with_us'), pageKey: 'careers' },
  ];

  const informacaoLinks: FooterLink[] = [
    { label: t('footer.legal'), pageKey: 'legal' },
    { label: t('footer.privacy'), pageKey: 'privacy' },
    { label: t('footer.cookies'), pageKey: 'cookies' },
    { label: t('footer.shipping'), pageKey: 'shipping' },
    { label: t('footer.cancel_return'), pageKey: 'returns' },
    { label: t('footer.price_guarantee'), pageKey: 'price_guarantee' },
  ];

  const socialLinks: SocialLink[] = [
    { label: 'Facebook', href: 'https://www.facebook.com/securfix/', icon: <Facebook className="h-5 w-5" /> },
    { label: 'Instagram', href: 'https://www.instagram.com/securfix/', icon: <Instagram className="h-5 w-5" /> },
    { label: 'Pinterest', href: 'https://www.pinterest.es/securfix/', icon: <Linkedin className="h-5 w-5" /> },
    { label: 'WhatsApp', href: 'https://wa.me/34669386327', icon: <MessageCircle className="h-5 w-5" /> },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  const handlePageClick = (pageKey: string, label: string) => {
    onOpenPage(pageKey, label);
  };

  return (
    <footer className="mt-auto w-full" role="contentinfo">
      {/* ── Newsletter Bar ── */}
      <div className="bg-[#ea6663] py-6 px-4" role="region" aria-label="Newsletter subscription">
        <div className="mx-auto max-w-7xl">
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <span className="text-base font-semibold text-white sm:text-lg">
              {t('footer.newsletter')}
            </span>
            <div className="flex w-full max-w-md items-center gap-2 sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.email_placeholder')}
                required
                aria-label="Email for newsletter"
                className="h-10 w-full flex-1 rounded-lg border-0 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/50 sm:min-w-[260px]"
              />
              <button
                type="submit"
                className="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#ea6663]"
                aria-label={t('footer.subscribe')}
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">{t('footer.subscribe')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Delivery Europe Banner ── */}
      <div className="bg-[#1a1a2e]/95 py-3 px-4">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-6 text-gray-300 text-xs sm:text-sm flex-wrap">
          <span className="flex items-center gap-1.5">
            <Truck className="h-4 w-4 text-[#ea6663]" />
            {t('footer.delivery_europe')}
          </span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span>{t('tracking.portugal_spain')}</span>
          <span>{t('tracking.france_italy')}</span>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="bg-[#1a1a2e] py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Column 1: Logo & Info */}
            <div>
              <Image
                src="https://securfix.pt/cdn/shop/files/DISENO_LOGO_HORIZONTAL.png?v=1613720485"
                alt="Securfix"
                width={200}
                height={50}
                className="h-12 w-auto object-contain mb-4 brightness-0 invert"
                unoptimized
              />
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                {t('footer.about_company')}
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+351300528280" className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white" aria-label="Phone">
                    <Phone className="h-4 w-4 shrink-0 text-[#ea6663]" />
                    <span>(+351) 300 528 280</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:comercial@securfix.pt" className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white" aria-label="Email">
                    <Mail className="h-4 w-4 shrink-0 text-[#ea6663]" />
                    <span>comercial@securfix.pt</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.company')}
              </h3>
              <ul className="space-y-2.5">
                {empresaLinks.map((link) => (
                  <li key={link.pageKey}>
                    <button
                      onClick={() => handlePageClick(link.pageKey, link.label)}
                      className="text-sm text-gray-400 transition-colors hover:text-white text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Information */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.information')}
              </h3>
              <ul className="space-y-2.5">
                {informacaoLinks.map((link) => (
                  <li key={link.pageKey}>
                    <button
                      onClick={() => handlePageClick(link.pageKey, link.label)}
                      className="text-sm text-gray-400 transition-colors hover:text-white text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Social */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.follow_us')}
              </h3>
              <div className="grid grid-cols-2 gap-3" role="list" aria-label="Social media">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-700 text-gray-400 transition-all hover:border-[#ea6663] hover:bg-[#ea6663]/10 hover:text-white"
                  >
                    {social.icon}
                    <span className="text-xs font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-700/50 bg-[#1a1a2e] py-6 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-center text-xs leading-relaxed text-gray-500 md:text-left">
              {t('footer.copyright')}
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-3" aria-label={t('footer.secure_payment')}>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mr-2">
                <Shield className="h-3.5 w-3.5 text-[#ea6663]" />
                <span className="hidden sm:inline">{t('footer.secure_payment')}:</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {PAYMENT_ICONS.map(({ key, Component }) => (
                  <div
                    key={key}
                    className="flex items-center justify-center rounded bg-white/5 p-1 transition-transform hover:scale-105"
                  >
                    <Component />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
