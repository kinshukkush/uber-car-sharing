import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCar, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaStar,
  FaFilter,
  FaSearch,
  FaEye,
  FaTimes,
  FaDownload,
  FaReceipt
} from 'react-icons/fa';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    searchTerm: ''
  });

  // Mock booking data
  const mockBookings = [
    {
      id: 'BK001',
      carName: 'Tesla Model 3',
      carImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&h=250',
      startDate: '2024-01-15',
      endDate: '2024-01-17',
      startLocation: 'Mumbai Airport',
      endLocation: 'Pune',
      totalAmount: 17000,
      status: 'completed',
      rating: 5,
      driverName: 'John Doe',
      driverRating: 4.8,
      bookingDate: '2024-01-10',
      duration: '3 days',
      distance: '150 km'
    },
    {
      id: 'BK002',
      carName: 'BMW X5',
      carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&h=250',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      startLocation: 'Delhi',
      endLocation: 'Agra',
      totalAmount: 24000,
      status: 'completed',
      rating: 4,
      driverName: 'Sarah Wilson',
      driverRating: 4.9,
      bookingDate: '2024-01-18',
      duration: '2 days',
      distance: '200 km'
    },
    {
      id: 'BK003',
      carName: 'Honda City',
      carImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&h=250',
      startDate: '2024-02-01',
      endDate: '2024-02-01',
      startLocation: 'Bangalore',
      endLocation: 'Mysore',
      totalAmount: 4500,
      status: 'active',
      rating: null,
      driverName: 'Mike Johnson',
      driverRating: 4.5,
      bookingDate: '2024-01-30',
      duration: '1 day',
      distance: '140 km'
    },
    {
      id: 'BK004',
      carName: 'Maruti Swift',
      carImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&h=250',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      startLocation: 'Chennai',
      endLocation: 'Pondicherry',
      totalAmount: 9600,
      status: 'upcoming',
      rating: null,
      driverName: 'Priya Sharma',
      driverRating: 4.3,
      bookingDate: '2024-02-05',
      duration: '3 days',
      distance: '160 km'
    },
    {
      id: 'BK005',
      carName: 'Audi A4',
      carImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&h=250',
      startDate: '2023-12-20',
      endDate: '2023-12-22',
      startLocation: 'Jaipur',
      endLocation: 'Udaipur',
      totalAmount: 19000,
      status: 'cancelled',
      rating: null,
      driverName: 'David Chen',
      driverRating: 4.7,
      bookingDate: '2023-12-15',
      duration: '2 days',
      distance: '400 km'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, bookings]);

  const applyFilters = () => {
    let filtered = bookings.filter(booking => {
      const matchesStatus = filters.status === 'all' || booking.status === filters.status;
      const matchesSearch = booking.carName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           booking.startLocation.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           booking.endLocation.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           booking.id.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      let matchesDate = true;
      if (filters.dateRange !== 'all') {
        const bookingDate = new Date(booking.bookingDate);
        const now = new Date();
        const daysDiff = Math.floor((now - bookingDate) / (1000 * 60 * 60 * 24));
        
        switch (filters.dateRange) {
          case 'week':
            matchesDate = daysDiff <= 7;
            break;
          case 'month':
            matchesDate = daysDiff <= 30;
            break;
          case 'year':
            matchesDate = daysDiff <= 365;
            break;
          default:
            matchesDate = true;
        }
      }

      return matchesStatus && matchesSearch && matchesDate;
    });

    setFilteredBookings(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#00c853';
      case 'active':
        return '#2196f3';
      case 'upcoming':
        return '#ff9800';
      case 'cancelled':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'active':
        return 'Active';
      case 'upcoming':
        return 'Upcoming';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const downloadReceipt = (booking) => {
    // Simulate receipt download
    alert(`Downloading receipt for booking ${booking.id}`);
  };

  if (loading) {
    return (
      <div className="booking-history-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p>Loading your booking history...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="booking-history-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="booking-history-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Booking History
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Track all your past and upcoming bookings
        </motion.p>
      </div>

      {/* Filters */}
      <motion.div 
        className="filters-section"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={filters.searchTerm}
            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
          />
        </div>

        <div className="filter-controls">
          <select 
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select 
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </motion.div>

      {/* Bookings List */}
      <motion.div 
        className="bookings-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence>
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              className="booking-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="booking-image">
                <img src={booking.carImage} alt={booking.carName} />
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                  {getStatusText(booking.status)}
                </div>
              </div>

              <div className="booking-details">
                <div className="booking-header">
                  <h3>{booking.carName}</h3>
                  <div className="booking-id">#{booking.id}</div>
                </div>

                <div className="booking-info">
                  <div className="info-row">
                    <FaCalendarAlt className="info-icon" />
                    <span>{booking.startDate} to {booking.endDate}</span>
                  </div>
                  <div className="info-row">
                    <FaMapMarkerAlt className="info-icon" />
                    <span>{booking.startLocation} → {booking.endLocation}</span>
                  </div>
                  <div className="info-row">
                    <FaCar className="info-icon" />
                    <span>{booking.duration} • {booking.distance}</span>
                  </div>
                </div>

                <div className="booking-footer">
                  <div className="booking-amount">
                    <span className="amount">₹{booking.totalAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="booking-actions">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleViewDetails(booking)}
                    >
                      <FaEye /> View
                    </button>
                    {booking.status === 'completed' && (
                      <button 
                        className="action-btn download-btn"
                        onClick={() => downloadReceipt(booking)}
                      >
                        <FaDownload /> Receipt
                      </button>
                    )}
                  </div>
                </div>

                {booking.rating && (
                  <div className="booking-rating">
                    <span>Your Rating: </span>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < booking.rating ? 'star filled' : 'star'} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredBookings.length === 0 && (
        <motion.div 
          className="no-bookings"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaCar className="no-bookings-icon" />
          <h3>No bookings found</h3>
          <p>Try adjusting your filters or make your first booking!</p>
        </motion.div>
      )}

      {/* Booking Details Modal */}
      <AnimatePresence>
        {showModal && selectedBooking && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="booking-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Booking Details</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="modal-content">
                <div className="modal-booking-info">
                  <img src={selectedBooking.carImage} alt={selectedBooking.carName} />
                  <div>
                    <h4>{selectedBooking.carName}</h4>
                    <p>Booking ID: #{selectedBooking.id}</p>
                    <div 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(selectedBooking.status) }}
                    >
                      {getStatusText(selectedBooking.status)}
                    </div>
                  </div>
                </div>

                <div className="modal-details-grid">
                  <div className="detail-section">
                    <h5>Trip Details</h5>
                    <div className="detail-item">
                      <span>From:</span>
                      <span>{selectedBooking.startLocation}</span>
                    </div>
                    <div className="detail-item">
                      <span>To:</span>
                      <span>{selectedBooking.endLocation}</span>
                    </div>
                    <div className="detail-item">
                      <span>Start Date:</span>
                      <span>{selectedBooking.startDate}</span>
                    </div>
                    <div className="detail-item">
                      <span>End Date:</span>
                      <span>{selectedBooking.endDate}</span>
                    </div>
                    <div className="detail-item">
                      <span>Duration:</span>
                      <span>{selectedBooking.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span>Distance:</span>
                      <span>{selectedBooking.distance}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h5>Driver Details</h5>
                    <div className="detail-item">
                      <span>Name:</span>
                      <span>{selectedBooking.driverName}</span>
                    </div>
                    <div className="detail-item">
                      <span>Rating:</span>
                      <span>
                        <FaStar className="star filled" /> {selectedBooking.driverRating}
                      </span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h5>Payment Details</h5>
                    <div className="detail-item">
                      <span>Total Amount:</span>
                      <span className="amount">₹{selectedBooking.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <span>Booking Date:</span>
                      <span>{selectedBooking.bookingDate}</span>
                    </div>
                  </div>
                </div>

                {selectedBooking.status === 'completed' && (
                  <div className="modal-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => downloadReceipt(selectedBooking)}
                    >
                      <FaReceipt /> Download Receipt
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .booking-history-container {
          min-height: 100vh;
          background: var(--dark);
          color: var(--text-primary);
          padding: 2rem;
        }

        .booking-history-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          gap: 2rem;
        }

        .booking-history-loading .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid var(--primary);
          border-radius: 50%;
        }

        .booking-history-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .booking-history-header h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .booking-history-header p {
          font-size: 1.2rem;
          color: var(--text-secondary);
        }

        .filters-section {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 300px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .search-box input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .filter-controls {
          display: flex;
          gap: 1rem;
        }

        .filter-controls select {
          padding: 1rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text-primary);
          cursor: pointer;
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .booking-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          transition: all 0.3s ease;
        }

        .booking-card:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .booking-image {
          position: relative;
          width: 200px;
          height: 150px;
          flex-shrink: 0;
        }

        .booking-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .status-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .booking-details {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .booking-header h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .booking-id {
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .booking-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .info-icon {
          color: var(--primary);
          width: 16px;
        }

        .booking-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .booking-amount .amount {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }

        .booking-actions {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .view-btn {
          background: var(--primary);
          color: white;
        }

        .download-btn {
          background: var(--secondary);
          color: white;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .booking-rating {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .star {
          color: #ddd;
          font-size: 0.8rem;
        }

        .star.filled {
          color: #ffd700;
        }

        .no-bookings {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-secondary);
        }

        .no-bookings-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .booking-modal {
          background: var(--darker);
          border-radius: 20px;
          padding: 0;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid var(--border);
        }

        .modal-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: var(--card-bg);
          color: var(--text-primary);
        }

        .modal-content {
          padding: 2rem;
        }

        .modal-booking-info {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: var(--card-bg);
          border-radius: 12px;
        }

        .modal-booking-info img {
          width: 100px;
          height: 70px;
          object-fit: cover;
          border-radius: 8px;
        }

        .modal-booking-info h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .modal-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .detail-section h5 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: var(--primary);
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }

        .detail-item span:first-child {
          color: var(--text-secondary);
        }

        .detail-item span:last-child {
          color: var(--text-primary);
          font-weight: 500;
        }

        .detail-item .amount {
          color: var(--primary);
          font-weight: 700;
        }

        .modal-actions {
          display: flex;
          justify-content: center;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .booking-history-container {
            padding: 1rem;
          }

          .booking-history-header h1 {
            font-size: 2rem;
          }

          .filters-section {
            flex-direction: column;
            gap: 1rem;
          }

          .search-box {
            min-width: auto;
          }

          .filter-controls {
            width: 100%;
            justify-content: space-between;
          }

          .booking-card {
            flex-direction: column;
          }

          .booking-image {
            width: 100%;
            height: 200px;
          }

          .booking-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .modal-details-grid {
            grid-template-columns: 1fr;
          }

          .booking-modal {
            width: 95%;
            margin: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default BookingHistory;