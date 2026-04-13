import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book a Ride', path: '/book' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo gradient-text">
          CarShare
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu desktop-menu">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.name}
            </NavLink>
          ))}
          
          {isAuthenticated ? (
            <div className="nav-profile-menu">
              <NavLink to="/history" className="nav-link">History</NavLink>
              <NavLink to="/profile" className="nav-link profile-link">
                {user?.name?.charAt(0) || 'U'}
              </NavLink>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="gradient-btn login-btn">Login</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu glass-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link) => (
               <NavLink 
                key={link.name} 
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            
            {isAuthenticated ? (
              <>
                <NavLink to="/history" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>History</NavLink>
                <NavLink to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Profile</NavLink>
                <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="gradient-btn mobile-login-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login / Register
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
