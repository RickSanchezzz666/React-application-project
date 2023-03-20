import React from 'react';
import { Navigate } from 'react-router-dom';
// import axios from 'axios';

const auth = {
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
}

/* const auth = {
  isAuthenticated: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const response = await axios.post('/api/auth/gatekeeper', { token });
      return response.data.isValid;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
}; */

const PrivateRoute = ({ children }) => {
  return auth.isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/doctor/login" replace />
  );
};

export default PrivateRoute;