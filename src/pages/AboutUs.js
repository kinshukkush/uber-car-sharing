import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaUsers, FaShieldAlt, FaLightbulb, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../components/AboutUs.css';

// --- Import your images (ensure paths are correct) ---
import image1 from '../assets/img1.jpg';
import image2 from '../assets/kush2.png';
import image3 from '../assets/kinshukpic.jpg';
// Note: You have multiple team members assigned to the same person.
// For a real-world scenario, you would have different data for each.

const AboutUs = () => {
  // --- Enhanced team data ---
  const teamMembers = [
    {
      image: image3,
      name: 'Kinshuk Saxena',
      role: 'Co-Founder & Lead Developer',
      quote: "My passion lies in leveraging technology to solve real-world problems. With CarShare, we're not just building an app; we're creating a community-driven solution for smarter, more sustainable urban mobility.",
    },
    {
      image: image2,
      name: 'Kush Saxena',
      role: 'Co-Founder & CEO',
      quote: 'We envision a future where transportation is seamless, affordable, and environmentally conscious. Our goal is to connect people and build a network that benefits everyone.',
    },
    {
      image: image1,
      name: 'Jane Doe', // Example of another team member
      role: 'Head of UX/UI Design',
      quote: 'Crafting an intuitive and beautiful user experience is at the heart of what we do. Every tap and every screen is designed with our users in mind.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  }, [teamMembers.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  }, [teamMembers.length]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000); // Autoplay every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  // --- FIX: Get the current member safely ---
  const currentMember = teamMembers[currentIndex];

  return (
    <motion.div 
      className="about-us-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="about-header">
        <motion.h1 variants={itemVariants}>Revolutionizing Urban Travel</motion.h1>
        <motion.p variants={itemVariants}>
          We are a team of passionate innovators dedicated to creating a smarter, greener, and more connected world through shared mobility.
        </motion.p>
      </header>

      <section className="our-story-section">
        <motion.div className="our-story-content" variants={itemVariants}>
          <h2>Our Story</h2>
          <p>
            Born from a shared vision in a bustling city, CarShare was created to tackle the challenges of modern transportation—traffic congestion, pollution, and the high cost of commuting. We saw an opportunity to connect drivers with empty seats to passengers traveling in the same direction, creating a win-win for everyone and the planet.
          </p>
          <p>
            Today, we are a growing community dedicated to making travel more efficient, affordable, and sustainable.
          </p>
        </motion.div>
      </section>

      <section className="values-section">
        <motion.h2 variants={itemVariants}>Our Core Values</motion.h2>
        <motion.div className="values-grid" variants={containerVariants}>
          <motion.div className="value-card" variants={itemVariants}>
            <div className="value-icon"><FaLeaf /></div>
            <h3>Sustainability</h3>
            <p>We are committed to reducing the carbon footprint of urban travel by maximizing vehicle occupancy and promoting a greener commute.</p>
          </motion.div>
          <motion.div className="value-card" variants={itemVariants}>
            <div className="value-icon"><FaUsers /></div>
            <h3>Community</h3>
            <p>We believe in the power of connection, building a trusted network of drivers and passengers who share more than just a ride.</p>
          </motion.div>
          <motion.div className="value-card" variants={itemVariants}>
            <div className="value-icon"><FaShieldAlt /></div>
            <h3>Safety</h3>
            <p>Your safety is our top priority. We implement rigorous verification and real-time features to ensure a secure journey for all.</p>
          </motion.div>
          <motion.div className="value-card" variants={itemVariants}>
            <div className="value-icon"><FaLightbulb /></div>
            <h3>Innovation</h3>
            <p>We continuously push the boundaries of technology to deliver a seamless, intuitive, and ever-improving platform experience.</p>
          </motion.div>
        </motion.div>
      </section>

      <section className="team-section">
        <motion.h2 variants={itemVariants}>Meet the Innovators</motion.h2>
        <div className="team-slider" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
          <AnimatePresence mode="wait">
            {/* --- FIX: Check if currentMember exists before rendering --- */}
            {currentMember && (
              <motion.div
                key={currentIndex} // This key is crucial for the animation to re-trigger
                className="slide-container"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <img
                  src={currentMember.image}
                  alt={currentMember.name}
                  className="team-member-image"
                />
                <div className="team-member-content">
                  <h3>{currentMember.name}</h3>
                  <p className="role">{currentMember.role}</p>
                  <p className="quote">{currentMember.quote}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="slider-navigation">
            <button className="nav-arrow" onClick={prevSlide} aria-label="Previous slide"><FaChevronLeft /></button>
            <div className="slider-dots">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button className="nav-arrow" onClick={nextSlide} aria-label="Next slide"><FaChevronRight /></button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <motion.div className="stat-card" variants={itemVariants}>
          <h3>1M+</h3>
          <p>Rides Completed</p>
        </motion.div>
        <motion.div className="stat-card" variants={itemVariants}>
          <h3>50,000+</h3>
          <p>Active Users</p>
        </motion.div>
        <motion.div className="stat-card" variants={itemVariants}>
          <h3>1,200 Tons</h3>
          <p>CO₂ Emissions Saved</p>
        </motion.div>
        <motion.div className="stat-card" variants={itemVariants}>
          <h3>4.9/5</h3>
          <p>Average User Rating</p>
        </motion.div>
      </section>

      <section className="timeline-section">
        <motion.h2 variants={itemVariants}>Our Journey</motion.h2>
        <div className="timeline">
          <motion.div className="timeline-item" variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>2020 - The Beginning</h3>
              <p>CarShare was founded with a vision to revolutionize urban transportation and reduce carbon emissions.</p>
            </div>
          </motion.div>
          <motion.div className="timeline-item" variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>2021 - First 10,000 Rides</h3>
              <p>Reached our first major milestone with 10,000 successful rides and expanded to 3 major cities.</p>
            </div>
          </motion.div>
          <motion.div className="timeline-item" variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>2023 - National Expansion</h3>
              <p>Expanded services nationwide with over 50,000 active users and 500+ drivers.</p>
            </div>
          </motion.div>
          <motion.div className="timeline-item" variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>2025 - Going Green</h3>
              <p>Launched our electric vehicle initiative, saved 1,200 tons of CO₂, and partnered with leading EV manufacturers.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mission-vision-section">
        <motion.div className="mission-card" variants={itemVariants} whileHover={{ y: -10, boxShadow: "0 15px 40px rgba(0,200,83,0.3)" }}>
          <h3>Our Mission</h3>
          <p>To provide accessible, affordable, and sustainable transportation solutions that connect communities and reduce environmental impact while empowering drivers to earn on their terms.</p>
        </motion.div>
        <motion.div className="vision-card" variants={itemVariants} whileHover={{ y: -10, boxShadow: "0 15px 40px rgba(0,176,255,0.3)" }}>
          <h3>Our Vision</h3>
          <p>To become the world's most trusted ride-sharing platform, transforming urban mobility through technology, innovation, and a commitment to a cleaner, more connected future for all.</p>
        </motion.div>
      </section>

      <section className="join-us-section">
        <motion.h2 variants={itemVariants}>Be Part of the Solution</motion.h2>
        <motion.p variants={itemVariants}>
          Whether you're a driver looking to earn or a passenger seeking a smarter way to travel, you can help shape the future of transportation.
        </motion.p>
        <div className="join-buttons">
          <motion.button className="join-button primary" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Start Riding
          </motion.button>
          <motion.button className="join-button secondary" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Become a Driver
          </motion.button>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUs;
