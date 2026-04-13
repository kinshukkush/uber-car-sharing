import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPhone, 
  FaCommentDots, 
  FaTimes, 
  FaStar, 
  FaShieldAlt, 
  FaShare,
  FaCar,
  FaMapMarkerAlt,
  FaClock,
  FaRoute,
  FaCheckCircle,
  FaUserCheck,
  FaIdCard,
  FaCarSide,
  FaThumbsUp,
  FaHeart,
  FaHeadset,
  FaExclamationTriangle
} from 'react-icons/fa';
import { MdVerified, MdLocalTaxi } from 'react-icons/md';
import './DriverCard.css';

const DriverCard = ({ 
  driver, 
  onCancel, 
  showActions = true,
  tripDetails = null,
  onCall,
  onMessage,
  onShare,
  compact = false 
}) => {
  const [showSafetyInfo, setShowSafetyInfo] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [showQuickMessages, setShowQuickMessages] = useState(false);
  const [arrivalProgress, setArrivalProgress] = useState(0);

  // Quick message templates
  const quickMessages = [
    "I'm waiting outside",
    "Please come to the main entrance",
    "I'll be there in 2 minutes",
    "Can you call me?",
    "I'm wearing a blue jacket"
  ];

  // Simulate arrival progress
  useEffect(() => {
    if (driver?.eta) {
      const totalTime = driver.eta * 60 * 1000; // Convert minutes to ms
      const interval = setInterval(() => {
        setArrivalProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + (100 / (totalTime / 1000));
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [driver?.eta]);

  if (!driver) return null;

  const handleCall = () => {
    if (onCall) {
      onCall(driver);
    } else {
      // Simulate call
      window.open(`tel:${driver.phone || '+1234567890'}`);
    }
  };

  const handleMessage = (msg) => {
    const message = msg || messageText;
    if (onMessage && message) {
      onMessage(driver, message);
    }
    setMessageText('');
    setShowQuickMessages(false);
  };

  const handleShare = () => {
    if (onShare) {
      onShare(driver);
    } else {
      // Native share or copy to clipboard
      const shareText = `I'm riding with ${driver.name} in a ${driver.car} (${driver.plate}). Track my ride on CarShare!`;
      if (navigator.share) {
        navigator.share({ title: 'My CarShare Ride', text: shareText });
      } else {
        navigator.clipboard.writeText(shareText);
      }
    }
  };

  const handleCancel = () => {
    if (showCancelConfirm) {
      onCancel && onCancel();
      setShowCancelConfirm(false);
    } else {
      setShowCancelConfirm(true);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.9, y: -20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className={`driver-card glass-card ${compact ? 'compact' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Status Badge */}
      <div className="driver-status-badge">
        <span className="status-dot"></span>
        <span>Driver Assigned</span>
        <FaCheckCircle className="status-icon" />
      </div>

      {/* Driver Header */}
      <motion.div 
        className="driver-header"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <div className="driver-avatar-section">
          <div className="driver-avatar">
            {driver.image ? (
              <img src={driver.image} alt={driver.name} />
            ) : (
              <span>{driver.name.charAt(0)}</span>
            )}
            <div className="avatar-badge verified">
              <MdVerified />
            </div>
          </div>
          <motion.button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart />
          </motion.button>
        </div>

        <div className="driver-info">
          <div className="driver-name-row">
            <h3>{driver.name}</h3>
            <span className="verified-badge">
              <FaUserCheck /> Verified
            </span>
          </div>
          <div className="driver-stats">
            <div className="stat rating">
              <FaStar className="star-icon" />
              <span className="stat-value">{driver.rating}</span>
              <span className="stat-label">({driver.trips?.toLocaleString() || '500+'} trips)</span>
            </div>
          </div>
          <div className="driver-badges">
            <span className="badge top-rated">
              <FaThumbsUp /> Top Rated
            </span>
            <span className="badge safe-driver">
              <FaShieldAlt /> Safe Driver
            </span>
          </div>
        </div>

        <div className="driver-eta">
          <div className="eta-circle">
            <svg viewBox="0 0 36 36" className="eta-progress">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              <motion.path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${arrivalProgress}, 100` }}
                transition={{ duration: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
            <div className="eta-content">
              <span className="eta-time">{driver.eta}</span>
              <span className="eta-unit">min</span>
            </div>
          </div>
          <span className="eta-label">Arriving</span>
        </div>
      </motion.div>

      {/* Vehicle Details */}
      <motion.div 
        className="vehicle-section"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <div className="vehicle-icon">
          <FaCarSide />
        </div>
        <div className="vehicle-info">
          <span className="vehicle-model">{driver.car}</span>
          <span className="vehicle-color">{driver.carColor || 'Black'} • {driver.carYear || '2023'}</span>
        </div>
        <div className="vehicle-plate">
          <span className="plate-number">{driver.plate}</span>
        </div>
      </motion.div>

      {/* Trip Details (if provided) */}
      {tripDetails && (
        <motion.div 
          className="trip-details-section"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <div className="trip-route">
            <div className="route-point">
              <span className="point-icon pickup"><FaMapMarkerAlt /></span>
              <div className="point-info">
                <span className="point-label">Pickup</span>
                <span className="point-name">{tripDetails.pickup}</span>
              </div>
            </div>
            <div className="route-line"></div>
            <div className="route-point">
              <span className="point-icon destination"><FaMapMarkerAlt /></span>
              <div className="point-info">
                <span className="point-label">Destination</span>
                <span className="point-name">{tripDetails.destination}</span>
              </div>
            </div>
          </div>
          <div className="trip-meta">
            <div className="meta-item">
              <FaRoute />
              <span>{tripDetails.distance || '5.2'} km</span>
            </div>
            <div className="meta-item">
              <FaClock />
              <span>{tripDetails.duration || '15'} min</span>
            </div>
            <div className="meta-item price">
              <span className="currency">$</span>
              <span className="amount">{tripDetails.price || '18.50'}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      {showActions && (
        <motion.div 
          className="driver-actions"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <motion.button 
            className="action-btn call-btn"
            onClick={handleCall}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaPhone />
            <span>Call</span>
          </motion.button>
          
          <motion.button 
            className="action-btn message-btn"
            onClick={() => setShowQuickMessages(!showQuickMessages)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaCommentDots />
            <span>Message</span>
          </motion.button>
          
          <motion.button 
            className="action-btn share-btn"
            onClick={handleShare}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaShare />
            <span>Share</span>
          </motion.button>
          
          <motion.button 
            className="action-btn safety-btn"
            onClick={() => setShowSafetyInfo(!showSafetyInfo)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaShieldAlt />
            <span>Safety</span>
          </motion.button>
        </motion.div>
      )}

      {/* Quick Messages Panel */}
      <AnimatePresence>
        {showQuickMessages && (
          <motion.div 
            className="quick-messages-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="quick-messages-header">
              <h4>Quick Messages</h4>
              <button onClick={() => setShowQuickMessages(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="quick-messages-list">
              {quickMessages.map((msg, idx) => (
                <motion.button 
                  key={idx}
                  className="quick-message-btn"
                  onClick={() => handleMessage(msg)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {msg}
                </motion.button>
              ))}
            </div>
            <div className="custom-message-input">
              <input 
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleMessage()}
              />
              <button 
                className="send-btn" 
                onClick={() => handleMessage()}
                disabled={!messageText}
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safety Info Panel */}
      <AnimatePresence>
        {showSafetyInfo && (
          <motion.div 
            className="safety-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="safety-header">
              <FaShieldAlt />
              <h4>Safety Features</h4>
              <button onClick={() => setShowSafetyInfo(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="safety-items">
              <div className="safety-item">
                <FaUserCheck className="safety-icon verified" />
                <div className="safety-text">
                  <span className="safety-title">Background Checked</span>
                  <span className="safety-desc">Driver passed verification</span>
                </div>
              </div>
              <div className="safety-item">
                <FaIdCard className="safety-icon" />
                <div className="safety-text">
                  <span className="safety-title">Licensed Driver</span>
                  <span className="safety-desc">Valid driving license verified</span>
                </div>
              </div>
              <div className="safety-item">
                <FaCar className="safety-icon" />
                <div className="safety-text">
                  <span className="safety-title">Vehicle Inspected</span>
                  <span className="safety-desc">Safety inspection passed</span>
                </div>
              </div>
              <div className="safety-item">
                <MdLocalTaxi className="safety-icon" />
                <div className="safety-text">
                  <span className="safety-title">GPS Tracked</span>
                  <span className="safety-desc">Real-time location monitoring</span>
                </div>
              </div>
            </div>
            <button className="emergency-btn">
              <FaExclamationTriangle />
              Emergency SOS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Section */}
      {onCancel && (
        <motion.div 
          className="cancel-section"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {!showCancelConfirm ? (
              <motion.button 
                key="cancel"
                className="cancel-ride-btn"
                onClick={() => setShowCancelConfirm(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FaTimes />
                <span>Cancel Ride</span>
              </motion.button>
            ) : (
              <motion.div 
                key="confirm"
                className="cancel-confirm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p>Are you sure you want to cancel?</p>
                <p className="cancel-note">Cancellation fee may apply</p>
                <div className="confirm-btns">
                  <button 
                    className="confirm-yes"
                    onClick={handleCancel}
                  >
                    Yes, Cancel
                  </button>
                  <button 
                    className="confirm-no"
                    onClick={() => setShowCancelConfirm(false)}
                  >
                    Keep Ride
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Support Link */}
      <div className="support-link">
        <FaHeadset />
        <span>Need help? <a href="#support">Contact Support</a></span>
      </div>

      {/* Progress Bar */}
      <div className="driver-progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: "0%" }}
          animate={{ width: `${arrivalProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default DriverCard;