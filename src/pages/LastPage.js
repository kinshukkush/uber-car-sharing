import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaStar, FaArrowRight } from 'react-icons/fa';
// Removed FaUser since it's not used
import '../components/LastPage.css';

const LastPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeMarker, setActiveMarker] = useState(null);
  const [driverInfo, setDriverInfo] = useState(null);
  const [directions, setDirections] = useState(null);
  const [fare, setFare] = useState(null);
  const [eta, setEta] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const location = useLocation();

  const { location: locationA = '', destination: locationB = '' } = location.state || {};

  const containerStyle = {
    width: '100%',
    height: '70vh',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
  };

  const parseCoordinates = (input, defaultCoords) => {
    if (!input) return defaultCoords;
    const coords = input.split(',').map((val) => parseFloat(val.trim()));
    if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
      return { lat: coords[0], lng: coords[1] };
    }
    return defaultCoords;
  };

  const center = parseCoordinates(locationA, { lat: 26.9124, lng: 75.7873 });
  const destination = parseCoordinates(locationB, { lat: 28.7041, lng: 77.1025 });

  // Calculate route and fare
  const directionsCallback = (response) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
      // Calculate fare based on distance (simplified)
      const distance = response.routes[0].legs[0].distance.value / 1000; // in km
      const calculatedFare = Math.round(50 + distance * 12); // Base fare + distance rate
      setFare(calculatedFare);
      
      // Calculate ETA (simplified)
      const duration = response.routes[0].legs[0].duration.value / 60; // in minutes
      setEta(Math.round(duration));
    }
  };

  // Generate random driver info
  const generateDriverInfo = () => ({
    name: ['Raj', 'Amit', 'Vijay', 'Sanjay', 'Rahul'][Math.floor(Math.random() * 5)],
    rating: (4 + Math.random()).toFixed(1),
    carModel: ['Maruti Suzuki Swift', 'Hyundai Creta', 'Tata Nexon', 'Honda City'][Math.floor(Math.random() * 4)],
    carNumber: `RJ${Math.floor(10 + Math.random() * 90)}AB${Math.floor(1000 + Math.random() * 9000)}`,
    phone: `+91 ${Math.floor(9000000000 + Math.random() * 1000000000)}`,
    avatar: `https://randomuser.me/api/portraits/men/${Math.floor(1 + Math.random() * 99)}.jpg`
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setDriverInfo(generateDriverInfo());
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleConfirmRide = () => {
    setShowConfirmation(true);
    // Simulate loading animation instead of navigating
    setTimeout(() => {
      setShowConfirmation(false);
      alert("Ride confirmed successfully!");
    }, 3000);
  };

  if (loading || showConfirmation) {
    return (
      <motion.div 
        className="loading-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="loading-animation"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "linear"
          }}
        ></motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {showConfirmation ? "Confirming Your Ride..." : "Finding the best route for you..."}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="last-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="map-section">
        <motion.h2 
          className="trip-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Trip: <span>{locationA || 'Jaipur'}</span> to <span>{locationB || 'Delhi'}</span>
        </motion.h2>
        
        <motion.div 
          className="map-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }]
                }
              ]
            }}
          >
            {locationA && locationB && (
              <DirectionsService
                options={{
                  destination: destination,
                  origin: center,
                  travelMode: 'DRIVING'
                }}
                callback={directionsCallback}
              />
            )}

            {directions && (
              <DirectionsRenderer
                options={{
                  directions: directions,
                  suppressMarkers: false,
                  polylineOptions: {
                    strokeColor: "#00C853",
                    strokeWeight: 5,
                    strokeOpacity: 0.8
                  }
                }}
              />
            )}

            <MarkerF
              position={center}
              onClick={() => setActiveMarker('locationA')}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
              }}
            />
            <MarkerF
              position={destination}
              onClick={() => setActiveMarker('locationB')}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
              }}
            />

            {activeMarker === 'locationA' && (
              <InfoWindow
                position={center}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="info-window">
                  <h3><FaMapMarkerAlt /> Pickup Location</h3>
                  <p>{locationA || 'Jaipur (default)'}</p>
                  <p>Coordinates: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}</p>
                </div>
              </InfoWindow>
            )}

            {activeMarker === 'locationB' && (
              <InfoWindow
                position={destination}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="info-window">
                  <h3><FaMapMarkerAlt /> Drop Location</h3>
                  <p>{locationB || 'Delhi (default)'}</p>
                  <p>Coordinates: {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </motion.div>
      </div>

      {/* Ride Details Section */}
      <motion.div 
        className="ride-details"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="details-card">
          <h3>Ride Details</h3>
          {directions && (
            <div className="route-info">
              <div className="info-item">
                <FaClock className="icon" />
                <div>
                  <p>Estimated Time</p>
                  <h4>{eta} minutes</h4>
                </div>
              </div>
              <div className="info-item">
                <FaCar className="icon" />
                <div>
                  <p>Distance</p>
                  <h4>{directions.routes[0].legs[0].distance.text}</h4>
                </div>
              </div>
              <div className="info-item">
                <FaMoneyBillWave className="icon" />
                <div>
                  <p>Approx. Fare</p>
                  <h4>₹{fare}</h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Driver Information */}
      {driverInfo && (
        <motion.div 
          className="driver-info"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="driver-card">
            <h3>Your Driver</h3>
            <div className="driver-profile">
              <img src={driverInfo.avatar} alt={driverInfo.name} className="driver-avatar" />
              <div className="driver-details">
                <h4>{driverInfo.name}</h4>
                <div className="rating">
                  <FaStar className="star" />
                  <span>{driverInfo.rating}</span>
                </div>
                <p>{driverInfo.carModel}</p>
                <p className="car-number">{driverInfo.carNumber}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Confirmation Button */}
      <motion.div 
        className="action-buttons"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button 
          className="confirm-btn"
          onClick={handleConfirmRide}
          disabled={showConfirmation}
        >
          {showConfirmation ? 'Confirming...' : 'Confirm Ride'}
          <FaArrowRight className="arrow" />
        </button>
      </motion.div>
      
      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            className="confirmation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="confirmation-box"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <div className="loading-spinner"></div>
              <h3>Confirming Your Ride</h3>
              <p>Your driver will arrive shortly</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    
  );
};

export default LastPage;