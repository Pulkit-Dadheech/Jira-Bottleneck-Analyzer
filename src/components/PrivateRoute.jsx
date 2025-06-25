import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthModal } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setShowAuthModal } = useAuthModal();

  useEffect(() => {
    if (!token) {
      setShowAuthModal(true);
      navigate('/', { replace: true });
    }
  }, [token, navigate, setShowAuthModal]);

  return token ? children : null;
};

export default PrivateRoute;
