import React, { useState } from 'react';
import '../components/AboutUs.css';
import image1 from '../assets/img1.jpg';
import image2 from '../assets/kush2.png';
import image3 from '../assets/kinshukpic.jpg';
import image4 from '../assets/kush.jpg';
import image5 from '../assets/kush3.jpg';
import image6 from '../assets/vectorkin2.png';
import image7 from '../assets/3dlogo.png';
import dron from '../assets/dron.mp4';

const AboutUs = () => {
  const testimonials = [
    {
      type: 'image',
      src: image1,
      name: 'Kinshuk Saxena',
      role: 'Web Developer and B.TechCSE Student',
      quote: 'The combination of hands-on experience and academic knowledge has been instrumental in my growth as a web developer. I\'m excited to bring innovative solutions to the ever-evolving tech landscape.',
    },
    {
      type: 'video',
      src: dron,
      name: 'kinshuk saxena',
      role: 'Showcase Video',
      quote: 'Experience the world from a new perspective.',
    },
    {
      type: 'image',
      src: image2,
      name: 'Kush Saxena',
      role: 'CEO at Innovatech',
      quote: 'A seamless experience that truly transformed the way we work.',
    },
    {
      type: 'image',
      src: image3,
      name: 'Kinshuk Saxena',
      role: 'Product Manager at KUSH.PVT.LTD',
      quote: 'User-friendly and efficient, the platform has become an indispensable part of our team.',
    },
    {
      type: 'image',
      src: image4,
      name: 'Kinshuk Saxena',
      role: 'CTO at CyberCore',
      quote: 'Outstanding support and unmatched functionality. A must-have tool!',
    },
    {
      type: 'image',
      src: image5,
      name: 'Kinshuk Saxena',
      role: 'Designer of UI/UX at Creartive',
      quote: 'Beautifully designed and incredibly intuitive to use.',
    },
    {
      type: 'image',
      src: image6,
      name: 'Kinshuk Saxena',
      role: 'Designer of UI/UX at Creartive',
      quote: 'Beautifully designed and incredibly intuitive to use.',
    },
    {
      type: 'image',
      src: image7,
      name: 'Kinshuk Saxena',
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
          {testimonials[currentIndex].type === 'image' ? (
            <img
              src={testimonials[currentIndex].src}
              alt={testimonials[currentIndex].name}
              className="testimonial-image"
            />
          ) : (
            <video
              src={testimonials[currentIndex].src}
              autoPlay
              loop
              muted
              className="testimonial-video"
            ></video>
          )}
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
