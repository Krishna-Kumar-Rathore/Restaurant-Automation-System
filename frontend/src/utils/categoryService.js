import api from './api'

const categoryService = {
  getCategories: async () => {
    const response = await api.get('/category')
    return response.data
  },

  // Admin functions
  createCategory: async (categoryData) => {
    const response = await api.post('/category', categoryData)
    return response.data
  },

  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/category/${id}`, categoryData)
    return response.data
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/category/${id}`)
    return response.data
  }
}

export default categoryService