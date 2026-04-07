'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  MessageCircle,
  Search,
  ShoppingCart,
  User,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

interface MegaColumn {
  title: string;
  links: NavLink[];
}

interface MegaMenuData {
  label: string;
  columns: MegaColumn[];
}

interface SimpleDropdownData {
  label: string;
  links: NavLink[];
}

type NavItem = MegaMenuData | SimpleDropdownData;

function isMegaMenu(item: NavItem): item is MegaMenuData {
  return 'columns' in item && Array.isArray(item.columns);
}

// ─── Navigation Data ─────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Vedação Residencial',
    columns: [
      {
        title: 'Vedações',
        links: [
          { label: 'Painel de Vedação', href: '#' },
          { label: 'Rede Malha Solta', href: '#' },
          { label: 'Grades', href: '#' },
          { label: 'Jardim e Ocultação', href: '#' },
        ],
      },
      {
        title: 'Acessórios',
        links: [
          { label: 'Painel de Vedação', href: '#' },
          { label: 'Acessórios Rede Malha Solta', href: '#' },
          { label: 'Arame', href: '#' },
          { label: 'Varão Nervurado', href: '#' },
          { label: 'Tinta em Spray', href: '#' },
        ],
      },
      {
        title: 'Portas',
        links: [
          { label: 'Portões de Rede', href: '#' },
          { label: 'Portas de Ferro', href: '#' },
          { label: 'Portas Corta-Fogo', href: '#' },
          { label: 'Portas de Segurança', href: '#' },
          { label: 'Estrutura Porta de Correr', href: '#' },
          { label: 'Porta de Correr Sem Obra', href: '#' },
          { label: 'Porta de Serviço', href: '#' },
        ],
      },
      {
        title: 'Outros',
        links: [
          { label: 'Pergolado', href: '#' },
          { label: 'Escada', href: '#' },
          { label: 'Escada Retrátil', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Vedação Industrial',
    columns: [
      {
        title: 'Vedações',
        links: [
          { label: 'Painel de Vedação Hercules', href: '#' },
          { label: 'Rede Eletrossoldada', href: '#' },
          { label: 'Rede Malha Solta', href: '#' },
          { label: 'Painel de Obra', href: '#' },
          { label: 'Construção', href: '#' },
        ],
      },
      {
        title: 'Acessórios',
        links: [
          { label: 'Painel de Vedação', href: '#' },
          { label: 'Acessórios Rede Malha Solta', href: '#' },
          { label: 'Arame', href: '#' },
          { label: 'Varão Nervurado', href: '#' },
          { label: 'Tinta em Spray', href: '#' },
        ],
      },
      {
        title: 'Portas',
        links: [
          { label: 'Portões de Rede', href: '#' },
          { label: 'Portas Corta-Fogo', href: '#' },
          { label: 'Estrutura Porta de Correr', href: '#' },
          { label: 'Porta de Correr Sem Obra', href: '#' },
          { label: 'Porta de Serviço', href: '#' },
        ],
      },
      {
        title: 'Outros',
        links: [
          { label: 'Gradil Tramex', href: '#' },
          { label: 'Chapa Perfurada', href: '#' },
          { label: 'Escada', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Vedação Agrícola',
    columns: [
      {
        title: 'Vedações',
        links: [
          { label: 'Rede Ovelheira', href: '#' },
          { label: 'Rede Hexagonal', href: '#' },
          { label: 'Arame Farpado', href: '#' },
        ],
      },
      {
        title: 'Acessórios',
        links: [
          { label: 'Arame', href: '#' },
          { label: 'Varão Nervurado', href: '#' },
        ],
      },
      {
        title: 'Portas',
        links: [
          { label: 'Portões de Rede', href: '#' },
        ],
      },
      {
        title: 'Material Ganadero',
        links: [
          { label: 'Cancelas', href: '#' },
          { label: 'Passos Canadianos', href: '#' },
          { label: 'Tolva', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Tutoriais',
    links: [
      { label: 'Painel de Vedação', href: '#' },
      { label: 'Rede Malha Solta', href: '#' },
      { label: 'Painéis de Obra', href: '#' },
      { label: 'Portas de Segurança', href: '#' },
      { label: 'Portas Corta-Fogo', href: '#' },
      { label: 'Estrutura Porta de Correr', href: '#' },
      { label: 'Chapa Perfurada', href: '#' },
      { label: 'Tramex', href: '#' },
    ],
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIMARY = '#ea6663';
const PRIMARY_HOVER = '#d45654';
const CLOSE_TIMEOUT = 150;

// ─── Component ───────────────────────────────────────────────────────────────

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll listener ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // ── Dropdown hover helpers (desktop) ───────────────────────────────────
  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, CLOSE_TIMEOUT);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  const toggleMobileAccordion = useCallback((label: string) => {
    setMobileAccordion((prev) => (prev === label ? null : label));
  }, []);

  // ── Render helpers ─────────────────────────────────────────────────────

  /** Render a mega-menu dropdown (4-column layout) */
  const renderMegaDropdown = (item: MegaMenuData) => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-5xl bg-white border border-gray-100 shadow-2xl rounded-b-lg z-50 pt-2 pb-6 px-6"
      onMouseEnter={() => handleMouseEnter(item.label)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {item.columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#ea6663] mb-3">
              {col.title}
            </h4>
            <ul className="space-y-1.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block text-sm text-gray-600 hover:text-[#ea6663] transition-colors duration-150 py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  /** Render a simple dropdown (single-column, for Tutoriais) */
  const renderSimpleDropdown = (item: SimpleDropdownData) => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full w-56 bg-white border border-gray-100 shadow-2xl rounded-b-lg z-50 py-3"
      onMouseEnter={() => handleMouseEnter(item.label)}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="space-y-0.5">
        {item.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="block px-4 py-2 text-sm text-gray-600 hover:text-[#ea6663] hover:bg-red-50/50 transition-colors duration-150 rounded"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  /** Render mobile accordion for a nav item */
  const renderMobileAccordion = (item: NavItem) => {
    const isOpen = mobileAccordion === item.label;
    const megaItem = isMegaMenu(item) ? item : null;
    const simpleItem = !isMegaMenu(item) ? item : null;

    return (
      <div className="border-b border-gray-100">
        <button
          onClick={() => toggleMobileAccordion(item.label)}
          className="flex items-center justify-between w-full px-5 py-3.5 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        >
          <span>{item.label}</span>
          <ChevronRight
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-90' : ''
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {megaItem && (
            <div className="px-5 pb-4">
              <div className="grid grid-cols-1 gap-4">
                {megaItem.columns.map((col) => (
                  <div key={col.title}>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#ea6663] mb-2">
                      {col.title}
                    </p>
                    <ul className="space-y-1">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={closeMobile}
                            className="block py-1.5 pl-3 text-sm text-gray-600 hover:text-[#ea6663] transition-colors"
                          >
                            {link.label}
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
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="block py-2 pl-3 text-sm text-gray-600 hover:text-[#ea6663] transition-colors"
                    >
                      {link.label}
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
      {/* ═══ HEADER ═══ */}
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        {/* ── Top bar (logo + phone) ─────────────────────────────────── */}
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
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <button
              aria-label="Pesquisar"
              className="p-2 text-gray-500 hover:text-[#ea6663] transition-colors rounded-full hover:bg-gray-100"
            >
              <Search size={20} />
            </button>

            {/* User */}
            <button
              aria-label="Minha conta"
              className="p-2 text-gray-500 hover:text-[#ea6663] transition-colors rounded-full hover:bg-gray-100"
            >
              <User size={20} />
            </button>

            {/* Cart */}
            <button
              aria-label="Carrinho"
              className="relative p-2 text-gray-500 hover:text-[#ea6663] transition-colors rounded-full hover:bg-gray-100"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4.5 h-4.5 bg-[#ea6663] text-white text-[10px] font-bold rounded-full leading-none">
                0
              </span>
            </button>

            {/* Phone */}
            <a
              href="tel:+351300528280"
              className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-200 text-gray-700 hover:text-[#ea6663] transition-colors group"
            >
              <Phone size={18} className="group-hover:animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">
                (+351) 300 528 280
              </span>
            </a>
          </div>

          {/* Right side – mobile (hamburger + phone) */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+351300528280"
              className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] transition-colors"
              aria-label="Ligar"
            >
              <Phone size={20} />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
              className="flex items-center justify-center p-2 text-gray-700 hover:text-[#ea6663] transition-colors rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ── Navigation bar (desktop) ────────────────────────────────── */}
        <nav className="hidden md:block border-t border-gray-100 bg-white">
          <ul className="flex items-center justify-center gap-0 px-4 lg:px-8 h-12">
            {NAV_ITEMS.map((item) => {
              const isActive = activeDropdown === item.label;
              return (
                <li
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-4 lg:px-5 h-full text-[13px] font-semibold uppercase tracking-wider transition-colors duration-150 border-b-2 ${
                      isActive
                        ? 'text-[#ea6663] border-[#ea6663]'
                        : 'text-gray-700 border-transparent hover:text-[#ea6663] hover:border-[#ea6663]'
                    }`}
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                    onClick={() =>
                      setActiveDropdown(isActive ? null : item.label)
                    }
                    aria-expanded={isActive}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        isActive ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`transition-all duration-200 ease-out ${
                      isActive
                        ? 'pointer-events-auto opacity-100 translate-y-0'
                        : 'pointer-events-none opacity-0 -translate-y-2'
                    }`}
                  >
                    {isMegaMenu(item)
                      ? renderMegaDropdown(item)
                      : renderSimpleDropdown(item)}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* ═══ MOBILE MENU OVERLAY ═══ */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobile}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile panel header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2">
              <Image
                src="https://securfix.pt/cdn/shop/files/logo_securfix_250x@2x.png?v=1613722450"
                alt="Securfix"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </div>
            <button
              onClick={closeMobile}
              aria-label="Fechar menu"
              className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Mobile nav items */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {renderMobileAccordion(item)}
              </div>
            ))}
          </div>

          {/* Mobile panel footer */}
          <div className="shrink-0 border-t border-gray-100 px-5 py-4 space-y-3">
            <a
              href="tel:+351300528280"
              className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-[#ea6663] transition-colors"
            >
              <Phone size={18} />
              (+351) 300 528 280
            </a>
            <div className="flex items-center gap-3 pt-1">
              <button
                aria-label="Pesquisar"
                className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] rounded-full hover:bg-gray-100 transition-colors"
              >
                <Search size={18} />
              </button>
              <button
                aria-label="Minha conta"
                className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] rounded-full hover:bg-gray-100 transition-colors"
              >
                <User size={18} />
              </button>
              <button
                aria-label="Carrinho"
                className="flex items-center justify-center p-2 text-gray-500 hover:text-[#ea6663] rounded-full hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ WHATSAPP FLOATING BUTTON ═══ */}
      <a
        href="#"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        style={{ backgroundColor: '#25D366' }}
      >
        <MessageCircle size={26} className="text-white" fill="white" />
      </a>
    </>
  );
}
