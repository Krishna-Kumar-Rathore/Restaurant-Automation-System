// src/utils/authService.js (Simplified - No JWT)
import api from './api'

const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    if (response.data.user) {
      localStorage.setItem('userId', response.data.user.id)
    }
    return response.data
  },

  login: async (userData) => {
    const response = await api.post('/auth/login', userData)
    if (response.data.user) {
      localStorage.setItem('userId', response.data.user.id)
    }
    return response.data
  },

  logout: () => {
    localStorage.removeItem('userId')
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData)
    return response.data
  }
}

export default authService