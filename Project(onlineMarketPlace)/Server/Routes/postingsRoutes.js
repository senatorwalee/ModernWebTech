import express from 'express';
import multer from 'multer';
import * as postingsController from '../Controller/postingsController.js';

const router = express.Router();

// Authentication middleware
export const authenticateUser = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    console.log("Authentication failed: No session or userId");
    return res.status(401).json({ message: "User not authenticated." });
  }
  console.log("User authenticated with userId:", req.session.userId);
  next();
};

// Setting up multer for file uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage }).array('productPictures', 3);  // Allow up to 3 images
const uploadProfilePic = multer({storage,limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and GIF formats are allowed.'));
    }
  },}).single('profilepic') // allowing 1 for profile pic 

//Route to add to favourites 
router.post('/listings/favorites/add', authenticateUser, postingsController.addToFavorites);
// Route to post a new listing (requires authentication)
router.post('/addListing', authenticateUser, upload, postingsController.addNewListing);

// Route to get all listings (no authentication needed)
router.get('/alllistings', postingsController.getAllListings);

// Route to get all listings by a particular user (requires authentication)
router.get('/listings/user', authenticateUser, postingsController.getListingsByUser);

// Route to get user details (requires authentication)
router.get('/allUserDetails', authenticateUser, postingsController.getUserDetails);

// Route to upload pic (requires authentication)
router.post('/uploadprofilepic/user', authenticateUser,uploadProfilePic, postingsController.updateProfilePic);

// Route to get listings by category (no authentication needed)
router.get('/listings/category/:category', postingsController.listingsByCategory);

// Route to update a listing by ID (requires authentication and authorization)
router.put('/listings/:id', authenticateUser, postingsController.updateListing);

// Route to delete a listing by ID (requires authentication and authorization)
router.delete('/listings/:id', authenticateUser, postingsController.deleteListing);

// Route to sort listings by price (no authentication needed)
router.get('/listings/sort/price', postingsController.getSortedListingsByPrice);

//Route to get user details for a particular posting 
router.get("/listings/userdetails/:postingId", postingsController.getUserDetailsForPosting);

//Route for searching
router.get('/listings/search', postingsController.searchListings);



//Route to remove favourtite
router.delete('/listings/favorites/remove', authenticateUser, postingsController.removeFromFavorites);

//Route to populate favourites
router.get('/listings/favorites', authenticateUser, postingsController.getFavorites);

export default router;
