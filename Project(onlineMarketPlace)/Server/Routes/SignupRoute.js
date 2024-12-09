import express from 'express';
import User from '../Schema/userSchema.js'; 

const router = express.Router(); 

// Signup route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Checks if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Checks if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Create the user with the plaintext password
    const user = new User({ username, email, password });
    await user.save();  // Save the user to the database

    // Respond with a success message upon successful signup
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;  
