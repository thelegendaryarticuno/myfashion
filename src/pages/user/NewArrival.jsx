import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShoppingCart,
  FiTrendingUp,
  FiPackage,
  FiClock,
} from "react-icons/fi";

const NewArrivals = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=2065",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2070",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );
  };

  const newArrivalCategories = [
    { name: "Just In", icon: <FiClock /> },
    { name: "Trending", icon: <FiTrendingUp /> },
    { name: "Limited Edition", icon: <FiPackage /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-[60vh] bg-indigo-600 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              <img
                src={image}
                alt={`New Arrival Banner ${index + 1}`}
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
            <h1 className="text-6xl font-bold mb-4">New Arrivals</h1>
            <p className="text-2xl">Discover the latest fashion trends</p>
          </div>
        </div>
      </div>

      {/* Latest Arrivals Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Arrivals</h2>
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
                  src={`https://source.unsplash.com/random/600x800?fashion&sig=${
                    index + 20
                  }`}
                  alt={`New Arrival ${index + 1}`}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-3 left-3 bg-indigo-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  New
                </div>
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-gray-600 hover:text-indigo-600">
                  <FiHeart className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Fresh Style {index + 1}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-indigo-600">
                    ₹2,999
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹3,999
                  </span>
                  <span className="text-sm text-indigo-600 font-medium">
                    25% OFF
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

      {/* Newsletter Section */}
      <div className="bg-green-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Be the First to Know</h2>
          <p className="text-xl mb-4">
            Sign up for our newsletter and get exclusive early access to new
            arrivals, special promotions, and style tips.
          </p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="max-w-xs rounded-l-full px-4 py-2 bg-white text-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-r-full hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Follow Us on Instagram</h2>
          <p className="text-gray-600 mb-6">
            Get inspired by our latest styles and behind-the-scenes content
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <img
              src="https://source.unsplash.com/300x300/?fashion,1"
              alt="Instagram Post 1"
              className="w-full h-auto rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
            />
            <img
              src="https://source.unsplash.com/300x300/?fashion,2"
              alt="Instagram Post 2"
              className="w-full h-auto rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
            />
            <img
              src="https://source.unsplash.com/300x300/?fashion,3"
              alt="Instagram Post 3"
              className="w-full h-auto rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
            />
            <img
              src="https://source.unsplash.com/300x300/?fashion,4"
              alt="Instagram Post 4"
              className="w-full h-auto rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
            />
            <img
              src="https://source.unsplash.com/300x300/?fashion,5"
              alt="Instagram Post 5"
              className="w-full h-auto rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
            />
            <img
              src="https://source.unsplash.com/300x300/?fashion,6"
              alt="Instagram Post 6"
              className="w-full h-auto rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
            />
          </div>
          <button className="mt-8 bg-white text-indigo-600 px-6 py-2 rounded-full border border-indigo-600 hover:bg-indigo-50">
            Follow @YourBrandName
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
