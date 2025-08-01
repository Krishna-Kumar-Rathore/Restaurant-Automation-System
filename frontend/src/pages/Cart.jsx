import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { getCart, updateCartItem, removeFromCart, clearCart } from '../redux/slices/cartSlice'
import { formatCurrency } from '../utils/formatters'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalAmount, isLoading } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  const handleUpdateQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(foodId)
      return
    }

    dispatch(updateCartItem({ foodId, quantity }))
      .unwrap()
      .catch((error) => {
        toast.error(error)
      })
  }

  const handleRemoveItem = (foodId) => {
    dispatch(removeFromCart(foodId))
      .unwrap()
      .then(() => {
        toast.success('Item removed from cart')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart())
        .unwrap()
        .then(() => {
          toast.success('Cart cleared')
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    navigate('/checkout')
  }

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="text-center py-12">
          <FiShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to your cart</p>
          <Link to="/menu" className="btn-primary">
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.food._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={item.food.image}
                  alt={item.food.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.food.name}
                  </h3>
                  <p className="text-gray-600">{formatCurrency(item.price)}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    item.food.isVegetarian ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.food.isVegetarian ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleUpdateQuantity(item.food._id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  >
                    <FiMinus className="h-4 w-4" />
                  </button>
                  
                  <span className="text-lg font-semibold min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleUpdateQuantity(item.food._id, item.quantity + 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.food._id)}
                    className="text-red-600 hover:text-red-700 mt-2"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({items.length})</span>
                <span className="font-semibold">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary text-lg py-3"
            >
              Proceed to Checkout
            </button>
            
            <Link
              to="/menu"
              className="block text-center text-primary-600 hover:text-primary-700 mt-4 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart