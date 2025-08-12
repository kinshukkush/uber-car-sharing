import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCamera,
  FaEdit,
  FaSave,
  FaTimes,
  FaStar,
  FaCar,
  FaHistory,
  FaHeart
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Demo User',
    email: user?.email || 'demo@demo.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    bio: 'Car sharing enthusiast who loves to travel and meet new people.',
    profileImage: user?.profileImage || null
  });
  const [tempData, setTempData] = useState({ ...profileData });
  const fileInputRef = useRef(null);

  const stats = [
    { label: 'Rides Taken', value: '24', icon: FaCar },
    { label: 'Rating', value: '4.8', icon: FaStar },
    { label: 'Favorites', value: '12', icon: FaHeart },
    { label: 'Years Active', value: '2', icon: FaHistory }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    updateUser({ ...user, ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        if (isEditing) {
          setTempData(prev => ({ ...prev, profileImage: imageUrl }));
        } else {
          setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
          updateUser({ ...user, profileImage: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="profile-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          My Profile
        </motion.h1>
      </div>

      <div className="profile-content">
        {/* Profile Card */}
        <motion.div 
          className="profile-card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="profile-image-section">
            <div className="profile-image-container">
              {(isEditing ? tempData.profileImage : profileData.profileImage) ? (
                <img 
                  src={isEditing ? tempData.profileImage : profileData.profileImage} 
                  alt="Profile" 
                  className="profile-image"
                />
              ) : (
                <div className="profile-placeholder">
                  <FaUser />
                </div>
              )}
              <button 
                className="camera-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaCamera />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="profile-info">
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={tempData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={tempData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={tempData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={tempData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={tempData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="form-input"
                    rows="3"
                  />
                </div>
                <div className="edit-actions">
                  <button className="btn btn-primary" onClick={handleSave}>
                    <FaSave /> Save Changes
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-display">
                <div className="profile-header-info">
                  <h2>{profileData.name}</h2>
                  <button className="edit-btn" onClick={handleEdit}>
                    <FaEdit /> Edit Profile
                  </button>
                </div>
                
                <div className="profile-details">
                  <div className="detail-item">
                    <FaEnvelope className="detail-icon" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="detail-item">
                    <FaPhone className="detail-icon" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{profileData.location}</span>
                  </div>
                </div>

                <div className="profile-bio">
                  <h3>About</h3>
                  <p>{profileData.bio}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="stats-grid"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">
                <stat.icon />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="activity-section"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <FaCar />
              </div>
              <div className="activity-content">
                <h4>Completed ride to Airport</h4>
                <p>2 hours ago • ₹850</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <FaStar />
              </div>
              <div className="activity-content">
                <h4>Received 5-star rating</h4>
                <p>1 day ago • From Rajesh Kumar</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <FaHeart />
              </div>
              <div className="activity-content">
                <h4>Added BMW X5 to favorites</h4>
                <p>3 days ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .profile-container {
          min-height: 100vh;
          background: var(--dark);
          color: var(--text-primary);
          padding: 2rem;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .profile-header h1 {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .profile-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 2rem;
        }

        .profile-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 2rem;
          align-items: start;
        }

        .profile-image-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .profile-image-container {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--primary);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-placeholder {
          width: 100%;
          height: 100%;
          background: var(--card-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: var(--text-secondary);
        }

        .camera-btn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: var(--primary);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .camera-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(0, 200, 83, 0.3);
        }

        .profile-info {
          flex: 1;
        }

        .profile-header-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .profile-header-info h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .edit-btn {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 200, 83, 0.3);
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
        }

        .detail-icon {
          color: var(--primary);
          font-size: 1.2rem;
          width: 20px;
        }

        .profile-bio h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .profile-bio p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: var(--text-primary);
        }

        .edit-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .stat-icon {
          background: rgba(0, 200, 83, 0.1);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          font-size: 1.5rem;
        }

        .stat-info h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .stat-info p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 0.9rem;
        }

        .activity-section {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
        }

        .activity-section h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--darker);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .activity-item:hover {
          background: rgba(0, 200, 83, 0.05);
        }

        .activity-icon {
          background: rgba(0, 200, 83, 0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .activity-content h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.25rem 0;
        }

        .activity-content p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .profile-container {
            padding: 1rem;
          }

          .profile-header h1 {
            font-size: 2rem;
          }

          .profile-card {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1.5rem;
          }

          .profile-header-info {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .edit-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .profile-image-container {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Profile;