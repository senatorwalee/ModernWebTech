import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPostings, addToFavorites, removeFromFavorites, getFavorites } from "../../api"; // Ensure these functions are properly imported
import { FaHeart } from "react-icons/fa"; // Import FaHeart icon

const Postings = () => {
  const [postings, setPostings] = useState([]);
  const navigate = useNavigate();

  const fetchAllPostings = async () => {
    try {
      const postingsData = await getAllPostings();  // Fetch all postings
      const favoritesData = await getFavorites();  // Fetch favorites

      // Ensure favoritesData is an array
      const validFavorites = Array.isArray(favoritesData.favorites) ? favoritesData.favorites : [];

      // Mark postings as favorite based on the fetched favorites
      const updatedPostings = postingsData.map((posting) => ({
        ...posting,
        isFavorite: validFavorites.some((fav) => fav._id === posting._id), // Check if the posting is in favorites
      }));

      setPostings(updatedPostings); // Update state with updated postings
    } catch (error) {
      console.error("Failed to fetch postings or favorites:", error);
    }
  };

  const handleToggleFavorite = async (postingId) => {
    try {
      const updatedPostings = postings.map((posting) => {
        if (posting._id === postingId) {
          if (posting.isFavorite) {
            removeFromFavorites(postingId);  // Call function to remove from favorites
          } else {
            addToFavorites(postingId);  // Call function to add to favorites
          }
          return { ...posting, isFavorite: !posting.isFavorite };
        }
        return posting;
      });

      setPostings(updatedPostings);  // Update the state locally
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  useEffect(() => {
    fetchAllPostings();  // Fetch postings and favorites when the component mounts
  }, []);

  const handleCardClick = (postingId) => {
    navigate(`/dashboard/postingdetails/${postingId}`);  // Navigate to posting details page
  };

  return (
    <div>
      <h2>Postings</h2>
      {postings.length > 0 ? (
        <ul style={styles.postingsList}>
          {postings.map((posting) => (
            <li
              key={posting._id}
              style={styles.postingCard}
              onClick={() => handleCardClick(posting._id)}
            >
              {posting.productPictures && posting.productPictures.length > 0 ? (
                <img
                  src={posting.productPictures[0]}
                  alt="Product"
                  style={styles.image}
                />
              ) : (
                <p>No picture available</p>
              )}
              <div>
                <h3>{posting.productName}</h3>
                <h3>${posting.price}</h3>
                <h3>Location: {posting.address}</h3>
                <h3>Category: {posting.category}</h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(posting._id);
                }}
                style={styles.favoriteButton}
              >
                <FaHeart
                  size={24}
                  color={posting.isFavorite ? "red" : "gray"} // Red if favorite, gray if not
                />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No postings available</p>
      )}
    </div>
  );
};

const styles = {
  postingsList: {
    listStyleType: "none",
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    padding: "0",
    margin: "0",
  },
  postingCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    width: "200px",
    textAlign: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  favoriteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    position: "absolute",
    top: "8px",
    right: "8px",
  },
};

export default Postings;
