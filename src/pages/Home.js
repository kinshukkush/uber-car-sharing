import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion'; // Add framer-motion for animations

import {
  FaMapMarkerAlt,
  FaRoute,
  FaSearch,
  FaCar,
  FaMoneyBillWave,
  FaBuilding,
  FaUserTie,
  FaArrowRight,
  FaStar,
  FaUserShield
} from 'react-icons/fa';
import '../components/Home.css';
import UberImage from '../assets/Ride-with-Uber.png';
import CarImg from '../assets/path-to-your-car-image.png';
import DriverImg from '../assets/driver-image.png';
import flightImg from '../assets/uber-square.png';
import fleetImg from '../assets/fleet-management.jpg';

const Home = () => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('ride');
  const navigate = useNavigate();

  const locationRef = useRef(null);
  const destinationRef = useRef(null);
  const topContainerRef = useRef(null);

  useEffect(() => {
    // Fade in animation when component mounts
    setIsVisible(true);

    // Add scroll event listener for parallax effects
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('.parallax-section');

      sections.forEach((section) => {
        const distance = section.getBoundingClientRect().top;
        // Removed the unused offset variable to fix the warning

        if (distance < window.innerHeight * 0.8) {
          section.classList.add('visible');
        }
      });

      // Parallax effect for hero image
      if (topContainerRef.current) {
        const heroImage = topContainerRef.current.querySelector('.right-section img');
        if (heroImage) {
          heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocationSelect = () => {
    if (locationRef.current) {
      const place = locationRef.current.getPlaces()[0];
      if (place) {
        setLocation(place.formatted_address || '');
      }
    }
  };

  const handleDestinationSelect = () => {
    if (destinationRef.current) {
      const place = destinationRef.current.getPlaces()[0];
      if (place) {
        setDestination(place.formatted_address || '');
      }
    }
  };
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSeePrices = () => {
    if (!location.trim()) {
      setErrorMessage('Please enter a pickup location');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    if (!destination.trim()) {
      setErrorMessage('Please enter a destination');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (location.trim() === destination.trim()) {
      setErrorMessage('Pickup and destination cannot be the same');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    navigate('/book', { state: { location, destination } });

  const handleSeePrices = () => {
    if (location && destination) {
      navigate('/book', { state: { location, destination } });
    } else {
      // Enhanced error notification
      const errorElement = document.createElement('div');
      errorElement.className = 'error-notification';
      errorElement.innerHTML = '<p>Please enter both a location and destination to proceed.</p>';
      document.body.appendChild(errorElement);

      setTimeout(() => {
        errorElement.classList.add('show');
        setTimeout(() => {
          errorElement.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(errorElement);
          }, 300);
        }, 3000);
      }, 100);
    }
  };

  const scrollToEnter = () => {
    const enterSection = document.getElementById('enter');
    if (enterSection) {
      enterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToLogin = () => {
    navigate('/LoginForm');
  };

  const goTocontact = () => {
    navigate('/Contact');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  return (
    <div className={`home-container ${isVisible ? 'visible' : ''}`}>
      {/* Error Notification */}
      <AnimatePresence>
        {showError && (
          <motion.div
            className="error-notification"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <p>{errorMessage}</p>
              <button 
                className="error-close"
                onClick={() => setShowError(false)}
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ride Options Section */}
      <motion.section
        className="ride-options-section parallax-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        data-offset="0.3"
      >
        <div className="section-header">
          <h2>Choose Your Ride</h2>
          <p>Select the perfect ride option for your needs</p>
        </div>

        <div className="suggestions-carousel">
          <motion.div
            className="suggestion-card premium"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="suggestion-image">
              <img src={CarImg} alt="Premium Car" />
              <div className="badge">Popular</div>
            </div>
            <div className="suggestion-text">
              <h3>Premium Ride</h3>
              <p>Luxury vehicles with professional drivers for a premium experience.</p>
              <ul className="features-list">
                <li>Professional drivers</li>
                <li>Luxury vehicles</li>
                <li>Extra comfort</li>
              </ul>
              <div className="action-buttons">
                <button onClick={scrollToEnter} className="primary-btn">Book Now</button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="suggestion-card standard"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="suggestion-image">
              <img src={DriverImg} alt="Standard Ride" />
            </div>
            <div className="suggestion-text">
              <h3>Standard Ride</h3>
              <p>Affordable and reliable rides for your daily commute.</p>
              <ul className="features-list">
                <li>Verified drivers</li>
                <li>Affordable rates</li>
                <li>Quick pickups</li>
              </ul>
              <div className="action-buttons">
                <button onClick={scrollToEnter} className="primary-btn">Book Now</button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="suggestion-card economy"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="suggestion-image">
              <img src={flightImg} alt="Economy Car" />
            </div>
            <div className="suggestion-text">
              <h3>Economy Ride</h3>
              <p>Budget-friendly options for cost-conscious travelers.</p>
              <ul className="features-list">
                <li>Best prices</li>
                <li>Shared options</li>
                <li>Eco-friendly</li>
              </ul>
              <div className="action-buttons">
                <button onClick={scrollToEnter} className="primary-btn">Book Now</button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      {/* Driver Partnership Section */}
      <motion.section
        className="driver-section parallax-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <motion.div
            className="section-image"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={DriverImg} alt="Driver in car" />
          </motion.div>

          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="content-tag">BECOME A DRIVER</div>
            <h2>Drive when you want, make what you need</h2>
            <p>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through our platform.</p>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon"><FaMoneyBillWave /></div>
                <div className="benefit-text">Earn on your schedule</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><FaCar /></div>
                <div className="benefit-text">Use your car or rent one</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><FaUserShield /></div>
                <div className="benefit-text">Get 24/7 support</div>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={scrollToEnter} className="primary-btn">Get started <FaArrowRight /></button>
              <button onClick={goToLogin} className="secondary-btn">Sign in to your account</button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Business Solutions Section */}
      <motion.section
        className="business-section parallax-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container reverse">
          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="content-tag">BUSINESS SOLUTIONS</div>
            <h2>The Car Share you know, reimagined for business</h2>
            <p>Our business platform offers comprehensive solutions for managing global rides and meals, and local deliveries, for companies of any size.</p>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon"><FaBuilding /></div>
                <div className="benefit-text">Corporate accounts with centralized billing</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><FaUserTie /></div>
                <div className="benefit-text">Dedicated account managers</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><FaMoneyBillWave /></div>
                <div className="benefit-text">Special corporate rates</div>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={goTocontact} className="primary-btn">Explore Solutions <FaArrowRight /></button>
              <button onClick={scrollToEnter} className="secondary-btn">Contact Sales</button>
            </div>
          </motion.div>

          <motion.div
            className="section-image"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={flightImg} alt="Business solutions" className="rounded-image" />
          </motion.div>
        </div>
      </motion.section>

      {/* Fleet Management Section */}
      <motion.section
        className="fleet-section parallax-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <motion.div
            className="section-image"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={fleetImg} alt="Fleet Management" className="rounded-image" />
          </motion.div>

          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="content-tag">FLEET MANAGEMENT</div>
            <h2>Make money by renting out your car</h2>
            <p>Connect with thousands of drivers and earn more per week with our free fleet management tools. Turn your vehicles into a profitable business.</p>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon"><FaMoneyBillWave /></div>
                <div className="benefit-text">Maximize your vehicle earnings</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><FaCar /></div>
                <div className="benefit-text">Free fleet management tools</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><FaUserShield /></div>
                <div className="benefit-text">Verified driver matching</div>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={scrollToEnter} className="primary-btn">Start Earning <FaArrowRight /></button>
              <button onClick={goTocontact} className="secondary-btn">Learn More</button>
            </div>
          </motion.div>
        </div>
      </motion.section>
      {/* Testimonials Section */}
      <motion.section
        className="testimonials-section parallax-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Thousands of happy customers trust our service every day</p>
        </div>

        <div className="testimonials-container">
          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="testimonial-content">
              <div className="rating">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>"The best ride-sharing service I've ever used! Always on time and the drivers are extremely professional."</p>
              <div className="user-info">
                <div className="user-avatar">RS</div>
                <div className="user-details">
                  <h4>Rahul Sharma</h4>
                  <p>Regular User</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -10 }}
          >
            <div className="testimonial-content">
              <div className="rating">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>"As a business traveler, I rely on Car Share for all my transportation needs. The business account feature is a game-changer!"</p>
              <div className="user-info">
                <div className="user-avatar">AP</div>
                <div className="user-details">
                  <h4>Anjali Patel</h4>
                  <p>Business Executive</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <div className="testimonial-content">
              <div className="rating">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>"I've been driving with Car Share for 6 months, and it's been an amazing experience. The flexibility to work on my own schedule is perfect."</p>
              <div className="user-info">
                <div className="user-avatar">VK</div>
                <div className="user-details">
                  <h4>Vijay Kumar</h4>
                  <p>Driver Partner</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Download App Section */}
      <motion.section
        className="app-download-section parallax-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="app-container">
          <motion.div
            className="app-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Download Our App</h2>
            <p>Get the full Car Share experience with our mobile app. Book rides, track your driver, and manage payments all in one place.</p>
            <div className="app-buttons">
              <button className="app-btn">
                <div className="app-btn-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24"><path d="M17.9 5c-.1.1-.2.3-.2.5v12.9c0 .2.1.4.2.5l5.3-7-5.3-6.9z" fill="#00c3ff" /><path d="M22.9 12l-2.3-2.3-4.7 4.7 4.7 4.7 2.3-2.3c.7-.7.7-1.8 0-2.4v-2.4z" fill="#00dfeb" /><path d="M13.4 19.1l4.7-4.7-14.1-5.1-1 13.3 10.4-3.5z" fill="#00aab9" /><path d="M13.4 19.1l-5.5-5.5-4.9-1.7 10.4 7.2z" fill="#00dfeb" /><path d="M13.4 4.9L3 1.4l1 13.3 14.1-5.1-4.7-4.7z" fill="#ffd300" /><path d="M13.4 4.9l-5.5 5.5-4.9 1.7 10.4-7.2z" fill="#ffe650" /></svg>
                </div>
                <div className="app-btn-text">
                  <span>GET IT ON</span>
                  <span className="store-name">Google Play</span>
                </div>
              </button>

              <button className="app-btn">
                <div className="app-btn-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 1.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5zm4.77 16.24c-.64 1.12-1.29 1.36-2.18 1.36-.9 0-1.74-.54-2.58-1.09-.84-.55-1.62-1.09-2.47-1.09-.85 0-1.5.24-2.14 1.36-.17.29-.54.24-.7-.12-1.69-3.91.46-9.47 2.28-10.07.51-.17 1.11.17 1.38.52.3.39.81.65 1.29.65.47 0 .99-.26 1.28-.65.27-.35.87-.69 1.38-.52 1.82.6 3.97 6.16 2.28 10.07-.16.36-.53.41-.7.12l-.02-.05z" fill="black" /></svg>
                </div>
                <div className="app-btn-text">
                  <span>DOWNLOAD ON THE</span>
                  <span className="store-name">App Store</span>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="app-image"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="phone-mockup">
              <div className="phone-screen">
                <img src={UberImage} alt="Car Sharing App" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="faq-section parallax-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about our service</p>
        </div>

        <div className="faq-container">
          <motion.div
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
          >
            <div className="faq-question">
              <h3>How do I book a ride?</h3>
              <div className="faq-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>Booking a ride is simple! Just open our app or website, enter your pickup location and destination, choose your ride type, and confirm your booking. You can track your driver in real-time once they're on their way.</p>
            </div>
          </motion.div>

          <motion.div
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
          >
            <div className="faq-question">
              <h3>What payment methods are accepted?</h3>
              <div className="faq-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>We accept all major credit/debit cards, digital wallets like PayTM and Google Pay, and UPI payments. You can also link your bank account for seamless transactions. For corporate accounts, we offer centralized billing options.</p>
            </div>
          </motion.div>

          <motion.div
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
          >
            <div className="faq-question">
              <h3>How do I become a driver partner?</h3>
              <div className="faq-icon">+</div>
            </div>
            <div className="faq-answer">
              <p>To become a driver partner, you need to sign up on our platform, submit required documents (driver's license, vehicle registration, insurance), pass a background check, and complete our brief orientation. Once approved, you can start accepting ride requests!</p>
            </div>
          </motion.div>
        </div>

        <div className="faq-cta">
          <button onClick={goTocontact} className="primary-btn">View All FAQs</button>
        </div>
      </motion.section>

      {/* Call To Action */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied customers who trust Car Share for their transportation needs.</p>
          <button onClick={scrollToEnter} className="cta-button">Book Your Ride Now</button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;