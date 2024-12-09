import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingsByCategory } from "../api";

const Itemlist = () => {
  const { category } = useParams();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const data = await getListingsByCategory(category);
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category]);

  const handleCardClick = (postingId) => {
    navigate(`/dashboard/postingdetails/${postingId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!listings.length) {
    return <div>No listings available for {category}.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Listings for {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(listing._id)}
          >
            <div className="h-48 bg-gray-200">
              {listing.productPictures?.length > 0 ? (
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
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{listing.productName}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Location: {listing.address}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Price: ${listing.price}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {listing.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itemlist;
