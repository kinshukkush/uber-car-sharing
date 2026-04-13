import React from 'react';
import { motion } from 'framer-motion';
import { mockRides } from '../data/mockData';
import './RideOptions.css';

const RideOptions = ({ selectedId, onSelect, distanceMultiplier = 1 }) => {
  return (
    <div className="ride-options-container">
      <h3>Select Ride Type</h3>
      <div className="ride-list">
        {mockRides.map((ride, index) => {
          const finalPrice = (ride.price * distanceMultiplier).toFixed(2);
          const isSelected = selectedId === ride.id;
          
          return (
            <motion.div
              key={ride.id}
              className={`ride-card glass-panel ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(ride)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="ride-icon-wrapper">
                <span className="ride-icon">{ride.icon}</span>
              </div>
              <div className="ride-details">
                <div className="ride-title-row">
                  <h4>{ride.type}</h4>
                  <span className="ride-capacity">👥 {ride.capacity}</span>
                </div>
                <p className="ride-desc">{ride.description}</p>
                <div className="ride-meta">
                  <span className="ride-time">⏱️ {ride.time} away</span>
                </div>
              </div>
              <div className="ride-price">
                <span className="currency">$</span>
                <span className="amount">{finalPrice}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RideOptions;
