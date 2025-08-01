// src/pages/MyOrders.jsx (Updated - Show Only Confirmed Status)
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiEye, FiPackage } from 'react-icons/fi'
import { getUserOrders } from '../redux/slices/orderSlice'
import { formatCurrency, formatDate } from '../utils/formatters'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'

const MyOrders = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  
  const { orders, totalPages, isLoading } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getUserOrders({ page: currentPage, limit: 10 }))
  }, [dispatch, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Function to get status display (only show confirmed or cancelled)
  const getStatusDisplay = (status) => {
    if (status === 'cancelled') {
      return {
        text: 'Cancelled',
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

  if (orders.length === 0) {
    return (
      <div className="page-container">
        <div className="py-12 text-center">
          <FiPackage className="w-24 h-24 mx-auto mb-4 text-gray-300" />
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">No orders yet</h2>
          <p className="mb-6 text-gray-600">You haven't placed any orders</p>
          <Link to="/menu" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const statusDisplay = getStatusDisplay(order.status)
          
          return (
            <div key={order._id} className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-gray-600">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-4 space-x-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusDisplay.color}`}>
                      {statusDisplay.text}
                    </span>
                    <Link
                      to={`/order/${order._id}`}
                      className="flex items-center space-x-2 font-medium text-primary-600 hover:text-primary-700"
                    >
                      <FiEye className="w-4 h-4" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.food.image}
                            alt={item.food.name}
                            className="object-cover w-10 h-10 border-2 border-white rounded-full"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-600 bg-gray-200 border-2 border-white rounded-full">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.items.map(item => item.food.name).join(', ').length > 50
                            ? order.items.map(item => item.food.name).join(', ').substring(0, 50) + '...'
                            : order.items.map(item => item.food.name).join(', ')
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.paymentMethod.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default MyOrders