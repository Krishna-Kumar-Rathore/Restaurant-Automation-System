import api from './api'

const cartService = {
  getCart: async () => {
    const response = await api.get('/cart')
    return response.data
  },

  addToCart: async (itemData) => {
    const response = await api.post('/cart/add', itemData)
    return response.data
  },

  updateCartItem: async (itemData) => {
    const response = await api.put('/cart/update', itemData)
    return response.data
  },

  removeFromCart: async (foodId) => {
    const response = await api.delete(`/cart/remove/${foodId}`)
    return response.data
  },

  clearCart: async () => {
    const response = await api.delete('/cart/clear')
    return response.data
  }
}

export default cartService