import React from 'react';
import '../components/Services.css';
import cityImage1 from '../assets/city-img.png'; // Example image imports
import cityImage2 from '../assets/hyper city.png';
import cityImage3 from '../assets/hyper.png';

const Services = () => {
  return (
    <div className="services">
      <h2>Our Services</h2>
      <div className="services-list">
        <div className="service-item">
          <img src={cityImage1} alt="City 1" />
          <h3>City A</h3>
          <p>
            Experience smooth and reliable rides in City A. Our car-sharing service
            connects you to nearby locations with convenience and ease.
          </p>
        </div>
        <div className="service-item">
          <img src={cityImage2} alt="City 2" />
          <h3>City B</h3>
          <p>
            Need a ride around City B? Our network of drivers ensures you reach your
            destination quickly and safely.
          </p>
        </div>
        <div className="service-item">
          <img src={cityImage3} alt="City 3" />
          <h3>City C</h3>
          <p>
            Travel hassle-free in City C with our efficient and eco-friendly
            car-sharing options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
