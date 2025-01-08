import React, { useState, useRef } from 'react';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import SearchBar from './SearchBar'; // Assuming you have a separate SearchBar component

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const toggleSearchOverlay = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <nav className="border-b border-gray-200 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a href="/" className="text-2xl font-serif italic text-gray-800 hover:opacity-80 transition">
            Fashion Store
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/new" className="text-gray-700 hover:text-pink-600 text-lg font-medium transition">
              New & Featured
            </a>
            <a href="/men" className="text-gray-700 hover:text-pink-600 text-lg font-medium transition">
              Men
            </a>
            <a href="/women" className="text-gray-700 hover:text-pink-600 text-lg font-medium transition">
              Women
            </a>
            <a href="/kids" className="text-gray-700 hover:text-pink-600 text-lg font-medium transition">
              Kids
            </a>
            <a href="/accessories" className="text-gray-700 hover:text-pink-600 text-lg font-medium transition">
              Accessories
            </a>
            <a href="/sales" className="text-gray-700 hover:text-pink-600 text-lg font-medium transition">
              Sales
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button
              type="button"
              className="text-gray-700 hover:text-pink-600 transition"
              aria-label="Search"
              onClick={toggleSearchOverlay} // Toggle search overlay
            >
              <FiSearch className="h-6 w-6" />
            </button>
            <button type="button" className="text-gray-700 hover:text-pink-600 transition" aria-label="User account">
              <FiUser className="h-6 w-6" />
            </button>
            <button type="button" className="text-gray-700 hover:text-pink-600 transition" aria-label="Wishlist">
              <FiHeart className="h-6 w-6" />
            </button>
            <button type="button" className="text-gray-700 hover:text-pink-600 transition" aria-label="Shopping cart">
              <FiShoppingCart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-lg w-full max-w-md mx-4 relative"
              ref={searchRef}
            >
              {/* Close Button */}
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-600 hover:text-pink-600 transition"
                onClick={toggleSearchOverlay}
                aria-label="Close search"
              >
                <FiX className="h-6 w-6" />
              </button>

              {/* Search Bar */}
              <SearchBar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
