import express from 'express';
import passport from 'passport';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);

      // Generate the token after the user has been logged in
      const token = generateToken(user); // Pass the authenticated user to the generateToken function

      // Send the token back in the response
      res.json({
        message: 'Login successful',
        user,
        token, // Send the token along with the user data
      });
    });
  })(req, res, next);
});

export default router;
