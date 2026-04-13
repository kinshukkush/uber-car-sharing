import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../components/AboutUs.css';

const AboutUs = () => {
  const team = [
    { name: "Kinshuk Saxena", role: "Lead Developer", img: "KS" },
    { name: "Jane Doe", role: "UI/UX Designer", img: "JD" },
    { name: "John Smith", role: "Operations Head", img: "JS" }
  ];

  const timeline = [
    { year: "2020", title: "The Idea", desc: "Started with a vision to eliminate the frustration of city commutes." },
    { year: "2021", title: "First Prototype", desc: "Launched our MVP in a single city with 50 drivers." },
    { year: "2023", title: "Nationwide Expansion", desc: "Expanded to 50+ cities with a fully revamped premium app." },
    { year: "2024", title: "Future Forward", desc: "Introducing purely customized interfaces, cutting APIs for performance." }
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div 
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="about-hero text-center mb-5">
        <h1 className="gradient-text">About CarShare</h1>
        <p className="about-subtitle">Redefining mobility with cutting-edge design and seamless user experience.</p>
      </div>

      <div className="mission-vision glass-panel mb-5">
        <div className="mv-block">
          <h3>Our Mission</h3>
          <p>To provide an uncompromisingly smooth, fast, and beautiful ride-sharing experience devoid of clunky third-party maps.</p>
        </div>
        <div className="mv-divider"></div>
        <div className="mv-block">
          <h3>Our Vision</h3>
          <p>To become the global standard for dark-themed, futuristic, and responsive mobility web applications.</p>
        </div>
      </div>

      <div className="timeline-section" ref={ref}>
        <h2 className="text-center mb-5">Our Journey</h2>
        <div className="timeline">
          {timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <div className="timeline-content glass-panel">
                <div className="timeline-year">{item.year}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="team-section mt-5">
        <h2 className="text-center mb-5">Meet The Team</h2>
        <div className="team-grid">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              className="team-card"
            >
              <div className="team-card-inner">
                <div className="team-card-front">
                  <div className="team-avatar gradient-bg">{member.img}</div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
                <div className="team-card-back">
                  <h3>{member.name}</h3>
                  <p>Passionate about creating the best experiences in the industry.</p>
                  <div className="social-links-small">
                    <span>in</span>
                    <span>X</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
