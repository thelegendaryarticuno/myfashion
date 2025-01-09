import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/sidebar';
import { Search, ArrowUpDown } from 'lucide-react';
import { Helmet } from "react-helmet";
import { API_URL } from '../../constants';

const Customers = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_URL}/get-user`);
      const data = await response.json();
      if (data.success) {
        // Map the user data and set default values if fields are missing
        const mappedUsers = data.users.map(user => ({
          userId: user.userId || '',
          name: user.name || '',
          email: user.email || '',
          accountStatus: user.accountStatus || 'open'
        }));
        setCustomers(mappedUsers);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/update-account-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          accountStatus: newStatus
        })
      });

      if (response.ok) {
        setCustomers(prevCustomers =>
          prevCustomers.map(customer =>
            customer.userId === userId
              ? { ...customer, accountStatus: newStatus }
              : customer
          )
        );
      }
    } catch (error) {
      console.error('Error updating account status:', error);
    }
  };

  const sortedCustomers = React.useMemo(() => {
    if (!Array.isArray(customers)) return [];

    let sortableCustomers = [...customers];
    if (sortConfig.key !== null) {
      sortableCustomers.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';

        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();

        if (aString < bString) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aString > bString) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCustomers;
  }, [customers, sortConfig]);

  const filteredCustomers = React.useMemo(() => {
    return sortedCustomers.filter(customer => {
      const searchLower = searchQuery.toLowerCase();
      const userId = customer.userId?.toString().toLowerCase() || '';
      const customerName = customer.name?.toLowerCase() || '';
      const customerEmail = customer.email?.toLowerCase() || '';

      return userId.includes(searchLower) ||
        customerName.includes(searchLower) ||
        customerEmail.includes(searchLower);
    });
  }, [sortedCustomers, searchQuery]);

  return (
    <div className="flex bg-white min-h-screen">
      <Helmet>
        <title>Customers | Admin | Mera Bestie</title>
      </Helmet>
      <Sidebar />
      <div className="flex-1 p-8 ml-[5rem] lg:ml-64 bg-white min-h-screen">
        <div className="mb-6 flex justify-center">
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by user ID, name or email..."
                className="w-full pl-10 pr-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black font-serif"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-black" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th onClick={() => handleSort('userId')} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center font-serif">
                    User ID
                    <ArrowUpDown size={14} className="ml-1 text-black" />
                  </div>
                </th>
                <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center font-serif">
                    Name
                    <ArrowUpDown size={14} className="ml-1 text-black" />
                  </div>
                </th>
                <th onClick={() => handleSort('email')} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center font-serif">
                    Email
                    <ArrowUpDown size={14} className="ml-1 text-black" />
                  </div>
                </th>
                <th onClick={() => handleSort('accountStatus')} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center font-serif">
                    Account Status
                    <ArrowUpDown size={14} className="ml-1 text-black" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((user) => (
                <tr key={user.userId || Math.random()} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {user.userId || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {user.name || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {user.email || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <select
                      value={user.accountStatus || 'open'}
                      onChange={(e) => handleStatusChange(user.userId, e.target.value)}
                      className="border border-black rounded px-2 py-1 font-serif focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="open">Open</option>
                      <option value="suspended">Suspended</option>
                      <option value="blocked">Blocked</option>
                    </select>
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

export default Customers;