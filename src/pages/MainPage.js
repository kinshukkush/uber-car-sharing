import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import "../components/MainPage.css";
import rent from '../assets/rent-a-car.png';
import bookride from '../assets/book-a-ride.png';

const MainPage = () => {
    const navigate = useNavigate();

    // Page entry animations
    const container = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const handleBookRide = () => {
        navigate("/home");
    };

    const handleRentCar = () => {
        navigate("/RentCar");
    };

    return (
        <motion.div 
            className="main-page"
            initial="hidden"
            animate="visible"
            variants={container}
        >
            <motion.h1 
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="intro-text"
            >
                Choose Your Adventure
            </motion.h1>
            <motion.div 
                className="option" 
                onClick={handleRentCar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <img
                    src={bookride}
                    alt="Rent a car"
                    className="option-image"
                />
                <p>Rent a Car</p>
            </motion.div>
            <motion.div 
                className="option" 
                onClick={handleBookRide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <img
                    src={rent}
                    alt="Book a ride"
                    className="option-image"
                />
                <p>Book a Ride</p>
            </motion.div>
        </motion.div>
    );
};

export default MainPage;