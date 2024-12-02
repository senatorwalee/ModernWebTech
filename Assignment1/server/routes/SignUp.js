import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; 

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

    // we need to hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user with the hashed password
    const user = new User({ username, email, password: hashedPassword });
    await user.save();  // Save the user to the database

    // Responding with a success message upon successful signup
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;  
