import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            We aim to reduce traffic and pollution by connecting private car owners with people who need affordable, convenient car-sharing options. Travel smarter, save more, and help make our city cleaner.
          </p>
        </div>
        <div className="footer-section links" id='Footer'>
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/home">Home</Link></li> 
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/">Register</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: kinshuksaxena3@gmail.com</p>
          <p>Phone: +91 9057538521</p>
          <p>Address: Jaipur, Rajasthan</p>
          <p>
            Instagram:  .
            <a href="https://www.instagram.com/kinshuk._.saxena" target="_blank" rel="noopener noreferrer">
              @kinshuk._.saxena
            </a>
          </p>

        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Car Share | All Rights Reserved  |  kinshuk saxena </p>
      </div>
    </footer>
  );
};

export default Footer;
