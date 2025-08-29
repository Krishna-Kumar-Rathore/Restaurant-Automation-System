import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getFoods } from '../redux/slices/foodSlice'
import { getCategories } from '../redux/slices/categorySlice'
import FoodCard from '../components/FoodCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'

const Menu = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    isVegetarian: searchParams.get('isVegetarian') || '',
    page: parseInt(searchParams.get('page')) || 1
  })

  const { foods, totalPages, currentPage, isLoading } = useSelector((state) => state.food)
  const { categories } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    const params = {
      ...filters,
      limit: 12
    }
    
    // Remove empty values but keep page even if it's 1
    Object.keys(params).forEach(key => {
      if (!params[key] && key !== 'page') delete params[key]
    })

    // Ensure page is sent as a number
    if (params.page) {
      params.page = parseInt(params.page)
    }

    console.log('API Request params:', params) // Keep this for debugging
    
    dispatch(getFoods(params))
    
    // Update URL params
    const newSearchParams = new URLSearchParams()
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        newSearchParams.set(key, filters[key])
      }
    })
    setSearchParams(newSearchParams)
  }, [filters, dispatch, setSearchParams])

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }))
  }

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId || '', page: 1 }))
  }

  const handleVegFilter = (isVeg) => {
    setFilters(prev => ({ ...prev, isVegetarian: isVeg, page: 1 }))
  }

  const handlePageChange = (page) => {
    console.log(`Changing to page: ${page}`) // Keep this for debugging
    setFilters(prev => ({ ...prev, page }))
  }

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Our Menu</h1>
        <p className="text-gray-600">Discover our delicious collection of dishes</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleVegFilter('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filters.isVegetarian === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleVegFilter('true')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filters.isVegetarian === 'true'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Veg
            </button>
            <button
              onClick={() => handleVegFilter('false')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filters.isVegetarian === 'false'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Non-Veg
            </button>
          </div>
        </div>

        <CategoryFilter onCategoryChange={handleCategoryChange} />
      </div>

      {/* Food Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : foods.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">No food items found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>

          {/* FIXED: Use local filters.page for reliable pagination */}
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}

export default Menu