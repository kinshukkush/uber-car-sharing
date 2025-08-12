import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCar, 
  FaFilter, 
  FaSearch, 
  FaStar, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaGasPump,
  FaUsers,
  FaCog,
  FaHeart,
  FaRegHeart,
  FaSort,
  FaTimes,
  FaCheck
} from 'react-icons/fa';
import '../components/RentCar.css';

const RentCar = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    carType: '',
    transmission: '',
    fuelType: '',
    seats: '',
    location: '',
    availability: 'available'
  });
  const [sortBy, setSortBy] = useState('price');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookingDates, setBookingDates] = useState({
    startDate: '',
    endDate: ''
  });
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock car data
  const mockCars = [
    {
      id: 1,
      name: 'Tesla Model 3',
      type: 'Electric',
      price: 8500,
      rating: 4.8,
      reviews: 124,
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&h=250',
      transmission: 'Automatic',
      fuelType: 'Electric',
      seats: 5,
      features: ['GPS', 'AC', 'Bluetooth', 'USB Charging'],
      available: true,
      owner: 'John Doe',
      description: 'Premium electric sedan with autopilot features'
    },
    {
      id: 2,
      name: 'BMW X5',
      type: 'SUV',
      price: 12000,
      rating: 4.9,
      reviews: 89,
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&h=250',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 7,
      features: ['GPS', 'AC', 'Leather Seats', 'Sunroof'],
      available: true,
      owner: 'Sarah Wilson',
      description: 'Luxury SUV perfect for family trips'
    },
    {
      id: 3,
      name: 'Honda City',
      type: 'Sedan',
      price: 4500,
      rating: 4.5,
      reviews: 156,
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&h=250',
      transmission: 'Manual',
      fuelType: 'Petrol',
      seats: 5,
      features: ['AC', 'Music System', 'GPS'],
      available: true,
      owner: 'Mike Johnson',
      description: 'Reliable and fuel-efficient sedan'
    },
    {
      id: 4,
      name: 'Maruti Swift',
      type: 'Hatchback',
      price: 3200,
      rating: 4.3,
      reviews: 203,
      location: 'Pune',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&h=250',
      transmission: 'Manual',
      fuelType: 'Petrol',
      seats: 5,
      features: ['AC', 'Music System'],
      available: true,
      owner: 'Priya Sharma',
      description: 'Compact and economical city car'
    },
    {
      id: 5,
      name: 'Audi A4',
      type: 'Sedan',
      price: 9500,
      rating: 4.7,
      reviews: 67,
      location: 'Chennai',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&h=250',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      features: ['GPS', 'AC', 'Leather Seats', 'Premium Audio'],
      available: true,
      owner: 'David Chen',
      description: 'Premium luxury sedan with advanced features'
    },
    {
      id: 6,
      name: 'Mahindra Thar',
      type: 'SUV',
      price: 6800,
      rating: 4.6,
      reviews: 91,
      location: 'Jaipur',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&h=250',
      transmission: 'Manual',
      fuelType: 'Diesel',
      seats: 4,
      features: ['4WD', 'AC', 'Off-road Capable'],
      available: true,
      owner: 'Raj Patel',
      description: 'Adventure-ready off-road SUV'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCars(mockCars);
      setFilteredCars(mockCars);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, sortBy, cars]);

  const applyFilters = () => {
    let filtered = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
      const matchesType = !filters.carType || car.type === filters.carType;
      const matchesTransmission = !filters.transmission || car.transmission === filters.transmission;
      const matchesFuel = !filters.fuelType || car.fuelType === filters.fuelType;
      const matchesSeats = !filters.seats || car.seats.toString() === filters.seats;
      const matchesLocation = !filters.location || car.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesAvailability = filters.availability === 'all' || car.available;

      return matchesSearch && matchesPrice && matchesType && matchesTransmission && 
             matchesFuel && matchesSeats && matchesLocation && matchesAvailability;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredCars(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const handleBookCar = (car) => {
    setSelectedCar(car);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    // Handle booking logic here
    alert(`Booking confirmed for ${selectedCar.name}!`);
    setShowBookingModal(false);
    setSelectedCar(null);
  };

  if (loading) {
    return (
      <div className="rent-car-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p>Finding the best cars for you...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="rent-car-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="rent-car-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Rent a Car
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Choose from our wide selection of vehicles
        </motion.p>
      </div>

      {/* Search and Filter Bar */}
      <motion.div 
        className="search-filter-bar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search cars, locations, or types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-sort-controls">
          <button 
            className="filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="filters-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filters-grid">
              <div className="filter-group">
                <label>Car Type</label>
                <select 
                  value={filters.carType}
                  onChange={(e) => handleFilterChange('carType', e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Transmission</label>
                <select 
                  value={filters.transmission}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Fuel Type</label>
                <select 
                  value={filters.fuelType}
                  onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Seats</label>
                <select 
                  value={filters.seats}
                  onChange={(e) => handleFilterChange('seats', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="4">4 Seats</option>
                  <option value="5">5 Seats</option>
                  <option value="7">7 Seats</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}</label>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="results-count">
        <p>{filteredCars.length} cars available</p>
      </div>

      {/* Cars Grid */}
      <motion.div 
        className="cars-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence>
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              className="car-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="car-image-container">
                <img src={car.image} alt={car.name} className="car-image" />
                <button 
                  className="favorite-btn"
                  onClick={() => toggleFavorite(car.id)}
                >
                  {favorites.includes(car.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
                <div className="car-type-badge">{car.type}</div>
              </div>

              <div className="car-details">
                <div className="car-header">
                  <h3>{car.name}</h3>
                  <div className="car-rating">
                    <FaStar className="star" />
                    <span>{car.rating}</span>
                    <span className="reviews">({car.reviews})</span>
                  </div>
                </div>

                <p className="car-description">{car.description}</p>

                <div className="car-specs">
                  <div className="spec">
                    <FaUsers />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="spec">
                    <FaCog />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="spec">
                    <FaGasPump />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="spec">
                    <FaMapMarkerAlt />
                    <span>{car.location}</span>
                  </div>
                </div>

                <div className="car-features">
                  {car.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                  {car.features.length > 3 && (
                    <span className="feature-tag">+{car.features.length - 3} more</span>
                  )}
                </div>

                <div className="car-footer">
                  <div className="car-price">
                    <span className="price">₹{car.price}</span>
                    <span className="period">/day</span>
                  </div>
                  <button 
                    className="book-btn"
                    onClick={() => handleBookCar(car)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredCars.length === 0 && (
        <motion.div 
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaCar className="no-results-icon" />
          <h3>No cars found</h3>
          <p>Try adjusting your filters or search terms</p>
        </motion.div>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedCar && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              className="booking-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Book {selectedCar.name}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowBookingModal(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="modal-content">
                <div className="booking-car-info">
                  <img src={selectedCar.image} alt={selectedCar.name} />
                  <div>
                    <h4>{selectedCar.name}</h4>
                    <p>₹{selectedCar.price}/day</p>
                    <div className="rating">
                      <FaStar /> {selectedCar.rating} ({selectedCar.reviews} reviews)
                    </div>
                  </div>
                </div>

                <div className="booking-dates">
                  <div className="date-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={bookingDates.startDate}
                      onChange={(e) => setBookingDates(prev => ({
                        ...prev,
                        startDate: e.target.value
                      }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="date-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={bookingDates.endDate}
                      onChange={(e) => setBookingDates(prev => ({
                        ...prev,
                        endDate: e.target.value
                      }))}
                      min={bookingDates.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="booking-summary">
                  <h4>Booking Summary</h4>
                  <div className="summary-row">
                    <span>Daily Rate:</span>
                    <span>₹{selectedCar.price}</span>
                  </div>
                  <div className="summary-row">
                    <span>Duration:</span>
                    <span>
                      {bookingDates.startDate && bookingDates.endDate
                        ? Math.ceil((new Date(bookingDates.endDate) - new Date(bookingDates.startDate)) / (1000 * 60 * 60 * 24)) + 1
                        : 1} days
                    </span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>
                      ₹{selectedCar.price * (bookingDates.startDate && bookingDates.endDate
                        ? Math.ceil((new Date(bookingDates.endDate) - new Date(bookingDates.startDate)) / (1000 * 60 * 60 * 24)) + 1
                        : 1)}
                    </span>
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={confirmBooking}
                    disabled={!bookingDates.startDate || !bookingDates.endDate}
                  >
                    <FaCheck /> Confirm Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RentCar;