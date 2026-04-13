import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../contexts/BookingContext';
import toast from 'react-hot-toast';

const BookingHistory = () => {
  const { getBookingHistory, rateBooking } = useBooking();
  const history = getBookingHistory();
  const [filter, setFilter] = useState('all');

  const filteredHistory = history.filter(b => 
    filter === 'all' ? true : b.status === filter
  );

  const handleRate = (id, rating) => {
    rateBooking(id, rating);
    toast.success(`Rated ${rating} stars!`);
  };

  const handleDownloadReceipt = () => {
    toast.success('Downloading simulated receipt...');
    // Simulated download logic would go here
  };

  return (
    <motion.div 
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="gradient-text" style={{ margin: 0 }}>Ride History</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['all', 'completed', 'cancelled'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? 'gradient-btn' : 'outline-btn'}
              style={{ padding: '8px 16px', fontSize: '0.9rem', textTransform: 'capitalize' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredHistory.length === 0 ? (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No rides found for this category.
          </div>
        ) : (
          filteredHistory.map((ride, idx) => (
            <motion.div 
              key={ride.id}
              className="glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{ 
                padding: '25px', 
                borderLeft: `4px solid ${ride.status === 'completed' ? 'var(--success)' : ride.status === 'cancelled' ? 'var(--error)' : 'var(--warning)'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {new Date(ride.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div style={{ 
                  padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold',
                  background: ride.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : ride.status === 'cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  color: ride.status === 'completed' ? 'var(--success)' : ride.status === 'cancelled' ? 'var(--error)' : 'var(--warning)'
                }}>
                  {ride.status}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ padding: '5px' }}>📍</div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pickup</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{ride.pickup}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                    <div style={{ padding: '5px' }}>🏁</div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Destination</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{ride.destination}</div>
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    ${ride.price}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {ride.driver ? `Driver: ${ride.driver}` : ride.type}
                  </div>
                </div>
              </div>

              {ride.status === 'completed' && (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ marginRight: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {ride.rating ? 'Your Rating:' : 'Rate your trip:'}
                    </span>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star} 
                        onClick={() => !ride.rating && handleRate(ride.id, star)}
                        style={{ 
                          cursor: ride.rating ? 'default' : 'pointer', 
                          color: star <= (ride.rating || 0) ? '#f59e0b' : 'rgba(255,255,255,0.2)',
                          fontSize: '1.2rem',
                          transition: 'color 0.2s'
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <button className="outline-btn" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={handleDownloadReceipt}>
                    Download Receipt
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default BookingHistory;