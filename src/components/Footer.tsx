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
import { FOOTER_PAYMENT_ICONS } from '@/components/PaymentIcons';

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
      <div className="bg-[#ea6663] py-5 px-4 sm:py-6" role="region" aria-label="Newsletter subscription">
        <div className="mx-auto max-w-7xl">
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <span className="text-sm sm:text-base font-semibold text-white text-center sm:text-left">
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
                className="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-black px-4 sm:px-5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#ea6663]"
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
      <div className="bg-[#1a1a2e]/95 py-2.5 px-4 sm:py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-3 sm:gap-6 text-gray-300 text-[11px] sm:text-sm flex-wrap">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#ea6663]" />
            {t('footer.delivery_europe')}
          </span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span>{t('tracking.portugal_spain')}</span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span>{t('tracking.france_italy')}</span>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="bg-[#1a1a2e] py-10 px-4 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Column 1: Logo & Info */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <Image
                src="https://securfix.pt/cdn/shop/files/DISENO_LOGO_HORIZONTAL.png?v=1613720485"
                alt="Securfix"
                width={200}
                height={50}
                className="h-10 sm:h-12 w-auto object-contain mb-4 brightness-0 invert"
                unoptimized
              />
              <p className="mb-5 text-xs sm:text-sm leading-relaxed text-gray-400">
                {t('footer.about_company')}
              </p>
              <ul className="space-y-2.5">
                <li>
                  <a href="tel:+351300528280" className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400 transition-colors hover:text-white" aria-label="Phone">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#ea6663]" />
                    <span>(+351) 300 528 280</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:comercial@securfix.pt" className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400 transition-colors hover:text-white" aria-label="Email">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#ea6663]" />
                    <span className="hidden sm:inline">comercial@securfix.pt</span>
                    <span className="sm:hidden">comercial@securfix.pt</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.company')}
              </h3>
              <ul className="space-y-2">
                {empresaLinks.map((link) => (
                  <li key={link.pageKey}>
                    <button
                      onClick={() => handlePageClick(link.pageKey, link.label)}
                      className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-white text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Information */}
            <div>
              <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.information')}
              </h3>
              <ul className="space-y-2">
                {informacaoLinks.map((link) => (
                  <li key={link.pageKey}>
                    <button
                      onClick={() => handlePageClick(link.pageKey, link.label)}
                      className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-white text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Social */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.follow_us')}
              </h3>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3" role="list" aria-label="Social media">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-full sm:h-11 items-center justify-center gap-2 rounded-lg border border-gray-700 text-gray-400 transition-all hover:border-[#ea6663] hover:bg-[#ea6663]/10 hover:text-white"
                  >
                    {social.icon}
                    <span className="text-[11px] sm:text-xs font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-700/50 bg-[#1a1a2e] py-5 px-4 sm:py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-center text-[10px] sm:text-xs leading-relaxed text-gray-500 md:text-left">
              {t('footer.copyright')}
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-2 sm:gap-3" aria-label={t('footer.secure_payment')}>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-500 mr-1">
                <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#ea6663]" />
                <span className="hidden sm:inline">{t('footer.secure_payment')}:</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
                {FOOTER_PAYMENT_ICONS.map(({ key, Component }) => (
                  <div
                    key={key}
                    className="flex items-center justify-center rounded-md bg-white/5 p-0.5 sm:p-1 transition-transform hover:scale-110"
                  >
                    <Component className="h-7 w-auto sm:h-8 sm:w-auto" />
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
