import mongoose from "mongoose";
import { convertBufferToBase64 } from "../utils/converter.js";
// Importing schema
import postingsRecordModel from "../Schema/postingsSchema.js";
import User from "../Schema/userSchema.js";
import sharp from "sharp";

// Controller to post a new listing
export const addNewListing = async (req, res) => {
  try {
    const { productName, category, description, address, price } = req.body;

    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const productPictures = req.files
      ? await Promise.all(
          req.files.map(async (file) => {
            const inputFormat = file.mimetype.split("/")[1]; // Get file type, e.g., 'jpeg', 'png'
            
            // Compress and maintain the input format
            if (inputFormat === "png") {
              return await sharp(file.buffer)
                .resize(800, 600, { fit: "inside" })
                .png({ quality: 20, compressionLevel: 9 }) // Optimize PNG
                .toBuffer();
            } else if (inputFormat === "webp") {
              return await sharp(file.buffer)
                .resize(800, 600, { fit: "inside" })
                .webp({ quality: 20 }) // Optimize WebP
                .toBuffer();
            } else {
              // Default to JPEG for unsupported types
              return await sharp(file.buffer)
                .resize(800, 600, { fit: "inside" })
                .jpeg({ quality: 20 })
                .toBuffer();
            }
          })
        )
      : [];

    const newPosting = new postingsRecordModel({
      productName,
      category,
      description,
      address,
      price,
      productPictures,
      userId,
    });

    await newPosting.save();
    res.status(201).json({ message: "Post added successfully" });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: "There was an error adding the post" });
  }
};


// Controller to get all listings
export const getAllListings = async (req, res) => {
  try {
    const allListings = await postingsRecordModel.find();

    if (!allListings || allListings.length === 0) {
      return res.status(404).send("No postings yet");
    }

    // Convert product pictures and profile picture for each listing
    const convertedListings = allListings.map((listing) => {
      const listingObject = listing.toObject(); // Convert Mongoose document to plain JS object

      return {
        ...listingObject,
        productPictures: listingObject.productPictures.map(
          (picture) => `data:image/jpeg;base64,${picture.toString("base64")}` // Convert product pictures to Base64
        ),
        profilePic: listingObject.profilePic
          ? `data:image/jpeg;base64,${listingObject.profilePic.toString("base64")}` // Convert profile picture to Base64 if it exists
          : null, // Handle cases where profilePic might be missing
      };
    });

    res.status(200).json(convertedListings);
  } catch (error) {
    res.status(500).send(`Cannot fetch postings due to: ${error}`);
  }
};


//to search for listing 
export const searchListings = async (req, res) => {
  try {
    const { query } = req.query; // Get the query parameter from the request

    if (!query) {
      return res.status(400).send('Search query is required');
    }

    // Filter listings based on the query (case-insensitive regex for product names)
    const filter = {
      productName: { $regex: query, $options: 'i' },
    };

    const searchResults = await postingsRecordModel.find(filter);

    if (!searchResults || searchResults.length === 0) {
      return res.status(404).send('No listings found for the search query');
    }

    // Convert product pictures and profile pictures to Base64 if they exist
    const convertedListings = searchResults.map((listing) => {
      const listingObject = listing.toObject(); // Convert Mongoose document to plain JS object

      return {
        ...listingObject,
        productPictures: listingObject.productPictures.map(
          (picture) => `data:image/jpeg;base64,${picture.toString('base64')}`
        ),
        profilePic: listingObject.profilePic
          ? `data:image/jpeg;base64,${listingObject.profilePic.toString('base64')}`
          : null, // Handle cases where profilePic might be missing
      };
    });

    res.status(200).json(convertedListings);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error searching listings: ${error.message}`);
  }
};

//Controller to update profile pic
export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.session.userId;

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Save the file as a Buffer to the profilepic field
    user.profilepic = req.file.buffer;
    await user.save();

    res.status(200).json({
      message: "Profile picture updated successfully.",
    });
  } catch (error) {
    console.error('Profile pic update error:', error);
    res.status(500).json({ error: error.message });
  }
};




// Controller to get all listings by a user
export const getListingsByUser = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      console.warn("Unauthorized access attempt. Session userId missing.");
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Fetch user posts
    const userPosts = await postingsRecordModel.find({ userId });

    if (!userPosts.length) {
      return res
        .status(200)
        .json({ message: "No posts found for the user.", data: [] });
    }

    // Convert each `productPictures` buffer to Base64
    const convertedListings = userPosts.map((listing) => ({
      ...listing.toObject(), // Convert Mongoose document to plain JS object
      productPictures: listing.productPictures.map(
        (picture) => `data:image/jpeg;base64,${picture.toString("base64")}` // Convert to Base64 and include data URI prefix
      ),
    }));

    res.status(200).json({
      message: "Posts fetched successfully.",
      data: convertedListings,
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Failed to fetch posts." });
  }
};

//Controller to get details of logged in user
export const getUserDetails = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not logged in." });
    }

    const user = await User.findById(userId).select("username email profilepic");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Convert profile picture to Base64
    const userWithConvertedPic = {
      ...user.toObject(),
      profilepic: convertBufferToBase64(user.profilepic),
    };

    res.status(200).json({
      message: "User details fetched successfully.",
      data: userWithConvertedPic,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user details." });
  }
};

//Controller to get the userdetails for a posting

export const getUserDetailsForPosting = async (req, res) => {
  const { postingId } = req.params;

  console.log("Posting ID received:", postingId);

  if (!mongoose.Types.ObjectId.isValid(postingId)) {
    return res.status(400).json({ message: "Invalid Posting ID." });
  }

  try {
    const posting = await postingsRecordModel
      .findById(postingId)
      .populate("userId", "profilepic username email");

    if (!posting) {
      return res.status(404).json({ message: "Posting not found." });
    }

    const user = posting.userId;
    const userDetails = {
      profilepic: user.profilepic || "https://example.com/placeholder.png",
      username: user.username,
      email: user.email,
    };

    res.status(200).json({
      message: "User details fetched successfully.",
      data: userDetails,
    });
  } catch (error) {
    console.error("Error fetching user details for posting:", error);
    res.status(500).json({ message: "Failed to fetch user details." });
  }
};

// Controller to filter by category
export const listingsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    if (!category) {
      return res.status(400).json({ error: "Please provide a category" });
    }

    const categoryListings = await postingsRecordModel.find({ category });

    if (!categoryListings || categoryListings.length === 0) {
      return res.status(200).json([]); // Return an empty array if no listings found
    }

    const convertedListings = categoryListings.map((listing) => ({
      ...listing.toObject(),
      productPictures: listing.productPictures?.map(
        (picture) =>
          picture
            ? `data:image/jpeg;base64,${picture.toString("base64")}`
            : null // Handle null or missing images
      ),
    }));

    res.status(200).json(convertedListings);
  } catch (error) {
    console.error("Error fetching category postings:", error);
    res.status(500).json({ error: `Cannot fetch category postings due to: ${error}` });
  }
};


//controller for deleting listings
export const deleteListing = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    // Attempt to delete the listing directly, checking both the listing ID and the user ID
    const result = await postingsRecordModel.findByIdAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Listing not found or not authorized" });
    }

    res.status(200).json({ message: "Listing deleted successfully." });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Failed to delete listing." });
  }
};

//controller for updating listings

export const updateListing = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const listing = await postingsRecordModel.findOne({
      _id: req.params.id,
      userId,
    });

    if (!listing) {
      return res
        .status(404)
        .json({ message: "Listing not found or not authorized" });
    }

    // Update the listing with the provided data
    const updatedListing = await postingsRecordModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Failed to update listing." });
  }
};

// Get sorted listings by price
export const getSortedListingsByPrice = async (order = "asc") => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/listings/sort/price?order=${order}`
    );
    return response.data;
  } catch (error) {
    console.log(`Error getting sorted listings by price: ${error.message}`);
  }
};

//favaourites
// Controller to add a favorite
export const addToFavorites = async (req, res) => {
  const userId = req.session.userId;
  const { postingId } = req.body;
  console.log(postingId);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Correctly convert postingId to ObjectId using 'new' keyword
    const postingObjectId = new mongoose.Types.ObjectId(postingId);

    // Add the posting to the favorites array
    if (!user.favorites.includes(postingObjectId)) {
      user.favorites.push(postingObjectId);
      await user.save();
      return res
        .status(200)
        .json({
          message: "Posting added to favorites.",
          favorites: user.favorites,
        });
    } else {
      return res.json({ message: "Posting already in favorites." });
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: "Failed to add posting to favorites." });
  }
};

// Controller to remove from favorites
export const removeFromFavorites = async (req, res) => {
  const userId = req.session.userId; // Assuming you're using sessions for user authentication
  const { postingId } = req.body; // Expect postingId in the body
  console.log(postingId);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Ensure postingId is a valid ObjectId
    const postingObjectId = new mongoose.Types.ObjectId(postingId);

    const index = user.favorites.indexOf(postingObjectId);
    if (index !== -1) {
      user.favorites.splice(index, 1); // Remove from favorites array
      await user.save();
      return res
        .status(200)
        .json({
          message: "Posting removed from favorites.",
          favorites: user.favorites,
        });
    } else {
      return res
        .status(400)
        .json({ message: "Posting not found in favorites." });
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
    res
      .status(500)
      .json({ message: "Failed to remove posting from favorites." });
  }
};

//Controller to fetch favpurites
export const getFavorites = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const user = await User.findById(userId)
      .populate({
        path: "favorites",
        select: "productName description price productPictures", // Ensure productPictures is selected
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Convert each productPictures buffer to a base64 string
    const convertedFavorites = user.favorites.map((favorite) => ({
      ...favorite.toObject(), // Convert the Mongoose document to a plain JavaScript object
      productPictures: favorite.productPictures.map((picture) =>
        `data:image/jpeg;base64,${picture.toString("base64")}` // Convert buffer to Base64 and prepend data URI prefix
      ),
    }));

    

    res.status(200).json({ favorites: convertedFavorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Failed to fetch favorites." });
  }
};

