// src/pages/OrderDetail.jsx (Updated - Remove Status Progress)
import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowLeft, FiMapPin, FiPhone, FiClock } from 'react-icons/fi'
import { getOrderById } from '../redux/slices/orderSlice'
import { formatCurrency, formatDate } from '../utils/formatters'
import LoadingSpinner from '../components/LoadingSpinner'

const OrderDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  
  const { currentOrder: order, isLoading } = useSelector((state) => state.order)

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id))
    }
  }, [dispatch, id])

  // Function to get status display (only show confirmed or cancelled)
  const getStatusDisplay = (status) => {
    if (status === 'cancelled') {
      return {
        text: 'Order Cancelled',
        color: 'bg-red-100 text-red-800'
      }
    }
    // All other statuses show as "Order Confirmed"
    return {
      text: 'Order Confirmed',
      color: 'bg-green-100 text-green-800'
    }
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

  if (!order) {
    return (
      <div className="page-container">
        <div className="py-12 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">Order not found</h2>
          <Link to="/my-orders" className="text-primary-600 hover:text-primary-700">
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  const statusDisplay = getStatusDisplay(order.status)

  return (
    <div className="page-container">
      <div className="mb-6">
        <Link
          to="/my-orders"
          className="flex items-center mb-4 space-x-2 text-primary-600 hover:text-primary-700"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p className="mt-1 text-gray-600">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          
          <span className={`px-4 py-2 rounded-full text-sm font-medium mt-4 md:mt-0 inline-block ${statusDisplay.color}`}>
            {statusDisplay.text}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Order Items */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Confirmation Message (Replaces Status Progress) */}
          {order.status !== 'cancelled' && (
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-green-700">Order Confirmed!</h2>
                  <p className="text-green-600">Your order has been confirmed and will be prepared shortly.</p>
                </div>
              </div>
              
              {order.estimatedDeliveryTime && (
                <div className="p-3 mt-4 rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2">
                    <FiClock className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">
                      Estimated Delivery: {formatDate(order.estimatedDeliveryTime)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cancelled Order Message */}
          {order.status === 'cancelled' && (
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-red-700">Order Cancelled</h2>
                  <p className="text-red-600">This order has been cancelled.</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Order Items</h2>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.food._id} className="flex items-center p-4 space-x-4 border border-gray-200 rounded-lg">
                  <img
                    src={item.food.image}
                    alt={item.food.name}
                    className="object-cover w-16 h-16 rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.food.name}
                    </h3>
                    <p className="text-gray-600">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary & Details */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Payment Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatCurrency(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
              
              <div className="p-3 mt-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">
                  <strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Payment Status:</strong> {' '}
                  <span className={`font-medium ${
                    order.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Delivery Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 mt-1 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Delivery Address</p>
                  <p className="text-gray-600">{order.deliveryAddress}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Phone Number</p>
                  <p className="text-gray-600">{order.customerPhone}</p>
                </div>
              </div>
              
              {order.notes && (
                <div className="p-3 mt-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <p className="text-sm text-yellow-800">
                    <strong>Special Instructions:</strong> {order.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail