import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Sidebar from '../../components/admin/sidebar';
import { ArrowUpDown } from 'lucide-react';
import { API_URL } from '../../constants';

const SEO = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [seoComponents, setSeoComponents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSEO, setCurrentSEO] = useState(null);

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
          fetchSEOComponents();
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

  const fetchSEOComponents = async () => {
    try {
      const response = await fetch(`${API_URL}/seo/getSEOComponents`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setSeoComponents(data);
      } else {
        console.error('Failed to fetch SEO components');
      }
    } catch (error) {
      console.error('Error fetching SEO components:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedSEOComponents = React.useMemo(() => {
    let sortableComponents = [...seoComponents];
    if (sortConfig.key !== null) {
      sortableComponents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableComponents;
  }, [seoComponents, sortConfig]);

  const filteredSEOComponents = sortedSEOComponents.filter(component =>
    component.pageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSEO = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/seo/saveSEOComponents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        fetchSEOComponents();
        setIsAddDialogOpen(false);
      } else {
        console.error('Failed to add SEO component');
      }
    } catch (error) {
      console.error('Error adding SEO component:', error);
    }
  };

  const handleEditSEO = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/seo/editSEOComponents`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        fetchSEOComponents();
        setIsEditDialogOpen(false);
      } else {
        console.error('Failed to edit SEO component');
      }
    } catch (error) {
      console.error('Error editing SEO component:', error);
    }
  };

  const handleDeleteSEO = async (pageName) => {
    try {
      const response = await fetch(`${API_URL}/seo/deleteSEOComponents?pageName=${pageName}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setSeoComponents(seoComponents.filter(component => component.pageName !== pageName));
      } else {
        console.error('Failed to delete SEO component');
      }
    } catch (error) {
      console.error('Error deleting SEO component:', error);
    }
  };

  const SEOForm = ({ initialData, onSubmit, dialogTitle }) => {
    const [formData, setFormData] = useState(initialData || {
      pageName: '',
      title: '',
      description: '',
      keywords: '',
      author: '',
      robots: '',
      canonical: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="seo-form font-serif">
        <h2 className="text-xl font-bold mb-4 text-black">
          {dialogTitle}
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="pageName" className="block text-black mb-2">Page Name</label>
            <input
              id="pageName"
              name="pageName"
              value={formData.pageName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-black mb-2">Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-black mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="keywords" className="block text-black mb-2">Keywords</label>
            <input
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-black mb-2">Author</label>
            <input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="robots" className="block text-black mb-2">Robots</label>
            <input
              id="robots"
              name="robots"
              value={formData.robots}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="canonical" className="block text-black mb-2">Canonical URL</label>
            <input
              id="canonical"
              name="canonical"
              value={formData.canonical}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="ogTitle" className="block text-black mb-2">OG Title</label>
            <input
              id="ogTitle"
              name="ogTitle"
              value={formData.ogTitle}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="ogDescription" className="block text-black mb-2">OG Description</label>
            <input
              id="ogDescription"
              name="ogDescription"
              value={formData.ogDescription}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="ogImage" className="block text-black mb-2">OG Image</label>
            <input
              id="ogImage"
              name="ogImage"
              value={formData.ogImage}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="ogUrl" className="block text-black mb-2">OG URL</label>
            <input
              id="ogUrl"
              name="ogUrl"
              value={formData.ogUrl}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="twitterTitle" className="block text-black mb-2">Twitter Title</label>
            <input
              id="twitterTitle"
              name="twitterTitle"
              value={formData.twitterTitle}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="twitterDescription" className="block text-black mb-2">Twitter Description</label>
            <input
              id="twitterDescription"
              name="twitterDescription"
              value={formData.twitterDescription}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="twitterImage" className="block text-black mb-2">Twitter Image</label>
            <input
              id="twitterImage"
              name="twitterImage"
              value={formData.twitterImage}
              onChange={handleChange}
              className="w-full p-2 border border-black rounded-lg bg-white"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => {
              initialData ? setIsEditDialogOpen(false) : setIsAddDialogOpen(false);
            }}
            className="px-4 py-2 text-black hover:text-gray-800 font-serif"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-serif"
          >
            Save Changes
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="flex">
      <Helmet>
        <title>SEO Management | Admin | Mera Bestie</title>
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
                placeholder="Search by page name or title..."
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
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-serif"
            onClick={() => setIsAddDialogOpen(true)}
          >
            Add SEO
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                {['pageName', 'title', 'description', 'keywords', 'author', 'robots', 'canonical', 'ogTitle', 'ogDescription', 'ogImage', 'ogUrl', 'twitterTitle', 'twitterDescription', 'twitterImage'].map((key) => (
                  <th key={key} onClick={() => handleSort(key)} className="px-6 py-3 text-left text-xs font-serif font-semibold text-black uppercase tracking-wider cursor-pointer">
                    <div className="flex items-center">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <ArrowUpDown size={14} className="ml-1 text-black" />
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-serif font-semibold text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSEOComponents.map((component) => (
                <tr key={component._id} className="hover:bg-gray-50 transition-colors duration-200">
                  {['pageName', 'title', 'description', 'keywords', 'author', 'robots', 'canonical', 'ogTitle', 'ogDescription', 'ogImage', 'ogUrl', 'twitterTitle', 'twitterDescription', 'twitterImage'].map((key) => (
                    <td key={key} className="px-6 py-4 whitespace-nowrap text-sm font-serif text-black">
                      {component[key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-serif font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => { setCurrentSEO(component); setIsEditDialogOpen(true); }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteSEO(component.pageName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md font-serif">
            <span
              className="absolute top-2 right-2 text-black hover:text-gray-800 cursor-pointer"
              onClick={() => setIsAddDialogOpen(false)}
            >&times;</span>
            <SEOForm onSubmit={handleAddSEO} dialogTitle="Add SEO Component" />
          </div>
        </div>
      )}

      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md font-serif">
            <span
              className="absolute top-2 right-2 text-black hover:text-gray-800 cursor-pointer"
              onClick={() => setIsEditDialogOpen(false)}
            >&times;</span>
            <SEOForm initialData={currentSEO} onSubmit={handleEditSEO} dialogTitle="Edit SEO Component" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SEO;