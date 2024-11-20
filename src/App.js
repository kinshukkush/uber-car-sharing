import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Book from './pages/Book';
import RegisterLogin from './pages/RegisterLogin';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Contact from './pages/Contact';
import LastPage from './pages/LastPage';
import LoginForm from './pages/LoginForm';
import MainPage from './pages/MainPage';
import RentCar from './pages/RentCar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<MainPage />} />

          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/book" element={<Book />} />
                  <Route path="/register-login" element={<RegisterLogin />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/lastpage" element={<LastPage />} />
                  <Route path="/loginform" element={<LoginForm />} />
                  <Route path="/rentcar" element={<RentCar />} /> {/* Add this route */}
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
