import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';

function Layout() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  const location = useLocation();
  const isSignupPage = location.pathname === '/signup';
  const userData = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {

    if (userData) {
      setLogin(true);
    } else if (!isSignupPage) { // Redirect to login page if not logged in and not on signup page
      navigate('/login');
      setLogin(false);
    }
  }, [navigate, isSignupPage, userData]);

  return (
    <>
      {isLogin && !isSignupPage && <Header />}
      <Outlet />
    </>
  );
}

export default Layout;
