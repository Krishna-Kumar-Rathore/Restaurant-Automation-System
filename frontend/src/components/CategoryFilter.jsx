import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedCategory } from '../redux/slices/categorySlice'

const CategoryFilter = ({ onCategoryChange }) => {
  const { categories, selectedCategory } = useSelector((state) => state.category)
  const dispatch = useDispatch()

  const handleCategoryChange = (categoryId) => {
    dispatch(setSelectedCategory(categoryId))
    onCategoryChange(categoryId)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
          !selectedCategory
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => handleCategoryChange(category._id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === category._id
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter