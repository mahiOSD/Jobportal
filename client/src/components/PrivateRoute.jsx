import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
