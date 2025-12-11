import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp
} from 'react-icons/fa';
import '../components/Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>About Car Sharing</h2>
            <p>
              We aim to reduce traffic and pollution by connecting private car owners with people who need affordable, convenient car-sharing options. Travel smarter, save more, and help make our city cleaner.
            </p>
            <div className="social-links">
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebook />
              </motion.a>
              <motion.a 
                href="https://x.com/KINSHUKSAXENA_" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/kinshuk._.saxena" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/kinshuk-saxena-/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a 
                href="https://www.youtube.com/@kinshuk._.saxena" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaYoutube />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="footer-section links">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2>Quick Links</h2>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/rentcar">Rent Car</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/loginform">Login / Register</Link></li>
            </ul>
          </motion.div>
        </div>

        <div className="footer-section services">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Our Services</h2>
            <ul>
              <li>Ride Sharing</li>
              <li>Car Rental</li>
              <li>Premium Rides</li>
              <li>Business Solutions</li>
              <li>Fleet Management</li>
              <li>24/7 Support</li>
            </ul>
          </motion.div>
        </div>

        <div className="footer-section contact">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2>Contact Info</h2>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <p>Email</p>
                <a href="mailto:kinshuksaxena3@gmail.com">kinshuksaxena3@gmail.com</a>
              </div>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div>
                <p>Phone</p>
                <a href="tel:+919057538521">+91 9057538521</a>
              </div>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <p>Address</p>
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Car Sharing | All Rights Reserved | Designed by Kinshuk Saxena</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="scroll-to-top"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;
