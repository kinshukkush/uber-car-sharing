import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import '../components/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and store in local storage
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('carshare_messages') || '[]');
      localStorage.setItem('carshare_messages', JSON.stringify([...existing, { ...formData, id: Date.now() }]));
      
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <motion.div 
      className="page-wrapper contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="section-header text-center mb-5">
        <h1 className="gradient-text">Contact Us</h1>
        <p>Get in touch with the CarShare support team for any inquiries.</p>
      </div>

      <div className="contact-container">
        <motion.div 
          className="contact-info glass-panel"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Contact Information</h2>
          <p className="mb-4 text-secondary">Fill up the form and our team will get back to you within 24 hours.</p>
          
          <div className="info-items">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4>Location</h4>
                <p>123 Future Tech Blvd, NY 10001</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 000-0000</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>support@carshare.com</p>
              </div>
            </div>
          </div>

          <div className="contact-illustration">
            {/* Simple CSS Illustration of a city */}
            <div className="building b1"></div>
            <div className="building b2"></div>
            <div className="building b3"></div>
          </div>
        </motion.div>

        <motion.div 
          className="contact-form-wrap glass-panel"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-row">
              <div className="input-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="John Doe"
                />
              </div>
              <div className="input-group">
                <label>Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="input-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
                placeholder="How can we help?"
              />
            </div>
            
            <div className="input-group">
              <label>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                placeholder="Write your message here..."
                rows="5"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="gradient-btn submit-btn mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending Request...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
