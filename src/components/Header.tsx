'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Search,
  ShoppingCart,
  User,
  Package,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useCartStore } from '@/lib/cart-store';
import LanguageSwitcher from './LanguageSwitcher';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  labelKey: string;
  href: string;
}

interface MegaColumn {
  titleKey: string;
  links: NavLink[];
}

interface MegaMenuData {
  labelKey: string;
  columns: MegaColumn[];
}

interface SimpleDropdownData {
  labelKey: string;
  links: NavLink[];
}

type NavItem = MegaMenuData | SimpleDropdownData;

function isMegaMenu(item: NavItem): item is MegaMenuData {
  return 'columns' in item && Array.isArray(item.columns);
}

// ─── Navigation Data (translation keys) ───────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    labelKey: 'nav.residential',
    columns: [
      {
        titleKey: 'nav.fencing',
        links: [
          { labelKey: 'nav.panel_fence', href: '#' },
          { labelKey: 'nav.chain_link', href: '#' },
          { labelKey: 'nav.railings', href: '#' },
          { labelKey: 'nav.garden_hide', href: '#' },
        ],
      },
      {
        titleKey: 'nav.accessories',
        links: [
          { labelKey: 'nav.panel_acc', href: '#' },
          { labelKey: 'nav.chain_acc', href: '#' },
          { labelKey: 'nav.wire', href: '#' },
          { labelKey: 'nav.rebar', href: '#' },
          { labelKey: 'nav.spray_paint', href: '#' },
        ],
      },
      {
        titleKey: 'nav.doors',
        links: [
          { labelKey: 'nav.mesh_gates', href: '#' },
          { labelKey: 'nav.iron_doors', href: '#' },
          { labelKey: 'nav.fire_doors', href: '#' },
          { labelKey: 'nav.security_doors', href: '#' },
          { labelKey: 'nav.sliding_structure', href: '#' },
          { labelKey: 'nav.sliding_no_work', href: '#' },
          { labelKey: 'nav.service_doors', href: '#' },
        ],
      },
      {
        titleKey: 'nav.others',
        links: [
          { labelKey: 'nav.pergola', href: '#' },
          { labelKey: 'nav.stairs', href: '#' },
          { labelKey: 'nav.retractable_stairs', href: '#' },
        ],
      },
    ],
  },
  {
    labelKey: 'nav.industrial',
    columns: [
      {
        titleKey: 'nav.fencing',
        links: [
          { labelKey: 'nav.panel_hercules', href: '#' },
          { labelKey: 'nav.welded_mesh', href: '#' },
          { labelKey: 'nav.chain_link', href: '#' },
          { labelKey: 'nav.construction_panel', href: '#' },
          { labelKey: 'nav.construction', href: '#' },
        ],
      },
      {
        titleKey: 'nav.accessories',
        links: [
          { labelKey: 'nav.panel_acc', href: '#' },
          { labelKey: 'nav.chain_acc', href: '#' },
          { labelKey: 'nav.wire', href: '#' },
          { labelKey: 'nav.rebar', href: '#' },
          { labelKey: 'nav.spray_paint', href: '#' },
        ],
      },
      {
        titleKey: 'nav.doors',
        links: [
          { labelKey: 'nav.mesh_gates', href: '#' },
          { labelKey: 'nav.fire_doors', href: '#' },
          { labelKey: 'nav.sliding_structure', href: '#' },
          { labelKey: 'nav.sliding_no_work', href: '#' },
          { labelKey: 'nav.service_doors', href: '#' },
        ],
      },
      {
        titleKey: 'nav.others',
        links: [
          { labelKey: 'nav.tramex', href: '#' },
          { labelKey: 'nav.perforated_sheet', href: '#' },
          { labelKey: 'nav.stairs', href: '#' },
        ],
      },
    ],
  },
  {
    labelKey: 'nav.agricultural',
    columns: [
      {
        titleKey: 'nav.fencing',
        links: [
          { labelKey: 'nav.sheep_wire', href: '#' },
          { labelKey: 'nav.hexagonal', href: '#' },
          { labelKey: 'nav.barbed_wire', href: '#' },
        ],
      },
      {
        titleKey: 'nav.accessories',
        links: [
          { labelKey: 'nav.wire', href: '#' },
          { labelKey: 'nav.rebar', href: '#' },
        ],
      },
      {
        titleKey: 'nav.doors',
        links: [
          { labelKey: 'nav.mesh_gates', href: '#' },
        ],
      },
      {
        titleKey: 'nav.cattle_equipment',
        links: [
          { labelKey: 'nav.gates_cattle', href: '#' },
          { labelKey: 'nav.canadian_steps', href: '#' },
          { labelKey: 'nav.hopper', href: '#' },
        ],
      },
    ],
  },
  {
    labelKey: 'nav.tutorials',
    links: [
      { labelKey: 'nav.tut_panel', href: '#' },
      { labelKey: 'nav.tut_chain', href: '#' },
      { labelKey: 'nav.tut_construction', href: '#' },
      { labelKey: 'nav.tut_security', href: '#' },
      { labelKey: 'nav.tut_fire', href: '#' },
      { labelKey: 'nav.tut_sliding', href: '#' },
      { labelKey: 'nav.tut_perforated', href: '#' },
      { labelKey: 'nav.tut_tramex', href: '#' },
    ],
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const CLOSE_TIMEOUT = 150;

// ─── Component ───────────────────────────────────────────────────────────────

interface HeaderProps {
  onCartClick?: () => void;
  onTrackingClick?: () => void;
}

export default function Header({ onCartClick, onTrackingClick }: HeaderProps) {
  const { t } = useI18n();
  const cartTotal = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCartClick = useCallback(() => {
    openCart();
    onCartClick?.();
  }, [openCart, onCartClick]);

  // ── Scroll listener ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMouseEnter = useCallback((labelKey: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setActiveDropdown(labelKey);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), CLOSE_TIMEOUT);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  const toggleMobileAccordion = useCallback((labelKey: string) => {
    setMobileAccordion((prev) => (prev === labelKey ? null : labelKey));
  }, []);

  // ── Render helpers ─────────────────────────────────────────────────────

  const renderMegaDropdown = (item: MegaMenuData) => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-5xl bg-white border border-gray-100 shadow-2xl rounded-b-lg z-50 pt-2 pb-6 px-6"
      onMouseEnter={() => handleMouseEnter(item.labelKey)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {item.columns.map((col) => (
          <div key={col.titleKey}>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#ea6663] mb-3">
              {t(col.titleKey)}
            </h4>
            <ul className="space-y-1.5">
              {col.links.map((link) => (
                <li key={link.labelKey}>
                  <a href={link.href} className="block text-sm text-gray-600 hover:text-[#ea6663] transition-colors duration-150 py-0.5">
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSimpleDropdown = (item: SimpleDropdownData) => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full w-56 bg-white border border-gray-100 shadow-2xl rounded-b-lg z-50 py-3"
      onMouseEnter={() => handleMouseEnter(item.labelKey)}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="space-y-0.5">
        {item.links.map((link) => (
          <li key={link.labelKey}>
            <a href={link.href} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#ea6663] hover:bg-red-50/50 transition-colors duration-150 rounded">
              {t(link.labelKey)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderMobileAccordion = (item: NavItem) => {
    const isOpen = mobileAccordion === item.labelKey;
    const megaItem = isMegaMenu(item) ? item : null;
    const simpleItem = !isMegaMenu(item) ? item : null;

    return (
      <div className="border-b border-gray-100">
        <button
          onClick={() => toggleMobileAccordion(item.labelKey)}
          className="flex items-center justify-between w-full px-5 py-3.5 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        >
          <span>{t(item.labelKey)}</span>
          <ChevronRight size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {megaItem && (
            <div className="px-5 pb-4">
              <div className="grid grid-cols-1 gap-4">
                {megaItem.columns.map((col) => (
                  <div key={col.titleKey}>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#ea6663] mb-2">{t(col.titleKey)}</p>
                    <ul className="space-y-1">
                      {col.links.map((link) => (
                        <li key={link.labelKey}>
                          <a href={link.href} onClick={closeMobile} className="block py-1.5 pl-3 text-sm text-gray-600 hover:text-[#ea6663] transition-colors">
                            {t(link.labelKey)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          {simpleItem && (
            <div className="px-5 pb-4">
              <ul className="space-y-0.5">
                {simpleItem.links.map((link) => (
                  <li key={link.labelKey}>
                    <a href={link.href} onClick={closeMobile} className="block py-2 pl-3 text-sm text-gray-600 hover:text-[#ea6663] transition-colors">
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── Main render ────────────────────────────────────────────────────────

  return (
    <>
      <header className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Image
              src="https://securfix.pt/cdn/shop/files/logo_securfix_250x@2x.png?v=1613722450"
              alt="Securfix"
              width={140}
              height={40}
              className="h-8 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              unoptimized
              priority
            />
          </a>

          {/* Right side – desktop */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <button aria-label={t('header.search')} className="p-2 text-gray-500 hover:text-[#ea6663] transition-colors rounded-full hover:bg-gray-100">
              <Search size={20} />
            </button>
            <button
              aria-label={t('header.account')}
              onClick={onTrackingClick}
              className="p-2 text-gray-500 hover:text-[#ea6663] transition-colors rounded-full hover:bg-gray-100"
            >
              <User size={20} />
            </button>
            <button
              onClick={handleCartClick}
              aria-label={t('header.cart')}
              className="relative p-2 text-gray-500 hover:text-[#ea6663] transition-colors rounded-full hover:bg-gray-100"
            >
              <ShoppingCart size={20} />
              {cartTotal > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] bg-[#ea6663] text-white text-[10px] font-bold rounded-full leading-none px-1">
                  {cartTotal}
                </span>
              )}
            </button>
            <a
              href="tel:+351300528280"
              className="flex items-center gap-2 ml-1 pl-3 border-l border-gray-200 text-gray-700 hover:text-[#ea6663] transition-colors group"
            >
              <Phone size={18} className="group-hover:animate-pulse" />
              <span className="text-sm font-semibold tracking-wide hidden lg:inline">(+351) 300 528 280</span>
            </a>
          </div>

          {/* Right side – mobile */}
          <div className="flex md:hidden items-center gap-1.5">
            <LanguageSwitcher />
            <a href="tel:+351300528280" className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] transition-colors" aria-label={t('contact.call')}>
              <Phone size={20} />
            </a>
            <button
              onClick={handleCartClick}
              aria-label={t('header.cart')}
              className="relative flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] transition-colors"
            >
              <ShoppingCart size={20} />
              {cartTotal > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-[16px] bg-[#ea6663] text-white text-[9px] font-bold rounded-full leading-none px-0.5">
                  {cartTotal}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={t('header.menu')}
              className="flex items-center justify-center p-2 text-gray-700 hover:text-[#ea6663] transition-colors rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Navigation bar (desktop) */}
        <nav className="hidden md:block border-t border-gray-100 bg-white">
          <ul className="flex items-center justify-center gap-0 px-4 lg:px-8 h-12">
            {NAV_ITEMS.map((item) => {
              const isActive = activeDropdown === item.labelKey;
              return (
                <li
                  key={item.labelKey}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(item.labelKey)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-4 lg:px-5 h-full text-[13px] font-semibold uppercase tracking-wider transition-colors duration-150 border-b-2 ${
                      isActive ? 'text-[#ea6663] border-[#ea6663]' : 'text-gray-700 border-transparent hover:text-[#ea6663] hover:border-[#ea6663]'
                    }`}
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                    onClick={() => setActiveDropdown(isActive ? null : item.labelKey)}
                    aria-expanded={isActive}
                    aria-haspopup="true"
                  >
                    {t(item.labelKey)}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`transition-all duration-200 ease-out ${isActive ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-2'}`}>
                    {isMegaMenu(item) ? renderMegaDropdown(item) : renderSimpleDropdown(item)}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeMobile} />
        <div className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
            <Image src="https://securfix.pt/cdn/shop/files/logo_securfix_250x@2x.png?v=1613722450" alt="Securfix" width={140} height={40} className="h-8 w-auto object-contain" unoptimized />
            <button onClick={closeMobile} aria-label={t('header.close')} className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] rounded-full hover:bg-gray-100 transition-colors">
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {NAV_ITEMS.map((item) => (
              <div key={item.labelKey}>{renderMobileAccordion(item)}</div>
            ))}
          </div>
          <div className="shrink-0 border-t border-gray-100 px-5 py-4 space-y-3">
            <a href="tel:+351300528280" className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-[#ea6663] transition-colors">
              <Phone size={18} />
              (+351) 300 528 280
            </a>
            <div className="flex items-center gap-3 pt-1">
              <button onClick={onTrackingClick} aria-label={t('tracking.title')} className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] rounded-full hover:bg-gray-100 transition-colors">
                <Package size={18} />
              </button>
              <button aria-label={t('header.search')} className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] rounded-full hover:bg-gray-100 transition-colors">
                <Search size={18} />
              </button>
              <button aria-label={t('header.account')} className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] rounded-full hover:bg-gray-100 transition-colors">
                <User size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
