import React from 'react';
import { motion } from 'framer-motion';
import './DriverCard.css';

const DriverCard = ({ driver, onCancel }) => {
  if (!driver) return null;

  return (
    <motion.div 
      className="driver-card glass-panel"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="driver-header">
        <div className="driver-avatar">
          {driver.name.charAt(0)}
        </div>
        <div className="driver-info">
          <h3>{driver.name}</h3>
          <div className="driver-rating">
            ⭐ <span>{driver.rating}</span> ({driver.trips} trips)
          </div>
        </div>
        <div className="driver-eta">
          <div className="eta-time">{driver.eta} min</div>
          <div className="eta-label">away</div>
        </div>
      </div>

      <div className="vehicle-details">
        <div className="car-model">{driver.car}</div>
        <div className="car-plate">{driver.plate}</div>
      </div>

      <div className="driver-actions">
        <button className="action-btn call-btn">
          📞 Talk
        </button>
        <button className="action-btn support-btn">
          🎧 Support
        </button>
        <button className="action-btn cancel-btn" onClick={onCancel}>
          ✕ Cancel
        </button>
      </div>

      <div className="driver-progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: driver.eta * 60, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

export default DriverCard;
