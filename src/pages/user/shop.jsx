import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiHeart,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  // Existing state declarations
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(6);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate()
  
  // New state for price filters
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    price: [],
    color: [],
    size: [],
    occasion: []
  });

  const categories = [
    "All",
    "Ethnic Wear",
    "Western Wear",
    "Fusion",
    "Accessories",
    "Footwear",
  ];

  // Enhanced price filters with actual ranges
  const filters = {
    price: [
      { label: "Under ₹999", min: 0, max: 999 },
      { label: "₹1000 - ₹1999", min: 1000, max: 1999 },
      { label: "₹2000 - ₹2999", min: 2000, max: 2999 },
      { label: "Above ₹3000", min: 3000, max: Infinity }
    ],
    color: ["Red", "Green", "Blue", "Black", "White"],
    size: ["XS", "S", "M", "L", "XL"],
    occasion: ["Casual", "Party", "Festival", "Wedding"],
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://myfashion-backend-axwh.onrender.com/get-product"
        );
        const data = await response.json();
        if (data.success) {
          const validProducts = data.products.filter(
            (product) =>
              product.name &&
              product.price &&
              product.img &&
              product.category &&
              product.productId &&
              (product.visibility === "on" || product.visibility === "true")
          );
          setProducts(validProducts);
          setFilteredProducts(validProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filterProducts = (category) => {
    setSelectedCategory(category.toLowerCase());
    if (category.toLowerCase() === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
    setLoadMore(6);
  };

  // Sort products
  const handleSort = (option) => {
    let sortedProducts = [...filteredProducts];
    switch (option) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // Assuming there's a date field, adjust accordingly
        sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        // Featured or default sorting
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        product => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filter
    if (activeFilters.price.length > 0) {
      filtered = filtered.filter(product => {
        return activeFilters.price.some(range => {
          const priceRange = filters.price.find(pr => pr.label === range);
          return product.price >= priceRange.min && product.price <= priceRange.max;
        });
      });
    }

    setFilteredProducts(filtered);
    setLoadMore(6); // Reset pagination when filters change
  };

  // Apply filters whenever activeFilters or selectedCategory changes
  useEffect(() => {
    applyFilters();
  }, [activeFilters, selectedCategory, products]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      const updatedFilters = { ...prev };
      
      if (updatedFilters[filterType].includes(value)) {
        // Remove the filter if it's already selected
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      } else {
        // Add the filter if it's not selected
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      
      return updatedFilters;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Shop | TailorZone By Raiba</title>
      </Helmet>

      {/* Shop Header Banner with Sliding Effect */}
      <div className="relative h-[40vh] bg-emerald-600 overflow-hidden">
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
                onClick={() => filterProducts(category)}
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
                <div className="flex items-center gap-2">
                  {Object.values(activeFilters).some(filter => filter.length > 0) && (
                    <button
                      onClick={() => setActiveFilters({
                        price: [],
                        color: [],
                        size: [],
                        occasion: []
                      })}
                      className="text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      Clear All
                    </button>
                  )}
                  <FiFilter className="w-5 h-5" />
                </div>
              </div>

              {/* Price Filter Section */}
              <div className="mb-6">
                <h3 className="text-lg font-medium capitalize mb-3">
                  Price
                </h3>
                <div className="space-y-2">
                  {filters.price.map((range) => (
                    <label
                      key={range.label}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.price.includes(range.label)}
                        onChange={() => handleFilterChange('price', range.label)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {Object.entries(filters).map(([filterName, options]) => {
                if (filterName === 'price') return null; // Skip price filter as it's handled above
                return (
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
                            checked={activeFilters[filterName].includes(option)}
                            onChange={() => handleFilterChange(filterName, option)}
                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            

          {/* Products Grid */}
          <div className="lg:w-3/4">
          {Object.entries(activeFilters).some(([_, values]) => values.length > 0) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {Object.entries(activeFilters).map(([filterType, values]) =>
                  values.map(value => (
                    <span
                      key={`${filterType}-${value}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                    >
                      {value}
                      <button
                        onClick={() => handleFilterChange(filterType, value)}
                        className="ml-1 hover:text-emerald-900"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            )}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {Math.min(loadMore, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </p>
              <div className="flex items-center space-x-4">
                <select
                  onChange={(e) => handleSort(e.target.value)}
                  className="rounded-lg border-gray-300 text-gray-700 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
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

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.slice(0, loadMore).map((product, index) => (
                  <motion.div
                    key={product.productId || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-white rounded-lg shadow-md overflow-hidden group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                    onMouseEnter={() => setHoveredProduct(product.productId)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onClick={()=>navigate(`/${product.productId}`)}
                  >
                    <div
                      className={`relative ${
                        viewMode === "list" ? "w-48" : "w-full"
                      }`}
                    >
                      <img
                        src={product.img[0] || product.img}
                        alt={product.name}
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
                              i < (product.rating || 4)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          ({product.reviews || 42})
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-emerald-600">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        {product.discount && (
                          <span className="text-sm text-emerald-600 font-medium">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>
                      <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <FiShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredProducts.length > loadMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setLoadMore((prev) => prev + 6)}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-500"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;