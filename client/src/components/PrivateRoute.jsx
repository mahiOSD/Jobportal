//PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
