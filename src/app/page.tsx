'use client';

import { useState, useCallback } from 'react';
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
import CheckoutModal from '@/components/CheckoutModal';
import OrderTrackingModal from '@/components/OrderTrackingModal';
import FooterPageModal from '@/components/FooterPageModal';
import ChatWidget from '@/components/ChatWidget';

function AppContent() {
  const { t } = useI18n();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const closeCart = useCartStore((s) => s.closeCart);

  const totalPrice = items.reduce((sum, i) => sum + i.salePrice * i.quantity, 0);

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutKey, setCheckoutKey] = useState(0);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [footerPageOpen, setFooterPageOpen] = useState(false);
  const [footerPageKey, setFooterPageKey] = useState('');
  const [footerPageTitle, setFooterPageTitle] = useState('');
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const handleCheckout = useCallback(() => {
    closeCart();
    setCheckoutKey((k) => k + 1);
    setCheckoutOpen(true);
  }, [closeCart]);

  const handleExpressCheckout = useCallback(() => {
    closeCart();
    setCheckoutKey((k) => k + 1);
    setCheckoutOpen(true);
  }, [closeCart]);

  const handlePaymentSuccess = useCallback((orderId?: string) => {
    setCheckoutOpen(false);
    if (orderId) setLastOrderId(orderId);
    clearCart();
    setTrackingOpen(true);
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
      <CartDrawer onCheckout={handleCheckout} onExpressCheckout={handleExpressCheckout} />
      <CheckoutModal
        key={checkoutKey}
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={items.map(i => ({ name: i.name, quantity: i.quantity, price: i.salePrice }))}
        totalAmount={totalPrice}
        onPaymentSuccess={handlePaymentSuccess}
      />
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
