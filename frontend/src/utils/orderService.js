import api from './api'

const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders/create', orderData)
    return response.data
  },

  getUserOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await api.get(`/orders/my-orders?${queryString}`)
    return response.data
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },

  cancelOrder: async (id) => {
    const response = await api.put(`/orders/${id}/cancel`)
    return response.data
  },

  // Admin functions
  getAllOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await api.get(`/orders/admin/all?${queryString}`)
    return response.data
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/admin/${id}/status`, { status })
    return response.data
  },

  updatePaymentStatus: async (id, paymentStatus) => {
    const response = await api.put(`/orders/admin/${id}/payment`, { paymentStatus })
    return response.data
  }
}

export default orderService