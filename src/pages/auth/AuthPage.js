import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaCar,
  FaCheckCircle,
  FaTimes,
  FaArrowRight,
} from 'react-icons/fa';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the return URL from location state or default to '/home'
  const from = location.state?.from?.pathname || '/home';

  useEffect(() => {
    setErrors({});
    setLoginError('');
    setSuccessMessage('');
  }, [isLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.fullName?.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.phone?.trim()) {
        newErrors.phone = 'Phone number is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setSuccessMessage('');
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Demo login logic - replace with your actual login logic
        if (formData.email && formData.password) {
          const userData = {
            id: 1,
            email: formData.email,
            name: formData.email.split('@')[0],
            type: 'user',
            isAuthenticated: true
          };
          
          await login(userData);
          setSuccessMessage('Login successful!');
          
          // Clear form
          setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            phone: ''
          });

          // Navigate to the return URL or home
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 1000);
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        // Register logic
        const userData = {
          id: Date.now(),
          email: formData.email,
          name: formData.fullName,
          phone: formData.phone,
          type: 'user',
          isAuthenticated: true
        };
        
        await login(userData);
        setSuccessMessage('Account created successfully!');
        
        // Clear form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          phone: ''
        });

        // Navigate to home
        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setLoginError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    setLoginError(`${platform} login coming soon!`);
  };

  // Rest of your JSX remains the same
  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div
          className="auth-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="auth-header">
            <motion.div
              className="logo"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <FaCar className="logo-icon" />
              <h1>CarRental</h1>
            </motion.div>
            <p className="header-text">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </p>
          </div>

          {/* Messages */}
          <AnimatePresence>
            {loginError && (
              <motion.div
                className="message error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <FaTimes /> {loginError}
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                className="message success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <FaCheckCircle /> {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {!isLogin && (
                  <>
                    <div className="form-group">
                      <div className="input-container">
                        <FaUser className="input-icon" />
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={errors.fullName ? 'error' : ''}
                        />
                      </div>
                      {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <div className="input-container">
                        <FaUser className="input-icon" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={errors.phone ? 'error' : ''}
                        />
                      </div>
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                  </>
                )}

                <div className="form-group">
                  <div className="input-container">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                    />
                  </div>
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <div className="input-container">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {!isLogin && (
                  <div className="form-group">
                    <div className="input-container">
                      <FaLock className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={errors.confirmPassword ? 'error' : ''}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <span className="error-text">{errors.confirmPassword}</span>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <FaArrowRight />
                </>
              )}
            </motion.button>
          </form>

          {/* Social Login */}
          <div className="social-auth">
            <div className="divider">or continue with</div>
            <div className="social-buttons">
              {['Google', 'Facebook', 'Apple'].map((provider) => (
                <motion.button
                  key={provider}
                  className={`social-button ${provider.toLowerCase()}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialLogin(provider)}
                >
                  {provider === 'Google' && <FaGoogle />}
                  {provider === 'Facebook' && <FaFacebook />}
                  {provider === 'Apple' && <FaApple />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Toggle Login/Register */}
          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <motion.button
                type="button"
                className="toggle-auth"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    fullName: '',
                    phone: ''
                  });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </motion.button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;