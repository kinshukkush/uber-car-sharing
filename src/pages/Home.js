import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaBolt, FaShieldAlt, FaCar, FaMapMarkerAlt, FaClock, FaStar, FaUsers, FaCity, FaRoad, FaHeadset, FaMobileAlt, FaLeaf, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import '../components/Home.css';

const Home = () => {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const heroTexts = ['City Mobility', 'Ride Sharing', 'Smart Travel', 'Your Journey'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    const text = heroTexts[currentTextIndex];
    let charIndex = 0;
    setTypedText('');
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex <= text.length) {
        setTypedText(text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Regular Commuter",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "CarShare has completely transformed my daily commute. The drivers are professional, cars are clean, and the app is super easy to use!",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Business Traveler",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "As someone who travels frequently for work, CarShare's premium service is a game-changer. Always reliable and comfortable.",
      rating: 5
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Student",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      text: "Affordable, safe, and convenient. Perfect for students like me who need reliable transportation without breaking the bank.",
      rating: 4
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Healthcare Worker",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      text: "Late night shifts are no longer a worry. CarShare's 24/7 availability and safety features give me peace of mind.",
      rating: 5
    }
  ];

  // Features data
  const features = [
    { icon: <FaBolt />, title: "Instant Booking", desc: "Book your ride in seconds with our lightning-fast optimized platform." },
    { icon: <FaShieldAlt />, title: "Secure & Safe", desc: "Top-tier safety standards with verified drivers and real-time tracking." },
    { icon: <FaCar />, title: "Premium Fleet", desc: "Choose from economy to luxury vehicles, all maintained to perfection." },
    { icon: <FaClock />, title: "24/7 Available", desc: "Round-the-clock service ensuring you're never stranded anywhere." },
    { icon: <FaHeadset />, title: "Live Support", desc: "Dedicated customer support team available whenever you need help." },
    { icon: <FaLeaf />, title: "Eco-Friendly", desc: "Electric and hybrid vehicle options for environmentally conscious riders." }
  ];

  // How it works steps
  const howItWorks = [
    { step: 1, icon: <FaMapMarkerAlt />, title: "Set Location", desc: "Enter your pickup and destination points" },
    { step: 2, icon: <FaCar />, title: "Choose Ride", desc: "Select from various vehicle options" },
    { step: 3, icon: <FaMobileAlt />, title: "Confirm Booking", desc: "Review details and confirm your ride" },
    { step: 4, icon: <FaStar />, title: "Enjoy & Rate", desc: "Travel comfortably and share feedback" }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating Particles Background */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-video-fallback">
          <div className="grid-overlay"></div>
        </div>
        <div className="hero-overlay"></div>
        
        {/* Animated gradient orbs */}
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>

        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="badge-dot"></span>
            <span>Available 24/7 in 50+ Cities</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The Future of{' '}
            <span className="gradient-text typing-container">
              {typedText}
              <span className={`cursor ${isTyping ? 'typing' : ''}`}>|</span>
            </span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Experience premium, seamless, and safe car sharing with our cutting-edge platform. 
            No complicated APIs, just pure innovation and smooth rides.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link to="/book" className="btn-primary hero-btn">
              <span className="btn-content">
                <FaCar className="btn-icon" />
                Book a Ride
              </span>
              <span className="btn-shimmer"></span>
            </Link>
            <Link to="/services" className="btn-outline hero-btn">
              <span>Explore Services</span>
            </Link>
          </motion.div>

          <motion.div 
            className="hero-trust-badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="trust-item">
              <FaStar className="trust-icon" />
              <span>4.9 Rating</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <FaUsers className="trust-icon" />
              <span>100k+ Users</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <span>Verified Drivers</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
        >
          <span>Scroll to explore</span>
          <div className="scroll-line"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-container">
          <motion.div 
            className="stats-header"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Our <span className="gradient-text">Impact</span> in Numbers</h2>
            <p>Trusted by thousands of riders across the country</p>
          </motion.div>

          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {[
              { icon: <FaRoad />, end: 25000, suffix: "+", label: "Rides Completed", color: "#00d4ff" },
              { icon: <FaCar />, end: 1200, suffix: "+", label: "Active Drivers", color: "#7c3aed" },
              { icon: <FaCity />, end: 50, suffix: "+", label: "Cities Covered", color: "#10b981" },
              { icon: <FaUsers />, end: 100, suffix: "k+", label: "Happy Users", color: "#f59e0b" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className="stat-card glass-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: `0 20px 40px ${stat.color}33`,
                  borderColor: stat.color
                }}
              >
                <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>
                  {stat.icon}
                </div>
                <h3 style={{ color: stat.color }}>
                  {statsInView && (
                    <CountUp end={stat.end} duration={2.5} separator="," suffix={stat.suffix} />
                  )}
                </h3>
                <p>{stat.label}</p>
                <div className="stat-glow" style={{ background: stat.color }}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <div className="features-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Why Choose Us</span>
            <h2>Why Choose <span className="gradient-text">CarShare</span></h2>
            <p>Discover the features that make us the preferred choice for thousands of riders</p>
          </motion.div>

          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                className="feature-card glass-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -15, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,212,255,0.2)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-icon-ring"></div>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <div className="feature-card-shine"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" ref={howItWorksRef}>
        <div className="how-it-works-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Simple Process</span>
            <h2>How It <span className="gradient-text">Works</span></h2>
            <p>Get started with your ride in just four easy steps</p>
          </motion.div>

          <motion.div 
            className="steps-container"
            variants={containerVariants}
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
          >
            {howItWorks.map((item, idx) => (
              <motion.div 
                key={idx}
                className="step-card"
                variants={scaleVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="step-number">{item.step}</div>
                <div className="step-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {idx < howItWorks.length - 1 && (
                  <div className="step-connector">
                    <div className="connector-line"></div>
                    <div className="connector-dot"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="cta-box"
            initial={{ opacity: 0, y: 30 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3>Ready to experience the future of transportation?</h3>
            <Link to="/book" className="btn-primary">
              <span className="btn-content">
                Start Your Journey
                <FaCar className="btn-icon-right" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" ref={testimonialsRef}>
        <div className="testimonials-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Testimonials</span>
            <h2>What Our <span className="gradient-text">Riders</span> Say</h2>
            <p>Real experiences from real people who trust CarShare</p>
          </motion.div>

          <div className="testimonials-carousel">
            <button className="carousel-btn prev-btn" onClick={prevTestimonial}>
              <FaChevronLeft />
            </button>

            <div className="testimonials-track">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentTestimonial}
                  className="testimonial-card glass-card"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>
                  <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < testimonials[currentTestimonial].rating ? 'star-filled' : 'star-empty'} 
                      />
                    ))}
                  </div>
                  <div className="testimonial-author">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="author-image"
                    />
                    <div className="author-info">
                      <h4>{testimonials[currentTestimonial].name}</h4>
                      <span>{testimonials[currentTestimonial].role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button className="carousel-btn next-btn" onClick={nextTestimonial}>
              <FaChevronRight />
            </button>
          </div>

          <div className="carousel-dots">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                className={`carousel-dot ${idx === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(idx)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to <span className="gradient-text">Get Started</span>?</h2>
            <p>Join thousands of happy riders and experience the future of transportation today.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">
                <span className="btn-content">Create Account</span>
              </Link>
              <Link to="/contact" className="btn-outline">
                <span>Contact Us</span>
              </Link>
            </div>
          </motion.div>
          <div className="cta-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;