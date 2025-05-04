import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../components/Navbar.css';
import CarSharingLogo from '../assets/carLogo.png';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="navbar-logo"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <img src={CarSharingLogo} alt="Car Sharing Logo" className="navbar-logo-img" />
        <h1>Car Sharing</h1>
      </motion.div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/Services">Services</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        <li><Link to="/LoginForm">Login Form</Link></li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;