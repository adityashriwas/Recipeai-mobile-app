import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

const memoryStorage = new Map<string, string>();

const cartStorage: StateStorage = {
  getItem: async name => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.warn(
        'AsyncStorage unavailable, using memory cart storage.',
        error,
      );
      return memoryStorage.get(name) ?? null;
    }
  },
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.warn(
        'AsyncStorage unavailable, using memory cart storage.',
        error,
      );
      memoryStorage.set(name, value);
    }
  },
  removeItem: async name => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.warn(
        'AsyncStorage unavailable, using memory cart storage.',
        error,
      );
      memoryStorage.delete(name);
    }
  },
};

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addItem: (newItem: Omit<CartItem, 'quantity'>) => {
        set((state: CartState) => {
          const existingItem = state?.items.find(
            item => item.id === newItem.id,
          );
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === newItem?.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        });
      },

      updateQuantity: (id: string, delta: number) => {
        set((state: CartState) => {
          const item = state.items.find((i: any) => i.id === id);
          if (!item) return state;
          const newQuantity = Math.max(0, item.quantity + delta);
          if (newQuantity === 0) {
            return { items: state.items.filter(i => i.id !== id) };
          }
          return {
            items: state.items.map(i =>
              i.id === id ? { ...i, quantity: newQuantity } : i,
            ),
          };
        });
      },

      removeItem: (id: string) => {
        set((state: CartState) => ({
          items: state.items.filter((item: any) => item.id !== id),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => cartStorage),
    },
  ),
);
