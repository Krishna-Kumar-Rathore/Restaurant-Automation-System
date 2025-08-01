import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../../utils/cartService'

// Get cart
export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.getCart()
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// Add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (itemData, { rejectWithValue }) => {
    try {
      return await cartService.addToCart(itemData)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// Update cart item
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async (itemData, { rejectWithValue }) => {
    try {
      return await cartService.updateCartItem(itemData)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// Remove from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (foodId, { rejectWithValue }) => {
    try {
      return await cartService.removeFromCart(foodId)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// Clear cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.clearCart()
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const initialState = {
  items: [],
  totalAmount: 0,
  itemCount: 0,
  isLoading: false,
  isError: false,
  message: ''
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.items
        state.totalAmount = action.payload.totalAmount
        state.itemCount = action.payload.items.reduce((total, item) => total + item.quantity, 0)
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.totalAmount = action.payload.totalAmount
        state.itemCount = action.payload.items.reduce((total, item) => total + item.quantity, 0)
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.totalAmount = action.payload.totalAmount
        state.itemCount = action.payload.items.reduce((total, item) => total + item.quantity, 0)
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.totalAmount = action.payload.totalAmount
        state.itemCount = action.payload.items.reduce((total, item) => total + item.quantity, 0)
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = []
        state.totalAmount = 0
        state.itemCount = 0
      })
  },
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer