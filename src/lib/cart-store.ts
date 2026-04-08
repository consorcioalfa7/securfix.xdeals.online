import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  quantity: number;
  category: string;
  image: string;
}

// ─── Shipping Logic ─────────────────────────────────────────────────────────
// Free shipping above €100, otherwise €9.90
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST_BELOW = 9.90;

export function getShippingCost(subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_COST_BELOW;
}

export function getMissingForFreeShipping(subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return Math.round((FREE_SHIPPING_THRESHOLD - subtotal) * 100) / 100;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  shippingCost: () => number;
  grandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      totalItems: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((sum, i) => sum + i.salePrice * i.quantity, 0);
      },

      shippingCost: () => {
        return getShippingCost(get().totalPrice());
      },

      grandTotal: () => {
        const subtotal = get().totalPrice();
        const shipping = getShippingCost(subtotal);
        return Math.round((subtotal + shipping) * 100) / 100;
      },
    }),
    {
      name: 'securfix-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
