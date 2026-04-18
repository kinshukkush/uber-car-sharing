// import React, { useState, useEffect } from 'react';
// import { NavLink, Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../contexts/AuthContext';
// import './Navbar.css';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { isAuthenticated, user, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setMobileMenuOpen(false);
//     navigate('/');
//   };

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Book a Ride', path: '/book' },
//     { name: 'Services', path: '/services' },
//     { name: 'About Us', path: '/about' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   return (
//     <nav className={`navbar ${isScrolled ? 'scrolled glass-panel' : ''}`}>
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo gradient-text">
//           CarShare
//         </Link>
        
//         <div className="nav-menu desktop-menu">
//           {navLinks.map((link) => (
//             <NavLink 
//               key={link.name} 
//               to={link.path}
//               className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
//             >
//               {link.name}
//             </NavLink>
//           ))}
          
//           {isAuthenticated ? (
//             <div className="nav-profile-menu">
//               <NavLink to="/history" className="nav-link">History</NavLink>
//               <NavLink to="/profile" className="nav-link profile-link">
//                 {user?.name?.charAt(0) || 'U'}
//               </NavLink>
//               <button onClick={handleLogout} className="logout-btn">Logout</button>
//             </div>
//           ) : (
//             <div className="nav-auth">
//               <Link to="/login" className="gradient-btn login-btn">Login</Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div 
//           className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div 
//             className="mobile-menu glass-panel"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//           >
//             {navLinks.map((link) => (
//                <NavLink 
//                 key={link.name} 
//                 to={link.path}
//                 className="mobile-nav-link"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </NavLink>
//             ))}
            
//             {isAuthenticated ? (
//               <>
//                 <NavLink to="/history" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>History</NavLink>
//                 <NavLink to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Profile</NavLink>
//                 <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
//               </>
//             ) : (
//               <Link 
//                 to="/login" 
//                 className="gradient-btn mobile-login-btn"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Login / Register
//               </Link>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /* ── scroll handler: shrink + auto-hide on scroll down ── */
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 20);

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setHideNav(true);
    } else {
      setHideNav(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── close mobile menu on route change ── */
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  /* ── close profile dropdown on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-profile-area')) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  /* ── lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Book a Ride', path: '/book', icon: '🚗' },
    { name: 'Services', path: '/services', icon: '⚙️' },
    { name: 'About Us', path: '/about', icon: '👥' },
    { name: 'Contact', path: '/contact', icon: '📧' },
  ];

  /* ── animation variants ── */
  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200, damping: 20 }
    }),
    exit: { opacity: 0, x: 20 }
  };

  const profileDropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const parts = user.name.split(' ');
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${hideNav ? 'navbar-hidden' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <div className="navbar-container">

          {/* ── Logo ── */}
          <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
            <motion.div
              className="logo-icon-wrapper"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <span className="logo-car-icon">🚗</span>
              <span className="logo-road-line" />
            </motion.div>
            <div className="logo-text">
              <span className="logo-text-car gradient-text">Car</span>
              <span className="logo-text-share">Share</span>
            </div>
            <span className="logo-dot" />
          </Link>

          {/* ── Desktop Menu ── */}
          <div className="nav-menu desktop-menu">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                <span className="nav-link-text">{link.name}</span>
                <span className="nav-link-indicator" />
              </NavLink>
            ))}
          </div>

          {/* ── Right Section ── */}
          <div className="nav-right">
            {isAuthenticated ? (
              <div className="nav-auth-area">
                {/* History with notification */}
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `nav-link nav-history-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  <span className="nav-link-text">History</span>
                  <span className="nav-notif-dot" />
                </NavLink>

                {/* Profile dropdown */}
                <div className="nav-profile-area">
                  <motion.button
                    className="nav-avatar-btn"
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="nav-avatar-ring" />
                    <span className="nav-avatar-text">{getUserInitials()}</span>
                    <motion.span
                      className="nav-avatar-chevron"
                      animate={{ rotate: profileMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▾
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        className="nav-profile-dropdown glass-panel"
                        variants={profileDropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="nav-dropdown-header">
                          <div className="nav-dropdown-avatar">{getUserInitials()}</div>
                          <div className="nav-dropdown-info">
                            <span className="nav-dropdown-name">{user?.name || 'User'}</span>
                            <span className="nav-dropdown-email">{user?.email || ''}</span>
                          </div>
                        </div>

                        <div className="nav-dropdown-divider" />

                        <Link to="/profile" className="nav-dropdown-item">
                          <span className="nav-dropdown-icon">👤</span>
                          My Profile
                        </Link>
                        <Link to="/history" className="nav-dropdown-item">
                          <span className="nav-dropdown-icon">📋</span>
                          Ride History
                        </Link>

                        <div className="nav-dropdown-divider" />

                        <button className="nav-dropdown-item nav-dropdown-logout" onClick={handleLogout}>
                          <span className="nav-dropdown-icon">🚪</span>
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="nav-guest-area">
                <Link to="/login" className="nav-login-link">
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/login" className="nav-signup-btn">
                    <span className="nav-signup-icon">✨</span>
                    Get Started
                    <span className="nav-signup-glow" />
                  </Link>
                </motion.div>
              </div>
            )}

            {/* ── Mobile Toggle ── */}
            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'toggle-open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="toggle-line toggle-line-1" />
              <span className="toggle-line toggle-line-2" />
              <span className="toggle-line toggle-line-3" />
            </button>
          </div>
        </div>

        {/* ── Navbar bottom glow line ── */}
        <div className={`navbar-glow-line ${isScrolled ? 'visible' : ''}`} />
      </motion.nav>

      {/* ═══════════ MOBILE MENU ═══════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              className="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Mobile menu header */}
              <div className="mobile-menu-header">
                <span className="mobile-menu-title gradient-text">Menu</span>
                <button
                  className="mobile-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Mobile user card (if logged in) */}
              {isAuthenticated && (
                <motion.div
                  className="mobile-user-card glass-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="mobile-user-avatar">{getUserInitials()}</div>
                  <div className="mobile-user-info">
                    <span className="mobile-user-name">{user?.name || 'User'}</span>
                    <span className="mobile-user-email">{user?.email || ''}</span>
                  </div>
                </motion.div>
              )}

              {/* Mobile nav links */}
              <div className="mobile-nav-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `mobile-nav-link ${isActive ? 'mobile-link-active' : ''}`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mobile-link-icon">{link.icon}</span>
                      <span className="mobile-link-text">{link.name}</span>
                      <span className="mobile-link-arrow">→</span>
                    </NavLink>
                  </motion.div>
                ))}

                {isAuthenticated && (
                  <>
                    <motion.div custom={navLinks.length} variants={mobileLinkVariants} initial="hidden" animate="visible" exit="exit">
                      <NavLink
                        to="/history"
                        className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-link-active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mobile-link-icon">📋</span>
                        <span className="mobile-link-text">Ride History</span>
                        <span className="mobile-link-arrow">→</span>
                      </NavLink>
                    </motion.div>

                    <motion.div custom={navLinks.length + 1} variants={mobileLinkVariants} initial="hidden" animate="visible" exit="exit">
                      <NavLink
                        to="/profile"
                        className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-link-active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mobile-link-icon">👤</span>
                        <span className="mobile-link-text">My Profile</span>
                        <span className="mobile-link-arrow">→</span>
                      </NavLink>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile bottom actions */}
              <div className="mobile-bottom-actions">
                {isAuthenticated ? (
                  <motion.button
                    className="mobile-logout-btn"
                    onClick={handleLogout}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span>🚪</span> Sign Out
                  </motion.button>
                ) : (
                  <motion.div
                    className="mobile-auth-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Link
                      to="/login"
                      className="mobile-signin-btn"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/login"
                      className="mobile-getstarted-btn gradient-btn"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ✨ Get Started
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;