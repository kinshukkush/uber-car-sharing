import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Auth Pages
import AuthPage from './pages/auth/AuthPage';

// Main Pages (Protected)
import Home from './pages/dashboard/Home';
import Book from './pages/Book';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Contact from './pages/Contact';
import LastPage from './pages/LastPage';
import RentCar from './pages/RentCar';
import Profile from './pages/Profile';
import BookingHistory from './pages/BookingHistory';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './pages/Footer';
import Toast from './components/Toast';

// Styles
import './App.css';

// Layout Component
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
      {children}
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Redirect root to auth if not logged in, or home if logged in */}
            <Route path="/" element={<Navigate to="/auth" replace />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/book" element={
              <ProtectedRoute>
                <MainLayout>
                  <Book />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/about-us" element={
              <ProtectedRoute>
                <MainLayout>
                  <AboutUs />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/services" element={
              <ProtectedRoute>
                <MainLayout>
                  <Services />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/contact" element={
              <ProtectedRoute>
                <MainLayout>
                  <Contact />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/lastpage" element={
              <ProtectedRoute>
                <MainLayout>
                  <LastPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/rentcar" element={
              <ProtectedRoute>
                <MainLayout>
                  <RentCar />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/booking-history" element={
              <ProtectedRoute>
                <MainLayout>
                  <BookingHistory />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
          <Toast />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;