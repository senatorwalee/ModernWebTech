import express from 'express';
import multer from 'multer';
import * as postingsController from '../Controller/postingsController.js';

const router = express.Router();

// Setting up multer for file uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage }).array('productPictures', 3);  // Allow up to 3 images


// Route to post a new listing
router.post('/addListing', upload, postingsController.addNewListing);

// Route to get all listings
router.get('/allPostings', postingsController.getAllListings);

// Route to get all listings by a particular user
router.get('/listings/user/:userId', postingsController.getListingsByUser);

// Route to get listings by category
router.get('/listings/category/:category', postingsController.listingsByCategory);

// Route to update a listing by ID
router.put('/listings/:id', postingsController.updatedListing);

// Route to delete a listing by ID
router.delete('/listings/:id', postingsController.deleteListing)

// Route to sort listings by price
router.get('/listings/sort/price', postingsController.getSortedListingsByPrice);



export default router;
