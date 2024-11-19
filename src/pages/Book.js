import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/Book.css';

const Book = () => {
  const { state } = useLocation();
  const { location, destination } = state || {};
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectPrice = (price) => {
    setSelectedPrice(price);
  };

  const handleConfirmBooking = () => {
    if (selectedPrice) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/lastpage', { state: { location, destination } }); // Pass location and destination here
        // }, 10000);
      }, 100);
    } else {
      alert("Please select a price range first.");
    }
  };

  return (
    <div className="book-container">
      <h1>Booking Details</h1>
      <p>From: {location}</p>
      <p>To: {destination}</p>

      <h2>Select a Price Range</h2>
      <div className="price-options">
        <button onClick={() => handleSelectPrice(500)}>₹500</button>
        <button onClick={() => handleSelectPrice(1000)}>₹1000</button>
        <button onClick={() => handleSelectPrice(1500)}>₹1500</button>
      </div>

      {selectedPrice && !loading && (
        <div className="booking-info">
          <h3>Booking Information</h3>
          <p>Journey: {location} to {destination}</p>
          <p>Price: ₹{selectedPrice}</p>
          <button className="confirm-button" onClick={handleConfirmBooking}>Confirm Booking</button>
        </div>
      )}

      {loading && <div className="loading-animation-1">Loading...</div>}
    </div>
  );
};

export default Book;
