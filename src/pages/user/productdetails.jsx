import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaBox, FaExclamationCircle, FaWarehouse, FaShippingFast, FaTag, FaMinus, FaPlus } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state;

  // Example stock status (you can replace this with actual stock data from your backend or product object)
  const stockStatus = {
    status: product.stockStatus, // e.g., 'In Stock', 'Low Stock', 'Out of Stock'
    stock: product.stock || 30, // Assume 30 as a fallback, you can replace with real data
    color: product.stockStatus === 'In Stock'
      ? "bg-green-100 text-green-600"
      : product.stockStatus === 'Low Stock'
      ? "bg-yellow-100 text-yellow-600"
      : product.stockStatus === 'Very Low Stock'
      ? "bg-orange-100 text-orange-600"
      : "bg-red-100 text-red-600",
  };

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    if (change < 0 && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (change > 0 && quantity < stockStatus.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    // Replace this with your actual add-to-cart logic
    console.log(`Added ${quantity} of ${product.title} to the cart.`);
  };

  // Render rating stars based on product's rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Section */}
            <div className="p-8 bg-gray-50 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full max-w-md h-[500px] relative"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>

            {/* Product Info Section */}
            <div className="p-8 space-y-6">
              {/* Product Title and Price */}
              <div className="border-b border-red-100 pb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-red-600 to-pink-500 text-transparent bg-clip-text">
                  {product.title}
                </h1>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-semibold text-red-600">
                    ₹{product.salePrice}
                  </p>
                </div>
              </div>

              {/* Product Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderRating(4.5)} {/* Display 4.5 stars */}
                </div>
                <span className="text-sm text-gray-500">(4.5)</span>
              </div>

              {/* Stock Status Section */}
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-full flex items-center ${stockStatus?.color}`}>
                  {stockStatus?.status === 'In Stock' && <FaBox className="mr-2 text-green-600" />}
                  {stockStatus?.status === 'Low Stock' && <FaExclamationCircle className="mr-2 text-yellow-600" />}
                  {stockStatus?.status === 'Very Low Stock' && <FaWarehouse className="mr-2 text-orange-600" />}
                  {stockStatus?.status === 'Out of Stock' && <FaShippingFast className="mr-2 text-red-600" />}
                  <span className="font-medium">
                    {stockStatus?.status} ({stockStatus?.stock} available)
                  </span>
                </div>
                <div className="bg-red-50 px-4 py-2 rounded-full flex items-center">
                  <FaTag className="mr-2 text-red-500" />
                  <span className="font-medium text-red-600">
                    Embroidered Saaree {/* Product Category */}
                  </span>
                </div>
              </div>

              {/* Quantity Section */}
              <div className="flex items-center space-x-4 py-6">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-red-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span className="text-xl font-medium text-gray-700">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-red-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
                  disabled={quantity >= stockStatus?.stock}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Add to Cart Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
