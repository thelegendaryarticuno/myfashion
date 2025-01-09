import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/sidebar';
import { ArrowUpDown } from 'lucide-react';
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';

const Reviews = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  useEffect(() => {
    const verifySeller = async () => {
      if (!sellerId) {
        navigate('/seller/login');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/admin/verify-seller`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sellerId })
        });

        const data = await response.json();

        if (data.loggedIn === 'loggedin') {
          fetchReviews();
        } else {
          navigate('/seller/login');
        }
      } catch (error) {
        console.error('Error verifying seller:', error);
        navigate('/seller/login');
      }
    };

    verifySeller();
  }, [sellerId, navigate]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/reviews/get-reviews`);
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      } else {
        console.error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedReviews = React.useMemo(() => {
    let sortableReviews = [...reviews];
    if (sortConfig.key !== null) {
      sortableReviews.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableReviews;
  }, [reviews, sortConfig]);

  const filteredReviews = sortedReviews.filter(review =>
    review.productId?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.review?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-white min-h-screen">
      <Helmet>
        <title>Reviews | Admin | Mera Bestie</title>
      </Helmet>
      <Sidebar />
      <div className="flex-1 p-8 ml-[5rem] lg:ml-64 bg-white min-h-screen">
        <div className="mb-6 flex justify-between items-center">
          <div className="relative">
            <div className={`flex items-center ${isSearchExpanded ? 'w-full md:w-64' : 'w-10 md:w-64'} transition-all duration-300`}>
              <button
                className="md:hidden absolute left-2 z-10"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search by product ID or review..."
                className={`pl-10 pr-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black ${isSearchExpanded ? 'w-full opacity-100' : 'w-0 md:w-full opacity-100'
                  } transition-all duration-300 font-serif text-black bg-white`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th onClick={() => handleSort('productId')} className="px-6 py-3 text-left text-xs font-serif font-semibold text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Product ID
                    <ArrowUpDown size={14} className="ml-1 text-black" />
                  </div>
                </th>
                <th onClick={() => handleSort('rating')} className="px-6 py-3 text-left text-xs font-serif font-semibold text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Rating
                    <ArrowUpDown size={14} className="ml-1 text-black" />
                  </div>
                </th>
                <th onClick={() => handleSort('review')} className="px-6 py-3 text-left text-xs font-serif font-semibold text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Review
                    <ArrowUpDown size={14} className="ml-1 text-black" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-serif text-black">
                    {review.productId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-serif text-black">
                    {review.rating}
                  </td>
                  <td className="px-6 py-4 text-sm font-serif text-black">
                    {review.review}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reviews;