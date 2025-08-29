import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFoods } from "../redux/slices/foodSlice";
import { getCategories } from "../redux/slices/categorySlice";
import FoodCard from "../components/FoodCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const dispatch = useDispatch();
  const { foods, isLoading } = useSelector((state) => state.food);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getFoods({ limit: 8 }));
    dispatch(getCategories());
  }, [dispatch]);

  const featuredCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen">
    
      {/* Hero Section */}
      <section
        className="relative py-20 text-white bg-center bg-cover bg-no-repeat min-h-[60vh]"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dcwgv3imm/image/upload/v1756482023/bg_img_wg4dtl.png")',
        }}
      >
        {/* overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Delicious Food Delivered Fast
            </h1>
            <p className="mb-8 text-xl md:text-2xl text-primary-100">
              Order your favorite meals from our restaurant with just a few
              clicks
            </p>
            <div className="space-x-4">
              <Link
                to="/menu"
                className="px-8 py-3 text-lg font-bold transition-colors duration-200 bg-white rounded-lg text-primary-600 hover:bg-gray-100"
              >
                Order Now
              </Link>
              <Link
                to="/menu"
                className="px-8 py-3 text-lg font-bold text-white transition-colors duration-200 border-2 border-white rounded-lg hover:bg-white hover:text-primary-600"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Discover our delicious food categories
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {featuredCategories.map((category) => (
              <Link
                key={category._id}
                to={`/menu?category=${category._id}`}
                className="p-6 text-center transition-shadow duration-200 bg-white rounded-lg shadow-md hover:shadow-lg group"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors duration-200 rounded-full bg-primary-100 group-hover:bg-primary-200">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods Section */}
      <section className="py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Featured Dishes
            </h2>
            <p className="text-lg text-gray-600">
              Try our most popular and delicious dishes
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {foods.slice(0, 8).map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/menu" className="px-8 py-3 text-lg btn-primary">
              View All Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your food delivered in 30-45 minutes
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fresh Ingredients</h3>
              <p className="text-gray-600">
                Made with the freshest ingredients daily
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Payment</h3>
              <p className="text-gray-600">
                Multiple payment options available
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
