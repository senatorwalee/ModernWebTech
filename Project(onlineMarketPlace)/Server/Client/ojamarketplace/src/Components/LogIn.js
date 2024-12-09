import React, { useState } from 'react';
import { loginUser } from '../api'; 
import { Link,useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  // State variables to hold input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate()
  

  // Handle the form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Clear previous error message before submitting a new login attempt
    setError(null);  

    try {
      // Attempt to login with email and password
      const response = await loginUser({ email, password }); // Pass 'email' instead of 'username'

      // Store the token in localStorage
      localStorage.setItem('token', response.token);
      console.log('Login successful');
      
      // Redirect to the dashboard or home page after successful login
      navigate('/dashboard');
      
    } catch (err) {
      // Handle error if login fails
      setError(err.response?.data?.message || 'An error occurred. Please try again.'); // Improved error handling
    }
  };

  // Clear error message on input change
  const handleInputChange = () => {
    if (error) {
      setError(null);  // Clear error message whenever the user starts typing
    }
  };

  return (
    <div className="flex h-screen">
      {/* Logo Section */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        
        <h1 className="text-6xl font-bold text-blue-600">Online Market Place.</h1>
      </div>

      {/* Sign In Section */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-80"> {/* Container for form, adjust width as needed */}
          <h2 className="text-3xl font-semibold mb-4">Sign In</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="input-box w-full mb-4 p-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => { 
                setEmail(e.target.value);
                handleInputChange(); // Clear error message when typing email
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-box w-full mb-4 p-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => { 
                setPassword(e.target.value); 
                handleInputChange(); // Clear error message when typing password
              }}
            />
            <button type="submit" className="signin-button w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
              Sign In
            </button>
          </form>

          {/* Display error message if any */}
          {error && <p className="text-red-600 mt-2">{error}</p>} 
          
          <p className="mt-4 text-center">
            Don't have an account? <strong><Link to="/signup" style={{ color: 'blue', textDecoration: 'none' }}>
          Sign Up
        </Link></strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
