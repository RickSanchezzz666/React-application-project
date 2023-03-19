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

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          <Component />
        ) : (
          <Navigate
            to={{
              pathname: '/doctor/login',
              state: { from: location },
            }}
            replace
          />
        )
      }
    />
  );
};

export default PrivateRoute;