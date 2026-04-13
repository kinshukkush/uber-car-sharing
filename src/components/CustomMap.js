import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaFlagCheckered, 
  FaCar, 
  FaPlus, 
  FaMinus, 
  FaExpand, 
  FaLocationArrow,
  FaClock,
  FaRoute,
  FaUser,
  FaStar,
  FaPhone
} from 'react-icons/fa';
import { MdMyLocation, MdLayers } from 'react-icons/md';
import 'leaflet/dist/leaflet.css';
import './CustomMap.css';

// Fix Leaflet default icon path issues
delete L.Icon.Default.prototype._getIconUrl;

// Custom Pickup Icon (Cyan/Primary color)
const pickupIcon = new L.DivIcon({
  className: 'custom-marker pickup-marker',
  html: `
    <div class="marker-container pickup">
      <div class="marker-pulse"></div>
      <div class="marker-pin">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="#00d4ff"/>
          <circle cx="12" cy="12" r="4" fill="white"/>
        </svg>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

// Custom Destination Icon (Purple/Secondary color)
const destinationIcon = new L.DivIcon({
  className: 'custom-marker destination-marker',
  html: `
    <div class="marker-container destination">
      <div class="marker-pulse"></div>
      <div class="marker-pin">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#7c3aed"/>
          <circle cx="12" cy="9" r="3" fill="white"/>
        </svg>
      </div>
    </div>
  `,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50]
});

// Custom Car Icon
const createCarIcon = (rotation = 0) => new L.DivIcon({
  className: 'custom-car-icon',
  html: `
    <div class="car-marker" style="transform: rotate(${rotation}deg)">
      <div class="car-glow"></div>
      <div class="car-body">🚗</div>
    </div>
  `,
  iconSize: [50, 50],
  iconAnchor: [25, 25]
});

// Driver Icon
const driverIcon = new L.DivIcon({
  className: 'custom-driver-icon',
  html: `
    <div class="driver-marker">
      <div class="driver-pulse"></div>
      <div class="driver-avatar">
        <span>🚙</span>
      </div>
    </div>
  `,
  iconSize: [45, 45],
  iconAnchor: [22, 22]
});

// Map Controller Component
const MapController = ({ center, zoom, pickup, destination }) => {
  const map = useMap();
  
  useEffect(() => {
    if (pickup && destination) {
      const bounds = L.latLngBounds(
        [pickup.coords.lat, pickup.coords.lng],
        [destination.coords.lat, destination.coords.lng]
      );
      map.fitBounds(bounds, { padding: [80, 80], maxZoom: 14 });
    } else if (pickup) {
      map.setView([pickup.coords.lat, pickup.coords.lng], 14);
    } else if (center) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom, pickup, destination]);

  return null;
};

const CustomMap = ({ 
  pickup, 
  destination, 
  isRiding, 
  rideProgress = 0,
  driver = null,
  onMapReady 
}) => {
  const [carPos, setCarPos] = useState(null);
  const [carRotation, setCarRotation] = useState(0);
  const [mapStyle, setMapStyle] = useState('dark');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [estimatedDistance, setEstimatedDistance] = useState(null);
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  // Map tile styles
  const mapStyles = {
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  // Calculate distance between two points
  const calculateDistance = (p1, p2) => {
    if (!p1 || !p2) return 0;
    const R = 6371; // Earth's radius in km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((p1.lat * Math.PI) / 180) * Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calculate rotation angle for car
  const calculateRotation = (from, to) => {
    const dLon = to.lng - from.lng;
    const dLat = to.lat - from.lat;
    const angle = Math.atan2(dLon, dLat) * (180 / Math.PI);
    return angle;
  };

  // Update estimates when locations change
  useEffect(() => {
    if (pickup && destination) {
      const distance = calculateDistance(pickup.coords, destination.coords);
      setEstimatedDistance(distance.toFixed(1));
      setEstimatedTime(Math.round(distance * 3 + 5)); // Rough estimate: 3 min per km + 5 min base
    }
  }, [pickup, destination]);

  // Animate car position during ride
  useEffect(() => {
    if (pickup && destination && isRiding) {
      const startLat = pickup.coords.lat;
      const startLng = pickup.coords.lng;
      const endLat = destination.coords.lat;
      const endLng = destination.coords.lng;

      // Calculate rotation
      const rotation = calculateRotation(pickup.coords, destination.coords);
      setCarRotation(rotation);

      // Use rideProgress if provided, otherwise animate
      if (rideProgress > 0) {
        const progress = rideProgress / 100;
        const lat = startLat + (endLat - startLat) * progress;
        const lng = startLng + (endLng - startLng) * progress;
        setCarPos([lat, lng]);
      } else {
        // Animate car movement
        let progress = 0;
        const interval = setInterval(() => {
          progress += 0.02;
          if (progress > 1) progress = 0;
          
          const lat = startLat + (endLat - startLat) * progress;
          const lng = startLng + (endLng - startLng) * progress;
          setCarPos([lat, lng]);
        }, 200);
        
        return () => clearInterval(interval);
      }
    } else {
      setCarPos(null);
    }
  }, [pickup, destination, isRiding, rideProgress]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    mapRef.current?.setZoom(mapRef.current.getZoom() + 1);
  };

  const handleZoomOut = () => {
    mapRef.current?.setZoom(mapRef.current.getZoom() - 1);
  };

  // Center on current location
  const centerOnLocation = () => {
    if (pickup) {
      mapRef.current?.setView([pickup.coords.lat, pickup.coords.lng], 15);
    }
  };

  // Default center
  const defaultCenter = [40.7128, -74.0060];
  let mapCenter = defaultCenter;
  let mapZoom = 12;

  if (pickup) {
    mapCenter = [pickup.coords.lat, pickup.coords.lng];
    mapZoom = 14;
  }

  // Generate curved path between points
  const generateCurvedPath = (start, end, numPoints = 20) => {
    const points = [];
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;
    
    // Add some curve offset
    const offset = 0.01;
    const controlLat = midLat + offset;
    const controlLng = midLng - offset;

    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const lat = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * controlLat + t * t * end[0];
      const lng = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * controlLng + t * t * end[1];
      points.push([lat, lng]);
    }
    return points;
  };

  const routePath = pickup && destination ? 
    generateCurvedPath(
      [pickup.coords.lat, pickup.coords.lng],
      [destination.coords.lat, destination.coords.lng]
    ) : [];

  return (
    <div className="custom-map-wrapper" ref={containerRef}>
      <div className="custom-map-container">
        {/* Map Overlay - Top Info Bar */}
        <AnimatePresence>
          {pickup && destination && !isRiding && (
            <motion.div 
              className="map-top-bar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="route-info-bar">
                <div className="route-point">
                  <span className="point-dot pickup"></span>
                  <span className="point-name">{pickup.name}</span>
                </div>
                <div className="route-arrow">
                  <FaRoute />
                </div>
                <div className="route-point">
                  <span className="point-dot destination"></span>
                  <span className="point-name">{destination.name}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Controls */}
        <div className="map-controls">
          <motion.button 
            className="map-control-btn"
            onClick={handleZoomIn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Zoom In"
          >
            <FaPlus />
          </motion.button>
          <motion.button 
            className="map-control-btn"
            onClick={handleZoomOut}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Zoom Out"
          >
            <FaMinus />
          </motion.button>
          <div className="control-divider"></div>
          <motion.button 
            className="map-control-btn"
            onClick={centerOnLocation}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Center on Location"
          >
            <MdMyLocation />
          </motion.button>
          <motion.button 
            className="map-control-btn"
            onClick={toggleFullscreen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Fullscreen"
          >
            <FaExpand />
          </motion.button>
        </div>

        {/* Map Style Switcher */}
        <div className="map-style-switcher">
          <motion.button 
            className={`style-btn ${mapStyle === 'dark' ? 'active' : ''}`}
            onClick={() => setMapStyle('dark')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dark
          </motion.button>
          <motion.button 
            className={`style-btn ${mapStyle === 'light' ? 'active' : ''}`}
            onClick={() => setMapStyle('light')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Light
          </motion.button>
          <motion.button 
            className={`style-btn ${mapStyle === 'satellite' ? 'active' : ''}`}
            onClick={() => setMapStyle('satellite')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Satellite
          </motion.button>
        </div>

        {/* Leaflet Map */}
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
          ref={mapRef}
          whenCreated={(map) => {
            mapRef.current = map;
            if (onMapReady) onMapReady(map);
          }}
        >
          <TileLayer
            url={mapStyles[mapStyle]}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> | CarShare'
          />

          <MapController 
            center={mapCenter} 
            zoom={mapZoom} 
            pickup={pickup} 
            destination={destination} 
          />

          {/* Pickup Marker */}
          {pickup && (
            <Marker 
              position={[pickup.coords.lat, pickup.coords.lng]} 
              icon={pickupIcon}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <div className="popup-header pickup">
                    <FaMapMarkerAlt />
                    <span>Pickup Location</span>
                  </div>
                  <h4>{pickup.name}</h4>
                  <p>{pickup.address}</p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Destination Marker */}
          {destination && (
            <Marker 
              position={[destination.coords.lat, destination.coords.lng]} 
              icon={destinationIcon}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <div className="popup-header destination">
                    <FaFlagCheckered />
                    <span>Destination</span>
                  </div>
                  <h4>{destination.name}</h4>
                  <p>{destination.address}</p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Route Line */}
          {pickup && destination && (
            <>
              {/* Shadow line */}
              <Polyline 
                positions={routePath}
                pathOptions={{ 
                  color: '#000', 
                  weight: 8, 
                  opacity: 0.3,
                  lineCap: 'round'
                }} 
              />
              {/* Main route line */}
              <Polyline 
                positions={routePath}
                pathOptions={{ 
                  color: '#00d4ff', 
                  weight: 5, 
                  opacity: 0.9,
                  lineCap: 'round',
                  dashArray: isRiding ? null : '10, 15'
                }} 
              />
              {/* Glow effect */}
              <Polyline 
                positions={routePath}
                pathOptions={{ 
                  color: '#00d4ff', 
                  weight: 12, 
                  opacity: 0.2,
                  lineCap: 'round'
                }} 
              />
            </>
          )}

          {/* Car Marker (during ride) */}
          {isRiding && carPos && (
            <Marker 
              position={carPos} 
              icon={createCarIcon(carRotation)}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <div className="popup-header car">
                    <FaCar />
                    <span>Your Ride</span>
                  </div>
                  <p>En route to destination</p>
                  {driver && (
                    <div className="popup-driver">
                      <span>{driver.name}</span>
                      <span className="driver-rating">
                        <FaStar /> {driver.rating}
                      </span>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Trip Info Card */}
        <AnimatePresence>
          {pickup && destination && (
            <motion.div 
              className="trip-info-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="trip-stat">
                <FaRoute className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">{estimatedDistance} km</span>
                  <span className="stat-label">Distance</span>
                </div>
              </div>
              <div className="stat-divider"></div>
              <div className="trip-stat">
                <FaClock className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-value">{estimatedTime} min</span>
                  <span className="stat-label">Est. Time</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Driver Info Card (during ride) */}
        <AnimatePresence>
          {isRiding && driver && (
            <motion.div 
              className="driver-info-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="driver-header">
                <div className="driver-avatar-map">
                  <FaUser />
                </div>
                <div className="driver-details">
                  <h4>{driver.name}</h4>
                  <div className="driver-meta">
                    <span className="rating"><FaStar /> {driver.rating}</span>
                    <span className="car-info">{driver.car}</span>
                  </div>
                </div>
              </div>
              <div className="driver-actions">
                <button className="action-btn-small">
                  <FaPhone />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!pickup && !destination && (
          <div className="map-empty-state">
            <motion.div 
              className="empty-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="empty-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Select Your Route</h3>
              <p>Choose pickup and destination to see the route on map</p>
            </motion.div>
          </div>
        )}

        {/* Loading Overlay */}
        <div className="map-loading-overlay" style={{ display: 'none' }}>
          <div className="loading-spinner"></div>
          <span>Loading map...</span>
        </div>
      </div>
    </div>
  );
};

export default CustomMap;