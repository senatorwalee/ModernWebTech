import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];  // Get token from the headers

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // Decode the token using the secret key. The decoded payload will contain the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the userId from the decoded token to the request object
    req.userId = decoded.userId;

    
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

export default authenticateUser;
