// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],         // each: { id, name, price, image, quantity, totalPrice }
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
        existing.totalPrice = existing.quantity * existing.price;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount += item.price;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existing = state.items.find(i => i.id === id);
      if (!existing) return;

      existing.quantity -= 1;
      existing.totalPrice = existing.quantity * existing.price;
      state.totalQuantity -= 1;
      state.totalAmount -= existing.price;

      if (existing.quantity === 0) {
        state.items = state.items.filter(i => i.id !== id);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
