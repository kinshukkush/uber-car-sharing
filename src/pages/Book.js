import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
  const [isRiding, setIsRiding] = useState(false);
  
  const { addBooking, assignDriver, activeBooking, cancelBooking } = useBooking();
  const navigate = useNavigate();

  // Pseudo distance calculator between two lat/lng coords (using Pythagorean approx for mock)
  const calculateDistance = (p1, p2) => {
    if (!p1 || !p2) return 1;
    const dx = p1.coords.lng - p2.coords.lng;
    const dy = p1.coords.lat - p2.coords.lat;
    return Math.sqrt(dx * dx + dy * dy) * 100; // arbitrary multiplier for price
  };

  const distanceMultiplier = calculateDistance(pickup, destination) || 1;

  const handleNextStep = async () => {
    if (step === 1) {
      if (!pickup || !destination) {
        toast.error("Please select pickup and destination!");
        return;
      }
      if (pickup.id === destination.id) {
        toast.error("Pickup and destination cannot be the same!");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedRide) {
        toast.error("Please select a ride option!");
        return;
      }
      
      const newBooking = addBooking({
        pickup: pickup.name,
        destination: destination.name,
        price: (selectedRide.price * distanceMultiplier).toFixed(2),
        type: selectedRide.type
      });

      setStep(3); // Wait for driver
      
      toast.promise(
        assignDriver(newBooking.id),
        {
          loading: 'Finding the best driver for you...',
          success: 'Driver found!',
          error: 'Could not find a driver. Try again.',
        }
      ).then(() => {
        setStep(4); // Driver assigned
        setIsRiding(true); // animate car on map
      });
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
    toast('Booking Cancelled', { icon: 'ℹ️' });
  };

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <motion.div 
      className="book-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="book-container">
        
        {/* Left Panel: Controls */}
        <div className="book-sidebar glass-panel">
          
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          <h2 className="step-title">
            {step === 1 && "Where to?"}
            {step === 2 && "Choose a Ride"}
            {step === 3 && "Finding Driver..."}
            {step === 4 && "Ride Confirmed"}
          </h2>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="location-inputs">
                  <LocationPicker 
                    label="Pickup Location"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={setPickup}
                    icon="📍"
                  />
                  <div className="connector-line"></div>
                  <LocationPicker 
                    label="Drop-off Destination"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={setDestination}
                    icon="🏁"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="ride-selection-wrap"
              >
                <div className="route-summary">
                  <p><strong>From:</strong> {pickup?.name}</p>
                  <p><strong>To:</strong> {destination?.name}</p>
                </div>
                <RideOptions 
                  selectedId={selectedRide?.id} 
                  onSelect={setSelectedRide}
                  distanceMultiplier={distanceMultiplier}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                className="finding-driver-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="radar-spinner"></div>
                <p>Broadcasting request to nearby drivers...</p>
                <button className="outline-btn mt-4" onClick={handleCancel}>Cancel Request</button>
              </motion.div>
            )}

            {step === 4 && activeBooking?.driverDetails && (
              <motion.div key="step4">
                <DriverCard 
                  driver={activeBooking.driverDetails}
                  onCancel={handleCancel}
                />
                <button 
                  className="gradient-btn mt-4 w-100"
                  onClick={() => navigate('/history')}
                >
                  View in History
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {(step === 1 || step === 2) && (
            <button 
              className="gradient-btn complete-step-btn"
              onClick={handleNextStep}
            >
              {step === 1 ? "Search Rides" : "Confirm Booking"}
            </button>
          )}
          
          {step === 2 && (
            <button 
              className="outline-btn back-btn"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          )}

        </div>

        {/* Right Panel: Map */}
        <div className="book-map-area">
          <CustomMap 
            pickup={pickup} 
            destination={destination}
            isRiding={isRiding}
          />
        </div>

      </div>
    </motion.div>
  );
};

export default Book;
