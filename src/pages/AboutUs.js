import React, { useState } from 'react';
import '../components/AboutUs.css';
import image1 from '../assets/kush.jpg';
import image2 from '../assets/kush2.png';
import image3 from '../assets/kush3.jpg';
import image4 from '../assets/kush.jpg';
import image5 from '../assets/kush3.jpg';
import image6 from '../assets/vectorkin1.png';
import image7 from '../assets/3dlogo.png';

const AboutUs = () => {
  const testimonials = [
    {
      img: image1,
      name: 'Kinshuk Saxena',
      role: 'VP of Technology at FutureNet',
      quote: 'The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.',
    },
    {
      img: image2,
      name: 'kush Saxena',
      role: 'CEO at Innovatech',
      quote: 'A seamless experience that truly transformed the way we work.',
    },
    {
      img: image3,
      name: 'kinshuk Saxena',
      role: 'Product Manager at KUSH.PVT.LTD',
      quote: 'User-friendly and efficient, the platform has become an indispensable part of our team.',
    },
    {
      img: image4,
      name: 'kinshuk Saxena',
      role: 'CTO at CyberCore',
      quote: 'Outstanding support and unmatched functionality. A must-have tool!',
    },
    {
      img: image5,
      name: 'kinshuk Saxena',
      role: 'Designer of UI/UX at Creartive',
      quote: 'Beautifully designed and incredibly intuitive to use.',
    },
    {
      img: image6,
      name: 'kinshuk Saxena',
      role: 'Designer of UI/UX at Creartive',
      quote: 'Beautifully designed and incredibly intuitive to use.',
    },
    {
      img: image7,
      name: 'kinshuk Saxena',
      role: 'Designer of UI/UX at Creartive',
      quote: 'Beautifully designed and incredibly intuitive to use.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="pera">
        <center>
          <h1>About Us</h1>
          <p>
            Our mission is to reduce traffic congestion, pollution, and the need for
            crowded public transport by connecting drivers with passengers for
            affordable ride-sharing options.
          </p>
        </center>
      </div>
      <div className="slider">
        <div className="testimonial">
          <img
            src={testimonials[currentIndex].img}
            alt={testimonials[currentIndex].name}
            className="testimonial-image"
          />
          <div className="testimonial-content">
            <h3>{testimonials[currentIndex].name}</h3>
            <p className="role">{testimonials[currentIndex].role}</p>
            <p className="quote">{testimonials[currentIndex].quote}</p>
          </div>
        </div>
        <div className="navigation">
          <button onClick={prevSlide}>&lt;</button>
          <button onClick={nextSlide}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;