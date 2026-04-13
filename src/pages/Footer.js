import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Footer.css'; // Adjust path if needed based on structure

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="gradient-text">CarShare</h2>
            <p>Experience the finest modern car-sharing platform redesigned dynamically for the future.</p>
            <div className="social-icons">
              <a href="https://kinshuk.unaux.com/" target='_blank' className="social-link">X</a>
              <a href="https://www.linkedin.com/in/kinshuk-saxena-/" target='_blank' className="social-link">in</a>
              <a href="https://instagram.com/kinshuk._.saxena" target="_blank" className="social-link">ig</a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/book">Book a Ride</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Info</h3>
            <p>📍 123 Future Tech Blvd</p>
            <p>📞 +1 (555) 000-0000</p>
            <p>📧 support@carshare.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CarShare Platform. Redesigned by Kinshuk Saxena.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
