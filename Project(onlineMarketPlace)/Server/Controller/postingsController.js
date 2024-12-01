// Importing schema
import postingsRecordModel from "../Schema/postingsSchema.js";

// Controller to post a new listing
export const addNewListing = async (req, res) => {
    try {
      const { productName, category, description, address, price } = req.body;
      
      // Access the uploaded image files as Buffer objects
      const productPictures = req.files ? req.files.map(file => file.buffer) : [];
    
      const newPosting = new postingsRecordModel({
        productName,
        category,
        description,
        address,
        price,
        productPictures,  // Storing images as Buffer in MongoDB
      });
  
      await newPosting.save();
      res.status(201).json({ message: 'Post added successfully' });
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
            return res.status(404).send('No postings yet');
        }

        // Convert each productPictures buffer to a base64 string
        const convertedListings = allListings.map((listing) => ({
            ...listing.toObject(), // Convert Mongoose document to plain JS object
            productPictures: listing.productPictures.map((picture) => 
                `data:image/jpeg;base64,${picture.toString('base64')}` // Convert to Base64 and include data URI prefix
            ),
        }));

        res.status(200).json(convertedListings);
    } catch (error) {
        res.status(500).send(`Cannot fetch postings due to: ${error}`);
    }
};


// Controller to get all listings by a user
export const getListingsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).send('Please provide a user ID');
        }
        //finding the results and projecting the userId so i dont show up in the field
        const listingsByUser = await postingsRecordModel.find({ userId: userId },{userId:0});
        if (!listingsByUser || listingsByUser.length === 0) {
            return res.status(404).send('No postings to show');
        }
        // If successful
        res.status(200).send(listingsByUser);
    } catch (error) {
        res.status(500).send(`Cannot fetch user postings due to: ${error}`);
    }
};

// Controller to filter by category
export const listingsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        if (!category) {
            return res.status(400).send('Please provide a category');
        }
        const categoryListings = await postingsRecordModel.find({ category: category });
        if (!categoryListings || categoryListings.length === 0) {
            return res.status(404).send('No postings found for this category');
        }
        res.status(200).send(categoryListings);
    } catch (error) {
        res.status(500).send(`Cannot fetch category postings due to: ${error}`);
    }
};

//controller for deleting listings
export const deleteListing =async (req, res) => {
    try {
        const deletedListing = await postingsRecordModel.findByIdAndDelete(req.params.id);
        if (!deletedListing) {
            return res.status(404).send('Listing not found');
        }
        res.status(200).send({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).send(`Error deleting listing: ${error}`);
    }
};

//controller for updating listings

export const updatedListing = async (req, res) => {
    try {
        const updatedListing = await postingsRecordModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );
        if (!updatedListing) {
            return res.status(404).send('Listing not found');
        }
        res.status(200).send(updatedListing);
    } catch (error) {
        res.status(500).send(`Error updating listing: ${error}`);
    }
};

// Get sorted listings by price
 export const getSortedListingsByPrice = async (order = 'asc') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/listings/sort/price?order=${order}`);
        return response.data;
    } catch (error) {
        console.log(`Error getting sorted listings by price: ${error.message}`);
    }
};