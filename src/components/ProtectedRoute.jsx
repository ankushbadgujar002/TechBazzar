import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      addToast('Please log in to access this page.', 'warning');
    }
  }, [isLoggedIn, addToast]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
