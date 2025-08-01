// src/redux/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from '../../utils/adminService'

// Get dashboard data
export const getDashboardData = createAsyncThunk(
  'admin/getDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      return await adminService.getDashboardData()
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const initialState = {
  dashboardData: null,
  isLoading: false,
  isError: false,
  message: ''
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.isLoading = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false
        state.dashboardData = action.payload
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetAdmin } = adminSlice.actions
export default adminSlice.reducer