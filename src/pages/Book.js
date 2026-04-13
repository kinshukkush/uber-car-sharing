import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  FaMapMarkerAlt, 
  FaFlagCheckered, 
  FaCar, 
  FaArrowRight, 
  FaArrowLeft, 
  FaTimes, 
  FaCheck, 
  FaClock, 
  FaRoute, 
  FaDollarSign,
  FaShieldAlt,
  FaStar,
  FaPhoneAlt,
  FaCommentDots,
  FaHistory,
  FaSpinner,
  FaCreditCard,
  FaWallet,
  FaApplePay,
  FaGooglePay
} from 'react-icons/fa';
import { MdMyLocation, MdGpsFixed } from 'react-icons/md';

import LocationPicker from '../components/LocationPicker';
import CustomMap from '../components/CustomMap';
import RideOptions from '../components/RideOptions';
import DriverCard from '../components/DriverCard';
import { useBooking } from '../contexts/BookingContext';
import '../components/Book.css';

const Book = () => {
  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isRiding, setIsRiding] = useState(false);
  const [rideProgress, setRideProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const { addBooking, assignDriver, activeBooking, cancelBooking } = useBooking();
  const navigate = useNavigate();

  // Payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: <FaCreditCard />, last4: '4242' },
    { id: 'wallet', name: 'Wallet', icon: <FaWallet />, balance: '\$45.00' },
    { id: 'apple', name: 'Apple Pay', icon: <FaApplePay /> },
    { id: 'google', name: 'Google Pay', icon: <FaGooglePay /> }
  ];

  // Promo codes
  const promoCodes = {
    'FIRST50': 50,
    'RIDE20': 20,
    'CARSHARE10': 10,
    'WELCOME': 15
  };

  // Calculate distance between two coordinates
  const calculateDistance = (p1, p2) => {
    if (!p1 || !p2) return 1;
    const dx = p1.coords.lng - p2.coords.lng;
    const dy = p1.coords.lat - p2.coords.lat;
    const distance = Math.sqrt(dx * dx + dy * dy) * 100;
    return Math.max(distance, 1);
  };

  const distanceMultiplier = calculateDistance(pickup, destination) || 1;
  const estimatedDistance = (distanceMultiplier * 0.8).toFixed(1);

  // Calculate estimated time based on distance
  useEffect(() => {
    if (pickup && destination) {
      const time = Math.round(distanceMultiplier * 2.5 + 5);
      setEstimatedTime(time);
    }
  }, [pickup, destination, distanceMultiplier]);

  // Simulate ride progress
  useEffect(() => {
    if (isRiding && step === 5) {
      const interval = setInterval(() => {
        setRideProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            toast.success('You have arrived at your destination!', { icon: '🎉' });
            return 100;
          }
          return prev + 2;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isRiding, step]);

  // Apply promo code
  const applyPromoCode = () => {
    const code = promoCode.toUpperCase().trim();
    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      toast.success(`Promo code applied! ${promoCodes[code]}% off`, { icon: '🎉' });
    } else {
      toast.error('Invalid promo code');
      setDiscount(0);
    }
  };

  // Calculate final price
  const calculateFinalPrice = () => {
    if (!selectedRide) return 0;
    const basePrice = selectedRide.price * distanceMultiplier;
    const discountAmount = (basePrice * discount) / 100;
    return (basePrice - discountAmount).toFixed(2);
  };

  const handleNextStep = async () => {
    if (step === 1) {
      if (!pickup || !destination) {
        toast.error("Please select both pickup and destination!", { icon: '📍' });
        return;
      }
      if (pickup.id === destination.id) {
        toast.error("Pickup and destination cannot be the same!", { icon: '⚠️' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedRide) {
        toast.error("Please select a ride option!", { icon: '🚗' });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setShowConfirmModal(true);
    }
  };

  const confirmBooking = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    
    const newBooking = addBooking({
      pickup: pickup.name,
      pickupAddress: pickup.address,
      destination: destination.name,
      destinationAddress: destination.address,
      price: calculateFinalPrice(),
      originalPrice: (selectedRide.price * distanceMultiplier).toFixed(2),
      discount: discount,
      type: selectedRide.type,
      paymentMethod: selectedPayment,
      estimatedTime: estimatedTime,
      distance: estimatedDistance
    });

    setStep(4);
    
    try {
      await toast.promise(
        assignDriver(newBooking.id),
        {
          loading: 'Finding the best driver for you...',
          success: 'Driver found! Your ride is confirmed.',
          error: 'Could not find a driver. Please try again.',
        }
      );
      setIsLoading(false);
      setStep(5);
      setIsRiding(true);
    } catch (error) {
      setIsLoading(false);
      setStep(3);
    }
  };

  const handleCancel = () => {
    if (activeBooking) {
      cancelBooking(activeBooking.id);
      setIsRiding(false);
    }
    setStep(1);
    setPickup(null);
    setDestination(null);
    setSelectedRide(null);
    setRideProgress(0);
    setDiscount(0);
    setPromoCode('');
    toast('Booking Cancelled', { icon: 'ℹ️' });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Step configuration
  const steps = [
    { number: 1, title: 'Location', icon: <FaMapMarkerAlt /> },
    { number: 2, title: 'Ride', icon: <FaCar /> },
    { number: 3, title: 'Payment', icon: <FaCreditCard /> },
    { number: 4, title: 'Driver', icon: <FaStar /> },
    { number: 5, title: 'Ride', icon: <FaRoute /> }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20 }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0 })
  };

  return (
    <motion.div 
      className="book-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background Effects */}
      <div className="book-bg-effects">
        <div className="bg-gradient-orb orb-1"></div>
        <div className="bg-gradient-orb orb-2"></div>
      </div>

      <div className="book-container">
        
        {/* Left Panel: Controls */}
        <motion.div 
          className="book-sidebar glass-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Header */}
          <div className="sidebar-header">
            <h1 className="page-title">
              <FaCar className="title-icon" />
              Book Your Ride
            </h1>
            <p className="page-subtitle">Fast, safe, and reliable transportation</p>
          </div>

          {/* Step Indicator */}
          <div className="step-indicator">
            {steps.slice(0, step <= 3 ? 3 : 5).map((s, idx) => (
              <React.Fragment key={s.number}>
                <motion.div 
                  className={`step ${step >= s.number ? 'active' : ''} ${step === s.number ? 'current' : ''}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="step-icon">{s.icon}</span>
                  <span className="step-number">{s.number}</span>
                </motion.div>
                {idx < (step <= 3 ? 2 : 4) && (
                  <div className={`step-line ${step > s.number ? 'active' : ''}`}>
                    <div className="step-line-fill"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Title */}
          <motion.div 
            className="step-header"
            key={step}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="step-title">
              {step === 1 && "Where are you going?"}
              {step === 2 && "Choose Your Ride"}
              {step === 3 && "Payment & Confirm"}
              {step === 4 && "Finding Your Driver"}
              {step === 5 && "Enjoy Your Ride"}
            </h2>
            <p className="step-description">
              {step === 1 && "Enter your pickup and destination locations"}
              {step === 2 && "Select the ride type that suits you best"}
              {step === 3 && "Review your trip and select payment method"}
              {step === 4 && "We're matching you with the best driver nearby"}
              {step === 5 && "Your driver is on the way"}
            </p>
          </motion.div>

          {/* Step Content */}
          <div className="step-content">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Location Selection */}
              {step === 1 && (
                <motion.div 
                  key="step1"
                  className="step-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="location-inputs">
                    <div className="location-input-wrapper">
                      <div className="location-icon pickup-icon">
                        <MdMyLocation />
                      </div>
                      <LocationPicker 
                        label="Pickup Location"
                        placeholder="Enter pickup address"
                        value={pickup}
                        onChange={setPickup}
                      />
                    </div>
                    
                    <div className="location-connector">
                      <div className="connector-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    
                    <div className="location-input-wrapper">
                      <div className="location-icon destination-icon">
                        <FaFlagCheckered />
                      </div>
                      <LocationPicker 
                        label="Destination"
                        placeholder="Where are you going?"
                        value={destination}
                        onChange={setDestination}
                      />
                    </div>
                  </div>

                  {/* Quick Suggestions */}
                  <div className="quick-suggestions">
                    <h4>Recent Places</h4>
                    <div className="suggestion-chips">
                      <button className="suggestion-chip" onClick={() => setDestination({ id: 1, name: "Central Station", address: "123 Main St", coords: { lat: 40.7128, lng: -74.0060 } })}>
                        <FaHistory /> Central Station
                      </button>
                      <button className="suggestion-chip" onClick={() => setDestination({ id: 2, name: "Airport Terminal", address: "Airport Road", coords: { lat: 40.6413, lng: -73.7781 } })}>
                        <FaHistory /> Airport
                      </button>
                    </div>
                  </div>

                  {/* Trip Estimate */}
                  {pickup && destination && (
                    <motion.div 
                      className="trip-estimate"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="estimate-item">
                        <FaRoute className="estimate-icon" />
                        <div>
                          <span className="estimate-label">Distance</span>
                          <span className="estimate-value">{estimatedDistance} km</span>
                        </div>
                      </div>
                      <div className="estimate-divider"></div>
                      <div className="estimate-item">
                        <FaClock className="estimate-icon" />
                        <div>
                          <span className="estimate-label">Est. Time</span>
                          <span className="estimate-value">{estimatedTime} min</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Ride Selection */}
              {step === 2 && (
                <motion.div 
                  key="step2"
                  className="step-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="route-summary-card">
                    <div className="route-point">
                      <span className="route-dot pickup"></span>
                      <div className="route-info">
                        <span className="route-label">Pickup</span>
                        <span className="route-name">{pickup?.name}</span>
                      </div>
                    </div>
                    <div className="route-line-vertical"></div>
                    <div className="route-point">
                      <span className="route-dot destination"></span>
                      <div className="route-info">
                        <span className="route-label">Destination</span>
                        <span className="route-name">{destination?.name}</span>
                      </div>
                    </div>
                    <div className="route-meta">
                      <span><FaRoute /> {estimatedDistance} km</span>
                      <span><FaClock /> {estimatedTime} min</span>
                    </div>
                  </div>

                  <RideOptions 
                    selectedId={selectedRide?.id} 
                    onSelect={setSelectedRide}
                    distanceMultiplier={distanceMultiplier}
                  />
                </motion.div>
              )}

              {/* Step 3: Payment & Confirmation */}
              {step === 3 && (
                <motion.div 
                  key="step3"
                  className="step-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Trip Summary */}
                  <div className="trip-summary-card">
                    <h4>Trip Summary</h4>
                    <div className="summary-row">
                      <span>From</span>
                      <span>{pickup?.name}</span>
                    </div>
                    <div className="summary-row">
                      <span>To</span>
                      <span>{destination?.name}</span>
                    </div>
                    <div className="summary-row">
                      <span>Ride Type</span>
                      <span>{selectedRide?.icon} {selectedRide?.type}</span>
                    </div>
                    <div className="summary-row">
                      <span>Distance</span>
                      <span>{estimatedDistance} km</span>
                    </div>
                    <div className="summary-row">
                      <span>Est. Time</span>
                      <span>{estimatedTime} min</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row">
                      <span>Ride Fare</span>
                      <span>${(selectedRide?.price * distanceMultiplier).toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="summary-row discount">
                        <span>Discount ({discount}%)</span>
                        <span>-${((selectedRide?.price * distanceMultiplier * discount) / 100).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="summary-row total">
                      <span>Total</span>
                      <span className="total-price">${calculateFinalPrice()}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="promo-section">
                    <h4>Have a promo code?</h4>
                    <div className="promo-input-wrapper">
                      <input 
                        type="text" 
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="promo-input"
                      />
                      <button className="promo-btn" onClick={applyPromoCode}>
                        Apply
                      </button>
                    </div>
                    <p className="promo-hint">Try: FIRST50, RIDE20, WELCOME</p>
                  </div>

                  {/* Payment Methods */}
                  <div className="payment-section">
                    <h4>Payment Method</h4>
                    <div className="payment-methods">
                      {paymentMethods.map((method) => (
                        <motion.div 
                          key={method.id}
                          className={`payment-method ${selectedPayment === method.id ? 'selected' : ''}`}
                          onClick={() => setSelectedPayment(method.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="payment-icon">{method.icon}</div>
                          <div className="payment-info">
                            <span className="payment-name">{method.name}</span>
                            {method.last4 && <span className="payment-detail">•••• {method.last4}</span>}
                            {method.balance && <span className="payment-detail">{method.balance}</span>}
                          </div>
                          {selectedPayment === method.id && (
                            <FaCheck className="payment-check" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Finding Driver */}
              {step === 4 && (
                <motion.div 
                  key="step4"
                  className="step-panel finding-driver-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="finding-driver-animation">
                    <div className="radar-container">
                      <div className="radar-ring ring-1"></div>
                      <div className="radar-ring ring-2"></div>
                      <div className="radar-ring ring-3"></div>
                      <div className="radar-center">
                        <FaCar />
                      </div>
                      <div className="radar-sweep"></div>
                    </div>
                    <h3>Finding Your Driver</h3>
                    <p>Connecting you with nearby drivers...</p>
                    
                    <div className="driver-search-stats">
                      <div className="search-stat">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Drivers Nearby</span>
                      </div>
                      <div className="search-stat">
                        <span className="stat-value">~2</span>
                        <span className="stat-label">Min Wait Time</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="btn-outline cancel-btn" onClick={handleCancel}>
                    <FaTimes /> Cancel Request
                  </button>
                </motion.div>
              )}

              {/* Step 5: Ride in Progress */}
              {step === 5 && activeBooking?.driverDetails && (
                <motion.div 
                  key="step5"
                  className="step-panel ride-progress-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="ride-status-badge">
                    <span className="status-dot"></span>
                    {rideProgress < 100 ? 'Ride in Progress' : 'Arrived'}
                  </div>

                  <DriverCard 
                    driver={activeBooking.driverDetails}
                    onCancel={handleCancel}
                    showActions={true}
                  />

                  {/* Ride Progress */}
                  <div className="ride-progress-section">
                    <div className="progress-header">
                      <span>Trip Progress</span>
                      <span>{rideProgress}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div 
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${rideProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="progress-info">
                      <span><FaRoute /> {((parseFloat(estimatedDistance) * rideProgress) / 100).toFixed(1)} / {estimatedDistance} km</span>
                      <span><FaClock /> {Math.round((estimatedTime * (100 - rideProgress)) / 100)} min left</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="quick-actions">
                    <button className="action-btn">
                      <FaPhoneAlt />
                      <span>Call</span>
                    </button>
                    <button className="action-btn">
                      <FaCommentDots />
                      <span>Message</span>
                    </button>
                    <button className="action-btn">
                      <FaShieldAlt />
                      <span>Safety</span>
                    </button>
                  </div>

                  <button 
                    className="btn-primary view-history-btn"
                    onClick={() => navigate('/history')}
                  >
                    <FaHistory /> View Booking History
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {step <= 3 && (
            <div className="step-navigation">
              {step > 1 && (
                <motion.button 
                  className="btn-outline nav-btn back-btn"
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </motion.button>
              )}
              <motion.button 
                className="btn-primary nav-btn next-btn"
                onClick={handleNextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <><FaSpinner className="spin" /> Processing...</>
                ) : (
                  <>
                    {step === 1 && 'Find Rides'}
                    {step === 2 && 'Continue to Payment'}
                    {step === 3 && 'Confirm Booking'}
                    <FaArrowRight />
                  </>
                )}
              </motion.button>
            </div>
          )}

        </motion.div>

        {/* Right Panel: Map */}
        <motion.div 
          className="book-map-area"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CustomMap 
            pickup={pickup} 
            destination={destination}
            isRiding={isRiding}
            rideProgress={rideProgress}
            driver={activeBooking?.driverDetails}
          />
          
          {/* Map Overlay Info */}
          {pickup && destination && step <= 3 && (
            <motion.div 
              className="map-info-overlay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="map-info-card glass-card">
                <div className="info-item">
                  <FaRoute />
                  <span>{estimatedDistance} km</span>
                </div>
                <div className="info-divider"></div>
                <div className="info-item">
                  <FaClock />
                  <span>{estimatedTime} min</span>
                </div>
                <div className="info-divider"></div>
                <div className="info-item">
                  <FaDollarSign />
                  <span>~${selectedRide ? calculateFinalPrice() : (12 * distanceMultiplier).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div 
              className="confirm-modal glass-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Confirm Your Booking</h3>
                <button className="modal-close" onClick={() => setShowConfirmModal(false)}>
                  <FaTimes />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="confirm-route">
                  <div className="confirm-point">
                    <span className="point-dot pickup"></span>
                    <span>{pickup?.name}</span>
                  </div>
                  <div className="confirm-line"></div>
                  <div className="confirm-point">
                    <span className="point-dot destination"></span>
                    <span>{destination?.name}</span>
                  </div>
                </div>

                <div className="confirm-details">
                  <div className="confirm-row">
                    <span>Ride Type</span>
                    <span>{selectedRide?.icon} {selectedRide?.type}</span>
                  </div>
                  <div className="confirm-row">
                    <span>Payment</span>
                    <span>{paymentMethods.find(p => p.id === selectedPayment)?.name}</span>
                  </div>
                  <div className="confirm-row total">
                    <span>Total Amount</span>
                    <span className="confirm-price">${calculateFinalPrice()}</span>
                  </div>
                </div>

                <div className="confirm-notice">
                  <FaShieldAlt />
                  <p>Your payment is secured and you can cancel anytime before the driver arrives.</p>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-outline" onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={confirmBooking}>
                  <FaCheck /> Confirm & Book
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Book;