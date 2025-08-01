import api from './api'

const foodService = {
  getFoods: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await api.get(`/food?${queryString}`)
    return response.data
  },

  getFoodById: async (id) => {
    const response = await api.get(`/food/${id}`)
    return response.data
  },

  searchFoods: async (searchTerm) => {
    const response = await api.get(`/food?search=${searchTerm}`)
    return response.data
  },

  getFoodsByCategory: async (categoryId) => {
    const response = await api.get(`/food/category/${categoryId}`)
    return response.data
  },

  // Admin functions
  createFood: async (foodData) => {
    const response = await api.post('/food', foodData)
    return response.data
  },

  updateFood: async (id, foodData) => {
    const response = await api.put(`/food/${id}`, foodData)
    return response.data
  },

  deleteFood: async (id) => {
    const response = await api.delete(`/food/${id}`)
    return response.data
  }
}

export default foodService