import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/sidebar';
import { Search, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';

const Complaints = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
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

        if (data.loggedIn !== 'loggedin') {
          navigate('/seller/login');
        }
      } catch (error) {
        console.error('Error verifying seller:', error);
        navigate('/seller/login');
      }
    };

    verifySeller();
  }, [sellerId, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`${API_URL}/complaints/get-complaints`);
      const data = await response.json();
      setComplaints(data.complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/update-complaint-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          complaintId,
          status: newStatus
        })
      });

      if (response.ok) {
        fetchComplaints();
      }
      setActiveDropdown(null);
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedComplaints = React.useMemo(() => {
    if (!Array.isArray(complaints)) return [];

    let sortableComplaints = [...complaints];
    if (sortConfig.key !== null) {
      sortableComplaints.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableComplaints;
  }, [complaints, sortConfig]);

  const filteredComplaints = sortedComplaints.filter(complaint =>
    complaint.complaintNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-white min-h-screen">
      <Helmet>
        <title>Complaints | Admin | Taylorzone</title>
      </Helmet>
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8 ml-[5rem] lg:ml-64">
        <div className="container mx-auto">
          {/* Search Section */}
          <div className="mb-6 flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-black" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by complaint ID..."
                className="w-full pl-10 pr-4 py-2.5 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-white shadow-sm transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Complaints Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    {[
                      { key: 'complaintNumber', label: 'Complaint ID' },
                      { key: 'name', label: 'Name' },
                      { key: 'email', label: 'Email' },
                      { key: null, label: 'Message' },
                      { key: 'userType', label: 'User Type' },
                      { key: 'status', label: 'Status' },
                      { key: 'createdAt', label: 'Created At' },
                      { key: null, label: 'Actions' }
                    ].map(({ key, label }) => (
                      <th
                        key={label}
                        onClick={() => key && handleSort(key)}
                        className={`px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider ${key ? 'cursor-pointer hover:bg-gray-200 transition-colors' : ''}`}
                      >
                        <div className="flex items-center font-serif">
                          {label}
                          {key && <ArrowUpDown size={14} className="ml-2 text-black" />}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((complaint) => (
                    <tr
                      key={complaint.complaintNumber}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {complaint.complaintNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {complaint.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {complaint.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-black max-w-xs truncate">
                        {complaint.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {complaint.userType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${complaint.status === 'Resolved'
                            ? 'bg-black text-white'
                            : 'bg-gray-200 text-gray-800'
                          } font-serif`}>
                          {complaint.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm relative dropdown-container">
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(
                              activeDropdown === complaint.complaintNumber
                                ? null
                                : complaint.complaintNumber
                            )}
                            className="flex items-center px-3 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-serif"
                          >
                            Update Status <ChevronDown size={16} className="ml-2" />
                          </button>

                          {activeDropdown === complaint.complaintNumber && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <ul className="py-1">
                                <li
                                  onClick={() => handleStatusChange(complaint.complaintNumber, 'Pending')}
                                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-black hover:text-black"
                                >
                                  Pending
                                </li>
                                <li
                                  onClick={() => handleStatusChange(complaint.complaintNumber, 'Resolved')}
                                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-black hover:text-black"
                                >
                                  Resolved
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;