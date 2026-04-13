import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBookingHistory, mockDrivers } from '../data/mockData';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);

  useEffect(() => {
    const storedBookings = localStorage.getItem('carshare_bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      // Initialize with mock history
      localStorage.setItem('carshare_bookings', JSON.stringify(mockBookingHistory));
      setBookings(mockBookingHistory);
    }
  }, []);

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending' // pending, accepted, completed, cancelled
    };
    
    const updatedBookings = [newBooking, ...bookings];
    localStorage.setItem('carshare_bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setActiveBooking(newBooking);
    return newBooking;
  };

  const assignDriver = (bookingId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly assign a driver
        const randomDriver = mockDrivers[Math.floor(Math.random() * mockDrivers.length)];
        
        const updatedBookings = bookings.map(b => {
          if (b.id === bookingId) {
            return {
              ...b,
              status: 'accepted',
              driver: randomDriver.name,
              driverDetails: randomDriver
            };
          }
          return b;
        });

        localStorage.setItem('carshare_bookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
        
        const updatedBooking = updatedBookings.find(b => b.id === bookingId);
        setActiveBooking(updatedBooking);
        resolve(updatedBooking);
      }, 2000);
    });
  };

  const completeBooking = (bookingId) => {
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'completed' } : b
    );
    localStorage.setItem('carshare_bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setActiveBooking(null);
  };

  const cancelBooking = (id) => {
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem('carshare_bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    if (activeBooking?.id === id) {
      setActiveBooking(null);
    }
  };

  const rateBooking = (id, rating) => {
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, rating } : b
    );
    localStorage.setItem('carshare_bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const getBookingHistory = () => {
    return bookings;
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      activeBooking,
      addBooking,
      assignDriver,
      completeBooking,
      cancelBooking,
      rateBooking,
      getBookingHistory
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
