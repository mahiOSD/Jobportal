import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
<img src="/images/loading.gif" alt="Loading" className="spinner-gif" />
<div className="loading-text">Loading...</div>
</div>
  );
};

export default LoadingSpinner;
