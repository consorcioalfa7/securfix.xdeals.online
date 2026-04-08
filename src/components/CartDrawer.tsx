'use client';

import Image from 'next/image';
import { Package, X, Minus, Plus, ArrowLeft, ShoppingBag, Truck, Gift } from 'lucide-react';
import { useCartStore, getMissingForFreeShipping } from '@/lib/cart-store';
import { useI18n } from '@/lib/i18n-context';
import { VisaIconCompact, MastercardIconCompact } from '@/components/PaymentIcons';

interface CartDrawerProps {
  onCheckout?: () => void;
  onExpressCheckout?: () => void;
}

export default function CartDrawer({ onCheckout, onExpressCheckout }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice, shippingCost, grandTotal } = useCartStore();
  const { t, formatCurrency } = useI18n();

  const subtotal = totalPrice();
  const shipping = shippingCost();
  const total = grandTotal();
  const count = totalItems();
  const missing = getMissingForFreeShipping(subtotal);
  const hasFreeShipping = missing === 0 && items.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 flex w-full sm:max-w-md flex-col bg-white shadow-2xl"
        style={{ transform: 'translateX(0)' }}
        role="dialog"
        aria-modal="true"
        aria-label={t('cart.title')}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#ea6663]" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900">{t('cart.title')}</h2>
            <span className="rounded-full bg-[#ea6663] px-2 py-0.5 text-xs font-bold text-white">
              {count}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={closeCart}
              className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label={t('cart.continue_shopping')}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{t('cart.continue_shopping')}</span>
            </button>
            <button
              onClick={closeCart}
              className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label={t('general.close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gray-100">
              <Package className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300" />
            </div>
            <div className="text-center">
              <p className="text-base sm:text-lg font-semibold text-gray-900">{t('cart.empty')}</p>
              <p className="mt-1 text-sm text-gray-500">{t('cart.empty_text')}</p>
            </div>
            <button
              onClick={closeCart}
              className="mt-4 flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('cart.continue_shopping')}
            </button>
          </div>
        ) : (
          <>
            {/* Free shipping progress bar */}
            {hasFreeShipping ? (
              <div className="mx-4 sm:mx-6 mt-3 sm:mt-4 rounded-lg bg-green-50 border border-green-200 px-3 py-2.5 sm:px-4 flex items-center gap-2.5 shrink-0">
                <Gift className="h-5 w-5 text-green-600 shrink-0" />
                <p className="text-sm font-medium text-green-700">{t('cart.free_shipping_achieved')}</p>
              </div>
            ) : (
              <div className="mx-4 sm:mx-6 mt-3 sm:mt-4 rounded-lg bg-orange-50 border border-orange-200 px-3 py-2.5 sm:px-4 shrink-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Truck className="h-4 w-4 text-orange-600 shrink-0" />
                  <p className="text-xs sm:text-sm font-medium text-orange-700">
                    {t('cart.free_shipping_progress').replace('{amount}', formatCurrency(missing))}
                  </p>
                </div>
                <div className="w-full h-1.5 bg-orange-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ea6663] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 overscroll-contain">
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2.5 sm:gap-3 rounded-lg border border-gray-100 bg-white p-2.5 sm:p-3 shadow-sm"
                  >
                    {/* Image */}
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-1.5">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex-shrink-0 rounded-md p-1 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label={t('cart.remove')}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-0.5">
                        <p className="text-[10px] sm:text-xs text-gray-400 line-through">
                          {formatCurrency(item.originalPrice)}
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">
                          {formatCurrency(item.salePrice)}
                        </p>
                      </div>

                      <div className="mt-1 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center rounded-md border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-l-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex h-6 w-7 sm:h-7 sm:w-8 items-center justify-center border-x border-gray-200 text-[11px] sm:text-xs font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-r-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-gray-900">
                          {formatCurrency(item.salePrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with totals */}
            <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6 sm:py-4 shrink-0">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{t('cart.subtotal')}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" />
                    {t('cart.shipping')}
                  </span>
                  <span className={`font-medium ${hasFreeShipping ? 'text-green-600' : 'text-gray-900'}`}>
                    {hasFreeShipping ? t('cart.free_shipping') : formatCurrency(shipping)}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400">{t('cart.vat')}</p>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                  <span className="text-base sm:text-lg font-bold text-gray-900">{t('cart.total')}</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 space-y-2">
                <button
                  onClick={onCheckout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 sm:py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {t('cart.checkout')}
                </button>
                <button
                  onClick={onExpressCheckout}
                  className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#ea6663] px-4 py-2.5 sm:py-3 text-sm font-bold text-white transition-colors hover:bg-[#d94f4c]"
                >
                  <div className="flex items-center gap-1">
                    <VisaIconCompact className="h-5 w-auto" />
                    <MastercardIconCompact className="h-5 w-auto" />
                  </div>
                  {t('cart.express_checkout')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
