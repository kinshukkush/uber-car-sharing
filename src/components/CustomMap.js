import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CustomMap.css';

// Fix Leaflet default icon path issues in standard webpack builds
delete L.Icon.Default.prototype._getIconUrl;

const pickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-cyan.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const carIcon = new L.DivIcon({
  className: 'custom-car-icon',
  html: '<div style="font-size: 24px; filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.5)); transform: scaleX(-1);">🚗</div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const CustomMap = ({ pickup, destination, isRiding }) => {
  const [carPos, setCarPos] = useState(null);

  useEffect(() => {
    if (pickup && destination && isRiding) {
      setCarPos([pickup.coords.lat, pickup.coords.lng]);
      
      // Simple loop animation from pickup to destination for the car
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.05;
        if (progress > 1) progress = 0; // loop back
        
        const lat = pickup.coords.lat + (destination.coords.lat - pickup.coords.lat) * progress;
        const lng = pickup.coords.lng + (destination.coords.lng - pickup.coords.lng) * progress;
        setCarPos([lat, lng]);
      }, 400); // adjust speed
      
      return () => clearInterval(interval);
    } else {
      setCarPos(null);
    }
  }, [pickup, destination, isRiding]);

  const defaultCenter = [40.7128, -74.0060]; // Default NY Coordinates
  
  // Recenter map dynamically based on selected pickup
  let mapCenter = defaultCenter;
  let mapZoom = 11;

  if (pickup) {
    if (destination) {
      mapCenter = [
        (pickup.coords.lat + destination.coords.lat) / 2,
        (pickup.coords.lng + destination.coords.lng) / 2
      ];
      mapZoom = 12;
    } else {
      mapCenter = [pickup.coords.lat, pickup.coords.lng];
      mapZoom = 13;
    }
  }

  return (
    <div className="custom-map-container" style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer 
        key={`${mapCenter[0]}-${mapCenter[1]}`} // force re-render when bounds significantly shift for demo purposes
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ width: '100%', height: '100%', background: '#0a0a0f' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {/* Uber only relies on a single main pin plus the car or end location */}
        {pickup && (
          <Marker position={[pickup.coords.lat, pickup.coords.lng]} icon={pickupIcon} />
        )}

        {pickup && destination && (
          <Polyline 
            positions={[
              [pickup.coords.lat, pickup.coords.lng],
              [destination.coords.lat, destination.coords.lng]
            ]} 
            pathOptions={{ color: '#00d4ff', weight: 4, dashArray: '6, 12' }} 
          />
        )}

        {isRiding && carPos && (
          <Marker position={carPos} icon={carIcon} />
        )}
      </MapContainer>
    </div>
  );
};

export default CustomMap;
