import express from 'express';
import User from '../Schema/userSchema.js';

const router = express.Router();

// Login route
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  
  // Find the user by email- while ignoring the case sensitivity
  const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Compare the entered password with the stored password (plain text)
  if (user.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Store user ID in the session after successful login
  req.session.userId = user._id;  // Store the user ID in the session

  // Respond with a success message
  res.json({ message: 'Login successful' });
});

export default router;
