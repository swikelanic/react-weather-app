import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
