import React from 'react';

function Hero() {
  return (
    <div className="w-full">
      {/* Main Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Elevate Your Style With Fashion Store: Where Fashion Meets Passion
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the latest trends and express your unique style with our curated collection
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b',
            'https://images.unsplash.com/photo-1529139574466-a303027c1d8b'
          ].map((image, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              <img
                src={`${image}?auto=format&fit=crop&w=600&q=80`}
                alt="Fashion lifestyle"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Our Latest Collections For You
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Lifestyle for Gents',
              image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22'
            },
            {
              title: 'Fashion Style',
              image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b'
            },
            {
              title: 'Cozy Fashion Deals',
              image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
            }
          ].map((collection, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={`${collection.image}?auto=format&fit=crop&w=600&q=80`}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                <h3 className="text-white text-xl font-semibold">{collection.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Latest Arrivals in Categories
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              name: 'Classic Tee',
              price: '$29.99',
              image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
            },
            {
              name: 'Casual Shirt',
              price: '$39.99',
              image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c'
            },
            {
              name: 'Summer Tee',
              price: '$24.99',
              image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a'
            },
            {
              name: 'Denim Style',
              price: '$49.99',
              image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0'
            }
          ].map((product, index) => (
            <div key={index} className="group">
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img
                  src={`${product.image}?auto=format&fit=crop&w=400&q=80`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Women's Collection",
              image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f'
            },
            {
              title: "Men's Collection",
              image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`${feature.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                <h3 className="text-white text-2xl font-semibold">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Holiday Promotion */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-lg bg-green-800 text-white p-8 sm:p-12">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Save 20% this Holiday season
              </h2>
              <p className="mb-6 max-w-2xl">
                Get ready to elevate your style with our special holiday deals. Limited time offer on selected items.
              </p>
              <button className="bg-white text-green-800 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;

