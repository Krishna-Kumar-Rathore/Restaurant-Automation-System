import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiCreditCard, FiSmartphone, FiDollarSign } from 'react-icons/fi'
import { createOrder } from '../redux/slices/orderSlice'
import { getCart } from '../redux/slices/cartSlice'
import { formatCurrency } from '../utils/formatters'
import { PAYMENT_METHODS } from '../utils/constants'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { user } = useSelector((state) => state.auth)
  const { items, totalAmount } = useSelector((state) => state.cart)
  const { isLoading } = useSelector((state) => state.order)

  const [orderData, setOrderData] = useState({
    paymentMethod: 'card',
    deliveryAddress: user?.address || '',
    customerPhone: user?.phone || '',
    notes: ''
  })

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    upiId: ''
  })

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!orderData.deliveryAddress || !orderData.customerPhone) {
      toast.error('Please fill in all required fields')
      return
    }

    // Mock payment validation
    if (orderData.paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
        toast.error('Please fill in all card details')
        return
      }
    } else if (orderData.paymentMethod === 'upi') {
      if (!paymentDetails.upiId) {
        toast.error('Please enter UPI ID')
        return
      }
    }

    try {
      const result = await dispatch(createOrder(orderData)).unwrap()
      
      // Mock payment processing
      setTimeout(() => {
        toast.success('Order placed successfully!')
        navigate(`/order/${result._id}`)
      }, 2000)
      
    } catch (error) {
      toast.error(error)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  name="deliveryAddress"
                  value={orderData.deliveryAddress}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  className="input-field resize-none"
                  placeholder="Enter your delivery address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={orderData.customerPhone}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="notes"
                  value={orderData.notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="input-field resize-none"
                  placeholder="Any special instructions for the restaurant"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
            
            <div className="space-y-4">
              {/* Payment Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: 'card' }))}
                  className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 ${
                    orderData.paymentMethod === 'card'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FiCreditCard className="h-5 w-5" />
                  <span className="font-medium">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                  className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 ${
                    orderData.paymentMethod === 'upi'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FiSmartphone className="h-5 w-5" />
                  <span className="font-medium">UPI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderData(prev => ({ ...prev, paymentMethod: 'cash' }))}
                  className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 ${
                    orderData.paymentMethod === 'cash'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FiDollarSign className="h-5 w-5" />
                  <span className="font-medium">Cash</span>
                </button>
              </div>

              {/* Payment Details */}
              {orderData.paymentMethod === 'card' && (
                <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentDetailsChange}
                        className="input-field"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={paymentDetails.cardHolder}
                        onChange={handlePaymentDetailsChange}
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentDetailsChange}
                        className="input-field"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentDetailsChange}
                        className="input-field"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {orderData.paymentMethod === 'upi' && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={paymentDetails.upiId}
                    onChange={handlePaymentDetailsChange}
                    className="input-field"
                    placeholder="example@paytm"
                  />
                </div>
              )}

              {orderData.paymentMethod === 'cash' && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">
                    <strong>Cash on Delivery:</strong> Please keep exact change ready. 
                    Payment will be collected upon delivery.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.food._id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.food.image}
                      alt={item.food.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.food.name}
                      </h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span className="font-semibold">{formatCurrency(totalAmount * 0.05)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    {formatCurrency(totalAmount + (totalAmount * 0.05))}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-lg py-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="small" />
                  <span>Processing...</span>
                </div>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout