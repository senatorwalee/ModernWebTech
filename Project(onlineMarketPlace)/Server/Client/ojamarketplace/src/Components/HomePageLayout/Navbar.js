import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { getUserDetails, searchPostings } from '../../api'; // Import searchPostings

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null); // Add state for profile picture
  const [searchResults, setSearchResults] = useState([]); // State for storing search results
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        console.log(response.data);
        
        const { username, profilepic } = response.data; // Destructure profilePic and username
        setUsername(username);
        setProfilePic(profilepic); // Set profile picture
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]); // Clear results if search query is empty
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true); // Start loading when search query is updated
      try {
        const response = await searchPostings(searchQuery); // Call the searchPostings function with the search query
        setSearchResults(response.data); // Store the results in state
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false); // Stop loading after fetching results
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 500); // Adding a delay (debounce) to prevent too many API calls while typing

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout if the query changes before the delay finishes
  }, [searchQuery]); // Trigger this effect whenever the search query changes

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.appName}>Ò</h1>

      <form onSubmit={(e) => e.preventDefault()} style={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          style={styles.searchInput}
        />
      </form>

      <div style={styles.profile}>
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            style={styles.profilePic}
          />
        ) : (
          <FaUserCircle size={30} color="#fff" />
        )}
        <span style={styles.username}>{username}</span>
      </div>

      {/* Show loading spinner while fetching search results */}
      {loading && <div style={styles.loading}>Loading...</div>}

      {/* Render search results if available */}
      {searchResults.length > 0 && (
        <div style={styles.results}>
          {searchResults.map((listing) => (
            <div key={listing._id} style={styles.resultItem}>
              <img
                src={listing.productPictures[0]} 
                alt="Product"
                style={styles.resultImage}
              />
              <span>{listing.productName}</span>
              <span>{listing.price}</span>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 200,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontWeight: "bolder",
    fontSize: 30,
    marginRight: 'auto',
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: '500px',
    flex: 1,
  },
  searchInput: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginRight: '10px',
    outline: 'none',
    color: 'black',
    width: '100%',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profilePic: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  username: {
    color: '#fff',
    fontSize: '14px',
  },
  loading: {
    color: 'white',
    marginTop: '10px',
  },
  results: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: '50px', // Adjust as needed to align the results below the search bar
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    zIndex: 100,
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  resultImage: {
    width: '40px',
    height: '40px',
    borderRadius: '5px',
    objectFit: 'cover',
    marginRight: '10px',
  },
};

export default Navbar;
