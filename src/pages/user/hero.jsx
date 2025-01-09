import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Link } from 'react-router-dom';


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 21,
    minutes: 11,
    seconds: 29,
  });

  const carouselImages = [
    "https://images.pexels.com/photos/4427652/pexels-photo-4427652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/3489129/pexels-photo-3489129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const flashSaleProducts = [
    {
      image: "https://images.pexels.com/photos/4427652/pexels-photo-4427652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Embroidered Kundan Red Maharani",
      originalPrice: 8999,
      salePrice: 4599,
      discount: "47% off",
    },
    {
      image: "https://images.pexels.com/photos/4427652/pexels-photo-4427652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Designer Party Saree",
      originalPrice: 6999,
      salePrice: 3999,
      discount: "43% off",
    },
    {
      image: "https://images.pexels.com/photos/4427652/pexels-photo-4427652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Ethnic Gown Collection",
      originalPrice: 5999,
      salePrice: 2999,
      discount: "50% off",
    },
  ];

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

  // Carousel effect
  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(carouselTimer);
  }, [carouselImages.length]);

  return (
    <div className="w-full bg-white">
      {/* Main Banner Carousel */}
      <div className="relative h-[500px]">
        {carouselImages.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">New Monsoon Collection</h1>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition">
              ORDER NOW
            </button>
          </div>
        </div>
        {/* Carousel Controls */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          onClick={() =>
            setCurrentSlide(
              (currentSlide - 1 + carouselImages.length) % carouselImages.length
            )
          }
        >
          &#8592;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          onClick={() =>
            setCurrentSlide((currentSlide + 1) % carouselImages.length)
          }
        >
          &#8594;
        </button>
      </div>

      {/* Flash Sale Section with updated styling */}
      <div className="bg-gradient-to-r from-red-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-gray-800">Flash Sale</h2>
            </div>
            <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow">
              <Clock className="w-5 h-5 text-red-600" />
              <span className="text-lg font-medium">
                {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {flashSaleProducts.map((product, index) => (
    <motion.div
      key={product.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/product/${product.id}`} state={{ product }}>
        <div className="relative aspect-[3/4]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.discount}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-3 text-gray-800">
            {product.title}
          </h3>
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-red-600">
              ₹{product.salePrice}
            </span>
            <span className="text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  ))}
          </div>
        </div>
      </div>

      {/* Blank Area for Upcoming Banner */}
      <div className="py-12">
        {/* TODO: Add upcoming banner here */}
      </div>

      {/* Shop By Category */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Fantasy", "Jewellery", "Rakhi", "Events"].map((category) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative rounded-lg overflow-hidden"
              >
                <img
                  src={`https://images.pexels.com/photos/876467/pexels-photo-876467.jpeg?auto=compress&cs=tinysrgb&w=800`}
                  alt={category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    {category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Continuous Scrolling Text Banner */}
      <div className="py-8 bg-[#4E0F3E] text-white">
        <div className="container mx-auto overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-8">
              FREE SHIPPING ON ORDERS OVER ₹1000
            </span>
            <span className="mx-8">
              NEW SEASON SALE STARTS NOW! DON'T MISS OUT.
            </span>
            <span className="mx-8">
              LIMITED TIME OFFER, SHOP NOW!
            </span>
            <span className="mx-8">
              EXCLUSIVE DEALS JUST FOR YOU, HURRY!
            </span>
          </div>
        </div>
      </div>

      {/* Triple Banner Ad Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              image: "https://images.pexels.com/photos/3489129/pexels-photo-3489129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              title: "Designer Collection",
              subtitle: "Up to 40% Off",
            },
            {
              image: "https://images.pexels.com/photos/3489129/pexels-photo-3489129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              title: "New Arrivals",
              subtitle: "Shop Latest Trends",
            },
            {
              image: "https://images.pexels.com/photos/3489129/pexels-photo-3489129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              title: "Accessories",
              subtitle: "Starting at ₹299",
            },
          ].map((banner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-80 rounded-lg overflow-hidden group"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                  <p className="text-lg mb-4">{banner.subtitle}</p>
                  <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deal of the Day Banner */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative h-96 rounded-xl overflow-hidden"
        >
          <img
            src="https://images.pexels.com/photos/3489129/pexels-photo-3489129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Deal of the Day"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
            <div className="h-full flex items-center container mx-auto px-4">
              <div className="max-w-lg text-white">
                <div className="inline-block bg-red-600 px-4 py-2 rounded-md mb-4">
                  Deal of the Day
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  Exclusive Designer Collection
                </h2>
                <p className="text-xl mb-6">
                  Get up to 60% off on exclusive designer wear
                </p>
                <div className="flex space-x-4 mb-8">
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded">
                      <span className="text-2xl font-bold">{timeLeft.hours}</span>
                      <p className="text-sm">Hours</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded">
                      <span className="text-2xl font-bold">{timeLeft.minutes}</span>
                      <p className="text-sm">Minutes</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded">
                      <span className="text-2xl font-bold">{timeLeft.seconds}</span>
                      <p className="text-sm">Seconds</p>
                    </div>
                  </div>
                </div>
                <button className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Categories with Hover Effect */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                image: "https://images.pexels.com/photos/346343/pexels-photo-346343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=300",
                name: "Bridal Wear",
                items: "250+ Items",
              },
              {
                image: "https://images.pexels.com/photos/346343/pexels-photo-346343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=300",
                name: "Traditional Sarees",
                items: "180+ Items",
              },
              {
                image: "https://images.pexels.com/photos/346343/pexels-photo-346343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=300",
                name: "Designer Lehengas",
                items: "120+ Items",
              },
              {
                image: "https://images.pexels.com/photos/346343/pexels-photo-346343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=300",
                name: "Fusion Wear",
                items: "150+ Items",
              },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <div className="aspect-square">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">{category.items}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section with Enhanced Design */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3489129/pexels-photo-3489129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-red-800 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Animation Styles */}
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
          display: inline-block;
          white-space: nowrap;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;