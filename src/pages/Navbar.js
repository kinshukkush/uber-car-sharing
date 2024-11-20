// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../components/Navbar.css';
// import CarSharingLogo from '../assets/carLogo.png';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <img src={CarSharingLogo} alt="Car Sharing Logo" className="navbar-logo-img" />
//         <h1>Car Sharing</h1>
//       </div>
//       <ul className="navbar-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about-us">About Us</Link></li>
//         <li><Link to="/Book">Book</Link></li>
//         <li><Link to="/Services">Services</Link></li>
//         <li><Link to="/Contact">Contact</Link></li>
//         <li><Link to="/LoginForm">Login Form</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


























import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Navbar.css';
import CarSharingLogo from '../assets/carLogo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={CarSharingLogo} alt="Car Sharing Logo" className="navbar-logo-img" />
        <h1>Car Sharing</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        {/* <li><Link to="/Book">Book</Link></li> */}
        <li><Link to="/Services">Services</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        <li><Link to="/LoginForm">Login Form</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;