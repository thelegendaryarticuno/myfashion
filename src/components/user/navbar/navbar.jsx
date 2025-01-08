import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearchOverlay = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Announcement Banner */}
<div className="bg-[#4E0F3E] text-white py-2 text-center text-sm relative overflow-hidden">
  <div className="animate-marquee flex">
    <span>FREE SHIPPING ON ORDERS OVER $100</span>&nbsp;|&nbsp;
    <span>NEW SEASON SALE STARTS NOW! DON'T MISS OUT.</span>&nbsp;|&nbsp;
    <span>LIMITED TIME OFFER, SHOP NOW!</span>&nbsp;|&nbsp;
    <span>EXCLUSIVE DEALS JUST FOR YOU, HURRY!</span>
  </div>
</div>

{/* Tailwind CSS with Custom Animation */}
<style jsx>{`
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .animate-marquee {
    animation: marquee 15s linear infinite;
  }
`}</style>


      <nav
        className={`sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-[#4E0F3E] hover:text-pink-600 transition"
              onClick={toggleMenu}
            >
              <FiMenu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-serif tracking-wider text-[#4E0F3E]">
                AMBRAE
              </span>
            </a>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: "/new-arrivals", label: "New Arrivals" },
                { href: "/best-sellers", label: "Best Sellers" },
                { href: "/shop", label: "Shop" },
                { href: "/contact", label: "Contact Us" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-2 text-sm font-medium text-[#4E0F3E] hover:text-pink-600 transition-colors group"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              <button
                type="button"
                className="text-[#4E0F3E] hover:text-pink-600 transition relative group"
                aria-label="Search"
                onClick={toggleSearchOverlay}
              >
                <FiSearch className="h-5 w-5" />
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Search
                </span>
              </button>
              <button
                type="button"
                className="text-[#4E0F3E] hover:text-pink-600 transition relative group"
                aria-label="User account"
              >
                <FiUser className="h-5 w-5" />
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Account
                </span>
              </button>
              <button
                type="button"
                className="text-[#4E0F3E] hover:text-pink-600 transition relative group"
                aria-label="Wishlist"
              >
                <div className="relative">
                  <FiHeart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center">
                    0
                  </span>
                </div>
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Wishlist
                </span>
              </button>
              <button
                type="button"
                className="text-[#4E0F3E] hover:text-pink-600 transition relative group"
                aria-label="Shopping cart"
              >
                <div className="relative">
                  <FiShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center">
                    0
                  </span>
                </div>
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Cart
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 md:hidden"
            >
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-serif text-[#4E0F3E]">
                    AMBRAE
                  </span>
                  <button onClick={toggleMenu}>
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { href: "/new-arrivals", label: "New Arrivals" },
                    { href: "/best-sellers", label: "Best Sellers" },
                    { href: "/shop", label: "Shop" },
                    { href: "/contact", label: "Contact Us" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-[#4E0F3E] hover:bg-gray-100 rounded-md"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start justify-center pt-20"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4 relative"
                ref={searchRef}
              >
                <button
                  type="button"
                  className="absolute top-3 right-3 text-gray-600 hover:text-pink-600 transition"
                  onClick={toggleSearchOverlay}
                >
                  <FiX className="h-6 w-6" />
                </button>
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
