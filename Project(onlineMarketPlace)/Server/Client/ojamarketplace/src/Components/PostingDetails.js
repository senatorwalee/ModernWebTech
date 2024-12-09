import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPostings } from "../api";
import UserDetails from "./UserDetails";

const PostingDetails = () => {
  const { id } = useParams(); // this will be the postingId
  const [posting, setPosting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosting = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllPostings();
        const foundPosting = data.find((post) => post._id === id);

        if (!foundPosting) {
          throw new Error("Posting not found.");
        }

        setPosting(foundPosting);
      } catch (error) {
        console.error("Failed to fetch posting details:", error);
        console.log(posting.userId);

        setError("Failed to load the posting details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosting();
  }, [id]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{posting.productName}</h2>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="carousel">
            {posting.productPictures.map((picture, index) => (
              <img
                key={index}
                src={picture}
                alt={`Slide ${index}`}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Product Name */}
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {posting.productName}
            </p>

            {/* Price */}
            <p className="text-xl text-green-600 font-semibold mb-2">
              Price: <span className="text-black">${posting.price}</span>
            </p>

            {/* Location */}
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Location:</span> {posting.address}
            </p>

            {/* Description */}
            <p className="text-md text-gray-600 mb-4 leading-relaxed">
              <span className="font-semibold">Description:</span>{" "}
              {posting.description}
            </p>

            {/* Category */}
            <h3 className="text-lg font-medium text-gray-700">
              Category:{" "}
              <span className="text-gray-800">{posting.category}</span>
            </h3>

            {/* Posted At */}
            <h3 className="text-lg font-medium text-gray-700 mt-2">
              Posted at:{" "}
              <span className="text-gray-600">
                {formatDate(posting.createdAt)}
              </span>
            </h3>
          </div>

          {/* Render the UserDetails component */}

          <UserDetails userId={posting._id} />
        </div>
      </div>
    </div>
  );
};

export default PostingDetails;
