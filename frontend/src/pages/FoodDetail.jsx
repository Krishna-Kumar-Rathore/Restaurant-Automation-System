// src/pages/FoodDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowLeft, FiPlus, FiMinus, FiClock, FiStar } from 'react-icons/fi'
import { getFoodById, clearCurrentFood } from '../redux/slices/foodSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { formatCurrency } from '../utils/formatters'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner'

const FoodDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)

  const { user } = useSelector((state) => state.auth)
  const { currentFood: food, isLoading } = useSelector((state) => state.food)

  useEffect(() => {
    if (id) {
      dispatch(getFoodById(id))
    }
    
    return () => {
      dispatch(clearCurrentFood())
    }
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart')
      navigate('/login')
      return
    }

    if (!food.isAvailable) {
      toast.error('This item is currently unavailable')
      return
    }

    dispatch(addToCart({ foodId: food._id, quantity }))
      .unwrap()
      .then(() => {
        toast.success(`${quantity} ${food.name}(s) added to cart`)
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
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

  if (!food) {
    return (
      <div className="page-container">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Food item not found</h2>
          <button
            onClick={() => navigate('/menu')}
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        <FiArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Food Image */}
        <div className="relative">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
          />
          {!food.isAvailable && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <span className="text-white font-semibold text-xl">Out of Stock</span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              food.isVegetarian ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {food.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
          </div>
        </div>

        {/* Food Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{food.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{food.description}</p>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FiStar className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-semibold">{food.rating || 4.2}</span>
              <span className="text-gray-600">({food.reviewCount || 0} reviews)</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FiClock className="h-4 w-4" />
              <span>{food.preparationTime} min</span>
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-b py-4">
            <div className="text-3xl font-bold text-primary-600">
              {formatCurrency(food.price)}
            </div>
          </div>

          {/* Ingredients */}
          {food.ingredients && food.ingredients.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Category */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {food.category?.name}
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          {food.isAvailable && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  >
                    <FiMinus className="h-4 w-4" />
                  </button>
                  <span className="text-xl font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(food.price * quantity)}
                  </span>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary text-lg py-3"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}

          {!food.isAvailable && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">
                This item is currently out of stock and unavailable for ordering.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodDetail