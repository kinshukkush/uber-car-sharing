import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/MainPage.css";
import rent from '../assets/rent-a-car.png';
import bookride from '../assets/book-a-ride.png';

const MainPage = () => {
    const navigate = useNavigate();

    const handleBookRide = () => {
        navigate("/home");
    };

    const handleRentCar = () => {
        navigate("/RentCar");
    };

    return (
        <div className="main-page">
            <div className="option" onClick={handleRentCar}>
                <img
                    src={bookride}
                    alt="Rent a car"
                    className="option-image"
                />
                <p>Rent a car</p>
            </div>
            <div className="option" onClick={handleBookRide}>
                <img
                    src={rent}
                    alt="Book a ride"
                    className="option-image"
                />
                <p>Book a ride</p>
            </div>
        </div>
    );
};

export default MainPage;