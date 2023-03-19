import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  };

  if (isAuthenticated()) {
    return <Route {...rest} component={Component} />;
  }

  return (
    <Navigate
      to={{
        pathname: '/doctor/login',
        state: { from: rest.location },
      }}
      replace
    />
  );
};

export default PrivateRoute;