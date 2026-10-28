import React, { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiRefreshCw,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'
import { formatCurrency, formatDate, getStatusColor } from '../../utils/formatters'
import orderService from '../../utils/orderService'

const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'delivered',
  'cancelled',
]
const PAGE_SIZE = 20

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingOrderId, setUpdatingOrderId] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let isCurrentRequest = true

    const loadOrders = async () => {
      setIsLoading(true)
      setError('')

      try {
        const params = { page, limit: PAGE_SIZE }
        if (statusFilter) params.status = statusFilter
        const result = await orderService.getAllOrders(params)

        if (isCurrentRequest) {
          setOrders(result.orders)
          setTotal(result.total)
          setTotalPages(result.totalPages)
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              'Unable to load orders. Please try again.'
          )
        }
      } finally {
        if (isCurrentRequest) setIsLoading(false)
      }
    }

    loadOrders()

    return () => {
      isCurrentRequest = false
    }
  }, [page, statusFilter, refreshKey])

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value)
    setPage(1)
  }

  const handleStatusChange = async (orderId, status) => {
    setUpdatingOrderId(orderId)
    setError('')

    try {
      await orderService.updateOrderStatus(orderId, status)
      toast.success('Order status updated')
      setRefreshKey((currentKey) => currentKey + 1)
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          'Unable to update order status.'
      )
    } finally {
      setUpdatingOrderId('')
    }
  }

  const getFoodName = (item) => item.food?.name || 'Food item no longer available'

  return (
    <div className="page-container">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
            Restaurant operations
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="mt-2 text-gray-600">
            Review customer orders, see every item, and keep order statuses up to date.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="order-status-filter" className="sr-only">
            Filter orders by status
          </label>
          <select
            id="order-status-filter"
            value={statusFilter}
            onChange={handleFilterChange}
            className="input-field min-w-44 bg-white"
          >
            <option value="">All statuses</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setRefreshKey((currentKey) => currentKey + 1)}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw aria-hidden="true" className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-xl border border-primary-100 bg-primary-50 p-4">
        <div className="rounded-lg bg-white p-2 text-primary-600 shadow-sm">
          <FiPackage aria-hidden="true" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Orders{statusFilter ? ` · ${statusFilter}` : ''}</p>
          <p className="text-xl font-bold text-gray-900">{total}</p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
        >
          <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center rounded-xl bg-white py-16 shadow-sm">
          <LoadingSpinner size="large" />
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <FiPackage aria-hidden="true" className="mx-auto h-10 w-10 text-gray-400" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">No orders found</h2>
          <p className="mt-1 text-gray-500">
            {statusFilter
              ? 'There are no orders with this status.'
              : 'Orders placed by customers will appear here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <article key={order._id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
              <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-gray-900">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <label htmlFor={`status-${order._id}`} className="text-xs font-medium text-gray-500">
                    Update order status
                  </label>
                  <select
                    id={`status-${order._id}`}
                    value={order.status}
                    onChange={(event) => handleStatusChange(order._id, event.target.value)}
                    disabled={updatingOrderId === order._id}
                    className="input-field min-w-44 bg-white py-2 text-sm disabled:opacity-60"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,1fr)]">
                <section aria-label={`Items in order ${order._id}`}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Items ordered</h3>
                    <span className="text-sm text-gray-500">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <ul className="divide-y divide-gray-100 rounded-lg border border-gray-100">
                    {order.items.map((item, index) => (
                      <li
                        key={item._id || `${item.food?._id || 'food'}-${index}`}
                        className="flex items-center justify-between gap-4 p-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-900">{getFoodName(item)}</p>
                          <p className="mt-1 text-sm text-gray-500">
                            Qty {item.quantity} × {formatCurrency(item.price)}
                          </p>
                        </div>
                        <p className="shrink-0 font-semibold text-gray-900">
                          {formatCurrency(item.quantity * item.price)}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="font-semibold text-gray-700">Order total</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </section>

                <section className="rounded-lg bg-gray-50 p-4" aria-label="Customer and delivery details">
                  <h3 className="font-semibold text-gray-900">Customer</h3>
                  <p className="mt-2 font-medium text-gray-800">{order.user?.name || 'Customer account unavailable'}</p>
                  {order.user?.email && (
                    <a
                      href={`mailto:${order.user.email}`}
                      className="mt-1 block break-all text-sm text-primary-700 hover:underline"
                    >
                      {order.user.email}
                    </a>
                  )}
                  {order.customerPhone && (
                    <a href={`tel:${order.customerPhone}`} className="mt-3 flex items-center gap-2 text-sm text-gray-600 hover:text-primary-700">
                      <FiPhone aria-hidden="true" />
                      {order.customerPhone}
                    </a>
                  )}
                  {order.deliveryAddress && (
                    <p className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                      <FiMapPin aria-hidden="true" className="mt-0.5 shrink-0" />
                      <span>{order.deliveryAddress}</span>
                    </p>
                  )}
                  <div className="mt-4 border-t border-gray-200 pt-3 text-sm">
                    <p className="flex justify-between gap-3 text-gray-600">
                      <span>Payment</span>
                      <span className="font-medium capitalize text-gray-800">
                        {order.paymentMethod} · {order.paymentStatus}
                      </span>
                    </p>
                    {order.notes && (
                      <p className="mt-3 text-gray-600">
                        <span className="font-medium text-gray-700">Notes: </span>
                        {order.notes}
                      </p>
                    )}
                  </div>
                </section>
              </div>
            </article>
          ))}
        </div>
      )}

      {!isLoading && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiChevronLeft aria-hidden="true" />
            Previous
          </button>
          <p className="text-sm text-gray-600">
            Page <span className="font-semibold text-gray-900">{page}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalPages}</span>
          </p>
          <button
            type="button"
            onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminOrders
