import React from "react";
import { Link } from "react-router-dom";
import CartItems from "../../components/user/cart/Cartitems"
import RecentlyViewed from "../../components/user/cart/recentlyviewed";
import Navbar from "../../components/user/navbar/navbar";
import { Helmet } from "react-helmet";

const ShoppingCartPage = () => {
  return (
    <div className="bg-white-50 min-h-screen">
      
      <div className="container mx-auto px-4 py-8 space-y-6 mt-16">

  {/* Content Section */}
   {/* Content Section */}
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto">
    <CartItems />
    <RecentlyViewed />
  </div>
</div>
    </div>
  );
};

export default ShoppingCartPage;