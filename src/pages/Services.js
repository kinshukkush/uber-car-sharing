import React from 'react';
import { motion } from 'framer-motion';
import { FaCity, FaPlaneDeparture, FaRoad, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import '../components/Services.css';

// --- Import your images (ensure paths are correct) ---
import cityImage1 from '../assets/city-img.png';
import cityImage2 from '../assets/hyper city.png';
import cityImage3 from '../assets/hyper.png';
import corporateImage from '../assets/fleet-management.jpg'; // Example new image

// --- Enhanced and expanded services data ---
const servicesData = [
  {
    icon: <FaCity />,
    image: cityImage1,
    title: 'Daily Commutes',
    location: 'Intra-City Rides',
    description: 'Navigate your city with ease. Our reliable and affordable daily commute service ensures you get to work, college, or any destination on time, every time.',
    features: ['24/7 Availability', 'Real-Time GPS Tracking', 'Multiple Vehicle Options'],
  },
  {
    icon: <FaPlaneDeparture />,
    image: cityImage2,
    title: 'Airport Transfers',
    location: 'To & From Airports',
    description: 'Start or end your journey stress-free. Schedule a punctual and comfortable ride to or from the airport, with plenty of space for your luggage.',
    features: ['On-Time Guarantee', 'Flight Tracking Integration', 'Meet & Greet Service'],
  },
  {
    icon: <FaRoad />,
    image: cityImage3,
    title: 'Inter-City Travel',
    location: 'Outstation Trips',
    description: 'Planning a trip to a nearby city? Book a safe, private, and comfortable outstation ride at flexible hourly or one-way packages.',
    features: ['Professional Drivers', 'Transparent Pricing', 'Clean & Sanitized Cabs'],
  },
  {
    icon: <FaBriefcase />,
    image: corporateImage,
    title: 'Corporate Solutions',
    location: 'For Business Travel',
    description: 'Simplify your company\'s travel needs with our tailored corporate solutions, offering centralized billing, detailed reporting, and priority support.',
    features: ['Employee Travel Management', 'Monthly Invoicing', 'Dedicated Account Manager'],
  },
];

const Services = () => {
  // --- Animation Variants for Framer Motion ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="services-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="services-header">
        <motion.h2 variants={itemVariants}>Our Services</motion.h2>
        <motion.p variants={itemVariants}>
          Tailored transportation for every need. From daily commutes to special trips, we provide safe, reliable, and affordable solutions to get you where you need to go.
        </motion.p>
      </div>

      <motion.div 
        className="services-grid"
        variants={containerVariants}
      >
        {servicesData.map((service, index) => (
          <motion.div 
            className="service-card"
            key={index}
            variants={itemVariants}
          >
            <div className="service-image-container">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-content">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="/book" className="service-cta-button">
                Book Now <FaArrowRight />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Services;
