import React, { useState } from 'react';
import { addNewListing } from '../api';
import '../CSS/AddNewPost.css';

export default function AddNewPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('Furniture');
  const [images, setImages] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);

  const placeholderImage = '/Images/placeholder-image.jpg';


  // Handle image file selection
  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file; // Store file directly in state
      setImages(newImages);
    }
  };

  // Function to trigger file input click
  const triggerFileInput = (index) => {
    document.getElementById(`fileInput-${index}`).click();
  };

  // Remove image at specified index
  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('productName', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('address', address);
  
      images.forEach((imageFile) => {
        if (imageFile) {
          formData.append('productPictures', imageFile);   
        }
      });
  
      await addNewListing(formData); 
      alert('Post added successfully');
  
      // Clear form after successful submission
      setTitle('');
      setDescription('');
      setPrice('');
      setAddress('');
      setCategory('Furniture');
      setImages([null, null, null]);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error adding your post.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="container">
      <h1 className="header">Add New Post</h1>
      <p className="subHeader">Create New Post and Start Selling</p>
      <p className="uploadPrompt">Upload Pictures</p>

      <div className="imageUploadContainer">
        {images.map((imageFile, index) => (
          <div key={index} className="imageUpload">
            <input
              type="file"
              id={`fileInput-${index}`}
              accept="image/*"
              onChange={(event) => handleImageChange(index, event)}
              style={{ display: 'none' }}
            />
            <div onClick={() => triggerFileInput(index)} style={{ position: 'relative' }}>
            <img
            src={imageFile ? URL.createObjectURL(imageFile) : placeholderImage}
            alt="Upload"
            className="image"
            style={{ cursor: 'pointer' }}
          />
          
              {imageFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="input textArea"
        placeholder="Description (max 150 characters)"
        value={description}
        onChange={(e) => {
          if (e.target.value.length <= 150) {
            setDescription(e.target.value);
          }
        }}
      />
      <p className="pb-5">{description.length}/150 characters</p>

      <input
        className="input"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
      />

      <input
        className="input"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <select
        className="picker"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Furniture">Furniture</option>
        <option value="Electronics">Electronics</option>
        <option value="Home & Kitche">Home & Kitchen</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
        <option value="Automobile">Automobile</option>
        <option value="Services">Services</option>
        <option value="Other">Other</option>
      </select>

      <button
        className="button"
        onClick={handleSubmit}
        disabled={loading}
        style={{ backgroundColor: loading ? '#ccc' : '#007BFF' }}
      >
        {loading ? <span>Loading...</span> : <span>Submit</span>}
      </button>
    </div>
  );
}
