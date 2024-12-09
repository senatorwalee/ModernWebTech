import React, { useEffect, useState } from "react";
import { getListingsByUser, updateListing, deleteListing } from "../api"; // Import your utility functions
import { Navigate, useNavigate } from "react-router-dom";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getListingsByUser();
        setListings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!listings.length) {
    return <p>No listings found.</p>;
  }

  const handleCardClick = (postingId) => {
    navigate(`/dashboard/postingdetails/${postingId}`);
  };

  const handleEdit = (listingId) => {
    // Navigate to the edit page for the listing
    navigate(`/dashboard/editlisting/${listingId}`);
  };

  const handleDelete = async (listingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (confirmDelete) {
      try {
        await deleteListing(listingId); // Call the deleteListing function from the API
        setListings(listings.filter((listing) => listing._id !== listingId)); // Remove deleted listing from the state
        alert("Listing deleted successfully");
      } catch (error) {
        console.error("Error deleting listing:", error);
        alert("Failed to delete the listing.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            onClick={() => handleCardClick(listing._id)}
          >
            {/* Product Image */}
            <div className="h-48 bg-gray-200">
              {listing.productPictures.length > 0 ? (
                <img
                  src={listing.productPictures[0]}
                  alt={listing.productName}
                  className="w-full h-36 object-cover rounded-lg"
                />
              ) : (
                <p className="flex items-center justify-center h-full text-gray-500">
                  No Image
                </p>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-bold mb-2">{listing.productName}</h3>
              <p className="text-sm text-gray-600 mb-2">Location: {listing.address}</p>
              <p className="text-sm text-gray-600 mb-2">Price: ${listing.price}</p>
              <p className="text-sm text-gray-600 truncate">{listing.description}</p>
            </div>

            {/* Edit and Delete Buttons at the Bottom */}
            <div className="flex space-x-2 p-4 border-t border-gray-200">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-full"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleEdit(listing._id);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-full"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleDelete(listing._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
