import React, { useState, useEffect, useCallback } from "react";
import {
  FaMoon,
  FaSun,
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaCar,
  FaPhone,
  FaIdCard,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaApple,
  FaInfoCircle,
  FaShieldAlt,
  FaCheck
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import "../components/LoginForm.css";
import UberImage from '../assets/Ride-with-Uber.png';
import DriverImage from '../assets/driver-image.png';
import CityBackground from '../assets/city-background.jpg';

const LoginSignup = () => {
  // State Management
  const [darkMode, setDarkMode] = useState(() => {
    // Check user's preferred color scheme
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('rider'); // 'rider' or 'driver'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    vehicleType: '',
    dob: '',
    address: '',
    licenseNumber: '',
    termsAccepted: false,
    newsletter: false,
    profileImage: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(1); // For multi-step signup
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    number: false,
    special: false,
    mixedCase: false
  });

  // Theme Management
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Check for saved theme preference on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  // Password strength and criteria checker
  const checkPasswordCriteria = useCallback((password) => {
    const criteria = {
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      mixedCase: /[a-z]/.test(password) && /[A-Z]/.test(password)
    };
    
    setPasswordCriteria(criteria);
    
    // Calculate strength
    let strength = 0;
    if (criteria.length) strength += 1;
    if (criteria.number) strength += 1;
    if (criteria.special) strength += 1;
    if (criteria.mixedCase) strength += 1;
    
    return strength;
  }, []);

  // Update password strength when password changes
  useEffect(() => {
    if (formData.password) {
      const strength = checkPasswordCriteria(formData.password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
      setPasswordCriteria({
        length: false,
        number: false,
        special: false,
        mixedCase: false
      });
    }
  }, [formData.password, checkPasswordCriteria]);

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Fixed phone regex pattern without unnecessary escape characters
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if (isSignup) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (formData.fullName.length < 3) {
        newErrors.fullName = "Name must be at least 3 characters";
      }

      if (userType === 'driver') {
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
          newErrors.phone = "Invalid phone number format";
        }

        if (!formData.vehicleType) {
          newErrors.vehicleType = "Please select vehicle type";
        }

        if (!formData.licenseNumber) {
          newErrors.licenseNumber = "License number is required";
        }
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }

      if (!formData.dob) {
        newErrors.dob = "Date of birth is required";
      } else {
        // Age validation - must be 18+
        const today = new Date();
        const birthDate = new Date(formData.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          newErrors.dob = "You must be at least 18 years old";
        }
      }

      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "You must accept the terms and conditions";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength < 3) {
      newErrors.password = "Password is too weak";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can add file type and size validation here
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          profileImage: "Only JPG, PNG and GIF images are allowed"
        }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          profileImage: "Image size must be less than 5MB"
        }));
        return;
      }
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear error if any
      if (errors.profileImage) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.profileImage;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup && formStep < 2) {
      // Validate only current step fields
      const stepErrors = {};
      if (!formData.fullName.trim()) stepErrors.fullName = "Full name is required";
      if (!formData.email.trim()) stepErrors.email = "Email is required";
      if (!formData.password.trim()) stepErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword) 
        stepErrors.confirmPassword = "Passwords don't match";
      if (passwordStrength < 3) stepErrors.password = "Password is too weak";

      setErrors(stepErrors);
      if (Object.keys(stepErrors).length === 0) {
        setFormStep(2);
      }
      return;
    }

    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form submitted:", { ...formData, userType });
        setFormSubmitSuccess(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          if (isSignup) {
            setIsSignup(false);
            setFormSubmitSuccess(false);
          } else {
            // Redirect to dashboard or home page
            console.log("Redirecting to dashboard...");
          }
        }, 2000);
      } catch (error) {
        console.error("Login error:", error);
        setErrors(prev => ({
          ...prev,
          submit: "An error occurred. Please try again."
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  // const togglePasswordInfo = () => setShowPasswordInfo(prev => !prev);

  const toggleSignup = () => {
    setIsSignup(prev => !prev);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      vehicleType: '',
      dob: '',
      address: '',
      licenseNumber: '',
      termsAccepted: false,
      newsletter: false,
      profileImage: null
    });
    setErrors({});
    setFormStep(1);
    setFormSubmitSuccess(false);
  };

  const handleSocialLogin = (platform) => {
    console.log(`Logging in with ${platform}`);
    // Actual implementation would use OAuth
  };

  const handleBackStep = () => {
    setFormStep(1);
  };
  // Success message component
  const renderSuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="success-message"
    >
      <FaCheck className="success-icon" />
      <h3>{isSignup ? "Registration Successful!" : "Login Successful!"}</h3>
      <p>{isSignup ? "Your account has been created. You can now login." : "Redirecting you to the dashboard..."}</p>
    </motion.div>
  );

  const renderLoginForm = () => (
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="form-content"
    >
      {formSubmitSuccess ? (
        renderSuccessMessage()
      ) : (
        <>
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Please enter your details to login</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="password-toggle"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                "Login"
              )}
            </motion.button>
            
            {errors.submit && <div className="form-error">{errors.submit}</div>}
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <div className="social-icons">
              <motion.button
                type="button"
                className="social-btn google"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialLogin('google')}
              >
                <FaGoogle /> Google
              </motion.button>
              <motion.button
                type="button"
                className="social-btn facebook"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialLogin('facebook')}
              >
                <FaFacebook /> Facebook
              </motion.button>
              <motion.button
                type="button"
                className="social-btn apple"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialLogin('apple')}
              >
                <FaApple /> Apple
              </motion.button>
            </div>
          </div>

          <p className="toggle-form-text">
            Don't have an account?{" "}
            <span onClick={toggleSignup} className="toggle-link">Sign Up</span>
          </p>
        </>
      )}
    </motion.div>
  );

  const renderSignupForm = () => (
    <motion.div
      key="signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="form-content"
    >
      {formSubmitSuccess ? (
        renderSuccessMessage()
      ) : (
        <>
          <div className="form-header">
            <h2>Create {userType} Account</h2>
            <p>{formStep === 1 ? "Basic Information" : "Additional Details"}</p>

            <div className="progress-bar">
              <div className={`progress-step ${formStep >= 1 ? 'active' : ''}`}>1</div>
              <div className={`progress-connector ${formStep === 2 ? 'active' : ''}`}></div>
              <div className={`progress-step ${formStep === 2 ? 'active' : ''}`}>2</div>
            </div>
          </div>

          <div className="user-type-toggle">
            <button
              type="button"
              className={`toggle-btn ${userType === 'rider' ? 'active' : ''}`}
              onClick={() => setUserType('rider')}
            >
              <FaUser /> Rider
            </button>
            <button
              type="button"
              className={`toggle-btn ${userType === 'driver' ? 'active' : ''}`}
              onClick={() => setUserType('driver')}
            >
              <FaCar /> Driver
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {formStep === 1 ? (
              <>
                <div className={`input-wrapper ${errors.fullName ? 'error' : ''}`}>
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setShowPasswordInfo(true)}
                    onBlur={() => setShowPasswordInfo(false)}
                  />
                  <div
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}

                  <div className={`password-info ${showPasswordInfo ? 'show' : ''}`}>
                    <h4>Password Requirements:</h4>
                    <ul>
                      <li className={passwordCriteria.length ? 'met' : ''}>
                        <FaCheck className="criteria-icon" /> At least 8 characters
                      </li>
                      <li className={passwordCriteria.number ? 'met' : ''}>
                        <FaCheck className="criteria-icon" /> At least 1 number
                      </li>
                      <li className={passwordCriteria.special ? 'met' : ''}>
                        <FaCheck className="criteria-icon" /> At least 1 special character
                      </li>
                      <li className={passwordCriteria.mixedCase ? 'met' : ''}>
                        <FaCheck className="criteria-icon" /> Uppercase and lowercase letters
                      </li>
                    </ul>
                  </div>

                  {formData.password && (
                    <div className="password-strength-container">
                      <span className="strength-label">
                        Strength: 
                        {passwordStrength === 0 && " Very Weak"}
                        {passwordStrength === 1 && " Weak"}
                        {passwordStrength === 2 && " Medium"}
                        {passwordStrength === 3 && " Strong"}
                        {passwordStrength === 4 && " Very Strong"}
                      </span>
                      <div className="password-strength">
                        <div className={`strength-bar ${passwordStrength > 0 ? 'active' : ''} ${passwordStrength === 1 ? 'weak' : ''}`}></div>
                        <div className={`strength-bar ${passwordStrength > 1 ? 'active' : ''} ${passwordStrength === 2 ? 'medium' : ''}`}></div>
                        <div className={`strength-bar ${passwordStrength > 2 ? 'active' : ''} ${passwordStrength === 3 ? 'strong' : ''}`}></div>
                        <div className={`strength-bar ${passwordStrength > 3 ? 'active' : ''} ${passwordStrength === 4 ? 'very-strong' : ''}`}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`input-wrapper ${errors.confirmPassword ? 'error' : ''}`}>
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">{errors.confirmPassword}</span>
                  )}
                </div>

                <div className="profile-upload">
                  <div className="profile-preview">
                    {formData.profileImage ? (
                      <img src={formData.profileImage} alt="Profile preview" />
                    ) : (
                      <div className="profile-placeholder">
                        <FaUser />
                      </div>
                    )}
                  </div>
                  <div className="upload-controls">
                    <label className="upload-btn">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                      Upload Profile Photo
                    </label>
                    <span className="upload-info">Optional - JPG, PNG or GIF, max 5MB</span>
                    {errors.profileImage && <span className="error-message">{errors.profileImage}</span>}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={`input-wrapper ${errors.dob ? 'error' : ''}`}>
                  <FaBirthdayCake className="input-icon" />
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && <span className="error-message">{errors.dob}</span>}
                </div>

                {userType === 'driver' && (
                  <>
                    <div className={`input-wrapper ${errors.phone ? 'error' : ''}`}>
                      <FaPhone className="input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className={`input-wrapper ${errors.licenseNumber ? 'error' : ''}`}>
                      <FaIdCard className="input-icon" />
                      <input
                        type="text"
                        name="licenseNumber"
                        placeholder="Driver's License Number"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                      />
                      {errors.licenseNumber && (
                        <span className="error-message">{errors.licenseNumber}</span>
                      )}
                    </div>

                    <div className={`input-wrapper ${errors.vehicleType ? 'error' : ''}`}>
                      <FaCar className="input-icon" />
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                      >
                        <option value="">Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="suv">SUV</option>
                        <option value="premium">Premium</option>
                      </select>
                      {errors.vehicleType && (
                        <span className="error-message">{errors.vehicleType}</span>
                      )}
                    </div>
                  </>
                )}

                <div className={`input-wrapper ${errors.address ? 'error' : ''}`}>
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkbox-wrapper">
                  <div className={`checkbox-item ${errors.termsAccepted ? 'error' : ''}`}>
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                    />
                    <label htmlFor="termsAccepted">
                      I agree to the <a href="#terms">Terms and Conditions</a> and <a href="#privacy">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.termsAccepted && (
                    <span className="error-message">{errors.termsAccepted}</span>
                  )}
                </div>

                <div className="checkbox-wrapper">
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                    />
                    <label htmlFor="newsletter">
                      Send me updates and promotional emails
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="form-actions">
              {formStep === 2 && (
                <button
                  type="button"
                  className="back-btn"
                  onClick={handleBackStep}
                >
                  Back
                </button>
              )}

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : isSignup && formStep === 1 ? (
                  "Continue"
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </div>
            
            {errors.submit && <div className="form-error">{errors.submit}</div>}
          </form>

          <p className="toggle-form-text">
            Already have an account?{" "}
            <span onClick={toggleSignup} className="toggle-link">Login</span>
          </p>
        </>
      )}
    </motion.div>
  );

  // Security Tips Component
  const SecurityTips = () => (
    <motion.div 
      className="security-tips"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="security-tips-header">
        <FaShieldAlt />
        <h3>Security Tips</h3>
      </div>
      <ul>
        <li>Use a unique password you don't use elsewhere</li>
        <li>Enable two-factor authentication for added security</li>
        <li>Never share your login credentials with anyone</li>
        <li>Check that you're on the official website before logging in</li>
      </ul>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`login-container ${darkMode ? "dark-mode" : ""}`}
      style={{ backgroundImage: `url(${CityBackground})` }}
    >
      <div className={`form-wrapper ${isSignup ? "signup-mode" : ""}`}>
        {/* Image Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="image-section"
        >
          <img
            src={userType === 'driver' ? DriverImage : UberImage}
            alt={userType === 'driver' ? "Driver Illustration" : "Rider Illustration"}
          />
          <div className="image-overlay">
            <h3>{userType === 'driver' ? "Drive with Us" : "Ride with Us"}</h3>
            <p>{userType === 'driver' ? "Earn on your schedule" : "Get where you want to go"}</p>
          </div>
          
          {!isSignup && <SecurityTips />}
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="form-section"
        >
          <AnimatePresence mode="wait">
            {isSignup ? renderSignupForm() : renderLoginForm()}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dark Mode Toggle */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </motion.div>
      
      {/* Info Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="info-toggle"
        onClick={() => window.open("#help", "_blank")}
        title="Help & Support"
      >
        <FaInfoCircle />
      </motion.div>
    </motion.div>
  );
};

export default LoginSignup;
