import React, { useState, useEffect, useRef } from 'react';
import {
  FaMoon, FaSun, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock,
  FaInstagram, FaLinkedin,
  FaArrowRight, FaPaperPlane, FaQuestionCircle, FaUser,
  FaCommentDots, FaTimes, FaExclamationTriangle
} from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon separately
import '../components/Contact.css';

const ContactForm = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('contact');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [notification, setNotification] = useState(null);
  const formRef = useRef(null);
  
  useEffect(() => {
    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Apply transitions after initial load
    const timer = setTimeout(() => {
      document.documentElement.style.setProperty('--transition-bg', 'background-color 0.6s ease, color 0.6s ease');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/; // Indian phone number validation

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name should be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian phone number.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject cannot be empty.';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject should be at least 5 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message field is required.';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message should be at least 20 characters.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        setIsSubmitted(true);
        setIsSubmitting(false);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          subject: '',
          message: '',
        });
        setErrors({});
        
      } catch (error) {
        // Handle error
        setIsSubmitting(false);
        showNotification('An error occurred. Please try again.', 'error');
      }
    } else {
      setErrors(validationErrors);
      
      // Show notification for validation errors
      showNotification('Please fix the errors in the form.', 'error');

      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  };
  
  const handleClear = () => {
    if (Object.values(formData).some(value => value.trim() !== '')) {
      if (window.confirm('Are you sure you want to clear all form fields?')) {
        resetForm();
      }
    } else {
      resetForm();
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: '',
    });
    setErrors({});
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const toggleFAQ = (index) => {
    setSelectedFAQ(selectedFAQ === index ? null : index);
  };
  
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };
  
  const closeNotification = () => {
    setNotification(null);
  };
  
  // Enhanced FAQ data with more questions and detailed answers
  const faqs = [
    {
      question: "What areas do you provide car sharing services?",
      answer: "We currently operate in major cities across India, including Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, and Pune. We're continuously expanding to new locations based on customer demand."
    },
    {
      question: "How do I book a ride?",
      answer: "Booking a ride is simple! Just select your pickup location and destination, choose your preferred vehicle type, and schedule your ride. You can pay through our secure payment gateway."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets like Paytm, Google Pay, and PhonePe."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 2 hours before the scheduled ride without any cancellation fee. Cancellations made within 2 hours of the ride incur a 20% fee."
    },
    {
      question: "Are your drivers verified?",
      answer: "Absolutely! All our drivers undergo thorough background checks, document verification, and training programs to ensure your safety and comfort."
    }
  ];

  // Enhanced contact details with more descriptive information
  const contactDetails = [
    {
      icon: <FaPhone />,
      title: "Call Us",
      content: "+91 9057538521",
      details: "Available 24/7 for customer support",
      action: "tel:+919057538521",
      actionText: "Call now"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      content: "+91 9057538521",
      details: "Quick responses during business hours",
      action: "https://wa.me/919057538521",
      actionText: "Message us"
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      content: "kinshuksaxena3@gmail.com",
      details: "We'll respond within 24 hours",
      action: "mailto:kinshuksaxena3@gmail.com",
      actionText: "Send email"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Head Office",
      content: "165 Tech Park, Sector 15, Jaipur",
      details: "Jaipur, Rajasthan - 302019",
      action: "https://maps.google.com/?q=Jaipur,Rajasthan",
      actionText: "Get directions"
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      content: "Monday-Friday: 9AM - 8PM",
      details: "Weekend: 10AM - 6PM, Holidays: 10AM - 2PM",
      action: null,
      actionText: null
    }
  ];

  // Success message component with improved design
  if (isSubmitted) {
    return (
      <div className={`contact-form-container ${darkMode ? 'dark-mode' : ''}`}>
        <div className="theme-toggle" onClick={toggleDarkMode} title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          {darkMode ? <FaSun className="icon sun-icon" /> : <FaMoon className="icon moon-icon" />}
        </div>
        <div className="success-message-container">
          <div className="success-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2>Thank You for Reaching Out!</h2>
          <p>Your message has been successfully sent. Our customer support team will get back to you within 24 hours.</p>
          <div className="next-steps">
            <h3>What happens next?</h3>
            <ol>
              <li>You'll receive a confirmation email shortly.</li>
              <li>Our team will review your inquiry.</li>
              <li>We'll respond with detailed information or solutions.</li>
            </ol>
          </div>
          <div className="success-buttons">
            <button className="return-btn primary" onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </button>
            <button className="return-btn secondary" onClick={() => window.location.href = "/"}>
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`contact-form-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Notification system */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'error' && <FaExclamationTriangle />}
          <p>{notification.message}</p>
          <button onClick={closeNotification}><FaTimes /></button>
        </div>
      )}
      
      <div className="theme-toggle" onClick={toggleDarkMode} title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
        {darkMode ? <FaSun className="icon sun-icon" /> : <FaMoon className="icon moon-icon" />}
      </div>

      <div className="contact-header">
        <h1>Get In Touch With Us</h1>
        <p>Have questions about our services? Need support? Or just want to say hello? We're here to help!</p>
      </div>

      {/* Tabs navigation */}
      <div className="contact-tabs" role="tablist">
        <button
          className={`tab ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
          role="tab"
          aria-selected={activeTab === 'contact'}
          aria-controls="contact-panel"
        >
          <FaEnvelope className="tab-icon" />
          <span>Contact Form</span>
        </button>
        <button
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
          role="tab"
          aria-selected={activeTab === 'info'}
          aria-controls="info-panel"
        >
          <FaMapMarkerAlt className="tab-icon" />
          <span>Contact Info</span>
        </button>
        <button
          className={`tab ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
          role="tab"
          aria-selected={activeTab === 'faq'}
          aria-controls="faq-panel"
        >
          <FaQuestionCircle className="tab-icon" />
          <span>FAQs</span>
        </button>
      </div>

      <div className="contact-content">
        {activeTab === 'contact' && (
          <div className="contact-form-section animated-section" id="contact-panel" role="tabpanel">
            <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
              <div className="form-header">
                <h2>Send Us A Message</h2>
                <p>Fill out the form below, and we'll get back to you as soon as possible.</p>
              </div>

              <div className="form-group">
                <label><FaUser className="form-icon" /> Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error-input' : ''}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label><FaEnvelope className="form-icon" /> Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label><FaPhone className="form-icon" /> Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your 10-digit phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={errors.phoneNumber ? 'error-input' : ''}
                />
                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
              </div>

              <div className="form-group">
                <label><FaCommentDots className="form-icon" /> Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error-input' : ''}
                />
                {errors.subject && <span className="error">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label><FaCommentDots className="form-icon" /> Message</label>
                <textarea
                  name="message"
                  placeholder="Please describe your inquiry in detail..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={errors.message ? 'error-input' : ''}
                />
                {errors.message && <span className="error">{errors.message}</span>}
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      <FaPaperPlane className="btn-icon" /> Send Message
                    </>
                  )}
                </button>
                <button type="button" className="clear-btn" onClick={handleClear}>
                  Clear All
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="contact-info-section animated-section" id="info-panel" role="tabpanel">
            <div className="contact-info-grid">
              {contactDetails.map((detail, index) => (
                <div className="contact-info-card" key={index}>
                  <div className="info-icon">
                    {detail.icon}
                  </div>
                  <div className="info-content">
                    <h3>{detail.title}</h3>
                    <p className="primary-info">{detail.content}</p>
                    <p className="secondary-info">{detail.details}</p>
                    {detail.action && (
                      <a href={detail.action} className="info-action-btn" target={detail.action.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer">
                        {detail.actionText} <FaArrowRight />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="map-container">
              <h3>Find Us On The Map</h3>
              <div className="map-placeholder">
                <FaMapMarkerAlt className="map-marker" />
                <p>Interactive map loading...</p>
                <span>Our office is conveniently located in the heart of the city, easily accessible by public transport.</span>
              </div>
            </div>

            <div className="social-connect">
              <h3>Connect With Us</h3>
              <p>Follow us on social media for updates, offers, and more.</p>
              <div className="social-icons">
                <a href="https://instagram.com/kinshuk._.saxena" target="_blank" rel="noopener noreferrer" className="social-icon instagram" title="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/in/kinshuk-saxena-/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" title="LinkedIn">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="faq-section animated-section" id="faq-panel" role="tabpanel">
            <div className="faq-header">
              <h2>Frequently Asked Questions</h2>
              <p>Find quick answers to common questions about our car sharing service.</p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div className={`faq-item ${selectedFAQ === index ? 'active' : ''}`} key={index}>
                  <div className="faq-question" onClick={() => toggleFAQ(index)}>
                    <h3>{faq.question}</h3>
                    <span className="faq-toggle">
                      <FaArrowRight />
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="still-questions">
              <h3>Still have questions?</h3>
              <p>If you couldn't find the answer to your question, please don't hesitate to contact us directly.</p>
              <button className="contact-us-btn" onClick={() => setActiveTab('contact')}>
                Contact Us <FaArrowRight className="btn-icon-right" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;