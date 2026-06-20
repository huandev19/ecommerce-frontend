import { create } from 'zustand';
import { Product } from '@v8n/types';

export interface CartItem {
  product: Product;
  variantId?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variantId?: string, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, variantId, quantity = 1) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.variantId === variantId
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { items: updatedItems };
      }

      return { items: [...state.items, { product, variantId, quantity }] };
    });
  },

  removeItem: (productId, variantId) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.product.id === productId && item.variantId === variantId)
      ),
    }));
  },

  updateQuantity: (productId, variantId, quantity) => {
    set((state) => ({
      items: state.items.map((item) => {
        if (item.product.id === productId && item.variantId === variantId) {
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      }),
    }));
  },

  clearCart: () => set({ items: [] }),

  cartTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      const price = item.variantId 
        ? item.product.variants?.find((v) => v.id === item.variantId)?.price ?? item.product.price
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  },

  itemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}));
