import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiPlus, FiHeart } from 'react-icons/fi'
import { addToCart } from '../redux/slices/cartSlice'
import { formatCurrency } from '../utils/formatters'
import { toast } from 'react-toastify'

const FoodCard = ({ food }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }

    dispatch(addToCart({ foodId: food._id, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success('Item added to cart')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <Link to={`/food/${food._id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
        <div className="relative">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-48 object-cover"
          />
          {!food.isAvailable && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              food.isVegetarian ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {food.isVegetarian ? 'Veg' : 'Non-Veg'}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
              {food.name}
            </h3>
            <button className="text-gray-400 hover:text-red-500">
              <FiHeart className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {food.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary-600">
                {formatCurrency(food.price)}
              </span>
              <span className="text-xs text-gray-500">
                {food.preparationTime} min
              </span>
            </div>
            
            {food.isAvailable && (
              <button
                onClick={handleAddToCart}
                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors duration-200"
              >
                <FiPlus className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FoodCard