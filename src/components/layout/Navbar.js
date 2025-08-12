import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaBell, FaSignOutAlt, FaUserCircle, FaHistory, FaCog } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';
import CarSharingLogo from '../../assets/carLogo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
    setShowUserMenu(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/about-us', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/rentcar', label: 'Rent Car' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/home" onClick={closeMobileMenu}>
            <img src={CarSharingLogo} alt="Car Sharing Logo" className="navbar-logo-img" />
            <h1>Car Sharing</h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="navbar-links">
          {navItems.map((item) => (
            <motion.li key={item.path} whileHover={{ y: -2 }}>
              <Link 
                to={item.path} 
                className={isActive(item.path) ? 'active' : ''}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Action Buttons */}
        <div className="navbar-actions">
          <motion.button 
            className="notification-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBell />
            <span className="notification-badge">3</span>
          </motion.button>
          
          {/* User Menu */}
          <div className="user-menu-container">
            <motion.button 
              className="user-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserCircle />
              <span>{user?.name || 'User'}</span>
            </motion.button>
            
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  className="user-menu"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="user-info">
                    <FaUserCircle className="user-avatar" />
                    <div>
                      <p className="user-name">{user?.name || 'User'}</p>
                      <p className="user-email">{user?.email}</p>
                    </div>
                  </div>
                  <div className="user-menu-actions">
                    <button className="menu-item" onClick={() => setShowUserMenu(false)}>
                      <FaUser />
                      <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Profile
                      </Link>
                    </button>
                    <button className="menu-item" onClick={() => setShowUserMenu(false)}>
                      <FaHistory />
                      <Link to="/booking-history" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Booking History
                      </Link>
                    </button>
                    <button className="menu-item" onClick={() => setShowUserMenu(false)}>
                      <FaCog />
                      <span>Settings</span>
                    </button>
                    <button className="menu-item logout" onClick={handleLogout}>
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="mobile-nav-links">
              {navItems.map((item) => (
                <motion.li 
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className={isActive(item.path) ? 'active' : ''}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mobile-user-info">
                  <FaUserCircle />
                  <span>{user?.name || 'User'}</span>
                </div>
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/profile" onClick={closeMobileMenu} className="mobile-nav-link">
                  <FaUser />
                  <span>Profile</span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/booking-history" onClick={closeMobileMenu} className="mobile-nav-link">
                  <FaHistory />
                  <span>Booking History</span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button onClick={handleLogout} className="mobile-logout-btn">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
