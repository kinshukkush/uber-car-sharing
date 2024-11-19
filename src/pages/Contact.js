import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import '../components/Contact.css';

const ContactForm = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const root = document.documentElement;
    root.style.setProperty('--transition-bg', 'background-color 0.6s ease, color 0.6s ease');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits.';
    }
    if (!formData.subject) {
      newErrors.subject = 'Subject cannot be empty.';
    }
    if (!formData.message) {
      newErrors.message = 'Message field is required.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      alert('Thank you for contacting us! We will get back to you shortly.');
      setFormData({
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleClear = () => {
    setFormData({
      email: '',
      phoneNumber: '',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <div className={`contact-form-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle" onClick={toggleDarkMode} title="Toggle Theme">
        {darkMode ? <FaSun className="icon sun-icon" /> : <FaMoon className="icon moon-icon" />}
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter the subject"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <span className="error">{errors.subject}</span>}
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            placeholder="Type your message here"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" className="clear-btn" onClick={handleClear}>
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
