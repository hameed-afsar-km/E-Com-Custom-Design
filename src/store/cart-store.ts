import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  note?: string;
  variant?: string;
};

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((entry) => entry.id === item.id);
        if (existing) {
          set({
            items: get().items.map((entry) =>
              entry.id === item.id ? { ...entry, quantity: entry.quantity + item.quantity } : entry,
            ),
          });
          return;
        }
        set({ items: [...get().items, item] });
      },
      updateQuantity: (id, quantity) => {
        set({
          items: get().items
            .map((item) => (item.id === id ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0),
        });
      },
      removeItem: (id) => set({ items: get().items.filter((item) => item.id !== id) }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "kaisaa-cart",
    },
  ),
);
