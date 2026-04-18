import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaGithub, 
  FaYoutube,
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaCar,
  FaPaperPlane,
  FaHeart,
  FaArrowUp,
  FaApple,
  FaGooglePlay,
  FaShieldAlt,
  FaClock,
  FaHeadset
} from 'react-icons/fa';
import '../components/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position for back to top button
  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book a Ride', path: '/book' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const supportLinks = [
    { name: 'Help Center', path: '#' },
    { name: 'Safety', path: '#' },
    { name: 'Lost & Found', path: '#' },
    { name: 'Accessibility', path: '#' },
    { name: 'FAQs', path: '#' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Cookie Policy', path: '#' },
    { name: 'Licenses', path: '#' }
  ];

  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://x.com/kinshuksaxena_', label: 'Twitter' },
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/kinshuk-saxena-/', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://instagram.com/kinshuk._.saxena', label: 'Instagram' },
    { icon: <FaGithub />, url: 'https://github.com/kinshukkush', label: 'GitHub' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@kinshuk._.saxena', label: 'YouTube' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="footer">
      {/* Pre-Footer CTA Section */}
      <div className="footer-cta-section">
        <div className="footer-cta-container">
          <motion.div 
            className="footer-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-text">
              <h3>Ready to ride with us?</h3>
              <p>Download our app and get your first ride free!</p>
            </div>
            <div className="cta-buttons">
              <motion.a 
                href="#" 
                className="app-btn apple-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaApple className="app-icon" />
                <div className="app-text">
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>
              </motion.a>
              <motion.a 
                href="#" 
                className="app-btn google-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGooglePlay className="app-icon" />
                <div className="app-text">
                  <span>Get it on</span>
                  <strong>Google Play</strong>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="trust-indicators"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="trust-item">
              <FaShieldAlt />
              <span>Secure Payments</span>
            </div>
            <div className="trust-item">
              <FaClock />
              <span>24/7 Service</span>
            </div>
            <div className="trust-item">
              <FaHeadset />
              <span>Live Support</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <motion.div 
            className="footer-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Brand Section */}
            <motion.div className="footer-brand" variants={itemVariants}>
              <Link to="/" className="footer-logo">
                <div className="logo-icon">
                  <FaCar />
                </div>
                <span className="logo-text gradient-text">CarShare</span>
              </Link>
              <p className="brand-description">
                Experience the future of urban mobility with our premium car-sharing platform. 
                Safe, reliable, and always at your fingertips.
              </p>
              
              {/* Newsletter */}
              <div className="newsletter-section">
                <h4>Subscribe to our newsletter</h4>
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <motion.button 
                    type="submit" 
                    className="subscribe-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <>✓ Subscribed!</>
                    ) : (
                      <FaPaperPlane />
                    )}
                  </motion.button>
                </form>
                {isSubscribed && (
                  <motion.p 
                    className="subscribe-success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Thank you for subscribing!
                  </motion.p>
                )}
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4>Follow us</h4>
                <div className="social-icons">
                  {socialLinks.map((social, idx) => (
                    <motion.a 
                      key={idx}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={social.label}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div className="footer-links" variants={itemVariants}>
              <h3>Quick Links</h3>
              <ul>
                {quickLinks.map((link, idx) => (
                  <motion.li 
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link to={link.path}>
                      <span className="link-arrow">→</span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div className="footer-links" variants={itemVariants}>
              <h3>Support</h3>
              <ul>
                {supportLinks.map((link, idx) => (
                  <motion.li 
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href={link.path}>
                      <span className="link-arrow">→</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div className="footer-links" variants={itemVariants}>
              <h3>Legal</h3>
              <ul>
                {legalLinks.map((link, idx) => (
                  <motion.li 
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href={link.path}>
                      <span className="link-arrow">→</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="footer-contact" variants={itemVariants}>
              <h3>Contact Us</h3>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-text">
                    <span>Address</span>
                    <p>LPU, BH1, Phagwara, Punjab 144411</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-text">
                    <span>Phone</span>
                    <a href="tel:+919057538521">+91 9057538521</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-text">
                    <span>Email</span>
                    <a href="mailto:kinshuksaxena3@gmail.com">kinshuksaxena3@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <div className="working-hours">
                <h4>Working Hours</h4>
                <p>24/7 - We never stop!</p>
                <div className="status-badge">
                  <span className="status-dot"></span>
                  Currently Open
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-left">
            <p>
              © {new Date().getFullYear()} CarShare Platform. All rights reserved.
            </p>
          </div>
          <div className="footer-bottom-center">
            <p>
              Crafted with <FaHeart className="heart-icon" /> by{' '}
              <a 
                href="https://portfolio-frontend-mu-snowy.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="developer-link"
              >
                Kinshuk Saxena
              </a>
            </p>
          </div>
          <div className="footer-bottom-right">
            <div className="payment-methods">
              <span>We accept:</span>
              <div className="payment-icons">
                <span className="payment-icon">💳</span>
                <span className="payment-icon">🏦</span>
                <span className="payment-icon">📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button 
        className={`back-to-top ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </motion.button>

      {/* Decorative Elements */}
      <div className="footer-decoration">
        <div className="decoration-line line-1"></div>
        <div className="decoration-line line-2"></div>
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
      </div>
    </footer>
  );
};

export default Footer;