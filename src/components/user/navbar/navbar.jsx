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
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearchOverlay = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
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
            <a href="/" className="flex flex-col items-center">
  <span className="text-4xl font-serif tracking-wider text-[#4E0F3E]">
    Taylorzone
  </span>
  <span className="text-sm font-light text-[#4E0F3E]">
    by Raiba
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

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="text-[#4E0F3E] hover:text-pink-600 transition relative group"
                  aria-label="User account"
                  onClick={toggleUserDropdown}
                >
                  <FiUser className="h-5 w-5" />
                  <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Account
                  </span>
                </button>
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Signup
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="button"
                className="text-[#4E0F3E] hover:text-pink-600 transition relative group"
                aria-label="Wishlist"
              >
                <FiHeart className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="text-[#4E0F3E] hover:text-pink-600 transition relative group"
                aria-label="Shopping cart"
              >
                <FiShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
