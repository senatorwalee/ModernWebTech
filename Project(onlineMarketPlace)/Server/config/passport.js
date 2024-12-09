import { Strategy as LocalStrategy } from 'passport-local';
import User from '../Schema/userSchema.js';
import bcrypt from 'bcrypt';

const configurePassport = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'No user found' });
        }
        const enteredPassword = password.trim(); 
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(enteredPassword, user.password);
        console.log(`Entered password: ${password}`);
        console.log(`Stored password hash: ${user.password}`);
        if (!isMatch) {
          console.log('Password mismatch!');
          return done(null, false, { message: 'Incorrect password' });
        }

        // If passwords match, proceed with the user object
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Serialize the user id into the session
  passport.serializeUser((user, done) => done(null, user.id));

  // Deserialize the user from the session by finding the user by id
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default configurePassport;
