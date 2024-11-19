import React, { useState } from "react";
import { FaMoon, FaSun } from 'react-icons/fa';
import "../components/LoginForm.css";
import UberImage from '../assets/Ride-with-Uber.png';

const LoginSignup = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleSignup = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <div className={`form-container ${isSignup ? "signup-mode" : ""}`}>
        <div className="image-section">
          <img src={UberImage} alt="Illustration" />
        </div>

        <div className="form-section">
          {isSignup ? (
            <>
              <h2>Create an Account</h2>
              <form>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
              </form>
              <p>
                Already have an account?{" "}
                <span onClick={toggleSignup}>Login</span>
              </p>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
              </form>
              <p>
                Don’t have an account?{" "}
                <span onClick={toggleSignup}>Sign Up</span>
              </p>
            </>
          )}
        </div>
      </div>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </div>
    </div>
  );
};

export default LoginSignup;