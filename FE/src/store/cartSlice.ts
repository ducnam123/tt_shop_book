// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      const newItem: any = action.payload;
      const existingItem: any = state.cartItems.find(
        (item: any) => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },

    Increase: (state, action): any => ({
      ...state,
      cartItems: state.cartItems.map((item: any) => {
        if (item._id === action.payload._id) {
          const newQuantity = item.quantity + 1;
          const newTotalPrice = newQuantity * item.price;
          return { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
        }
        return item;
      }),
    }),

    Decrease: (state, action): any => ({
      ...state,
      cartItems: state.cartItems.map((item: any) => {
        return item._id === action.payload._id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
              totalPrice: Math.max(
                item.price,
                (item.quantity - 1) * item.price
              ),
            }
          : item;
      }),
    }),

    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item: any) => item._id !== productIdToRemove
      );
    },
    updateCartItem: (state, action) => {
      const { _id, quantity } = action.payload;
      const cartItem = state.cartItems.find((item: any) => item._id === _id);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  Increase,
  Decrease,
} = cartSlice.actions;

export default cartSlice.reducer;
