// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { StandaloneSearchBox } from '@react-google-maps/api';
// import '../components/Home.css';
// import UberImage from '../assets/Ride-with-Uber.png';
// import CarImg from '../assets/path-to-your-car-image.png';
// import DriverImg from '../assets/driver-image.png';
// import flightImg from '../assets/uber-square.png';
// import fleetImg from '../assets/fleet-management.jpg';

// const Home = () => {
//   const [location, setLocation] = useState('');
//   const [destination, setDestination] = useState('');
//   const navigate = useNavigate();

//   const locationRef = useRef(null);
//   const destinationRef = useRef(null);

//   const handleLocationSelect = () => {
//     if (locationRef.current) {
//       const place = locationRef.current.getPlaces()[0];
//       if (place) {
//         setLocation(place.formatted_address || '');
//       }
//     }
//   };

//   const handleDestinationSelect = () => {
//     if (destinationRef.current) {
//       const place = destinationRef.current.getPlaces()[0];
//       if (place) {
//         setDestination(place.formatted_address || '');
//       }
//     }
//   };

//   const handleSeePrices = () => {
//     if (location && destination) {
//       navigate('/book', { state: { location, destination } });
//     } else {
//       alert('Please enter both a location and destination to proceed.');
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="top-container">
//         <div className="left-section" id='enter'>
//           <h1>Go anywhere with Car Sharing</h1>
//           <p>Request a ride, hop in, and go.</p>
//           <div className="input-group">
//             <StandaloneSearchBox
//               onLoad={(ref) => (locationRef.current = ref)}
//               onPlacesChanged={handleLocationSelect}
//             >
//               <input
//                 type="text"
//                 placeholder="Enter location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="search-box"
//               />
//             </StandaloneSearchBox>
//             <StandaloneSearchBox
//               onLoad={(ref) => (destinationRef.current = ref)}
//               onPlacesChanged={handleDestinationSelect}
//             >
//               <input
//                 type="text"
//                 placeholder="Enter destination"
//                 value={destination}
//                 onChange={(e) => setDestination(e.target.value)}
//                 className="search-box"
//               />
//             </StandaloneSearchBox>
//             <button className="see-prices-btn" onClick={handleSeePrices}>
//               See prices
//             </button>
//           </div>
//         </div>
//         <div className="right-section">
//           <img src={UberImage} alt="Car Sharing Cab" />
//         </div>
//       </div>

//       <div className="bottom-container">
//         <div className="suggestions">
//           <h2>Suggestions</h2>
//           <div className="suggestion-card">
//             <div className="suggestion-image">
//               <img src={CarImg} alt="Car" />
//             </div>
//             <div className="suggestion-text">
//               <h3>Ride</h3>
//               <p>Go anywhere with Uber. Request a ride, hop in, and go.</p>
//               <div className="action-buttons">
//                 <button>Details</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="new-section-container">
//         <div className="new-section-left">
//           <img src={DriverImg} alt="Driver in car" />
//         </div>
//         <div className="new-section-right">
//           <h2>Drive when you want, make what you need</h2>
//           <p>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.</p>
//           <div className="action-buttons">
//             <button>Get started</button>
//             <button>Already have an account? Sign in</button>
//           </div>
//         </div>
//       </div>

//       <div className="new-section-container">
//         <div className="flight-section-right">
//           <img src={flightImg} alt="Flight" />
//         </div>
//         <div className="flight-section-left">
//           <h2>The Uber you know, reimagined for business</h2>
//           <p>Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
//           <div className="action-buttons">
//             <button>Get started</button>
//             <button>Check out our solutions</button>
//           </div>
//         </div>
//       </div>

//       <div className="new-section-container">
//         <div className="flight-section-right">
//           <img src={fleetImg} alt="Fleet Management" />
//         </div>
//         <div className="flight-section-left">
//           <h2>Make money by renting out your car</h2>
//           <p>Connect with thousands of drivers and earn more per week with Uber’s free fleet management tools.</p>
//           <div className="action-buttons">
//             <button>Get started</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;













































import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StandaloneSearchBox } from '@react-google-maps/api';
import '../components/Home.css';
import UberImage from '../assets/Ride-with-Uber.png';
import CarImg from '../assets/path-to-your-car-image.png';
import DriverImg from '../assets/driver-image.png';
import flightImg from '../assets/uber-square.png';
import fleetImg from '../assets/fleet-management.jpg';

const Home = () => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const locationRef = useRef(null);
  const destinationRef = useRef(null);

  const handleLocationSelect = () => {
    if (locationRef.current) {
      const place = locationRef.current.getPlaces()[0];
      if (place) {
        setLocation(place.formatted_address || '');
      }
    }
  };

  const handleDestinationSelect = () => {
    if (destinationRef.current) {
      const place = destinationRef.current.getPlaces()[0];
      if (place) {
        setDestination(place.formatted_address || '');
      }
    }
  };

  const handleSeePrices = () => {
    if (location && destination) {
      navigate('/book', { state: { location, destination } });
    } else {
      alert('Please enter both a location and destination to proceed.');
    }
  };

  const scrollToEnter = () => {
    const enterSection = document.getElementById('enter');
    if (enterSection) {
      enterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToLogin = () => {
    navigate('/LoginForm');
  };

  const goTocontact = () => {
    navigate('/Contact');
  };

  return (
    <div className="home-container">
      <div className="top-container">
        <div className="left-section" id="enter">
          <h1>Go anywhere with Car Sharing</h1>
          <p>Request a ride, hop in, and go.</p>
          <div className="input-group">
            <StandaloneSearchBox
              onLoad={(ref) => (locationRef.current = ref)}
              onPlacesChanged={handleLocationSelect}
            >
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="search-box"
              />
            </StandaloneSearchBox>
            <StandaloneSearchBox
              onLoad={(ref) => (destinationRef.current = ref)}
              onPlacesChanged={handleDestinationSelect}
            >
              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="search-box"
              />
            </StandaloneSearchBox>
            <button className="see-prices-btn" onClick={handleSeePrices}>
              See prices
            </button>
          </div>
        </div>
        <div className="right-section">
          <img src={UberImage} alt="Car Sharing Cab" />
        </div>
      </div>

      <div className="bottom-container">
        <div className="suggestions">
          <h2>Suggestions</h2>
          <div className="suggestion-card">
            <div className="suggestion-image">
              <img src={CarImg} alt="Car" />
            </div>
            <div className="suggestion-text">
              <h3>Ride</h3>
              <p>Go anywhere with Uber. Request a ride, hop in, and go.</p>
              <div className="action-buttons">
                <button onClick={scrollToEnter}>Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="new-section-container">
        <div className="new-section-left">
          <img src={DriverImg} alt="Driver in car" />
        </div>
        <div className="new-section-right">
          <h2>Drive when you want, make what you need</h2>
          <p>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.</p>
          <div className="action-buttons">
            <button onClick={scrollToEnter}>Get started</button>
            <button onClick={goToLogin}>Already have an account? Sign in</button>
          </div>
        </div>
      </div>

      <div className="new-section-container">
        <div className="flight-section-right">
          <img src={flightImg} alt="Flight" />
        </div>
        <div className="flight-section-left">
          <h2>The Uber you know, reimagined for business</h2>
          <p>Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
          <div className="action-buttons">
            <button onClick={scrollToEnter}>Get started</button>
            <button onClick={goTocontact}>Check out our solutions</button>
          </div>
        </div>
      </div>

      <div className="new-section-container">
        <div className="flight-section-right">
          <img src={fleetImg} alt="Fleet Management" />
        </div>
        <div className="flight-section-left">
          <h2>Make money by renting out your car</h2>
          <p>Connect with thousands of drivers and earn more per week with Uber’s free fleet management tools.</p>
          <div className="action-buttons">
            <button onClick={scrollToEnter}>Get started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;





















































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../components/Home.css';
// import UberImage from '../assets/Ride-with-Uber.png';
// import CarImg from '../assets/path-to-your-car-image.png';
// import DriverImg from '../assets/driver-image.png';
// import flightImg from '../assets/uber-square.png';
// import fleetImg from '../assets/fleet-management.jpg';

// const Home = () => {
//   const [location, setLocation] = useState('');
//   const [destination, setDestination] = useState('');
//   const navigate = useNavigate();

//   const handleSeePrices = () => {
//     if (location && destination) {
//       navigate('/book', { state: { location, destination } });
//     } else {
//       alert('Please enter both a location and destination to proceed.');
//     }
//   };

//   const scrollToEnter = () => {
//     const enterSection = document.getElementById('enter');
//     if (enterSection) {
//       enterSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const goToLogin = () => {
//     navigate('/LoginForm');
//   };

//   const goTocontact = () => {
//     navigate('/Contact');
//   };

//   return (
//     <div className="home-container">
//       <div className="top-container">
//         <div className="left-section" id="enter">
//           <h1>Go anywhere with Car Sharing</h1>
//           <p>Request a ride, hop in, and go.</p>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Enter location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="search-box"
//             />
//             <input
//               type="text"
//               placeholder="Enter destination"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               className="search-box"
//             />
//             <button className="see-prices-btn" onClick={handleSeePrices}>
//               See prices
//             </button>
//           </div>
//         </div>
//         <div className="right-section">
//           <img src={UberImage} alt="Car Sharing Cab" />
//         </div>
//       </div>

//       <div className="bottom-container">
//         <div className="suggestions">
//           <h2>Suggestions</h2>
//           <div className="suggestion-card">
//             <div className="suggestion-image">
//               <img src={CarImg} alt="Car" />
//             </div>
//             <div className="suggestion-text">
//               <h3>Ride</h3>
//               <p>Go anywhere with Uber. Request a ride, hop in, and go.</p>
//               <div className="action-buttons">
//                 <button onClick={scrollToEnter}>Details</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="new-section-container">
//         <div className="new-section-left">
//           <img src={DriverImg} alt="Driver in car" />
//         </div>
//         <div className="new-section-right">
//           <h2>Drive when you want, make what you need</h2>
//           <p>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.</p>
//           <div className="action-buttons">
//             <button onClick={scrollToEnter}>Get started</button>
//             <button onClick={goToLogin}>Already have an account? Sign in</button>
//           </div>
//         </div>
//       </div>

//       <div className="new-section-container">
//         <div className="flight-section-right">
//           <img src={flightImg} alt="Flight" />
//         </div>
//         <div className="flight-section-left">
//           <h2>The Uber you know, reimagined for business</h2>
//           <p>Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
//           <div className="action-buttons">
//             <button onClick={scrollToEnter}>Get started</button>
//             <button onClick={goTocontact}>Check out our solutions</button>
//           </div>
//         </div>
//       </div>

//       <div className="new-section-container">
//         <div className="flight-section-right">
//           <img src={fleetImg} alt="Fleet Management" />
//         </div>
//         <div className="flight-section-left">
//           <h2>Make money by renting out your car</h2>
//           <p>Connect with thousands of drivers and earn more per week with Uber’s free fleet management tools.</p>
//           <div className="action-buttons">
//             <button onClick={scrollToEnter}>Get started</button>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default Home;