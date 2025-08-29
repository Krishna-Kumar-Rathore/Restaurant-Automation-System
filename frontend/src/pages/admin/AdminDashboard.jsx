// src/pages/admin/AdminDashboard.jsx (Updated - Show Confirmed Status)
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiEye } from 'react-icons/fi'
import { getDashboardData } from '../../redux/slices/adminSlice'
import { formatCurrency, formatDate } from '../../utils/formatters'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { dashboardData, isLoading } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getDashboardData())
  }, [dispatch])

  // Function to get status display for admin (only show confirmed or cancelled)
  const getAdminStatusDisplay = (status) => {
    if (status === 'cancelled') {
      return {
        text: 'Cancelled',
        color: 'bg-red-100 text-red-800'
      }
    }
    // All other statuses show as "Confirmed"
    return {
      text: 'Confirmed',
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

  const stats = dashboardData?.totalStats || {}
  const todayStats = dashboardData?.todayStats || {}
  const recentOrders = dashboardData?.recentOrders || []
  const popularFoods = dashboardData?.popularFoods || []

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your restaurant.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-gray-600 uppercase">
                Today's Orders
              </p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.orders || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-gray-600 uppercase">
                Today's Revenue
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(todayStats.revenue || 0)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiDollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-gray-600 uppercase">
                Total Customers
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.users || 0}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-gray-600 uppercase">
                Total Orders
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.orders || 0}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <FiTrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="font-medium text-primary-600 hover:text-primary-700"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentOrders.length === 0 ? (
              <p className="py-4 text-center text-gray-500">No recent orders</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => {
                  const statusDisplay = getAdminStatusDisplay(order.status)
                  
                  return (
                    <div key={order._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            #{order._id.slice(-8).toUpperCase()}
                          </h3>
                          <p className="text-sm text-gray-600">{order.user?.name}</p>
                          <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                          {statusDisplay.text}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Popular Foods */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Popular Items</h2>
              <Link
                to="/admin/foods"
                className="font-medium text-primary-600 hover:text-primary-700"
              >
                Manage Foods
              </Link>
            </div>
          </div>
          <div className="p-6">
            {popularFoods.length === 0 ? (
              <p className="py-4 text-center text-gray-500">No data available</p>
            ) : (
              <div className="space-y-4">
                {popularFoods.slice(0, 5).map((food, index) => (
                  <div key={food._id} className="flex items-center space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg">
                      <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{food.name}</h3>
                      <p className="text-sm text-gray-600">{food.totalOrdered} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(food.totalRevenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link
            to="/admin/orders"
            className="p-4 text-center transition-colors duration-200 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 hover:bg-primary-50"
          >
            <FiShoppingBag className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-600">Manage Orders</p>
          </Link>
          
          <Link
            to="/admin/foods"
            className="p-4 text-center transition-colors duration-200 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 hover:bg-primary-50"
          >
            <FiEye className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-600">Manage Menu</p>
          </Link>
          
          <Link
            to="/admin/employees"
            className="p-4 text-center transition-colors duration-200 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 hover:bg-primary-50"
          >
            <FiUsers className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-600">Manage Staff</p>
          </Link>
          
          <Link
            to="/admin/reports"
            className="p-4 text-center transition-colors duration-200 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 hover:bg-primary-50"
          >
            <FiTrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-600">View Reports</p>
          </Link>
        </div>
      </div> */}
    </div>
  )
}

export default AdminDashboard