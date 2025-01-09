import React, { useState, useEffect } from 'react';
import { Pencil, Save, Search, ArrowUpDown, Trash, X, ChevronLeft, ChevronRight, Upload, Loader2, ImageIcon } from 'lucide-react';
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/sidebar';
import { API_URL } from '../../constants';

const Product = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editValues, setEditValues] = useState({
    name: '',
    category: '',
    price: '',
    inStockValue: '',
    soldStockValue: '',
    description: '',
    img: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/get-product`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleImageSelect = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus('');
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setIsUploading(true);
      setUploadStatus('Uploading...');

      const response = await fetch(`${API_URL}/image/image-upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setEditValues(prev => ({
          ...prev,
          img: [...prev.img, data.imageUrl]
        }));
        setUploadStatus('Upload successful');
        setSelectedFile(null);
        const fileInput = document.getElementById('imageInput');
        if (fileInput) fileInput.value = '';
      } else {
        setUploadStatus('Upload failed: ' + data.message);
      }
    } catch (error) {
      setUploadStatus('Upload failed: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (product) => {
    try {
      await fetch(`${API_URL}/delete-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.productId
        })
      });
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    try {
      const updatedImages = editValues.img.filter(img => img !== imageUrl);
      setEditValues(prev => ({
        ...prev,
        img: updatedImages
      }));

      if (currentImageIndex >= updatedImages.length) {
        setCurrentImageIndex(Math.max(0, updatedImages.length - 1));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setEditValues({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      inStockValue: product.inStockValue || '',
      soldStockValue: product.soldStockValue || '',
      description: product.description || '',
      img: Array.isArray(product.img) ? product.img : [product.img]
    });
    setShowDetailModal(true);
    setCurrentImageIndex(0);
  };

  const handleSave = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/instock-update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          ...editValues
        })
      });

      if (response.ok) {
        setEditingId(null);
        setShowDetailModal(false);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleImageNavigation = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) =>
        prev === 0 ? editValues.img.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === editValues.img.length - 1 ? 0 : prev + 1
      );
    }
  };

  const sortedProducts = React.useMemo(() => {
    if (!Array.isArray(products)) return [];

    let sortableProducts = [...products];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const filteredProducts = sortedProducts.filter(product =>
    product.productId?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Helmet>
        <title>Products | Admin | Taylorzone</title>
      </Helmet>
      <Sidebar />
      <div className="flex-1 p-8 ml-[5rem] lg:ml-64 bg-white min-h-screen">
        {/* Search Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative">
            <div className={`flex items-center ${isSearchExpanded ? 'w-full md:w-64' : 'w-10 md:w-64'} transition-all duration-300`}>
              <button
                className="md:hidden absolute left-2 z-10"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              >
                <Search size={20} />
              </button>
              <input
                type="text"
                placeholder="Search by product ID or name..."
                className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black ${isSearchExpanded ? 'w-full opacity-100' : 'w-0 md:w-full opacity-0 md:opacity-100'
                  } transition-all duration-300`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center font-serif">
                    Product
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('category')} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center font-serif">
                    Category
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('price')} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center font-serif">
                    Price
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.productId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="text-blue-600 hover:text-blue-900 font-serif"
                    >
                      {product.name || '-'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {product.category || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {product.price || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-red-600 hover:text-red-900 ml-2"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Detail Modal */}
        {showDetailModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-serif font-bold text-black">{editingId ? 'Edit Product' : 'Product Details'}</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-black hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Image Carousel */}
                <div className="relative mb-6 h-64">
                  {editValues.img && editValues.img.length > 0 ? (
                    <>
                      <img
                        src={editValues.img[currentImageIndex]}
                        alt={`Product ${currentImageIndex + 1}`}
                        className="w-full h-64 object-contain"
                      />
                      {editingId && (
                        <button
                          onClick={() => handleDeleteImage(editValues.img[currentImageIndex])}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <Trash size={16} />
                        </button>
                      )}
                      {editValues.img.length > 1 && (
                        <>
                          <button
                            onClick={() => handleImageNavigation('prev')}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => handleImageNavigation('next')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      No images available
                    </div>
                  )}
                </div>

                {/* Product Details Form */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black font-serif">Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={editValues.name}
                        onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                        disabled={!editingId}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black font-serif">Category</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={editValues.category}
                        onChange={(e) => setEditValues({ ...editValues, category: e.target.value })}
                        disabled={!editingId}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black font-serif">Price</label>
                      <input
                        type="number"
                        className="mt-1 block w-full border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={editValues.price}
                        onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                        disabled={!editingId}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black font-serif">In Stock</label>
                      <input
                        type="number"
                        className="mt-1 block w-full border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={editValues.inStockValue}
                        onChange={(e) => setEditValues({ ...editValues, inStockValue: e.target.value })}
                        disabled={!editingId}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black font-serif">Sold</label>
                      <input
                        type="number"
                        className="mt-1 block w-full border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={editValues.soldStockValue}
                        onChange={(e) => setEditValues({ ...editValues, soldStockValue: e.target.value })}
                        disabled={!editingId}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black font-serif">Description</label>
                      <textarea
                        className="mt-1 block w-full border border-black rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        rows="3"
                        value={editValues.description}
                        onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                        disabled={!editingId}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  {editingId ? (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditValues({
                            name: selectedProduct.name || '',
                            category: selectedProduct.category || '',
                            price: selectedProduct.price || '',
                            inStockValue: selectedProduct.inStockValue || '',
                            soldStockValue: selectedProduct.soldStockValue || '',
                            description: selectedProduct.description || '',
                            img: Array.isArray(selectedProduct.img) ? selectedProduct.img : [selectedProduct.img]
                          });
                        }}
                        className="px-4 py-2 border border-black rounded-md text-black hover:bg-gray-200 font-serif"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave(selectedProduct.productId)}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 font-serif flex items-center"
                      >
                        <Save className="mr-2" />
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingId(selectedProduct.productId)}
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center font-serif"
                    >
                      <Pencil size={16} className="mr-2" />
                      Edit Product
                    </button>
                  )}
                </div>

                {/* Image Upload Section */}
                {editingId && (
                  <div className="mt-6 border-t border-black pt-6">
                    <h3 className="text-lg font-medium text-black mb-4 font-serif">Upload New Images</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer group">
                          <div className="flex items-center justify-center h-36 px-4 transition-all border-2 border-dashed rounded-xl border-black group-hover:border-gray-400 group-hover:bg-gray-100/50">
                            <div className="flex flex-col items-center space-y-2 text-center">
                              <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-gray-500" />
                              <span className="text-sm text-gray-500 group-hover:text-gray-600">
                                {selectedFile ? selectedFile.name : 'Drop image here or click to browse'}
                              </span>
                            </div>
                            <input
                              type="file"
                              id="imageInput"
                              accept="image/*"
                              onChange={handleImageSelect}
                              className="hidden"
                              disabled={isUploading}
                            />
                          </div>
                        </label>
                        <button
                          onClick={handleImageUpload}
                          disabled={!selectedFile || isUploading}
                          className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all ${!selectedFile || isUploading
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-black hover:bg-gray-800 text-white shadow-sm'
                            } font-serif`}
                        >
                          {isUploading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-white" />
                          ) : (
                            <Upload className="w-5 h-5 text-white" />
                          )}
                          <span className="font-medium">{isUploading ? 'Uploading...' : 'Upload'}</span>
                        </button>
                      </div>

                      {uploadStatus && (
                        <p className={`text-sm font-medium ${uploadStatus.includes('failed') || uploadStatus.includes('Error')
                            ? 'text-red-600'
                            : 'text-green-600'
                          }`}>
                          {uploadStatus}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;