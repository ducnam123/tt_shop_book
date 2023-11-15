import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id + newItem.id)
      state.totalQuantity = state.totalQuantity + 1
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quatity: 1,
          totalPrice: newItem.price,
          name: newItem.name
        })
      }
    }
  }
})