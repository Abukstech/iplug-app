import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: any[];
  cartItemsCount: number;
  addToCart: (item: any) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      cartItemsCount: 0,
      addToCart: (item) =>
        set((state) => ({
          items: [...state.items, item],
          cartItemsCount: state.cartItemsCount + 1,
        })),
      removeFromCart: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
          cartItemsCount: state.cartItemsCount - 1,
        })),
      clearCart: () =>
        set({
          items: [],
          cartItemsCount: 0,
        }),
    }),
    {
      name: 'cart-storage',
    }
  )
);