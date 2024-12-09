import axios from 'axios';
axios.defaults.withCredentials = true;
// Base URL for the backend
const API_BASE_URL = "http://localhost:8000";

// Get the token from localStorage 
const getAuthToken = () => {
  return localStorage.getItem('token'); // Or we can also use sessionStorage
};



// Login user
export const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Login failed");
      }
      throw error;
    }
  };
  
  
  //for siging up
  export const signupUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
      return response.data;
    } catch (error) {
      console.error("Error during signup:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };
// Get all postings
export const getAllPostings = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/alllistings`);
        return response.data;
    } catch (error) {
        console.error(`Error getting all postings: ${error.message}`);
        throw error;
    }
};

//for searching 
export const searchPostings = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listings/search?query=${query}`); 
    return response;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

 // Add a new listing using sessions
 export const addNewListing = async (listingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addListing`, listingData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, // Ensures the session cookie is sent
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please log in again.");
      // Redirect to login page
      window.location.href = "/login";
    }
    console.error(`Error adding new listing: ${error.message}`);
    throw error;
  }
};

//function to get user details for a partcular posting
export const getUserDetailsForPosting = async (postingId) => {
  try {
    // Use GET for fetching data, and pass postingId in the URL
    const response = await axios.get(`${API_BASE_URL}/listings/userdetails/${postingId}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    throw error.response
      ? error.response.data.message
      : "An unknown error occurred.";
  }
};

// Function to get listings by the logged-in user's ID (session-based)
export const getListingsByUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listings/user`, {
      withCredentials: true, // Ensures cookies are sent with the request (session)
    });
    return response.data;  // Assuming the response contains the listings
  } catch (error) {
    console.error(`Error getting listings by user: ${error.message}`);
    throw error;
  }
};

//Function to update profile picture
export const uploadProfilePic = async (file) => {
  try {
    // Creates a FormData object to hold the file
    const formData = new FormData();
    formData.append('profilepic', file); // Match 'profilepic' with the multer field name

    // Send the PUT request with the FormData object
    const response = await axios.put(
      `${API_BASE_URL}/uploadprofilepic/user`,
      formData,
      {
        withCredentials: true, // Ensures cookies are sent with the request
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
        },
      }
    );

    return response.data; // Handle the response
  } catch (error) {
    console.error(`Error uploading profile picture: ${error.message}`);
    throw error;
  }
};

// Function to get the logged-in user's details (session-based)
export const getUserDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allUserDetails`, {
      withCredentials: true, // Ensures cookies are sent with the request (session)
    });
    return response.data;  // Assuming the response contains the user details
  } catch (error) {
    console.error(`Error getting user details: ${error.message}`);
    throw error;
  }
};


// Get listings by category
export const getListingsByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/listings/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting listings by category: ${error.message}`);
        throw error;
    }
};


// Update a listing by ID session based
export const updateListing = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/listings/${id}`, updatedData, {
      withCredentials: true, // Ensures cookies (session) are sent with the request
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating listing: ${error.message}`);
    throw error;
  }
};

// Delete a listing by ID session based
export const deleteListing = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/listings/${id}`, {
      withCredentials: true, // Ensures cookies (session) are sent with the request
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting listing: ${error.message}`);
    throw error;
  }
};



// Sort listings by price
export const getSortedListingsByPrice = async (order = 'asc') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/listings/sort/price?order=${order}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting sorted listings by price: ${error.message}`);
        throw error;
    }
};


//to add to favorute
export const addToFavorites = async (postingId) => {
  try {
    // Make a POST request to add the posting to favorites
    const response = await axios.post(
      `${API_BASE_URL}/listings/favorites/add`,  
      { postingId },  // Sending postingId in request body
      {
        withCredentials: true,  // Include credentials (like cookies or session)
      }
    );
    return response.data;  // Return the response data
  } catch (error) {
    console.error(`Error adding to favorites: ${error.message}`);
    throw error;  // Rethrow the error to handle it in the caller
  }
};

//remove from favorite
export const removeFromFavorites = async (postingId) => {
  try {
    // Make a DELETE request to remove the posting from favorites
    const response = await axios.delete(
      `${API_BASE_URL}/listings/favorites/remove`,  // Adjusted endpoint (assumes postingId is in body)
      {
        data: { postingId },  // Sending postingId in request body
        withCredentials: true,  // Include credentials (like cookies or session)
      }
    );
    return response.data;  // Return the response data
  } catch (error) {
    console.error(`Error removing from favorites: ${error.message}`);
    throw error;  // Rethrow the error to handle it in the caller
  }
};

//to get favourites
export const getFavorites = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listings/favorites`, {
      withCredentials: true, 
    });
    return response.data; 
  } catch (error) {
    console.error(`Error fetching favorites: ${error.message}`);
    throw error;
  }
};




