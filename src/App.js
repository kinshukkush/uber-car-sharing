import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/layout/Navbar';
import Footer from './pages/Footer'; // Sourced as per request
import Home from './pages/Home';
import AuthPage from './pages/auth/AuthPage';
import Book from './pages/Book';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import BookingHistory from './pages/BookingHistory';

import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Protected Routes */}
        <Route 
          path="/book" 
          element={
            <ProtectedRoute>
              <Book />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <HashRouter>
          <div className="App">
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1a1a2e',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
              }} 
            />
            <Navbar />
            <div className="main-content page-container">
              <AnimatedRoutes />
            </div>
            <Footer />
          </div>
        </HashRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;