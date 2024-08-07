import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === '/auth/signin' || location.pathname === '/auth/signup';

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

export default Layout;
