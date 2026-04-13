import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { getBookingHistory } = useBooking();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const history = getBookingHistory();
  const completedRides = history.filter(b => b.status === 'completed').length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <motion.div 
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}
    >
      <div className="glass-panel" style={{ padding: '40px', borderRadius: '16px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', gap: '30px' }}>
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', 
            background: 'var(--gradient)', display: 'flex', 
            justifyContent: 'center', alignItems: 'center',
            fontSize: '2.5rem', fontWeight: 'bold', color: 'white'
          }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 style={{ margin: '0 0 5px 0', fontSize: '2rem' }}>{user?.name}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{user?.email}</p>
            <p style={{ color: 'var(--success)', marginTop: '5px', fontSize: '0.9rem' }}>
              Member since {user?.joinedDate || '2024'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '5px' }}>{completedRides}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Completed Rides</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '5px' }}>4.9</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Average Rating</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Personal Information</h3>
          {!isEditing && (
            <button 
              className="outline-btn" 
              onClick={() => setIsEditing(true)}
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)' }}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                style={{ 
                  background: 'var(--surface-light)', border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '12px', borderRadius: '8px', color: 'white' 
                }}
              />
            </div>
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                style={{ 
                  background: 'var(--surface-light)', border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '12px', borderRadius: '8px', color: 'white' 
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" className="gradient-btn" style={{ flex: 1 }}>Save Changes</button>
              <button type="button" className="outline-btn" onClick={() => setIsEditing(false)} style={{ flex: 1 }}>Cancel</button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'block', marginBottom: '5px' }}>Email</label>
              <div style={{ fontSize: '1.1rem' }}>{user?.email}</div>
            </div>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'block', marginBottom: '5px' }}>Phone</label>
              <div style={{ fontSize: '1.1rem' }}>{user?.phone || 'Not provided'}</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;