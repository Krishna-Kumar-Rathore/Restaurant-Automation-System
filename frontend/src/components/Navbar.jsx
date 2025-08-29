import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi'
import { logout } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { itemCount } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary-600 hover:text-primary-800 hover:bg-yellow-100">
                RestaurantApp
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 md:flex">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link to="/menu" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600">
              Menu
            </Link>
            
            {user ? (
              <>
                <Link to="/cart" className="relative px-3 py-2 text-gray-700 hover:text-primary-600">
                  <FiShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-1 -right-1 bg-primary-600">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <Link to="/my-orders" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600">
                  My Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600">
                    Admin
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600">
                    <FiUser className="w-5 h-5 mr-1" />
                    {user.name}
                  </button>
                  <div className="absolute right-0 invisible w-48 mt-2 transition-all duration-200 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link to="/menu" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600">
              Menu
            </Link>
            
            {user ? (
              <>
                <Link to="/cart" className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600">
                  <FiShoppingCart className="w-5 h-5 mr-2" />
                  Cart {itemCount > 0 && `(${itemCount})`}
                </Link>
                <Link to="/my-orders" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600">
                  My Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600">
                    Admin
                  </Link>
                )}
                <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-base font-medium text-left text-gray-700 hover:text-primary-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar