// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import foodSlice from './slices/foodSlice'
import cartSlice from './slices/cartSlice'
import orderSlice from './slices/orderSlice'
import categorySlice from './slices/categorySlice'
import adminSlice from './slices/adminSlice'  // Make sure this import exists

export const store = configureStore({
  reducer: {
    auth: authSlice,
    food: foodSlice,
    cart: cartSlice,
    order: orderSlice,
    category: categorySlice,
    admin: adminSlice,  // Make sure this is included
  },
})