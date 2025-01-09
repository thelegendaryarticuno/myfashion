import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/user/navbar/navbar';
import Footer from '../components/user/Footer/Footer';

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default UserLayout;