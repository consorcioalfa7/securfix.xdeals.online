'use client';

import { useState, useCallback, useEffect } from 'react';
import { useI18n, I18nProvider } from '@/lib/i18n-context';
import { useCartStore } from '@/lib/cart-store';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CategoriesSection from '@/components/CategoriesSection';
import ProductsSection from '@/components/ProductsSection';
import ServicesSection from '@/components/ServicesSection';
import ProductCatalog from '@/components/ProductCatalog';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import OrderTrackingModal from '@/components/OrderTrackingModal';
import FooterPageModal from '@/components/FooterPageModal';
import ChatWidget from '@/components/ChatWidget';

function AppContent() {
  const { t } = useI18n();
  const clearCart = useCartStore((s) => s.clearCart);

  const [trackingOpen, setTrackingOpen] = useState(false);
  const [footerPageOpen, setFooterPageOpen] = useState(false);
  const [footerPageKey, setFooterPageKey] = useState('');
  const [footerPageTitle, setFooterPageTitle] = useState('');
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  // ── When Express Checkout starts, save order ID & clear cart ───────────────
  const handlePaymentRedirect = useCallback((orderId: string) => {
    setLastOrderId(orderId);
    // Don't clear cart yet — user might come back if payment fails
    // Cart will be cleared on payment success (via webhook or redirect param)
  }, []);

  // ── Handle payment success (2 channels) ─────────────────────────────────
  // Channel 1: Redirect query param (?payment=success)
  // Channel 2: postMessage from checkout.nexflowx.tech iframe/redirect

  useState(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      clearCart();
      const txId = params.get('tx') || '';
      if (txId) setLastOrderId(txId);
      setTrackingOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  });

  // Channel 2: NeXFlowX postMessage listener (strict origin check)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMessage = (event: MessageEvent) => {
      // CORRECT: Strict validation — only accept from checkout.nexflowx.tech
      if (event.origin !== 'https://checkout.nexflowx.tech') return;

      if (event.data && event.data.status === 'success') {
        console.log('Pagamento efetuado. ID da Transação:', event.data.txId);
        clearCart();
        const txId = event.data.txId || '';
        if (txId) setLastOrderId(txId);
        setTrackingOpen(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [clearCart]);

  const handleOpenFooterPage = useCallback((pageKey: string, title: string) => {
    setFooterPageKey(pageKey);
    setFooterPageTitle(title);
    setFooterPageOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        onCartClick={() => {}}
        onTrackingClick={() => setTrackingOpen(true)}
      />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <CategoriesSection />
        <ProductsSection />
        <ServicesSection />
        <ProductCatalog />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer onOpenPage={handleOpenFooterPage} />

      {/* ── Overlays ── */}
      <CartDrawer onPaymentRedirect={handlePaymentRedirect} />
      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        initialOrderId={lastOrderId || undefined}
      />
      <FooterPageModal
        isOpen={footerPageOpen}
        onClose={() => setFooterPageOpen(false)}
        pageKey={footerPageKey}
        title={footerPageTitle}
      />
      <ChatWidget />
    </div>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
