import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CartItem {
  id: string;
  title: string;
  img: string | null;
  price: number;
  optionTitle?: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  clearCart: () => void;
  getCartQuantity: () => number;
  getCartTotal: () => number;
}

export const useCart = create<CartState>()(
  devtools((set, get) => ({
    cart: [],
    addToCart: (product) => {
      const foundItem = get().cart.find((item) => item.id === product.id);
      if (foundItem) {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === foundItem.id ? product : item
          ),
        }));
      } else {
        set((state) => ({ cart: [...state.cart, product] }));
      }
    },
    removeFromCart: (product) => {
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== product.id),
      }));
    },
    clearCart: () => set({ cart: [] }),
    getCartQuantity: () =>
      get().cart.reduce((accum, curr) => accum + curr.quantity, 0),
    getCartTotal: () =>
      get().cart.reduce((accum, curr) => accum + curr.price * curr.quantity, 0),
  }))
);
