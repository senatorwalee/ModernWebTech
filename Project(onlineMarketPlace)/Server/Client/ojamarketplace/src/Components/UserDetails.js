import React, { useEffect, useState } from "react";
import { getUserDetailsForPosting } from "../api";
import { FaUserCircle } from "react-icons/fa";

const UserDetails = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImageError, setIsImageError] = useState(false); // Track image load errors

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getUserDetailsForPosting(userId);
        const { username, email, profilepic } = response.data; // Correctly destructuring
        setUserDetails({ username, email, profilepic }); // Store directly in state
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-4">
      <h4 className="font-semibold">Seller Info:</h4>
      <p className="text-md">Username: {userDetails.username}</p>
      <p className="text-md">Email: {userDetails.email}</p>
      {userDetails.profilepic && !isImageError ? (
        <img
          src={userDetails.profilepic} 
          alt="User Profile"
          className="w-16 h-16 object-cover rounded-full mt-2"
          onError={() => setIsImageError(true)} // Handle broken image fallback
        />
      ) : (
        <FaUserCircle className="w-16 h-16 text-gray-500 mt-2" />
      )}
    </div>
  );
};

export default UserDetails;
