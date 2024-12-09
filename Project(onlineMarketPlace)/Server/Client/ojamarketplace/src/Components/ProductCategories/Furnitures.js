import React, { useState, useEffect } from "react";
import { getListingsByCategory } from "../../api";
import { useNavigate } from "react-router-dom";

export const Furnitures = () => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFurnitureItems = async () => {
      try {
        const items = await getListingsByCategory("Furniture");
        setFurnitureItems(items);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFurnitureItems();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-4">
        Error: {error}
      </div>
    );
  }

  const handleCardClick = (postingId) => {
    navigate(`/postings/${postingId}`);
  };

  return (
    <div >
      <h2 className="text-2xl font-bold mb-6">Furniture</h2>
      {furnitureItems.length > 0 ? (
        <ul className="flex flex-wrap gap-6">
          {furnitureItems.map((item) => (
            <li
              key={item._id}
              onClick={() => handleCardClick(item._id)}
              className="border border-gray-300 rounded-lg p-4 w-48 text-center relative bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {item.productPictures && item.productPictures.length > 0 ? (
                <img
                  src={item.productPictures[0]}
                  alt="Furniture"
                  className="w-full h-36 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-36 bg-gray-200 flex items-center justify-center text-gray-500">
                  No picture available
                </div>
              )}

              <div className="mt-4">
                <h3 className="text-lg font-semibold">${item.price}</h3>
                <p className="text-sm text-gray-600">{item.address}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No furniture items available</p>
      )}
    </div>
  );
};
