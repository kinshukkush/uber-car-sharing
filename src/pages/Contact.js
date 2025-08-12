import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock,
  FaInstagram, FaLinkedin, FaArrowRight, FaPaperPlane,
  FaQuestionCircle, FaUser, FaCommentDots, FaTimes,
  FaExclamationTriangle, FaWhatsapp
} from 'react-icons/fa';
import '../components/Contact.css';

const ContactForm = () => {
  // State for form data, validation errors, and UI logic
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

  // Handle input changes and clear validation errors on modification
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validate all form fields and return an error object
  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/; // Indian phone number validation

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian phone number.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showNotification('Please fix the errors in the form.', 'error');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    resetForm();
  };
  
  // Reset form fields and errors
  const resetForm = () => {
    setFormData({ name: '', email: '', phoneNumber: '', subject: '', message: '' });
    setErrors({});
  };

  const toggleFAQ = (index) => {
    setSelectedFAQ(selectedFAQ === index ? null : index);
  };
  
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const faqs = [
    { question: "What areas do you serve?", answer: "We operate in major cities across India, including Delhi, Mumbai, Bangalore, and more. We are continuously expanding our service areas." },
    { question: "How are ride prices calculated?", answer: "Prices are calculated based on distance, travel time, and demand. You will always see an estimated fare before confirming your booking." },
    { question: "What payment methods are accepted?", answer: "We accept all major credit/debit cards, UPI, and popular digital wallets like Paytm, Google Pay, and PhonePe." },
    { question: "Is my personal information secure?", answer: "Absolutely. We use industry-standard encryption to protect your data, and we never share your information with third parties without your consent." },
    { question: "How do I become a driver partner?", answer: "You can start the application process through our website's 'Drive with Us' section. You'll need a valid license, vehicle registration, and to pass a background check." }
  ];

  const contactDetails = [
    { icon: <FaPhone />, title: "Call Us", content: "+91 9057538521", details: "Available 24/7 for support", action: "tel:+919057538521", actionText: "Call now" },
    { icon: <FaWhatsapp />, title: "WhatsApp", content: "+91 9057538521", details: "Quick responses during business hours", action: "https://wa.me/919057538521", actionText: "Message us" },
    { icon: <FaEnvelope />, title: "Email Us", content: "support@carshare.com", details: "We'll respond within 24 hours", action: "mailto:support@carshare.com", actionText: "Send email" },
    { icon: <FaMapMarkerAlt />, title: "Head Office", content: "165 Tech Park, Jaipur, Rajasthan", details: "Open Mon-Fri, 9AM - 6PM", action: "https://maps.google.com/?q=Jaipur,Rajasthan", actionText: "Get directions" }
  ];

  // Success message component
  if (isSubmitted) {
    return (
      <div className="contact-form-container dark-mode">
        <div className="success-message-container">
          <div className="success-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2>Thank You!</h2>
          <p>Your message has been sent. Our team will get back to you within 24 hours.</p>
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
    <div className="contact-form-container dark-mode">
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {notification.type === 'error' && <FaExclamationTriangle />}
            <p>{notification.message}</p>
            <button onClick={() => setNotification(null)}><FaTimes /></button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>Have questions, feedback, or need support? We're here to help. Reach out through the form, our contact channels, or find quick answers in the FAQs.</p>
      </div>

      <div className="contact-tabs" role="tablist">
        <button className={`tab ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')} role="tab" aria-selected={activeTab === 'contact'}>
          <FaEnvelope className="tab-icon" /><span>Contact Form</span>
        </button>
        <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')} role="tab" aria-selected={activeTab === 'info'}>
          <FaMapMarkerAlt className="tab-icon" /><span>Contact Info</span>
        </button>
        <button className={`tab ${activeTab === 'faq' ? 'active' : ''}`} onClick={() => setActiveTab('faq')} role="tab" aria-selected={activeTab === 'faq'}>
          <FaQuestionCircle className="tab-icon" /><span>FAQs</span>
        </button>
      </div>

      <div className="contact-content">
        <AnimatePresence mode="wait">
          {activeTab === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contact-form-section" id="contact-panel" role="tabpanel">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-header">
                  <h2>Send Us A Message</h2>
                </div>
                <div className="form-group">
                  <label><FaUser /> Name</label>
                  <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} className={errors.name ? 'error-input' : ''} />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label><FaEnvelope /> Email</label>
                  <input type="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} className={errors.email ? 'error-input' : ''} />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label><FaPhone /> Phone Number</label>
                  <input type="tel" name="phoneNumber" placeholder="Enter your 10-digit phone number" value={formData.phoneNumber} onChange={handleChange} className={errors.phoneNumber ? 'error-input' : ''} />
                  {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                </div>
                <div className="form-group">
                  <label><FaCommentDots /> Subject</label>
                  <input type="text" name="subject" placeholder="What is this regarding?" value={formData.subject} onChange={handleChange} className={errors.subject ? 'error-input' : ''} />
                  {errors.subject && <span className="error">{errors.subject}</span>}
                </div>
                <div className="form-group">
                  <label><FaCommentDots /> Message</label>
                  <textarea name="message" placeholder="Please describe your inquiry in detail..." value={formData.message} onChange={handleChange} rows="5" className={errors.message ? 'error-input' : ''} />
                  {errors.message && <span className="error">{errors.message}</span>}
                </div>
                <div className="form-buttons">
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? <span className="spinner"></span> : <><FaPaperPlane /> Send Message</>}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'info' && (
            <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contact-info-section" id="info-panel" role="tabpanel">
              <div className="contact-info-grid">
                {contactDetails.map((detail, index) => (
                  <div className="contact-info-card" key={index}>
                    <div className="info-icon">{detail.icon}</div>
                    <div className="info-content">
                      <h3>{detail.title}</h3>
                      <p className="primary-info">{detail.content}</p>
                      <p className="secondary-info">{detail.details}</p>
                      {detail.action && <a href={detail.action} className="info-action-btn" target="_blank" rel="noopener noreferrer">{detail.actionText} <FaArrowRight /></a>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="social-connect">
                <h3>Connect With Us</h3>
                <p>Follow us on social media for updates, offers, and more.</p>
                <div className="social-icons">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram" title="Instagram"><FaInstagram /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" title="LinkedIn"><FaLinkedin /></a>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="faq-section" id="faq-panel" role="tabpanel">
              <div className="faq-header">
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div className={`faq-item ${selectedFAQ === index ? 'active' : ''}`} key={index}>
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                      <h3>{faq.question}</h3>
                      <span className="faq-toggle"><FaArrowRight /></span>
                    </div>
                    <AnimatePresence>
                      {selectedFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="faq-answer"><p>{faq.answer}</p></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactForm;
