// src/utils/api.js
import axios from 'axios'

const localDevApiUrl = 'http://localhost:5000/api'
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const API_URL = configuredApiUrl || (import.meta.env.DEV ? localDevApiUrl : '/api')

const api = axios.create({
  baseURL: API_URL.replace(/\/+$/, ''),
})

// Request interceptor to add user ID
api.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      config.headers['user-id'] = userId
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle user not found
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userId')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api