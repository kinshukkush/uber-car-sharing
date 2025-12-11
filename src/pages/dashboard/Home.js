import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaRoute,
  FaCar,
  FaMoneyBillWave,
  FaUserTie,
  FaArrowRight,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaCreditCard,
  FaTaxi,
  FaCalendarAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { BiCurrentLocation } from 'react-icons/bi';
import '../../components/Home.css';

// Import your images (ensure paths are correct in your project)
import UberImage from '../../assets/Ride-with-Uber.png';
import CarImg from '../../assets/path-to-your-car-image.png';
import DriverImg from '../../assets/driver-image.png';

const Home = () => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRideType, setSelectedRideType] = useState('standard');
  const [activeFaq, setActiveFaq] = useState(null);

  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const topContainerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const sections = document.querySelectorAll('.parallax-section');
      sections.forEach((section) => {
        const distance = section.getBoundingClientRect().top;
        if (distance < window.innerHeight * 0.8) {
          section.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCurrentLocation = () => {
    setIsLoading(true);
    // Simulating geolocation with your current location
    setTimeout(() => {
      setLocation('Jaipur, Rajasthan');
      setIsLoading(false);
    }, 1000);
  };

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

    // Navigate to the booking page with the form data
    navigate('/book', {
      state: {
        location: location,
        destination: destination,
        rideType: selectedRideType
      }
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  
  return (
    <div className={`home-container ${isVisible ? 'visible' : ''}`}>
      {/* Enhanced Error Notification */}
      <AnimatePresence>
        {showError && (
          <motion.div
            className="error-notification"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <p>{errorMessage}</p>
              <button className="error-close" onClick={() => setShowError(false)}>
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="hero-section" ref={topContainerRef}>
        <motion.div className="hero-background" style={{ y: parallaxY }} />
        <motion.div
          className="top-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="left-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1>
              Start Your Journey with
              <motion.span
                className="highlight"
                animate={{
                  color: ['var(--primary)', 'var(--secondary)', 'var(--primary)'],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                CarShare
              </motion.span>
            </h1>
            <p className="subtitle">
              Safe, reliable rides at your fingertips. Available 24/7.
            </p>

            <div className="ride-type-selector">
              {['Standard', 'Premium', 'Shared'].map((type) => (
                <motion.button
                  key={type}
                  className={`ride-type-btn ${selectedRideType === type.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setSelectedRideType(type.toLowerCase())}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCar />
                  <span>{type}</span>
                </motion.button>
              ))}
            </div>

            <div className="location-inputs">
              <div className="input-group">
                <div className="input-wrapper">
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <button
                    className="current-location-btn"
                    onClick={getCurrentLocation}
                    disabled={isLoading}
                    title="Get Current Location"
                  >
                    <BiCurrentLocation />
                  </button>
                </div>
                <div className="input-wrapper">
                  <FaRoute className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              <motion.button
                className="estimate-btn"
                onClick={handleSeePrices}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? <div className="loader" /> : ( <> <span>See Prices</span> <FaArrowRight /> </>)}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="right-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="image-container">
              <img src={UberImage} alt="Car Sharing Service" className="hero-image" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.section className="features-section parallax-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="section-header">
          <h2>Why Choose CarShare?</h2>
          <p>Experience premium ride-sharing with outstanding features</p>
        </div>
        <div className="features-grid">
          <motion.div className="feature-card" whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
            <div className="feature-icon"><FaShieldAlt /></div>
            <h3>Safety First</h3>
            <p>Verified drivers, real-time tracking, and 24/7 support for your peace of mind.</p>
            <ul className="feature-list">
              <li>Driver background checks</li>
              <li>Real-time trip tracking</li>
              <li>Emergency assistance</li>
            </ul>
          </motion.div>
          <motion.div className="feature-card" whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
            <div className="feature-icon"><FaMoneyBillWave /></div>
            <h3>Best Prices</h3>
            <p>Competitive rates with transparent pricing and no hidden charges.</p>
            <ul className="feature-list">
              <li>Upfront pricing</li>
              <li>Multiple payment options</li>
              <li>Special discounts</li>
            </ul>
          </motion.div>
          <motion.div className="feature-card" whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
            <div className="feature-icon"><FaClock /></div>
            <h3>Quick Pickup</h3>
            <p>Fast and reliable pickups with extensive coverage across the city.</p>
            <ul className="feature-list">
              <li>Average 3-5 min arrival</li>
              <li>24/7 availability</li>
              <li>Wide service area</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Service Stats Section */}
      <motion.section className="stats-section parallax-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon"><FaUserTie /></div>
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Professional Drivers</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><FaTaxi /></div>
            <div className="stat-number">1M+</div>
            <div className="stat-label">Rides Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><FaStar /></div>
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">User Rating</div>
          </div>
        </div>
      </motion.section>

      {/* Ride Options Section */}
      <motion.section className="ride-options-section parallax-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="section-header">
          <h2>Choose Your Perfect Ride</h2>
          <p>Select from our range of premium vehicles for any occasion</p>
        </div>
        <div className="ride-options-container">
          {/* Standard Card */}
          <motion.div className="ride-option-card" whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="ride-image">
              <img src={CarImg} alt="Standard Ride" />
              <div className="ride-badge">Most Popular</div>
            </div>
            <div className="ride-details">
              <h3>Standard</h3>
              <p>Comfortable and affordable rides for your everyday journeys.</p>
              <ul className="ride-features">
                <li><FaCheckCircle /> Up to 4 passengers</li>
                <li><FaCheckCircle /> Air conditioning</li>
                <li><FaCheckCircle /> Budget-friendly</li>
              </ul>
              <div className="ride-price">
                <span className="price-label">Starting from</span>
                <span className="price-amount">$10</span>
              </div>
              <motion.button className="book-ride-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/uber-car-sharing/services', { state: { rideType: 'standard' } })}>Book Now</motion.button>
            </div>
          </motion.div>
          {/* Premium Card */}
          <motion.div className="ride-option-card premium" whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="ride-image">
              <img src={CarImg} alt="Premium Ride" />
              <div className="ride-badge">Luxury</div>
            </div>
            <div className="ride-details">
              <h3>Premium</h3>
              <p>High-end vehicles with professional drivers for special occasions.</p>
              <ul className="ride-features">
                <li><FaCheckCircle /> Up to 4 passengers</li>
                <li><FaCheckCircle /> Premium vehicles</li>
                <li><FaCheckCircle /> Top-rated drivers</li>
              </ul>
              <div className="ride-price">
                <span className="price-label">Starting from</span>
                <span className="price-amount">$25</span>
              </div>
              <motion.button className="book-ride-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/uber-car-sharing/services', { state: { rideType: 'premium' } })}>Book Now</motion.button>
            </div>
          </motion.div>
          {/* Shared Card */}
          <motion.div className="ride-option-card" whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="ride-image">
              <img src={CarImg} alt="Shared Ride" />
              <div className="ride-badge">Eco-friendly</div>
            </div>
            <div className="ride-details">
              <h3>Shared</h3>
              <p>Share your ride with others going in the same direction and save.</p>
              <ul className="ride-features">
                <li><FaCheckCircle /> Share with others</li>
                <li><FaCheckCircle /> Most economical</li>
                <li><FaCheckCircle /> Eco-friendly choice</li>
              </ul>
              <div className="ride-price">
                <span className="price-label">Starting from</span>
                <span className="price-amount">$7</span>
              </div>
              <motion.button className="book-ride-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/uber-car-sharing/services', { state: { rideType: 'shared' } })}>Book Now</motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Driver Section */}
      <motion.section className="driver-section parallax-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="section-container">
          <motion.div className="section-image" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img src={DriverImg} alt="Become a Driver" />
            <div className="image-overlay">
              <div className="overlay-content">
                <FaStar className="rating-star" />
                <span className="rating-text">4.9</span>
                <p>Average Driver Rating</p>
              </div>
            </div>
          </motion.div>
          <motion.div className="section-content" initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="content-tag">Join Our Team</span>
            <h2>Drive With CarShare</h2>
            <p>Turn your car into a money-making machine. Join thousands of drivers earning with CarShare.</p>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon"><FaMoneyBillWave /></div>
                <div className="benefit-text">
                  <h4>Flexible Earnings</h4>
                  <p>Make money on your schedule. The more you drive, the more you earn.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><FaCalendarAlt /></div>
                <div className="benefit-text">
                  <h4>Work Anytime</h4>
                  <p>Drive whenever you want — no minimum hours or schedules.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><FaCreditCard /></div>
                <div className="benefit-text">
                  <h4>Quick Payments</h4>
                  <p>Get paid weekly with direct deposit to your bank account.</p>
                </div>
              </div>
            </div>
            <div className="cta-buttons">
              <motion.button className="primary-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Apply Now</motion.button>
              <motion.button className="secondary-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Learn More</motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section className="testimonials-section parallax-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Real experiences from our community</p>
        </div>
        <div className="testimonials-container">
          {/* Testimonial Cards */}
          <motion.div className="testimonial-card" whileHover={{ y: -10 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0 }}>
            <div className="testimonial-content">
              <div className="rating">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</div>
              <p>"Exceptional service! The app is user-friendly, drivers are professional, and prices are reasonable. My go-to transportation solution."</p>
              <div className="user-info">
                <div className="user-avatar"><img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" /></div>
                <div className="user-details">
                  <h4>Sarah Johnson</h4>
                  <p>Regular User</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="testimonial-card" whileHover={{ y: -10 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="testimonial-content">
              <div className="rating">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</div>
              <p>"As a business traveler, I rely on CarShare for consistent, professional service. The corporate account feature makes expense tracking effortless."</p>
              <div className="user-info">
                <div className="user-avatar"><img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" /></div>
                <div className="user-details">
                  <h4>Michael Chen</h4>
                  <p>Business Executive</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="testimonial-card" whileHover={{ y: -10 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="testimonial-content">
              <div className="rating">{[...Array(4)].map((_, i) => <FaStar key={i} />)} <FaStar style={{color: 'var(--gray-light)'}}/></div>
              <p>"Driving with CarShare has been a great experience. Flexible hours, good earnings, and excellent support from the team."</p>
              <div className="user-info">
                <div className="user-avatar"><img src="https://randomuser.me/api/portraits/men/67.jpg" alt="David Rodriguez" /></div>
                <div className="user-details">
                  <h4>David Rodriguez</h4>
                  <p>Driver Partner</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="faq-section parallax-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common questions</p>
        </div>
        <div className="faq-container">
          {[
            { q: "How do I book a ride?", a: "Simply open the app, enter your destination, choose your ride type, and confirm your booking. You'll be matched with a nearby driver immediately." },
            { q: "What payment methods are accepted?", a: "We accept all major credit cards, debit cards, and digital wallets like Apple Pay and Google Pay. You can also pay with cash in selected regions." },
            { q: "Can I schedule a ride in advance?", a: "Yes! You can schedule a ride up to 30 days in advance using the 'Schedule' feature in the app. This is perfect for airport trips and important appointments." },
            { q: "How do I become a driver?", a: "To become a driver, you need a valid driver's license, a clean driving record, and an eligible vehicle. You can start the application process through our app or website." }
          ].map((faq, index) => (
            <motion.div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <h3>{faq.q}</h3>
                <motion.span className="faq-icon" animate={{ rotate: activeFaq === index ? 135 : 0 }}>+</motion.span>
              </div>
              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section className="cta-section parallax-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join millions of satisfied users who trust CarShare for their daily rides.</p>
          <motion.button className="cta-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/uber-car-sharing/services')}>
            Book Your Ride Now <FaArrowRight className="btn-icon" />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;