import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/Book.css';
import { FaCar, FaMoneyBillWave, FaRoute, FaMapMarkerAlt, FaArrowRight, FaClock } from 'react-icons/fa';

const Book = () => {
  const { state } = useLocation();
  const { location, destination } = state || { location: 'Not specified', destination: 'Not specified' };
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  const cars = [
    { id: 1, name: 'Standard Car', price: 500, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&h=200' },
    { id: 2, name: 'Premium Sedan', price: 1000, image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=300&h=200' },
    { id: 3, name: 'Luxury SUV', price: 1500, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&h=200' }
  ];

  useEffect(() => {
    // Set default date to today
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setBookingDate(formattedDate);
    
    // Set default time to current time + 1 hour
    const hours = (today.getHours() + 1) % 24;
    const minutes = today.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setBookingTime(formattedTime);
  }, []);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setSelectedPrice(car.price);
  };

  const handleConfirmBooking = () => {
    if (selectedCar && bookingDate && bookingTime) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/lastpage', { 
          state: { 
            location, 
            destination, 
            price: selectedPrice,
            car: selectedCar.name, 
            date: bookingDate,
            time: bookingTime,
            passengers
          } 
        });
      }, 2000); // 2 seconds loading animation for better UX
    } else {
      alert("Please complete all booking details.");
    }
  };

  // Calculate estimated journey time based on price (just for demonstration)
  const getEstimatedTime = () => {
    if (!selectedPrice) return "";
    const baseTime = 20; // minutes
    const additionalTime = (selectedPrice / 500) * 10;
    return `${baseTime + additionalTime} minutes`;
  };

  // Calculate estimated distance based on price (just for demonstration)
  const getEstimatedDistance = () => {
    if (!selectedPrice) return "";
    return `${(selectedPrice / 100).toFixed(1)} km`;
  };

  return (
    <div className="book-container">
      <div className="booking-header">
        <h1>Book Your Ride</h1>
        <div className="journey-path">
          <div className="location-box">
            <FaMapMarkerAlt className="location-icon" />
            <span>{location}</span>
          </div>
          <div className="path-line">
            <FaArrowRight className="arrow-icon" />
          </div>
          <div className="destination-box">
            <FaMapMarkerAlt className="location-icon" />
            <span>{destination}</span>
          </div>
        </div>
      </div>

      <div className="booking-section">
        <div className="booking-section-header">
          <FaCar className="section-icon" />
          <h2>Select Your Vehicle</h2>
        </div>
        <div className="car-options">
          {cars.map((car) => (
            <div 
              key={car.id} 
              className={`car-option ${selectedCar?.id === car.id ? 'selected' : ''}`}
              onClick={() => handleSelectCar(car)}
            >
              <img src={car.image} alt={car.name} className="car-image" />
              <h3>{car.name}</h3>
              <p className="car-price">₹{car.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="booking-section">
        <div className="booking-section-header">
          <FaClock className="section-icon" />
          <h2>Schedule Your Ride</h2>
        </div>
        <div className="schedule-options">
          <div className="schedule-item">
            <label htmlFor="booking-date">Date:</label>
            <input 
              type="date" 
              id="booking-date" 
              value={bookingDate} 
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().substr(0, 10)}
            />
          </div>
          <div className="schedule-item">
            <label htmlFor="booking-time">Time:</label>
            <input 
              type="time" 
              id="booking-time" 
              value={bookingTime} 
              onChange={(e) => setBookingTime(e.target.value)} 
            />
          </div>
          <div className="schedule-item">
            <label htmlFor="passengers">Passengers:</label>
            <div className="passenger-control">
              <button 
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="passenger-btn"
              >-</button>
              <span>{passengers}</span>
              <button 
                onClick={() => setPassengers(Math.min(8, passengers + 1))}
                className="passenger-btn"
              >+</button>
            </div>
          </div>
        </div>
      </div>

      {selectedCar && (
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <div className="summary-details">
            <div className="summary-item">
              <FaRoute className="summary-icon" />
              <div>
                <h4>Journey</h4>
                <p>{location} to {destination}</p>
                <p className="estimate">Estimated Distance: {getEstimatedDistance()}</p>
                <p className="estimate">Estimated Time: {getEstimatedTime()}</p>
              </div>
            </div>
            <div className="summary-item">
              <FaCar className="summary-icon" />
              <div>
                <h4>Vehicle</h4>
                <p>{selectedCar.name}</p>
              </div>
            </div>
            <div className="summary-item">
              <FaClock className="summary-icon" />
              <div>
                <h4>Schedule</h4>
                <p>{new Date(bookingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p>{bookingTime}</p>
              </div>
            </div>
            <div className="summary-item">
              <FaMoneyBillWave className="summary-icon" />
              <div>
                <h4>Fare</h4>
                <p className="price">₹{selectedPrice}</p>
              </div>
            </div>
          </div>
          <button className="confirm-button" onClick={handleConfirmBooking} disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-animation">
              <div className="car-icon"></div>
              <div className="road"></div>
            </div>
            <p>Processing your booking...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;