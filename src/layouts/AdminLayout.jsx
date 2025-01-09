import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      {/* Add any admin-specific components like sidebars here if needed */}
      <Outlet />
    </>
  );
};

export default AdminLayout;