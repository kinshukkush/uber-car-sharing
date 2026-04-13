import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHistory, 
  FaMapMarkerAlt, 
  FaFlagCheckered, 
  FaStar, 
  FaDownload, 
  FaFilter, 
  FaSearch,
  FaCar,
  FaClock,
  FaRoute,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaChevronDown,
  FaChevronUp,
  FaReceipt,
  FaShareAlt,
  FaRedo,
  FaUser,
  FaCreditCard,
  FaInfoCircle,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTrash,
  FaEye
} from 'react-icons/fa';
import { MdLocalTaxi } from 'react-icons/md';
import { useBooking } from '../contexts/BookingContext';
import toast from 'react-hot-toast';
import '../components/BookingHistory.css';

const BookingHistory = () => {
  const { getBookingHistory, rateBooking, cancelBooking } = useBooking();
  const history = getBookingHistory();
  
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedCard, setExpandedCard] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedRide, setSelectedRide] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Filter statuses
  const filterOptions = [
    { id: 'all', label: 'All Rides', icon: <FaHistory />, color: 'var(--primary)' },
    { id: 'completed', label: 'Completed', icon: <FaCheckCircle />, color: 'var(--success)' },
    { id: 'ongoing', label: 'Ongoing', icon: <FaHourglassHalf />, color: 'var(--warning)' },
    { id: 'cancelled', label: 'Cancelled', icon: <FaTimesCircle />, color: 'var(--error)' }
  ];

  // Stats calculation
  const stats = useMemo(() => {
    const completed = history.filter(r => r.status === 'completed');
    const totalSpent = completed.reduce((acc, r) => acc + parseFloat(r.price || 0), 0);
    const avgRating = completed.filter(r => r.rating).reduce((acc, r, _, arr) => acc + r.rating / arr.length, 0);
    
    return {
      totalRides: history.length,
      completedRides: completed.length,
      totalSpent: totalSpent.toFixed(2),
      avgRating: avgRating.toFixed(1),
      cancelledRides: history.filter(r => r.status === 'cancelled').length
    };
  }, [history]);

  // Filtered and sorted history
  const filteredHistory = useMemo(() => {
    let result = [...history];

    // Filter by status
    if (filter !== 'all') {
      result = result.filter(b => b.status === filter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.pickup?.toLowerCase().includes(query) ||
        b.destination?.toLowerCase().includes(query) ||
        b.driver?.toLowerCase().includes(query) ||
        b.type?.toLowerCase().includes(query)
      );
    }

    // Filter by date range
    if (dateRange.from) {
      result = result.filter(b => new Date(b.date) >= new Date(dateRange.from));
    }
    if (dateRange.to) {
      result = result.filter(b => new Date(b.date) <= new Date(dateRange.to));
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.date) - new Date(a.date);
          break;
        case 'price':
          comparison = parseFloat(b.price) - parseFloat(a.price);
          break;
        case 'rating':
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? comparison : -comparison;
    });

    return result;
  }, [history, filter, searchQuery, sortBy, sortOrder, dateRange]);

  const handleRate = (id, rating) => {
    rateBooking(id, rating);
    toast.success(`Rated ${rating} star${rating > 1 ? 's' : ''}!`, { icon: '⭐' });
  };

  const handleDownloadReceipt = (ride) => {
    setSelectedRide(ride);
    setShowReceiptModal(true);
  };

  const generateReceiptText = (ride) => {
    return `
╔══════════════════════════════════════╗
║           CARSHARE RECEIPT           ║
╠══════════════════════════════════════╣
║ Booking ID: #${ride.id.toString().padStart(6, '0')}
║ Date: ${new Date(ride.date).toLocaleDateString()}
║ Time: ${ride.time || '10:30 AM'}
╠══════════════════════════════════════╣
║ TRIP DETAILS
║ From: ${ride.pickup}
║ To: ${ride.destination}
║ Distance: ${ride.distance || '5.2'} km
║ Duration: ${ride.duration || '15'} min
╠══════════════════════════════════════╣
║ RIDE INFO
║ Type: ${ride.type || 'Economy'}
║ Driver: ${ride.driver || 'N/A'}
║ Vehicle: ${ride.vehicle || 'Toyota Camry'}
║ Plate: ${ride.plate || 'ABC 123'}
╠══════════════════════════════════════╣
║ PAYMENT
║ Fare: 
$$
{ride.originalPrice || ride.price}
║ Discount: -
$$
{ride.discount || '0.00'}
║ Total: $${ride.price}
║ Method: ${ride.paymentMethod || 'Card'}
╠══════════════════════════════════════╣
║ Rating: ${'★'.repeat(ride.rating || 0)}${'☆'.repeat(5 - (ride.rating || 0))}
╚══════════════════════════════════════╝
    `.trim();
  };

  const downloadReceipt = () => {
    if (!selectedRide) return;
    
    const receiptText = generateReceiptText(selectedRide);
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CarShare_Receipt_${selectedRide.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Receipt downloaded!', { icon: '📄' });
    setShowReceiptModal(false);
  };

  const handleBookAgain = (ride) => {
    toast.success('Redirecting to book similar ride...', { icon: '🚗' });
    // Would navigate to book page with pre-filled data
  };

  const handleShare = (ride) => {
    const shareText = `Just completed a ride from ${ride.pickup} to ${ride.destination} with CarShare! 🚗`;
    if (navigator.share) {
      navigator.share({ title: 'My CarShare Ride', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Copied to clipboard!', { icon: '📋' });
    }
  };

  const toggleCardExpansion = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const clearFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setDateRange({ from: '', to: '' });
    setSortBy('date');
    setSortOrder('desc');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheckCircle />;
      case 'cancelled': return <FaTimesCircle />;
      case 'ongoing': return <FaHourglassHalf />;
      default: return <FaCar />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--success)';
      case 'cancelled': return 'var(--error)';
      case 'ongoing': return 'var(--warning)';
      default: return 'var(--primary)';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="booking-history-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Effects */}
      <div className="history-bg-effects">
        <div className="bg-gradient-orb orb-1"></div>
        <div className="bg-gradient-orb orb-2"></div>
      </div>

      <div className="history-container">
        {/* Header Section */}
        <motion.div 
          className="history-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-content">
            <div className="header-title">
              <FaHistory className="title-icon" />
              <div>
                <h1>Ride <span className="gradient-text">History</span></h1>
                <p>View and manage all your past rides</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="stats-cards"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="stat-card">
            <div className="stat-icon total">
              <FaCar />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.totalRides}</span>
              <span className="stat-label">Total Rides</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.completedRides}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon spent">
              <FaCreditCard />
            </div>
            <div className="stat-content">
              <span className="stat-value">${stats.totalSpent}</span>
              <span className="stat-label">Total Spent</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon rating">
              <FaStar />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.avgRating}</span>
              <span className="stat-label">Avg. Rating</span>
            </div>
          </div>
        </motion.div>

        {/* Filters Section */}
        <motion.div 
          className="filters-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Quick Filters */}
          <div className="quick-filters">
            {filterOptions.map((option) => (
              <motion.button
                key={option.id}
                className={`filter-btn ${filter === option.id ? 'active' : ''}`}
                onClick={() => setFilter(option.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--filter-color': option.color }}
              >
                {option.icon}
                <span>{option.label}</span>
                {filter === option.id && (
                  <span className="filter-count">
                    {option.id === 'all' ? history.length : history.filter(r => r.status === option.id).length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Search and Advanced Filters */}
          <div className="search-filters">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by location, driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  <FaTimesCircle />
                </button>
              )}
            </div>

            <motion.button 
              className={`advanced-filter-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFilter />
              <span>Filters</span>
              {showFilters ? <FaChevronUp /> : <FaChevronDown />}
            </motion.button>

            <div className="sort-buttons">
              <button 
                className={`sort-btn ${sortBy === 'date' ? 'active' : ''}`}
                onClick={() => toggleSort('date')}
              >
                <FaCalendarAlt />
                {sortBy === 'date' && (sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />)}
              </button>
              <button 
                className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
                onClick={() => toggleSort('price')}
              >
                <FaCreditCard />
                {sortBy === 'price' && (sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />)}
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="advanced-filters-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="filter-group">
                  <label>Date Range</label>
                  <div className="date-inputs">
                    <input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                      className="date-input"
                    />
                    <span>to</span>
                    <input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                      className="date-input"
                    />
                  </div>
                </div>
                <button className="clear-filters-btn" onClick={clearFilters}>
                  <FaTrash />
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Info */}
        <motion.div 
          className="results-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span>Showing {filteredHistory.length} of {history.length} rides</span>
        </motion.div>

        {/* Rides List */}
        <motion.div 
          className="rides-list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredHistory.length === 0 ? (
            <motion.div 
              className="empty-state glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="empty-icon">
                <MdLocalTaxi />
              </div>
              <h3>No rides found</h3>
              <p>
                {searchQuery || filter !== 'all' 
                  ? "Try adjusting your filters or search query"
                  : "You haven't taken any rides yet. Book your first ride now!"
                }
              </p>
              {(searchQuery || filter !== 'all') && (
                <button className="btn-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </motion.div>
          ) : (
            filteredHistory.map((ride, idx) => (
              <motion.div 
                key={ride.id}
                className={`ride-card glass-card ${expandedCard === ride.id ? 'expanded' : ''}`}
                variants={itemVariants}
                layout
                style={{ '--status-color': getStatusColor(ride.status) }}
              >
                {/* Card Header */}
                <div className="ride-card-header">
                  <div className="ride-date-info">
                    <FaCalendarAlt className="date-icon" />
                    <div className="date-text">
                      <span className="date-main">
                        {new Date(ride.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="date-time">{ride.time || '10:30 AM'}</span>
                    </div>
                  </div>
                  
                  <div className={`ride-status status-${ride.status}`}>
                    {getStatusIcon(ride.status)}
                    <span>{ride.status}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="ride-card-body">
                  <div className="ride-route">
                    <div className="route-point pickup">
                      <div className="point-marker">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="point-info">
                        <span className="point-label">Pickup</span>
                        <span className="point-name">{ride.pickup}</span>
                      </div>
                    </div>
                    <div className="route-connector">
                      <div className="connector-line"></div>
                      <div className="connector-details">
                        <span><FaRoute /> {ride.distance || '5.2'} km</span>
                        <span><FaClock /> {ride.duration || '15'} min</span>
                      </div>
                    </div>
                    <div className="route-point destination">
                      <div className="point-marker">
                        <FaFlagCheckered />
                      </div>
                      <div className="point-info">
                        <span className="point-label">Destination</span>
                        <span className="point-name">{ride.destination}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ride-price-section">
                    <div className="price-amount">
                      <span className="currency">$</span>
                      <span className="price">{ride.price}</span>
                    </div>
                    <div className="ride-type">
                      <FaCar />
                      <span>{ride.type || 'Economy'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="ride-card-actions">
                  {ride.status === 'completed' && (
                    <>
                      <div className="rating-section">
                        <span className="rating-label">
                          {ride.rating ? 'Your rating:' : 'Rate this ride:'}
                        </span>
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              className={`star-btn ${star <= (ride.rating || 0) ? 'filled' : ''}`}
                              onClick={() => !ride.rating && handleRate(ride.id, star)}
                              disabled={!!ride.rating}
                              whileHover={!ride.rating ? { scale: 1.2 } : {}}
                              whileTap={!ride.rating ? { scale: 0.9 } : {}}
                            >
                              <FaStar />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div className="action-buttons">
                        <motion.button 
                          className="action-btn receipt"
                          onClick={() => handleDownloadReceipt(ride)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaReceipt />
                          <span>Receipt</span>
                        </motion.button>
                        <motion.button 
                          className="action-btn rebook"
                          onClick={() => handleBookAgain(ride)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaRedo />
                          <span>Book Again</span>
                        </motion.button>
                      </div>
                    </>
                  )}
                </div>

                {/* Expand Button */}
                <button 
                  className="expand-btn"
                  onClick={() => toggleCardExpansion(ride.id)}
                >
                  {expandedCard === ride.id ? (
                    <>Less details <FaChevronUp /></>
                  ) : (
                    <>More details <FaChevronDown /></>
                  )}
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedCard === ride.id && (
                    <motion.div 
                      className="ride-expanded-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="expanded-grid">
                        <div className="detail-item">
                          <span className="detail-label">Booking ID</span>
                          <span className="detail-value">#{ride.id.toString().padStart(6, '0')}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Driver</span>
                          <span className="detail-value">
                            <FaUser /> {ride.driver || 'N/A'}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Vehicle</span>
                          <span className="detail-value">{ride.vehicle || 'Toyota Camry'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Payment</span>
                          <span className="detail-value">
                            <FaCreditCard /> {ride.paymentMethod || 'Card ****4242'}
                          </span>
                        </div>
                        {ride.discount > 0 && (
                          <div className="detail-item discount">
                            <span className="detail-label">Discount Applied</span>
                            <span className="detail-value">-{ride.discount}%</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="expanded-actions">
                        <motion.button 
                          className="expanded-action-btn share"
                          onClick={() => handleShare(ride)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaShareAlt />
                          Share Trip
                        </motion.button>
                        <motion.button 
                          className="expanded-action-btn support"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaInfoCircle />
                          Get Help
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Receipt Modal */}
      <AnimatePresence>
        {showReceiptModal && selectedRide && (
          <motion.div 
            className="receipt-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReceiptModal(false)}
          >
            <motion.div 
              className="receipt-modal glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="receipt-header">
                <h3><FaReceipt /> Trip Receipt</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowReceiptModal(false)}
                >
                  <FaTimesCircle />
                </button>
              </div>
              
              <div className="receipt-content">
                <div className="receipt-logo">
                  <FaCar />
                  <span>CarShare</span>
                </div>
                
                <div className="receipt-section">
                  <div className="receipt-row">
                    <span>Booking ID</span>
                    <span>#{selectedRide.id.toString().padStart(6, '0')}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Date</span>
                    <span>{new Date(selectedRide.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="receipt-section route">
                  <div className="receipt-point">
                    <FaMapMarkerAlt className="pickup" />
                    <span>{selectedRide.pickup}</span>
                  </div>
                  <div className="receipt-line"></div>
                  <div className="receipt-point">
                    <FaFlagCheckered className="destination" />
                    <span>{selectedRide.destination}</span>
                  </div>
                </div>
                
                <div className="receipt-section">
                  <div className="receipt-row">
                    <span>Ride Type</span>
                    <span>{selectedRide.type || 'Economy'}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Driver</span>
                    <span>{selectedRide.driver || 'N/A'}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Distance</span>
                    <span>{selectedRide.distance || '5.2'} km</span>
                  </div>
                </div>
                
                <div className="receipt-section payment">
                  <div className="receipt-row">
                    <span>Fare</span>
                    <span>${selectedRide.originalPrice || selectedRide.price}</span>
                  </div>
                  {selectedRide.discount > 0 && (
                    <div className="receipt-row discount">
                      <span>Discount ({selectedRide.discount}%)</span>
                      <span>-${((selectedRide.originalPrice || selectedRide.price) * selectedRide.discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="receipt-row total">
                    <span>Total Paid</span>
                    <span>${selectedRide.price}</span>
                  </div>
                </div>
                
                {selectedRide.rating && (
                  <div className="receipt-rating">
                    <span>Your Rating</span>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar 
                          key={star} 
                          className={star <= selectedRide.rating ? 'filled' : ''} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="receipt-footer">
                <motion.button 
                  className="download-btn btn-primary"
                  onClick={downloadReceipt}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaDownload />
                  Download Receipt
                </motion.button>
                <motion.button 
                  className="share-btn btn-outline"
                  onClick={() => handleShare(selectedRide)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaShareAlt />
                  Share
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookingHistory;