import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin = false }) {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;