// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { useLocation } from 'react-router-dom';
// import '../components/LastPage.css';

// const LastPage = () => {
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   const { location: locationA, destination: locationB } = location.state || { location: '', destination: '' };

//   const containerStyle = {
//     width: '100%',
//     height: window.innerHeight - 100
//   };

//   const center = {
//     lat: parseFloat(locationA.split(',')[0]) || 26.9124, // Default latitude for locationA (Jaipur)
//     lng: parseFloat(locationA.split(',')[1]) || 75.7873  // Default longitude for locationA (Jaipur)
//   };

//   const destination = {
//     lat: parseFloat(locationB.split(',')[0]) || 28.7041, // Default latitude for locationB (Delhi)
//     lng: parseFloat(locationB.split(',')[1]) || 77.1025  // Default longitude for locationB (Delhi)
//   };

//   const [map, setMap] = useState(null);

//   // Set center to locationA
//   useEffect(() => {
//     if (locationA && map) {
//       setMap(map);
//     }
//   }, [locationA, map]);

//   // Set center to locationB
//   useEffect(() => {
//     if (locationB && map) {
//       setMap(map);
//     }
//   }, [locationB, map]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-animation"></div>
//         <p>Confirming Booking...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="last-page-container">
//       <div className="map-container">
//         <h2>Your Trip: {locationA} to {locationB}</h2>
//         <LoadScript googleMapsApiKey="AIzaSyBJvVHtqShxmdHNnY9abekPRgVD6HzS0Pw">
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={10}
//             onLoad={(map) => setMap(map)}  // Setting the map instance
//             options={{ mapId: '4113717585f11867' }}
//           >
//             {/* Marker for source (locationA) */}
//             <Marker position={center} />

//             {/* Marker for destination (locationB) */}
//             <Marker position={destination} />
//           </GoogleMap>
//         </LoadScript>
//       </div>
//       <footer className="footer">
//         <p>Footer Content Here</p>
//       </footer>
//     </div>
//   );
// };

// export default LastPage;


// ......>>^ woring map ^<<............




































import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import '../components/LastPage.css';

const LastPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeMarker, setActiveMarker] = useState(null);
  const location = useLocation();

  const { location: locationA, destination: locationB } = location.state || { location: '', destination: '' };

  const containerStyle = {
    width: '100%',
    height: window.innerHeight - 100,
  };

  // Parse latitude and longitude for both locations
  const center = {
    lat: parseFloat(locationA.split(',')[0]) || 26.9124,  // Default latitude for locationA (Jaipur)
    lng: parseFloat(locationA.split(',')[1]) || 75.7873,  // Default longitude for locationA (Jaipur)
  };

  const destination = {
    lat: parseFloat(locationB.split(',')[0]) || 28.7041,  // Default latitude for locationB (Delhi)
    lng: parseFloat(locationB.split(',')[1]) || 77.1025,  // Default longitude for locationB (Delhi)
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-animation"></div>
        <p>Confirming Booking...</p>
      </div>
    );
  }

  return (
    <div className="last-page-container">
      <div className="map-container">
        <h2>Your Trip: {locationA} to {locationB}</h2>
        <LoadScript googleMapsApiKey="AIzaSyBJvVHtqShxmdHNnY9abekPRgVD6HzS0Pw">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={{ mapId: '4113717585f11867' }}
          >
            {/* Marker for locationA */}
            <MarkerF
              position={center}
              onClick={() => setActiveMarker('locationA')}
            />

            {/* Marker for locationB */}
            <MarkerF
              position={destination}
              onClick={() => setActiveMarker('locationB')}
            />

            {/* InfoWindow for locationA */}
            {activeMarker === 'locationA' && (
              <InfoWindow
                position={center}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div>
                  <h3>Location A</h3>
                  <p>{locationA}</p> {/* Show the name of Location A */}
                  <p>Latitude: {center.lat}</p>
                  <p>Longitude: {center.lng}</p>
                </div>
              </InfoWindow>
            )}

            {activeMarker === 'locationB' && (
              <InfoWindow
                position={destination}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div>
                  <h3>Location B</h3>
                  <p>{locationB}</p> {/* Show the name of Location B */}
                  <p>Latitude: {destination.lat}</p>
                  <p>Longitude: {destination.lng}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      <footer className="footer">
      </footer>
    </div>
  );
};

export default LastPage;