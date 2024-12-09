import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate in v6
import { updateListing, getAllPostings } from '../api';  // Adjust the path according to where the function is defined

const UpdatePosting = ({ postingId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Use useNavigate hook

  // Fetch the current details of the posting when the component mounts
  useEffect(() => {
    // Assuming you have a function to fetch the current posting data
    const fetchPostingDetails = async () => {
      try {
        const response = await getAllPostings(postingId);  // Adjust the function if necessary
        setFormData({
          title: response.title,
          description: response.description,
          price: response.price,
          category: response.category,
        });
      } catch (error) {
        setError('Failed to load posting details');
      }
    };

    fetchPostingDetails();
  }, [postingId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the updated `updateListing` function with session-based authentication
      const updatedListing = await updateListing(postingId, formData);

      // Optionally, navigate to another page after successful update
      navigate(`/listing/${updatedListing.id}`);  // Redirect to the updated listing's page
    } catch (error) {
      setError('Failed to update posting');
    }
  };

  return (
    <div className="update-posting">
      <h2>Update Posting</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default UpdatePosting;
