import React, { useEffect, useState } from "react";
import { getListingsByUser } from "../api"; // Adjust the path to where your API function is located

const ProfilePage = () => {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user postings on component mount
  useEffect(() => {
    const fetchUserPostings = async () => {
      try {
        const userPostings = await getListingsByUser();
    
        // Handle scenarios where the response is not an array
        if (Array.isArray(userPostings)) {
          setPostings(userPostings);
        } else if (userPostings && userPostings.data && Array.isArray(userPostings.data)) {
          setPostings(userPostings.data); // Adjust based on your API response
        } else {
          setPostings([]); // Default to an empty array
        }
      } catch (err) {
        setError(err.message || "Failed to fetch postings.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPostings();
  }, []);

  // Render loading, error, or postings
  if (loading) return <p>Loading your postings...</p>;
  if (error) return <p>Error: {error}</p>;
  if (postings.length === 0) return <p>No postings found.</p>;

  return (
    <div>
      <h2>Your Postings</h2>
      <ul>
        {postings.map((posting) => (
          <li key={posting._id}>
            <h3>{posting.productName}</h3>
            <p>{posting.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
