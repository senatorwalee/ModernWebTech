import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "../api";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        setFavorites(response.favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleCardClick = (postingId) => {
    navigate(`/dashboard/postingdetails/${postingId}`);
  };

  if (!favorites.length) {
    return <p className="text-center">No favorites yet!</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(favorite._id)}
          >
            <div className="h-48 bg-gray-200">
              {favorite.productPictures?.length > 0 ? (
                <img
                  src={favorite.productPictures[0]}
                  alt={favorite.productName}
                  className="w-full h-36 object-cover rounded-lg"
                />
              ) : (
                <p className="flex items-center justify-center h-full text-gray-500">
                  No Image
                </p>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{favorite.productName}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Location: {favorite.address}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Price: ${favorite.price}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {favorite.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
