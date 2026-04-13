import React from 'react';
import { motion } from 'framer-motion';
import '../components/Services.css';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const servicesList = [
    { type: "Economy", icon: "🚗", price: "Starts at $12", desc: "Everyday rides for budget-conscious travelers with uncompromising quality." },
    { type: "Premium", icon: "🚙", price: "Starts at $22", desc: "High-end sedans with top-rated drivers for corporate or stylish transit." },
    { type: "SUV/Family", icon: "🚐", price: "Starts at $28", desc: "Spacious seating for up to 6 passengers plus plenty of luggage room." },
    { type: "Luxury", icon: "🏎️", price: "Starts at $45", desc: "The ultimate VIP experience. Premium vehicles with complimentary amenities." }
  ];

  return (
    <motion.div 
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="section-header text-center">
        <h1 className="gradient-text">Our Services</h1>
        <p>Premium mobility solutions tailored for every occasion.</p>
      </div>

      <motion.div 
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {servicesList.map((svc, idx) => (
          <motion.div 
            key={idx} 
            className="service-card-3d glass-panel"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
          >
            <div className="svc-icon-lg">{svc.icon}</div>
            <h2>{svc.type}</h2>
            <div className="svc-price-badge">{svc.price}</div>
            <p>{svc.desc}</p>
            <ul className="svc-features">
              <li>✓ Professional Driver</li>
              <li>✓ Real-time Tracking</li>
              <li>✓ Clean & Sanitized</li>
            </ul>
            <button className="outline-btn w-100 mt-4">Book {svc.type}</button>
          </motion.div>
        ))}
      </motion.div>

      <div className="faq-section mt-5">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <div className="faq-container">
          {[
            { q: "How are prices calculated?", a: "Prices are calculated based on base fare, distance, and duration using our transparent pricing model." },
            { q: "Can I schedule a ride in advance?", a: "Currently, our simulated demo focuses on on-demand rides, but scheduling is on the roadmap." },
            { q: "What safety measures are in place?", a: "All simulated drivers pass rigorous background checks and vehicles are virtually inspected." }
          ].map((faq, i) => (
            <motion.div 
              key={i} 
              className="faq-item glass-panel"
              whileHover={{ scale: 1.01 }}
            >
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
