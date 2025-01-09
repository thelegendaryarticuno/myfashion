import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/admin/sidebar';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';

const CouponPage = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [couponData, setCouponData] = useState({
    code: '',
    name: '',
    expirationDate: '',
    discountPercentage: '',
    status: 'Active' // Default status
  });
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing an existing coupon

  // useEffect(() => {
  //   const verifySeller = async () => {
  //     if (!sellerId) {
  //       navigate('/seller/login');
  //       return;
  //     }

  //     try {
  //       const response = await fetch(`${API_URL}/admin/verify-seller`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ sellerId })
  //       });

  //       const data = await response.json();

  //       if (data.loggedIn !== 'loggedin') {
  //         navigate('/seller/login');
  //       }
  //     } catch (error) {
  //       console.error('Error verifying seller:', error);
  //       navigate('/seller/login');
  //     }
  //   };

  //   verifySeller();
  // }, [sellerId, navigate]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch(`${API_URL}/coupon/get-coupons`);
      const data = await response.json();
      if (data.success) {
        setCoupons(data.coupons);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setError('Failed to fetch coupons');
      setLoading(false);
    }
  };

  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCouponData({ ...couponData, code });
  };

  const handleCreateCoupon = () => {
    generateCouponCode();
    setIsEditing(false); // Reset editing flag for new coupon
    setShowDialog(true);
  };

  const handleEditCoupon = (coupon) => {
    setCouponData({
      code: coupon.code,
      name: coupon.name,
      expirationDate: coupon.expirationDate,
      discountPercentage: coupon.discountPercentage,
      status: coupon.status
    });
    setIsEditing(true);
    setShowDialog(true);
  };

  const handleDeleteCoupon = async (code) => {
    try {
      const response = await fetch(`${API_URL}/coupon/delete-coupons`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (response.ok) {
        fetchCoupons();
      } else {
        setError('Failed to delete coupon');
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
      setError('Something went wrong');
    }
  };

  const handleSaveCoupon = async () => {
    if (!couponData.code || !couponData.discountPercentage || !couponData.name || !couponData.expirationDate) {
      setError('Please fill all fields');
      return;
    }

    try {
      const endpoint = isEditing
        ? `${API_URL}/coupon/update-status`
        : `${API_URL}/coupon/save-coupons`;
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(couponData)
      });

      if (response.ok) {
        setShowDialog(false);
        fetchCoupons();
        setCouponData({
          code: '',
          name: '',
          expirationDate: '',
          discountPercentage: '',
          status: 'Active'
        });
      } else {
        setError('Failed to save coupon');
      }
    } catch (error) {
      console.error('Error saving coupon:', error);
      setError('Something went wrong');
    }
  };

  return (
    <>
      <Helmet>
        <title>Coupons | Admin Dashboard</title>
      </Helmet>
      <Sidebar />
      <div className="min-h-screen bg-white sm:ml-0 md:ml-[10vh] lg:ml-[40vh]">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-black font-serif">Coupons</h1>
              <button
                onClick={handleCreateCoupon}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-serif"
              >
                <Plus size={20} />
                Create New Coupon
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-center py-8 bg-red-50 rounded-lg">{error}</div>
            ) : coupons.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-black">No coupons created yet</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {coupons.map((coupon) => (
                  <motion.div
                    key={coupon._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative font-serif"
                  >
                    <button
                      onClick={() => handleDeleteCoupon(coupon.code)}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      onClick={() => handleEditCoupon(coupon)}
                      className="absolute top-2 left-2 p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit size={20} />
                    </button>
                    <div className="flex flex-col h-full">
                      <h3 className="text-xl font-bold text-black mb-2 pt-5">{coupon.name}</h3>
                      <h4 className="text-sm text-black">{coupon.code}</h4>
                      <div className="flex items-center mt-auto">
                        <span className="text-3xl font-bold text-black">
                          {coupon.discountPercentage}%
                        </span>
                        <span className="ml-2 text-black">OFF</span>
                      </div>
                      <div className="text-sm text-black">
                        {coupon.status} - Expires: {coupon.expirationDate}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {showDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <motion.div
                  className="bg-white p-6 rounded-lg w-full max-w-md font-serif"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <h2 className="text-xl font-bold mb-4 text-black">
                    {isEditing ? 'Edit Coupon' : 'Create New Coupon'}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-black mb-2">Coupon Name</label>
                      <input
                        type="text"
                        value={couponData.name}
                        onChange={(e) => setCouponData({ ...couponData, name: e.target.value })}
                        className="w-full p-2 border border-black rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-black mb-2">Expiration Date</label>
                      <input
                        type="date"
                        value={couponData.expirationDate}
                        onChange={(e) => setCouponData({ ...couponData, expirationDate: e.target.value })}
                        className="w-full p-2 border border-black rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-black mb-2">Coupon Code</label>
                      <input
                        type="text"
                        value={couponData.code}
                        readOnly
                        className="w-full p-2 border border-black rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-black mb-2">Discount Percentage</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={couponData.discountPercentage}
                        onChange={(e) => setCouponData({ ...couponData, discountPercentage: e.target.value })}
                        className="w-full p-2 border border-black rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-black mb-2">Status</label>
                      <select
                        value={couponData.status}
                        onChange={(e) => setCouponData({ ...couponData, status: e.target.value })}
                        className="w-full p-2 border border-black rounded-lg"
                      >
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => setShowDialog(false)}
                        className="px-4 py-2 text-black hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveCoupon}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponPage;