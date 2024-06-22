import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
};

export default PrivateRoute;
