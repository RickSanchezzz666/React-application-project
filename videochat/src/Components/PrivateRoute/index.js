import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      axios.get('/api/gatekeeper', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAuth(true);
        }
      })
      .catch((err) => {
        setAuth(false);
      })
      .then(() => setIsTokenValidated(true));
    } else {
       setIsTokenValidated(true);
    }
  }, [])

  if (!isTokenValidated) return <div />;

  return auth ? (
    children
  ) : (
    <Navigate to="/doctor/login" replace />
  );
};

export default PrivateRoute;