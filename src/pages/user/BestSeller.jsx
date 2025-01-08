import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiTrendingUp,
  FiAward,
  FiThumbsUp,
} from "react-icons/fi";

const BestSellers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=2086",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2020",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );
  };

  const bestSellerCategories = [
    { name: "Trending Now", icon: <FiTrendingUp /> },
    { name: "Top Rated", icon: <FiStar /> },
    { name: "Award Winners", icon: <FiAward /> },
    { name: "Customer Favorites", icon: <FiThumbsUp /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[60vh] bg-emerald-600 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {bannerImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              <img
                src={image}
                alt={`Best Seller Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full"
        >
          {"<"}
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full"
        >
          {">"}
        </button>

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Best Sellers</h1>
            <p className="text-2xl">Discover our most loved styles</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellerCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-emerald-50 rounded-lg p-6 text-center hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <div className="text-4xl text-emerald-600 mb-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={`https://source.unsplash.com/random/600x800?fashion&sig=${index}`}
                  alt={`Best Seller ${index + 1}`}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  Best Seller
                </div>
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-gray-600 hover:text-emerald-600">
                  <FiHeart className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(120)</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Top Selling Item {index + 1}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-emerald-600">
                    ₹1,999
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹3,999
                  </span>
                  <span className="text-sm text-emerald-600 font-medium">
                    50% OFF
                  </span>
                </div>
                <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center">
                  <FiShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl italic mb-4">
              "I absolutely love the quality and style of the clothes from
              TailorZone. Their best sellers are always on point and I get so
              many compliments!"
            </p>
            <p className="font-semibold">- Sarah J., Loyal Customer</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          More Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={`https://source.unsplash.com/random/600x800?clothing&sig=${
                    index + 8
                  }`}
                  alt={`Best Seller ${index + 9}`}
                  className="w-full h-80 object-cover"
                />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-gray-600 hover:text-emerald-600">
                  <FiHeart className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(78)</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Popular Item {index + 9}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-emerald-600">
                    ₹2,499
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹4,999
                  </span>
                  <span className="text-sm text-emerald-600 font-medium">
                    50% OFF
                  </span>
                </div>
                <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center">
                  <FiShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get notified about new best sellers and exclusive
            offers
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-r-full hover:bg-emerald-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
