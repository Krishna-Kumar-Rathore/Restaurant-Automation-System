// src/redux/slices/authSlice.js (Updated - No JWT)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../utils/authService'

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message)
    }
  }
)

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.login(userData)
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message)
    }
  }
)

// Get current user
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getCurrentUser()
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message)
    }
  }
)

const initialState = {
  user: null,
  userId: localStorage.getItem('userId'),
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    logout: (state) => {
      localStorage.removeItem('userId')
      state.user = null
      state.userId = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.userId = action.payload.user.id
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.userId = action.payload.user.id
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user
      })
  },
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer