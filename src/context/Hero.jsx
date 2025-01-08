import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 21,
    minutes: 11,
    seconds: 29,
  });

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banners = [
    {
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      title: "Summer Collection",
      subtitle: "Embrace the heat with our coolest styles",
    },
    {
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      title: "Autumn Vibes",
      subtitle: "Cozy up with our latest fall fashion",
    },
    {
      image:
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      title: "Elegant Evenings",
      subtitle: "Dazzle in our evening wear collection",
    },
  ];

  const categories = [
    {
      name: "Ethnic Wear",
      image:
        "https://images.unsplash.com/photo-1583391733956-6f157d71b485?auto=format&fit=crop&q=80&w=1000",
    },
    {
      name: "Western Wear",
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&q=80&w=1000",
    },
    {
      name: "Footwear",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  return (
    <div className="w-full">
      {/* Main Hero Section with Sliding Banners */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={banners[currentSlide].image}
              alt={banners[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold text-white mb-4"
                >
                  {banners[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-2xl text-white mb-8"
                >
                  {banners[currentSlide].subtitle}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white text-black px-8 py-3 text-lg font-semibold rounded-full hover:bg-gray-200 transition duration-300"
                >
                  Shop Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-2xl font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Video Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience Our Latest Collection
            </h2>
            <p className="text-gray-300 text-lg">
              Watch our stunning new arrivals in action
            </p>
          </motion.div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80"
            >
              <source
                src="https://video.wixstatic.com/video/11062b_79271b7012564a3e89ff69c3362dc5b8/1080p/mp4/file.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-white"
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Elegance in Motion
                </h3>
                <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition duration-300">
                  Shop Collection
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg group"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={`https://source.unsplash.com/random/600x800?fashion&sig=${item}`}
                    alt={`Featured product ${item}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Trendy Fashion Item {item}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">₹1,499.00</p>
                    <p className="text-emerald-600">50% OFF</p>
                  </div>
                  <button className="w-full mt-4 bg-black text-white py-2 rounded-full hover:bg-gray-800 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Black & White Theme Banner */}
      <section className="relative bg-gradient-to-r from-black to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Clothing Collection"
                className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition duration-500"
              />
            </div>
            <div className="text-white text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
                Fashion Redefined
              </h2>
              <p className="text-2xl md:text-3xl mb-6">
                EXCLUSIVE COLLECTION - UP TO 80% OFF
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
                <p className="text-xl mb-4">
                  Limited Time Offer - Don't Miss Out!
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <div className="text-center">
                    <span className="text-4xl font-bold">{timeLeft.hours}</span>
                    <p className="text-sm">Hours</p>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold">
                      {timeLeft.minutes}
                    </span>
                    <p className="text-sm">Minutes</p>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold">
                      {timeLeft.seconds}
                    </span>
                    <p className="text-sm">Seconds</p>
                  </div>
                </div>
              </div>
              <button className="mt-8 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Triple Banner Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-80 rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000"
                alt="Special Offer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Special Offer</h3>
                  <p className="mb-4">Up to 30% off</p>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-80 rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000"
                alt="New Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">New Collection</h3>
                  <p className="mb-4">Spring 2024</p>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                    Explore
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative h-80 rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=1000"
                alt="Accessories"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Accessories</h3>
                  <p className="mb-4">Complete your look</p>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                    View All
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      
      {/* Appointment Booking Section */}
      <section className="relative h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1585914924626-15adac1e6402?q=80&w=2071&auto=format&fit=crop"
          alt="Luxury Store Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            SCHEDULE AN APPOINTMENT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl"
          >
            Click below to schedule a virtual or an in-store appointment at one of our flagship stores.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white text-black px-12 py-4 text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            BOOK NOW
          </motion.button>
        </div>
      </section>

      {/* Footer Newsletter Section */}
      <section className="bg-[#1a472a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-bold text-white text-center mb-8"
            >
              Enter Into The World of Luxury Fashion
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 items-stretch"
            >
              <input
                type="email"
                placeholder="Enter Your Email Here"
                className="flex-grow bg-transparent border-b-2 border-white/30 text-white placeholder-white/70 py-3 px-4 focus:outline-none focus:border-white transition-colors"
              />
              <button
                className="md:self-end"
                aria-label="Subscribe"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 text-white hover:text-gray-200 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
