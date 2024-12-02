import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for Authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user object
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status

  // Check if a user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Parse and set user from localStorage
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        
      }
    }
  }, []);

  // Login function to set user and authentication status
  const login = (userData) => {
    setUser(userData); // Save user data
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
  };

  // Logout function to clear user and authentication status
  const logout = () => {
    setUser(null); // Clear user data
    setIsAuthenticated(false);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
