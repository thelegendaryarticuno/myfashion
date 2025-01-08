import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiHeart,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";

// Shop Component
const Shop = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "All",
    "Ethnic Wear",
    "Western Wear",
    "Fusion",
    "Accessories",
    "Footwear",
  ];

  const filters = {
    price: ["Under ₹999", "₹1000 - ₹1999", "₹2000 - ₹2999", "Above ₹3000"],
    color: ["Red", "Green", "Blue", "Black", "White"],
    size: ["XS", "S", "M", "L", "XL"],
    occasion: ["Casual", "Party", "Festival", "Wedding"],
  };

  const products = [
    {
      id: 1,
      name: "Emerald Ethnic Gown",
      price: 2499,
      originalPrice: 4999,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1583391733956-6f157d71b485?auto=format&fit=crop&q=80&w=1000",
      category: "Ethnic Wear",
    },
    // Add more products as needed
  ];

  const bannerImages = [
    "https://images.unsplash.com/photo-1512434607501-2d3d23a6f1f2?auto=format&fit=crop&w=500&h=300&q=80",
    "https://images.unsplash.com/photo-1521747116042-e72c24e8f1f9?auto=format&fit=crop&w=500&h=300&q=80",
    "https://images.unsplash.com/photo-1593642532400-68b6fcd7ccff?auto=format&fit=crop&w=500&h=300&q=80",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header Banner with Sliding Effect */}
      <div className="relative h-[40vh] bg-emerald-800 overflow-hidden">
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
                alt="Shop Banner"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
          <button
            onClick={prevSlide}
            className="p-3 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100"
          >
            {"<"}
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <button
            onClick={nextSlide}
            className="p-3 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100"
          >
            {">"}
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Our Collection</h1>
            <p className="text-xl">Discover your perfect style</p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-6 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedCategory === category.toLowerCase()
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <FiFilter className="w-5 h-5" />
              </div>

              {Object.entries(filters).map(([filterName, options]) => (
                <div key={filterName} className="mb-6">
                  <h3 className="text-lg font-medium capitalize mb-3">
                    {filterName}
                  </h3>
                  <div className="space-y-2">
                    {options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing 24 products</p>
              <div className="flex items-center space-x-4">
                <select className="rounded-lg border-gray-300 text-gray-700 text-sm focus:ring-emerald-500 focus:border-emerald-500">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid"
                        ? "bg-emerald-100 text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list"
                        ? "bg-emerald-100 text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-lg shadow-md overflow-hidden group ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-48" : "w-full"
                    }`}
                  >
                    <img
                      src={`https://source.unsplash.com/random/600x800?fashion&sig=${index}`}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover aspect-[3/4]"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                      <FiHeart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-center space-x-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(42)</span>
                    </div>
                    <h3 className="font-semibold mb-2">
                      Trendy Fashion Item {index + 1}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-emerald-600">
                        ₹1,499
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹2,999
                      </span>
                      <span className="text-sm text-emerald-600 font-medium">
                        50% OFF
                      </span>
                    </div>
                    {viewMode === "list" && (
                      <p className="text-gray-600 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore.
                      </p>
                    )}
                    <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                      <FiShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-500">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
