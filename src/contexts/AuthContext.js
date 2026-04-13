import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USER = {
  id: 1,
  name: "Demo User",
  email: "demo@carshare.com",
  password: "demo123",
  phone: "+1 555-0100",
  avatar: null,
  joinedDate: "2024-01-01"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('carshare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      localStorage.setItem('carshare_user', JSON.stringify(DEMO_USER));
      setUser(DEMO_USER);
      setIsAuthenticated(true);
      return true;
    }
    
    // Check local storage for registered users (simple mock)
    const storedUser = localStorage.getItem('carshare_user');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      if (u.email === email && u.password === password) {
        setUser(u);
        setIsAuthenticated(true);
        return true;
      }
    }
    
    throw new Error('Invalid email or password');
  };

  const register = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser = {
      ...userData,
      id: Date.now(),
      joinedDate: new Date().toISOString().split('T')[0]
    };

    localStorage.setItem('carshare_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('carshare_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (data) => {
    const updatedUser = { ...user, ...data };
    localStorage.setItem('carshare_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
