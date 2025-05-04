import React, { useState, useEffect, useCallback } from 'react';
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
      name: 'Kinshuk Saxena',
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="about-us-container">
      <div className="about-header">
        <h1>About Us</h1>
        <div className="about-divider"></div>
      </div>
      
      <div className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to reduce traffic congestion, pollution, and the need for
            crowded public transport by connecting drivers with passengers for
            affordable ride-sharing options.
          </p>
          <p>
            We aim to create a sustainable transportation ecosystem that benefits both
            our users and the environment, making city travel more efficient and enjoyable.
          </p>
        </div>
      </div>

      <div className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🌿</div>
            <h3>Sustainability</h3>
            <p>Reducing carbon footprint through shared mobility solutions</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Community</h3>
            <p>Building connections between people through shared journeys</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🔒</div>
            <h3>Safety</h3>
            <p>Ensuring secure and reliable transportation for all users</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💡</div>
            <h3>Innovation</h3>
            <p>Continuously improving our platform with cutting-edge technology</p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>Meet Our Team</h2>
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
            <button className="nav-button" onClick={prevSlide}>&#10094;</button>
            <div className="dots-container">
              {testimonials.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
            <button className="nav-button" onClick={nextSlide}>&#10095;</button>
          </div>
          <button 
            className="autoplay-toggle"
            onClick={toggleAutoPlay}
          >
            {isAutoPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>5000+</h3>
          <p>Active Users</p>
        </div>
        <div className="stat-card">
          <h3>15,000+</h3>
          <p>Rides Shared</p>
        </div>
        <div className="stat-card">
          <h3>30%</h3>
          <p>Carbon Emission Reduced</p>
        </div>
        <div className="stat-card">
          <h3>4.8/5</h3>
          <p>User Satisfaction</p>
        </div>
      </div>

      <div className="join-us-section">
        <h2>Join Our Community</h2>
        <p>Be part of the transportation revolution and help create a more sustainable future.</p>
        <button className="join-button">Get Started</button>
      </div>
    </div>
  );
};

export default AboutUs;