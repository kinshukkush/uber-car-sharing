import React, { useState, useRef, useEffect } from 'react';
import { mockLocations } from '../data/mockData';
import './LocationPicker.css';

const LocationPicker = ({ label, placeholder, value, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  let filteredLocations = mockLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (searchTerm.trim().length > 0) {
    filteredLocations = [
      {
        id: `custom-${Date.now()}`,
        name: searchTerm,
        address: "Custom Location",
        coords: {
          lat: 40.7 + (Math.random() * 0.1 - 0.05),
          lng: -74.0 + (Math.random() * 0.1 - 0.05)
        }
      },
      ...filteredLocations
    ];
  }

  const handleSelect = (location) => {
    onChange(location);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="location-picker" ref={wrapperRef}>
      <label>{label}</label>
      <div 
        className={`loc-picker-input ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <span className="loc-icon">{icon}</span>
        {value ? (
          <div className="selected-val">
            <span className="val-name">{value.name}</span>
            <span className="val-addr">{value.address}</span>
          </div>
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="loc-dropdown glass-panel">
          <input
            type="text"
            className="loc-search"
            placeholder="Search location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <ul className="loc-list">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <li key={loc.id} onClick={() => handleSelect(loc)}>
                  <div className="loc-item-icon">📍</div>
                  <div className="loc-item-info">
                    <span className="loc-item-name">{loc.name}</span>
                    <span className="loc-item-addr">{loc.address}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-results">No locations found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
