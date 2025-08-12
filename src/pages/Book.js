import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCar, FaMoneyBillWave, FaRoute, FaMapMarkerAlt, 
  FaArrowRight, FaClock, FaUserFriends, FaCreditCard, 
  FaCheckCircle 
} from 'react-icons/fa';
import '../components/Book.css';

// --- Enhanced Car Data ---
const cars = [
  { 
    id: 1, 
    name: 'Standard Sedan', 
    price: 500, 
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&h=300',
    passengers: 4,
    features: ['A/C', 'Music System']
  },
  { 
    id: 2, 
    name: 'Premium SUV', 
    price: 1000, 
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&h=300',
    passengers: 6,
    features: ['A/C', 'Extra Space', 'Sunroof']
  },
  { 
    id: 3, 
    name: 'Luxury Sedan', 
    price: 1500, 
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=400&h=300',
    passengers: 4,
    features: ['Premium Interior', 'Advanced Safety', 'Top-rated Driver']
  }
];

const Book = () => {
  const { state } = useLocation();
  const { location, destination } = state || { location: 'Not specified', destination: 'Not specified' };
  const navigate = useNavigate();

  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set default date to today
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setBookingDate(formattedDate);
    
    // Set default time to current time + 1 hour
    today.setHours(today.getHours() + 1);
    const formattedTime = today.toTimeString().substr(0, 5);
    setBookingTime(formattedTime);
  }, []);

  const handleSelectCar = useCallback((car) => {
    setSelectedCar(car);
    if (errors.car) setErrors(prev => ({...prev, car: null}));
  }, [errors.car]);

  const handleConfirmBooking = useCallback(() => {
    const newErrors = {};
    if (!selectedCar) newErrors.car = "Please select a vehicle.";
    if (!bookingDate) newErrors.date = "Please select a date.";
    if (!bookingTime) newErrors.time = "Please select a time.";
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/lastpage', { 
          state: { 
            location, 
            destination, 
            price: selectedCar.price,
            car: selectedCar.name, 
            date: bookingDate,
            time: bookingTime,
            passengers
          } 
        });
      }, 2000);
    }
  }, [selectedCar, bookingDate, bookingTime, passengers, location, destination, navigate]);

  const getEstimatedTime = useCallback(() => {
    if (!selectedCar) return "N/A";
    const baseTime = 20;
    const additionalTime = (selectedCar.price / 500) * 10;
    return `${baseTime + additionalTime} min`;
  }, [selectedCar]);

  const getEstimatedDistance = useCallback(() => {
    if (!selectedCar) return "N/A";
    return `${(selectedCar.price / 100).toFixed(1)} km`;
  }, [selectedCar]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="book-container">
      <motion.div 
        className="booking-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Confirm Your Journey</h1>
        <div className="journey-path">
          <span>{location}</span>
          <FaArrowRight className="arrow-icon" />
          <span>{destination}</span>
        </div>
      </motion.div>

      <div className="booking-layout">
        <motion.div 
          className="booking-steps"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Step 1: Select Vehicle */}
          <motion.div className="booking-section" variants={itemVariants}>
            <div className="booking-section-header">
              <FaCar className="section-icon" />
              <h2>1. Select Your Vehicle</h2>
            </div>
            {errors.car && <p className="error-message">{errors.car}</p>}
            <div className="car-options">
              {cars.map((car) => (
                <div 
                  key={car.id} 
                  className={`car-option ${selectedCar?.id === car.id ? 'selected' : ''}`}
                  onClick={() => handleSelectCar(car)}
                >
                  <img src={car.image} alt={car.name} className="car-image" />
                  <div className="car-details">
                    <h3>{car.name}</h3>
                    <div className="car-meta">
                      <span><FaUserFriends /> {car.passengers} Passengers</span>
                    </div>
                    <ul className="car-features">
                      {car.features.map(feature => <li key={feature}><FaCheckCircle/> {feature}</li>)}
                    </ul>
                  </div>
                  <p className="car-price">₹{car.price}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 2: Schedule Ride */}
          <motion.div className="booking-section" variants={itemVariants}>
            <div className="booking-section-header">
              <FaClock className="section-icon" />
              <h2>2. Schedule Your Ride</h2>
            </div>
            <div className="schedule-options">
              <div className="schedule-item">
                <label htmlFor="booking-date">Date:</label>
                <input type="date" id="booking-date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} min={new Date().toISOString().substr(0, 10)} />
              </div>
              <div className="schedule-item">
                <label htmlFor="booking-time">Time:</label>
                <input type="time" id="booking-time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} />
              </div>
              <div className="schedule-item">
                <label>Passengers:</label>
                <div className="passenger-control">
                  <button onClick={() => setPassengers(p => Math.max(1, p - 1))}>-</button>
                  <span>{passengers}</span>
                  <button onClick={() => setPassengers(p => Math.min(selectedCar?.passengers || 8, p + 1))}>+</button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Step 3: Payment */}
          <motion.div className="booking-section" variants={itemVariants}>
            <div className="booking-section-header">
              <FaCreditCard className="section-icon" />
              <h2>3. Payment Method</h2>
            </div>
            <div className="payment-options">
              <div className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}>
                <FaCreditCard/> Credit/Debit Card
              </div>
              <div className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => setPaymentMethod('upi')}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI"/> UPI
              </div>
              <div className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cash')}>
                <FaMoneyBillWave/> Pay with Cash
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Booking Summary Sidebar */}
        <motion.div 
          className="booking-summary-sidebar"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="booking-summary">
            <h2>Booking Summary</h2>
            <div className="summary-item">
              <FaRoute className="summary-icon" />
              <div>
                <h4>Journey</h4>
                <p>{location} <FaArrowRight/> {destination}</p>
                <p className="estimate">Est. Distance: {getEstimatedDistance()}</p>
                <p className="estimate">Est. Time: {getEstimatedTime()}</p>
              </div>
            </div>
            <div className="summary-item">
              <FaCar className="summary-icon" />
              <div>
                <h4>Vehicle</h4>
                <p>{selectedCar ? selectedCar.name : 'Not Selected'}</p>
              </div>
            </div>
            <div className="summary-item">
              <FaClock className="summary-icon" />
              <div>
                <h4>Schedule</h4>
                <p>{bookingDate ? new Date(bookingDate).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'Not Set'}</p>
                <p>{bookingTime || 'Not Set'}</p>
              </div>
            </div>
            <div className="summary-fare">
              <h4>Total Fare</h4>
              <p className="price">₹{selectedCar ? selectedCar.price : '0.00'}</p>
            </div>
            <button className="confirm-button" onClick={handleConfirmBooking} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm & Book'}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div 
            className="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading-content">
              <div className="loading-animation">
                <div className="car-icon"></div>
                <div className="road"></div>
              </div>
              <p>Finalizing your booking...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Book;
