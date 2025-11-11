import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/cartItem";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload }: PayloadAction<CartItem>) {
      const found = state.items.find(i => i.id === payload.id);
      if (found) { found.quantity += payload.quantity; }
      else { state.items.push(payload); }
    },
    removeItem(state, { payload }: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== payload);
    },
    changeQuantity(state, { payload }: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find(i => i.id === payload.id);
      if (item) item.quantity = Math.max(0, payload.quantity);
      state.items = state.items.filter(i => i.quantity > 0);
    },
    clearCart(state) { state.items = []; },
  },
});

export const { addItem, removeItem, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
