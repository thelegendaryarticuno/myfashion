import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    { name: "Fashion", path: "/fashion" },
    { name: "Gift Items", path: "/gift-boxes" },
    { name: "Books", path: "/books" },
    { name: "Stationery", path: "/stationery" },
    { name: "All Products", path: "/shop" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(
            `https://myfashion-backend-axwh.onrender.com/auth/user/${userId}`
          );
          const data = await response.json();
          setUserName(data.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;

      try {
        const cartResponse = await fetch(
          `https://myfashion-backend-axwh.onrender.com/cart/get-cart`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
          }
        );
        const cartData = await cartResponse.json();

        if (cartData.success && cartData.cart && Array.isArray(cartData.cart.productsInCart)) {
          const total = cartData.cart.productsInCart.reduce((sum, item) => sum + 1, 0);
          setCartItemCount(total);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    window.location.reload();
  };

  const userId = sessionStorage.getItem("userId");
  const isActive = (path) => location.pathname === path;

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
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FiMenu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center">
              <span className="text-4xl font-serif tracking-wider text-[#4E0F3E]">
                Taylorzone
              </span>
              <span className="text-sm font-light text-[#4E0F3E]">
                by Raiba
              </span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: "/new-arrivals", label: "New Arrivals" },
                { href: "/best-sellers", label: "Best Sellers" },
                { 
                  href: "/shop", 
                  label: "Shop",
                  hasDropdown: true,
                },
                { href: "/contact", label: "Contact Us" },
              ].map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setIsShopDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsShopDropdownOpen(false)}
                >
                  <Link
                    to={item.href}
                    className="relative px-3 py-2 text-sm font-medium text-[#4E0F3E] hover:text-pink-600 transition-colors group"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                  {item.hasDropdown && isShopDropdownOpen && (
                    <div className="absolute mt-2 bg-white border rounded-lg shadow-lg">
                      {categories.map((category) => (
                        <Link
                          key={category.path}
                          to={category.path}
                          className="block px-4 py-2 text-sm text-[#4E0F3E] hover:bg-pink-50"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              <button
                type="button"
                className="text-[#4E0F3E] hover:text-pink-600 transition relative group"
                onClick={() => setIsSearchOpen(true)}
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
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <FiUser className="h-5 w-5" />
                  <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {userId ? `Hi, ${userName}` : "Account"}
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
                      {userId ? (
                        <>
                          <Link
                            to="/orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            My Orders
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Signup
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/cart"
                className="text-[#4E0F3E] hover:text-pink-600 transition relative group"
              >
                <FiShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Cart
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-4 rounded-lg w-full max-w-md mx-4"
              ref={searchRef}
            >
              <SearchBar />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="mt-2 text-gray-600 hover:text-pink-600 flex items-center justify-center w-full"
              >
                <FiX className="w-4 h-4 mr-2" />
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 md:hidden"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-serif text-2xl text-[#4E0F3E]">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-[#4E0F3E]"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="py-4">
              {[
                { path: "/new-arrivals", name: "New Arrivals" },
                { path: "/best-sellers", name: "Best Sellers" },
                { path: "/shop", name: "Shop" },
                { path: "/contact", name: "Contact Us" },
              ].map(({ path, name }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-6 py-3 ${
                    isActive(path)
                      ? "text-pink-600 bg-pink-50"
                      : "text-[#4E0F3E] hover:bg-pink-50 hover:text-pink-600"
                  } transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;