import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  MessageSquare,
  Users,
  Calendar,
  Menu,
  LayoutDashboard,
  LogOut,
  Ticket,
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { API_URL } from '../../constants'

const Sidebar = () => {
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    img: [],
    category: "",
    description: "",
    rating: 0,
    productId: "",
    inStockValue: 0,
    soldStockValue: 0,
  });
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5 text-black" />,
      path: `/admin/${sellerId}`,
    },
    {
      name: "Products",
      icon: <Package className="w-5 h-5 text-black" />,
      path: `/admin/products/${sellerId}`,
    },
    {
      name: "Orders",
      icon: <ShoppingBag className="w-5 h-5 text-black" />,
      path: `/admin/orders/${sellerId}`,
    },
    {
      name: "Complaints",
      icon: <MessageSquare className="w-5 h-5 text-black" />,
      path: `/admin/complaints/${sellerId}`,
    },
    {
      name: "Customers",
      icon: <Users className="w-5 h-5 text-black" />,
      path: `/admin/customers/${sellerId}`,
    },
    {
      name: "Coupons",
      icon: <Ticket className="w-5 h-5 text-black" />,
      path: `/seller/coupons/${sellerId}`
    },
    {
      name: "Reviews",
      icon: <MessageSquare className="w-5 h-5 text-black" />,
      path: `/admin/reviews/${sellerId}`,
    },
    {
      name: "SEO",
      icon: <MessageSquare className="w-5 h-5 text-black" />,
      path: `/admin/SEO/${sellerId}`,
    }
  ];

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    }
  };

  const generateProductId = () => {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    setProductData({ ...productData, productId: randomId });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
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
        setProductData(prev => ({
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

  const removeImage = (indexToRemove) => {
    setProductData(prev => ({
      ...prev,
      img: prev.img.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${API_URL}/admin/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ sellerId }),
        }
      );

      if (response.ok) {
        navigate("/seller/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (productData.img.length === 0) {
        setUploadStatus('Please upload at least one image');
        return;
      }

      const response = await fetch(
        `${API_URL}/create-product`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        setShowDialog(false);
        setProductData({
          name: "",
          price: "",
          img: [],
          category: "",
          description: "",
          rating: 0,
          productId: "",
          inStockValue: 0,
          soldStockValue: 0,
        });
      } else {
        const errorData = await response.json();
        setUploadStatus('Error creating product: ' + errorData.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setUploadStatus('Error creating product: ' + error.message);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-100 lg:hidden z-50 transition-colors"
      >
        <Menu className="w-6 h-6 text-black" />
      </button>

      {/* Product Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95">
            {/* Header */}
            <div className="border-b p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif text-black">Add New Product</h2>
                <button
                  onClick={() => setShowDialog(false)}
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Image Upload Section */}
              <section className="space-y-4">
                <h3 className="text-base font-semibold text-black">Product Images</h3>
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
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                          id="imageInput"
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
                        }`}
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

                  {/* Image Preview Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {productData.img.map((url, index) => (
                      <div key={index} className="relative group rounded-xl overflow-hidden shadow-sm">
                        <img
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          <X className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Product Form */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-shadow outline-none"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-shadow outline-none"
                    placeholder="Enter price"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Category</label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-shadow outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="fashion">Fashion</option>
                    <option value="gift-items">Gift Items</option>
                    <option value="greeting-cards">Greeting Cards</option>
                    <option value="stationary">Stationary</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={productData.rating}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-shadow outline-none"
                    min={0}
                    max={5}
                    step={0.1}
                    placeholder="Enter rating (0-5)"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Product ID</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="productId"
                      value={productData.productId}
                      readOnly
                      className="flex-1 px-3 py-2 border border-black rounded-lg bg-gray-50 outline-none"
                      placeholder="Click generate to create ID"
                    />
                    <button
                      onClick={generateProductId}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm font-medium"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Stock Information</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      name="inStockValue"
                      value={productData.inStockValue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-shadow outline-none"
                      placeholder="In Stock"
                    />
                    <input
                      type="number"
                      name="soldStockValue"
                      value={productData.soldStockValue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-shadow outline-none"
                      placeholder="Sold Stock"
                    />
                  </div>
                </div>
              </section>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Description</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-shadow outline-none"
                  rows={4}
                  placeholder="Enter product description"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-black">
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 shadow-sm font-medium"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white shadow-xl transition-all duration-300 
                  lg:translate-x-0 lg:w-64 z-40
                  ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:translate-x-0 lg:w-20"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-black">
          {isOpen && (
            <div className="text-2xl font-serif text-black">
              Taylorzone
            </div>
          )}
        </div>

        <div className="flex flex-col h-[calc(100vh-160px)] justify-between">
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all
                      ${location.pathname === item.path
                        ? "bg-black text-white font-serif"
                        : "text-black hover:bg-gray-100 hover:text-gray-800 font-serif"
                      }
                      ${isOpen ? "justify-start space-x-3" : "justify-center"}`}
                  >
                    {item.icon}
                    {isOpen && <span className="font-medium">{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 space-y-4">
            {isOpen && (
              <>
                <button
                  onClick={() => setShowDialog(true)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Package className="w-5 h-5 mr-2 text-white" />
                  Add Product
                </button>

                <Link
                  to="/"
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Go to Website
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-2 text-white" />
                  Logout
                </button>

                <div className="text-center text-gray-400 text-sm">
                  Taylorzone Admin © 2024
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;