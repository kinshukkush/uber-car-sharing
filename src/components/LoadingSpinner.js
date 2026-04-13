import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loader-container">
      <div className="car-loader">
        <div className="car-body">🚗</div>
        <div className="road"></div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
