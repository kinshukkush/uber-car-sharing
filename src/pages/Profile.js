import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaCamera,
  FaCar,
  FaStar,
  FaRoute,
  FaCreditCard,
  FaShieldAlt,
  FaBell,
  FaMoon,
  FaGlobe,
  FaLock,
  FaSignOutAlt,
  FaChevronRight,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCog,
  FaHeart,
  FaTrophy,
  FaMedal,
  FaGift,
  FaWallet,
  FaHistory,
  FaQuestionCircle,
  FaHeadset
} from 'react-icons/fa';
import { MdVerified, MdLocalOffer } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';
import '../components/Profile.css';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { getBookingHistory } = useBooking();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    emergencyContact: user?.emergencyContact || ''
  });

  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: true,
    locationTracking: true,
    twoFactorAuth: false
  });

  // Calculate stats
  const history = getBookingHistory();
  const completedRides = history.filter(b => b.status === 'completed');
  const totalSpent = completedRides.reduce((acc, r) => acc + parseFloat(r.price || 0), 0);
  const avgRating = completedRides.filter(r => r.rating).length > 0
    ? (completedRides.filter(r => r.rating).reduce((acc, r) => acc + r.rating, 0) / completedRides.filter(r => r.rating).length).toFixed(1)
    : '5.0';
  const totalDistance = completedRides.reduce((acc, r) => acc + parseFloat(r.distance || 5), 0);

  // Achievements
  const achievements = [
    { id: 1, icon: <FaTrophy />, title: 'First Ride', desc: 'Completed your first ride', unlocked: completedRides.length >= 1, color: '#f59e0b' },
    { id: 2, icon: <FaMedal />, title: 'Regular Rider', desc: 'Completed 10+ rides', unlocked: completedRides.length >= 10, color: '#3b82f6' },
    { id: 3, icon: <FaStar />, title: 'Top Rater', desc: 'Rated 5 rides', unlocked: completedRides.filter(r => r.rating).length >= 5, color: '#8b5cf6' },
    { id: 4, icon: <FaHeart />, title: 'Loyal Customer', desc: 'Member for 6+ months', unlocked: true, color: '#ef4444' },
    { id: 5, icon: <FaRoute />, title: 'Road Warrior', desc: 'Traveled 100+ km', unlocked: totalDistance >= 100, color: '#10b981' },
    { id: 6, icon: <FaGift />, title: 'Referral Master', desc: 'Referred 3 friends', unlocked: false, color: '#ec4899' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSettingToggle = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
    toast.success(`${setting.replace(/([A-Z])/g, ' $1').trim()} ${!settings[setting] ? 'enabled' : 'disabled'}`);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      toast.success('Avatar updated!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!", { icon: '✅' });
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  // Quick links
  const quickLinks = [
    { icon: <FaHistory />, title: 'Ride History', desc: 'View all your past rides', path: '/history' },
    { icon: <FaCreditCard />, title: 'Payment Methods', desc: 'Manage payment options', path: '#' },
    { icon: <FaWallet />, title: 'Wallet', desc: 'Balance: \$45.00', path: '#' },
    { icon: <MdLocalOffer />, title: 'Promotions', desc: '3 active offers', path: '#' },
    { icon: <FaHeadset />, title: 'Support', desc: 'Get help 24/7', path: '/contact' },
    { icon: <FaQuestionCircle />, title: 'FAQ', desc: 'Common questions', path: '#' }
  ];

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
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Effects */}
      <div className="profile-bg-effects">
        <div className="bg-gradient-orb orb-1"></div>
        <div className="bg-gradient-orb orb-2"></div>
      </div>

      <div className="profile-container">
        {/* Profile Header Card */}
        <motion.div 
          className="profile-header-card glass-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-cover">
            <div className="cover-gradient"></div>
          </div>
          
          <div className="profile-header-content">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <div className="avatar">
                  {avatarPreview || user?.avatar ? (
                    <img src={avatarPreview || user?.avatar} alt={user?.name} />
                  ) : (
                    <span>{user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <motion.button 
                  className="avatar-edit-btn"
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaCamera />
                </motion.button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  hidden
                />
                <div className="avatar-verified-badge">
                  <MdVerified />
                </div>
              </div>
            </div>

            <div className="user-info-section">
              <div className="user-name-row">
                <h1>{user?.name || 'User'}</h1>
                <span className="verified-tag">
                  <FaCheckCircle /> Verified
                </span>
              </div>
              <p className="user-email">{user?.email}</p>
              <div className="user-meta">
                <span className="meta-item">
                  <FaCalendarAlt /> Member since {user?.joinedDate || 'Jan 2024'}
                </span>
                <span className="meta-item">
                  <FaMapMarkerAlt /> {user?.location || 'New York, USA'}
                </span>
              </div>
            </div>

            <div className="header-actions">
              <motion.button 
                className="edit-profile-btn"
                onClick={() => {
                  setActiveTab('profile');
                  setIsEditing(true);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEdit /> Edit Profile
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="profile-stats"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-icon rides">
              <FaCar />
            </div>
            <div className="stat-content">
              <span className="stat-value">{completedRides.length}</span>
              <span className="stat-label">Total Rides</span>
            </div>
          </motion.div>
          
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-icon rating">
              <FaStar />
            </div>
            <div className="stat-content">
              <span className="stat-value">{avgRating}</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </motion.div>
          
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-icon distance">
              <FaRoute />
            </div>
            <div className="stat-content">
              <span className="stat-value">{totalDistance.toFixed(0)}</span>
              <span className="stat-label">km Traveled</span>
            </div>
          </motion.div>
          
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-icon spent">
              <FaCreditCard />
            </div>
            <div className="stat-content">
              <span className="stat-value">${totalSpent.toFixed(0)}</span>
              <span className="stat-label">Total Spent</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="profile-main-content">
          {/* Left Column - Navigation & Quick Links */}
          <motion.div 
            className="profile-sidebar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Tab Navigation */}
            <div className="sidebar-nav glass-card">
              <h3>Account</h3>
              <nav className="nav-tabs">
                {[
                  { id: 'profile', icon: <FaUser />, label: 'Profile' },
                  { id: 'settings', icon: <FaCog />, label: 'Settings' },
                  { id: 'achievements', icon: <FaTrophy />, label: 'Achievements' },
                  { id: 'security', icon: <FaShieldAlt />, label: 'Security' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    <FaChevronRight className="chevron" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Links */}
            <div className="quick-links glass-card">
              <h3>Quick Links</h3>
              <div className="links-list">
                {quickLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.path}
                    className="quick-link"
                    onClick={(e) => {
                      if (link.path.startsWith('/')) {
                        e.preventDefault();
                        navigate(link.path);
                      }
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="link-icon">{link.icon}</div>
                    <div className="link-content">
                      <span className="link-title">{link.title}</span>
                      <span className="link-desc">{link.desc}</span>
                    </div>
                    <FaChevronRight className="link-arrow" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <motion.button 
              className="logout-btn"
              onClick={() => setShowLogoutConfirm(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignOutAlt /> Sign Out
            </motion.button>
          </motion.div>

          {/* Right Column - Content Panels */}
          <motion.div 
            className="profile-content-area"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div 
                  key="profile"
                  className="content-panel glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="panel-header">
                    <h2>Personal Information</h2>
                    {!isEditing && (
                      <motion.button 
                        className="edit-btn"
                        onClick={() => setIsEditing(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaEdit /> Edit
                      </motion.button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="edit-form">
                      <div className="form-grid">
                        <div className="form-group">
                          <label>
                            <FaUser /> Full Name
                          </label>
                          <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>
                            <FaPhone /> Phone Number
                          </label>
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>

                        <div className="form-group full-width">
                          <label>
                            <FaEnvelope /> Email Address
                          </label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            disabled 
                            className="disabled"
                          />
                          <span className="input-hint">Email cannot be changed</span>
                        </div>

                        <div className="form-group full-width">
                          <label>
                            <FaMapMarkerAlt /> Home Address
                          </label>
                          <input 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange}
                            placeholder="Enter your home address"
                          />
                        </div>

                        <div className="form-group full-width">
                          <label>
                            <FaPhone /> Emergency Contact
                          </label>
                          <input 
                            type="tel" 
                            name="emergencyContact" 
                            value={formData.emergencyContact} 
                            onChange={handleChange}
                            placeholder="Emergency contact number"
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <motion.button 
                          type="submit" 
                          className="btn-primary"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaSave /> Save Changes
                        </motion.button>
                        <motion.button 
                          type="button" 
                          className="btn-outline"
                          onClick={() => setIsEditing(false)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaTimes /> Cancel
                        </motion.button>
                      </div>
                    </form>
                  ) : (
                    <div className="profile-info-list">
                      <div className="info-item">
                        <div className="info-icon"><FaUser /></div>
                        <div className="info-content">
                          <span className="info-label">Full Name</span>
                          <span className="info-value">{user?.name || 'Not provided'}</span>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <div className="info-icon"><FaEnvelope /></div>
                        <div className="info-content">
                          <span className="info-label">Email Address</span>
                          <span className="info-value">{user?.email}</span>
                        </div>
                        <span className="info-badge verified">Verified</span>
                      </div>
                      
                      <div className="info-item">
                        <div className="info-icon"><FaPhone /></div>
                        <div className="info-content">
                          <span className="info-label">Phone Number</span>
                          <span className="info-value">{user?.phone || 'Not provided'}</span>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <div className="info-icon"><FaMapMarkerAlt /></div>
                        <div className="info-content">
                          <span className="info-label">Home Address</span>
                          <span className="info-value">{user?.address || 'Not provided'}</span>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <div className="info-icon"><FaCalendarAlt /></div>
                        <div className="info-content">
                          <span className="info-label">Member Since</span>
                          <span className="info-value">{user?.joinedDate || 'January 2024'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div 
                  key="settings"
                  className="content-panel glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="panel-header">
                    <h2>App Settings</h2>
                  </div>

                  <div className="settings-list">
                    <div className="settings-group">
                      <h3>Notifications</h3>
                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon"><FaBell /></div>
                          <div className="setting-text">
                            <span className="setting-title">Push Notifications</span>
                            <span className="setting-desc">Receive ride updates and promotions</span>
                          </div>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={settings.notifications}
                            onChange={() => handleSettingToggle('notifications')}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon"><FaEnvelope /></div>
                          <div className="setting-text">
                            <span className="setting-title">Email Updates</span>
                            <span className="setting-desc">Receive newsletters and offers</span>
                          </div>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={settings.emailUpdates}
                            onChange={() => handleSettingToggle('emailUpdates')}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>

                    <div className="settings-group">
                      <h3>Appearance</h3>
                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon"><FaMoon /></div>
                          <div className="setting-text">
                            <span className="setting-title">Dark Mode</span>
                            <span className="setting-desc">Use dark theme</span>
                          </div>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={settings.darkMode}
                            onChange={() => handleSettingToggle('darkMode')}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon"><FaGlobe /></div>
                          <div className="setting-text">
                            <span className="setting-title">Language</span>
                            <span className="setting-desc">English (US)</span>
                          </div>
                        </div>
                        <FaChevronRight className="setting-arrow" />
                      </div>
                    </div>

                    <div className="settings-group">
                      <h3>Privacy</h3>
                      <div className="setting-item">
                        <div className="setting-info">
                          <div className="setting-icon"><FaMapMarkerAlt /></div>
                          <div className="setting-text">
                            <span className="setting-title">Location Tracking</span>
                            <span className="setting-desc">Allow location access for rides</span>
                          </div>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={settings.locationTracking}
                            onChange={() => handleSettingToggle('locationTracking')}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <motion.div 
                  key="achievements"
                  className="content-panel glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="panel-header">
                    <h2>Achievements</h2>
                    <span className="achievement-count">
                      {achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked
                    </span>
                  </div>

                  <div className="achievements-grid">
                    {achievements.map((achievement) => (
                      <motion.div 
                        key={achievement.id}
                        className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                        whileHover={{ scale: 1.02 }}
                        style={{ '--achievement-color': achievement.color }}
                      >
                        <div className="achievement-icon">
                          {achievement.icon}
                        </div>
                        <div className="achievement-info">
                          <h4>{achievement.title}</h4>
                          <p>{achievement.desc}</p>
                        </div>
                        {achievement.unlocked ? (
                          <div className="achievement-badge">
                            <FaCheckCircle />
                          </div>
                        ) : (
                          <div className="achievement-lock">
                            <FaLock />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div 
                  key="security"
                  className="content-panel glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="panel-header">
                    <h2>Security & Privacy</h2>
                  </div>

                  <div className="security-options">
                    <div className="security-item">
                      <div className="security-info">
                        <div className="security-icon"><FaLock /></div>
                        <div className="security-text">
                          <span className="security-title">Change Password</span>
                          <span className="security-desc">Last changed 30 days ago</span>
                        </div>
                      </div>
                      <motion.button 
                        className="security-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Update
                      </motion.button>
                    </div>

                    <div className="security-item">
                      <div className="security-info">
                        <div className="security-icon"><FaShieldAlt /></div>
                        <div className="security-text">
                          <span className="security-title">Two-Factor Authentication</span>
                          <span className="security-desc">Add an extra layer of security</span>
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.twoFactorAuth}
                          onChange={() => handleSettingToggle('twoFactorAuth')}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="security-item">
                      <div className="security-info">
                        <div className="security-icon"><FaHistory /></div>
                        <div className="security-text">
                          <span className="security-title">Login Activity</span>
                          <span className="security-desc">View recent login sessions</span>
                        </div>
                      </div>
                      <motion.button 
                        className="security-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View
                      </motion.button>
                    </div>

                    <div className="security-item danger">
                      <div className="security-info">
                        <div className="security-icon"><FaUser /></div>
                        <div className="security-text">
                          <span className="security-title">Delete Account</span>
                          <span className="security-desc">Permanently delete your account</span>
                        </div>
                      </div>
                      <motion.button 
                        className="security-btn danger"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div 
              className="logout-modal glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-icon">
                <FaSignOutAlt />
              </div>
              <h3>Sign Out?</h3>
              <p>Are you sure you want to sign out of your account?</p>
              <div className="modal-actions">
                <motion.button 
                  className="btn-outline"
                  onClick={() => setShowLogoutConfirm(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  className="btn-danger"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;