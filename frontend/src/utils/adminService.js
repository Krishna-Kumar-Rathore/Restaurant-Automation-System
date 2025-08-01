import api from './api'

const adminService = {
  getDashboardData: async () => {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  getUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await api.get(`/admin/users?${queryString}`)
    return response.data
  },

  getSalesReport: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await api.get(`/admin/sales-report?${queryString}`)
    return response.data
  },

  getFoodPerformance: async () => {
    const response = await api.get('/admin/food-performance')
    return response.data
  }
}

export default adminService