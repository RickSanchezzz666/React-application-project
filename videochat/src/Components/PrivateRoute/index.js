import React from 'react';
import { Navigate } from 'react-router-dom';

const auth = {
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
}

const PrivateRoute = ({ children }) => {
  return auth.isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/doctor/login" replace />
  );
};

export default PrivateRoute;