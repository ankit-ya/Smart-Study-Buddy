import React from 'react';
import Home from './Home';  // Import the Home component (which contains the navbar)
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* Home component which contains the navbar */}
      <Home />
      {/* Outlet is where the matched child route will be rendered */}
      <Outlet />
    </div>
  );
};

export default Layout;
