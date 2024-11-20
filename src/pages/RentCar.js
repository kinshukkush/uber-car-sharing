import React, { useState } from 'react';
import '../components/RentCar.css';
import CarImage from '../assets/driver-image.png';

const RentCar = () => {
    const [formData, setFormData] = useState({
        carName: '',
        carModel: '',
        startLocation: '',
        destination: '',
        price: '',
        fullName: '',
        contactDetails: '',
        oath: false,
        licenseNumber: '',
        errors: {}
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.carName) errors.carName = 'Car name is required';
        if (!formData.carModel) errors.carModel = 'Car model is required';
        if (!formData.startLocation) errors.startLocation = 'Start location is required';
        if (!formData.destination) errors.destination = 'Destination is required';
        if (!formData.price) errors.price = 'Price is required';
        if (!formData.fullName) errors.fullName = 'Full name is required';
        if (!formData.contactDetails) errors.contactDetails = 'Contact details are required';
        if (!formData.oath) errors.oath = 'You must take the oath';
        if (!formData.licenseNumber) errors.licenseNumber = 'License number is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setIsSubmitted(true);
            setFormData({
                carName: '',
                carModel: '',
                startLocation: '',
                destination: '',
                price: '',
                fullName: '',
                contactDetails: '',
                oath: false,
                licenseNumber: '',
                errors: {}
            });
        } else {
            setFormData({
                ...formData,
                errors
            });
        }
    };

    return (
        <div className="rent-car-container">
            {!isSubmitted ? (
                <div className="form-container">
                    <form className="rent-car-form" onSubmit={handleSubmit}>
                        <h2>Rent a Car</h2>
                        <div className="form-group">
                            <label>Car Name</label>
                            <input
                                type="text"
                                name="carName"
                                value={formData.carName}
                                onChange={handleChange}
                                required
                            />
                            {formData.errors.carName && <span className="error">{formData.errors.carName}</span>}
                        </div>
                        <div className="form-group">
                            <label>Car Model</label>
                            <input
                                type="text"
                                name="carModel"
                                value={formData.carModel}
                                onChange={handleChange}
                                required
                            />
                            {formData.errors.carModel && <span className="error">{formData.errors.carModel}</span>}
                        </div>
                        <div className="form-group">
                            <label>Start Location</label>
                            <input
                                type="text"
                                name="startLocation"
                                value={formData.startLocation}
                                onChange={handleChange}
                                required
                            />
                            {formData.errors.startLocation && <span className="error">{formData.errors.startLocation}</span>}
                        </div>
                        <div className="form-group">
                            <label>Destination</label>
                            <input
                                type="text"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                required
                            />
                            {formData.errors.destination && <span className="error">{formData.errors.destination}</span>}
                        </div>
                        <div className="form-group">
                            <label>Price Offer</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            {formData.errors.price && <span className="error">{formData.errors.price}</span>}
                        </div>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                            {formData.errors.fullName && <span className="error">{formData.errors.fullName}</span>}
                        </div>
                        <div className="form-group">
                            <label>Contact Details</label>
                            <input
                                type="text"
                                name="contactDetails"
                                value={formData.contactDetails}
                                onChange={handleChange}
                                required
                            />
                            {formData.errors.contactDetails && <span className="error">{formData.errors.contactDetails}</span>}
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="oath"
                                    checked={formData.oath}
                                    onChange={handleChange}
                                    required
                                />
                                I take an oath to drop the passenger safely without harming any rules and regulations
                            </label>
                            {formData.errors.oath && <span className="error">{formData.errors.oath}</span>}
                        </div>
                        <div className="form-group">
                            <label>Driving License Number</label>
                            <input
                                type="text"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                required
                            />
                            {formData.errors.licenseNumber && <span className="error">{formData.errors.licenseNumber}</span>}
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="submit-btn">Submit</button>
                            <button type="button" className="clear-btn" onClick={() => setFormData({
                                carName: '',
                                carModel: '',
                                startLocation: '',
                                destination: '',
                                price: '',
                                fullName: '',
                                contactDetails: '',
                                oath: false,
                                licenseNumber: '',
                                errors: {}
                            })}>Clear All</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="confirmation-container">
                    <div className="loading-spinner"></div>
                    <div className="confirmation-text">
                        Your car is now live, someone near you will contact you soon...
                        If you don't receive the call within 20 minutes, you can continue your journey.
                        All the best for your contribution to make this world a better place!
                    </div>
                </div>
            )}
            {!isSubmitted && (
                <div className="car-image">
                    <img src={CarImage} alt="Car" />
                </div>
            )}
        </div>
    );
};

export default RentCar;
