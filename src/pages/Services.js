import React from 'react';
import { motion } from 'framer-motion';
import '../components/Services.css';
import cityImage1 from '../assets/city-img.png';
import cityImage2 from '../assets/hyper city.png';
import cityImage3 from '../assets/hyper.png';

const servicesData = [
  {
    image: cityImage1,
    title: 'City A',
    description:
      'Experience smooth and reliable rides in City A. Our car-sharing service connects you to nearby locations with convenience and ease.'
  },
  {
    image: cityImage2,
    title: 'City B',
    description:
      'Need a ride around City B? Our network of drivers ensures you reach your destination quickly and safely.'
  },
  {
    image: cityImage3,
    title: 'City C',
    description:
      'Travel hassle-free in City C with our efficient and eco-friendly car-sharing options.'
  }
];

const Services = () => {
  return (
    <div className="services">
      <motion.h2 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6 }}
      >
        Our Services
      </motion.h2>

      <motion.div 
        className="services-list"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3 } }
        }}
      >
        {servicesData.map((service, index) => (
          <motion.div 
            className="service-item"
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;