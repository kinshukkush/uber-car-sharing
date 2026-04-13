export const mockLocations = [
  { id: 1, name: "Central Station", address: "123 Main St", coords: { lat: 40.7128, lng: -74.0060 } },
  { id: 2, name: "Airport Terminal 1", address: "Airport Road", coords: { lat: 40.6413, lng: -73.7781 } },
  { id: 3, name: "Shopping Mall", address: "456 Commerce Ave", coords: { lat: 40.7589, lng: -73.9851 } },
  { id: 4, name: "University Campus", address: "789 Education Blvd", coords: { lat: 40.7295, lng: -73.9965 } },
  { id: 5, name: "Tech Park", address: "101 Innovation Dr", coords: { lat: 40.7484, lng: -73.9857 } },
  { id: 6, name: "City Hospital", address: "200 Health Ave", coords: { lat: 40.7549, lng: -73.9840 } },
  { id: 7, name: "Beach Resort", address: "300 Ocean Drive", coords: { lat: 40.5731, lng: -73.9712 } },
  { id: 8, name: "Convention Center", address: "400 Event Plaza", coords: { lat: 40.7527, lng: -73.9772 } },
  { id: 9, name: "Sports Stadium", address: "500 Athletic Way", coords: { lat: 40.7505, lng: -73.8476 } },
  { id: 10, name: "Downtown Plaza", address: "600 Center St", coords: { lat: 40.7580, lng: -73.9855 } },
  { id: 11, name: "Residential Heights", address: "700 Home Lane", coords: { lat: 40.7282, lng: -73.7949 } },
  { id: 12, name: "Industrial Zone", address: "800 Factory Rd", coords: { lat: 40.6892, lng: -74.0445 } }
];

export const mockDrivers = [
  { id: 1, name: "John Smith", rating: 4.9, car: "Tesla Model 3", plate: "ABC 123", phone: "+1 555-0101", trips: 1250, eta: 3 },
  { id: 2, name: "Sarah Johnson", rating: 4.8, car: "Toyota Camry", plate: "XYZ 789", phone: "+1 555-0102", trips: 890, eta: 5 },
  { id: 3, name: "Mike Davis", rating: 4.7, car: "Honda Accord", plate: "DEF 456", phone: "+1 555-0103", trips: 2100, eta: 4 },
  { id: 4, name: "Emily Brown", rating: 4.9, car: "BMW 5 Series", plate: "GHI 321", phone: "+1 555-0104", trips: 1560, eta: 7 },
  { id: 5, name: "David Wilson", rating: 4.6, car: "Mercedes E-Class", plate: "JKL 654", phone: "+1 555-0105", trips: 980, eta: 6 },
  { id: 6, name: "Lisa Anderson", rating: 4.8, car: "Audi A4", plate: "MNO 987", phone: "+1 555-0106", trips: 1340, eta: 8 }
];

export const mockRides = [
  { id: 1, type: "Economy", price: 12.50, time: "5 min", icon: "🚗", description: "Affordable everyday rides", capacity: 4 },
  { id: 2, type: "Premium", price: 22.00, time: "3 min", icon: "🚙", description: "Comfortable and stylish", capacity: 4 },
  { id: 3, type: "SUV", price: 28.00, time: "7 min", icon: "🚐", description: "Extra space for groups", capacity: 6 },
  { id: 4, type: "Luxury", price: 45.00, time: "10 min", icon: "🏎️", description: "Premium luxury experience", capacity: 4 }
];

export const mockBookingHistory = [
  { id: 1, date: "2024-01-15", pickup: "Central Station", destination: "Airport Terminal 1", price: 28.50, status: "completed", driver: "John Smith", rating: 5 },
  { id: 2, date: "2024-01-12", pickup: "Shopping Mall", destination: "University Campus", price: 15.00, status: "completed", driver: "Sarah Johnson", rating: 4 },
  { id: 3, date: "2024-01-10", pickup: "Tech Park", destination: "Downtown Plaza", price: 18.75, status: "completed", driver: "Mike Davis", rating: 5 },
  { id: 4, date: "2024-01-08", pickup: "Beach Resort", destination: "Convention Center", price: 35.00, status: "cancelled", driver: null, rating: null }
];
