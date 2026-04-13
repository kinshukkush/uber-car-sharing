import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import '../components/Home.css';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="hero-section">
        {/* We use a gradient background fallback if drone.mp4 is missing */}
        <div className="hero-video-fallback"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1 
            className="typing-effect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The Future of <span className="gradient-text">City Mobility</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Experience premium, animated, and simulated car sharing without API dependencies.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Link to="/book" className="gradient-btn hero-btn">Book a Ride</Link>
            <Link to="/about" className="outline-btn hero-btn">Learn More</Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={ref}>
        <div className="stats-container">
          <motion.div className="stat-card glass-panel" variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <h3><CountUp end={25000} duration={2.5} separator="," prefix="+" /></h3>
            <p>Rides Completed</p>
          </motion.div>
          <motion.div className="stat-card glass-panel" variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.2 }}>
            <h3><CountUp end={1200} duration={2.5} separator="," prefix="+" /></h3>
            <p>Active Drivers</p>
          </motion.div>
          <motion.div className="stat-card glass-panel" variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.4 }}>
            <h3><CountUp end={50} duration={2.5} prefix="+" /></h3>
            <p>Cities Covered</p>
          </motion.div>
          <motion.div className="stat-card glass-panel" variants={fadeIn} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay: 0.6 }}>
            <h3><CountUp end={100} duration={2.5} suffix="k+" /></h3>
            <p>Happy Users</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose <span className="gradient-text">CarShare</span></h2>
        <div className="features-grid">
          {[
            { icon: "⚡", title: "Instant Booking", desc: "Book your ride in seconds with our optimized app." },
            { icon: "🛡️", title: "Secure & Safe", desc: "Top-tier safety standards for every single journey." },
            { icon: "💎", title: "Premium Fleet", desc: "Choose from economy to luxury, all maintained perfectly." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              className="feature-card glass-panel"
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,212,255,0.2)" }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;