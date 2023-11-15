// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productIdToRemove
      );
    },
    updateCartItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const cartItem = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
