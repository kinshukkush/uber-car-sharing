import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../components/Navbar.css';
import CarSharingLogo from '../assets/carLogo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- Logic to handle navbar background change on scroll ---
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // --- Animation Variants for Framer Motion ---
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: '0%', transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { opacity: 0, y: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={CarSharingLogo} alt="Car Sharing Logo" className="navbar-logo-img" />
          <h1>CarShare</h1>
        </Link>

        {/* --- Desktop Menu --- */}
        <ul className="navbar-links-desktop">
          <li><NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
          <li><NavLink to="/about-us" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Services</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
        </ul>

        <div className="navbar-actions">
          <Link to="/loginform" className="login-button">Login</Link>
          
          {/* --- Mobile Menu Toggle --- */}
          <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar-links-mobile"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul>
              <li onClick={toggleMenu}><NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
              <li onClick={toggleMenu}><NavLink to="/about-us" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
              <li onClick={toggleMenu}><NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Services</NavLink></li>
              <li onClick={toggleMenu}><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
              <li onClick={toggleMenu}><Link to="/loginform" className="login-button-mobile">Login</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
