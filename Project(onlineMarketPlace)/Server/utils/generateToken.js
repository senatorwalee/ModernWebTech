import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const payload = {
    userId: user._id,  // will store the user's MongoDB ID in the token payload
  };

  // Sign the token with your JWT secret and set an expiration time (e.g., 1 hour)
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

export default generateToken;
