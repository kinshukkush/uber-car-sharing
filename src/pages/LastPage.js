import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCar, FaMapMarkerAlt, FaClock, FaMoneyBillWave, 
  FaStar, FaArrowRight, FaPhone, FaCommentDots, FaCheckCircle 
} from 'react-icons/fa';
import '../components/LastPage.css';

// --- Mock Driver Data Generator ---
const generateDriverInfo = () => ({
  name: ['Raj Kumar', 'Amit Singh', 'Vijay Sharma', 'Sanjay Verma', 'Rahul Gupta'][Math.floor(Math.random() * 5)],
  rating: (4.5 + Math.random() * 0.5).toFixed(1),
  carModel: ['Maruti Suzuki Swift', 'Hyundai Creta', 'Tata Nexon', 'Honda City'][Math.floor(Math.random() * 4)],
  carNumber: `RJ${Math.floor(10 + Math.random() * 90)}AB${Math.floor(1000 + Math.random() * 9000)}`,
  avatar: `https://randomuser.me/api/portraits/men/${Math.floor(1 + Math.random() * 99)}.jpg`,
  eta: Math.floor(Math.random() * 5 + 3), // ETA in minutes
});

const LastPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [driverInfo, setDriverInfo] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Safely access state from the previous page with defaults
  const { 
    location: pickupLocation = 'Jaipur', 
    destination = 'Delhi',
    price = 750,
    car = 'Standard Sedan',
    date = new Date().toISOString().substr(0, 10),
    time = new Date().toTimeString().substr(0, 5),
    passengers = 1
  } = location.state || {};

  useEffect(() => {
    // Simulate fetching driver details
    const timer = setTimeout(() => {
      setDriverInfo(generateDriverInfo());
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleConfirmRide = useCallback(() => {
    setIsConfirmed(true);
    // After a delay, you might navigate home or to a trip status page
    setTimeout(() => {
        // Example: navigate('/trip-status', { state: { tripId: '123' } });
    }, 4000);
  }, [navigate]);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };
  
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-animation">
          <div className="car-icon-loader"></div>
          <div className="road-loader"></div>
        </div>
        <p>Finding a driver for you...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="last-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="main-content">
        <motion.div className="map-section" variants={itemVariants}>
          <iframe
            src={`https://www.google.com/maps/embed/v1/directions?key=&origin=${encodeURIComponent(pickupLocation)}&destination=${encodeURIComponent(destination)}&mode=driving`}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            title="Route Map"
          />
        </motion.div>

        <motion.div className="details-section" variants={itemVariants}>
          <div className="driver-card">
            <div className="driver-header">
              <img src={driverInfo.avatar} alt={driverInfo.name} className="driver-avatar" />
              <div className="driver-details">
                <h4>{driverInfo.name}</h4>
                <div className="rating">
                  <FaStar /><span>{driverInfo.rating}</span>
                </div>
              </div>
              <div className="driver-eta">
                <p>Arriving in</p>
                <span>{driverInfo.eta} min</span>
              </div>
            </div>
            <div className="car-info">
              <p>{driverInfo.carModel}</p>
              <span className="car-number">{driverInfo.carNumber}</span>
            </div>
            <div className="driver-actions">
              <button className="action-btn"><FaPhone /> Call</button>
              <button className="action-btn"><FaCommentDots /> Message</button>
            </div>
          </div>

          <div className="trip-summary-card">
            <h3>Trip Summary</h3>
            <div className="summary-item">
              <FaMapMarkerAlt className="icon start" />
              <div>
                <p>From</p>
                <h4>{pickupLocation}</h4>
              </div>
            </div>
            <div className="summary-item">
              <FaMapMarkerAlt className="icon end" />
              <div>
                <p>To</p>
                <h4>{destination}</h4>
              </div>
            </div>
            <div className="summary-item">
              <FaCar className="icon" />
              <div>
                <p>Vehicle</p>
                <h4>{car}</h4>
              </div>
            </div>
            <div className="summary-item fare">
              <FaMoneyBillWave className="icon" />
              <div>
                <p>Total Fare</p>
                <h4>₹{price}</h4>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div className="footer-actions" variants={itemVariants}>
        <button className="cancel-btn">Cancel Ride</button>
        <button className="confirm-btn" onClick={handleConfirmRide} disabled={isConfirmed}>
          {isConfirmed ? 'Confirmed!' : 'Confirm Ride'}
          {!isConfirmed && <FaArrowRight />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isConfirmed && (
          <motion.div 
            className="confirmation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="confirmation-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <FaCheckCircle className="success-icon"/>
              <h3>Ride Confirmed!</h3>
              <p>{driverInfo.name} is on the way and will arrive in approximately {driverInfo.eta} minutes.</p>
              <button className="track-ride-btn" onClick={() => navigate('/')}>Track Your Ride</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LastPage;
