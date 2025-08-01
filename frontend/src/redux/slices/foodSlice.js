import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import foodService from '../../utils/foodService'

// Get all foods
export const getFoods = createAsyncThunk(
  'food/getFoods',
  async (params, { rejectWithValue }) => {
    try {
      return await foodService.getFoods(params)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// Get food by ID
export const getFoodById = createAsyncThunk(
  'food/getFoodById',
  async (id, { rejectWithValue }) => {
    try {
      return await foodService.getFoodById(id)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

// Search foods
export const searchFoods = createAsyncThunk(
  'food/searchFoods',
  async (searchTerm, { rejectWithValue }) => {
    try {
      return await foodService.searchFoods(searchTerm)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

const initialState = {
  foods: [],
  currentFood: null,
  totalPages: 1,
  currentPage: 1,
  total: 0,
  isLoading: false,
  isError: false,
  message: ''
}

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.message = ''
    },
    clearCurrentFood: (state) => {
      state.currentFood = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFoods.fulfilled, (state, action) => {
        state.isLoading = false
        state.foods = action.payload.foods
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
        state.total = action.payload.total
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFoodById.fulfilled, (state, action) => {
        state.currentFood = action.payload
      })
      .addCase(searchFoods.fulfilled, (state, action) => {
        state.foods = action.payload.foods
      })
  },
})

export const { reset, clearCurrentFood } = foodSlice.actions
export default foodSlice.reducer