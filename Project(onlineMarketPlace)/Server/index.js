import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import configurePassport from "./config/passport.js";
import connectDB from "./config/db.js";
import postingsRouter from "./Routes/postingsRoutes.js";
import signupRoute from "./Routes/SignupRoute.js";
import LoginRoute from "./Routes/Login.js";
import bcrypt from "bcrypt";
import User from './Schema/userSchema.js';

dotenv.config();

const app = express();


if (!process.env.MONGODB_URI || !process.env.SESSION_SECRET) {
  console.error("Missing required environment variables!");
  process.exit(1);
}


connectDB();



app.use(express.json()); 

// Session Configuration
try {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 14 * 24 * 60 * 60, // 14 days
      }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    })
  );
} catch (err) {
  console.error("Session initialization error:", err);
  process.exit(1);
}
app.use(cors({
  origin: function (origin, callback) {
    // List of allowed origins
    const allowedOrigins = ['http://localhost:3000', "http://192.0.0.2:8000"];
    
    // Allow requests with no origin (like mobile apps)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
})); // CORS for cross-origin requests
// Configure Passport
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", postingsRouter);
app.use("/login", LoginRoute);
app.use("/auth", signupRoute);

// Test user creation
const testUser = async () => {
  const user = new User({
    username: 'testuser',
    email: 'test@example.com',
    password: 'plainpassword',
  });

  await user.save();
  console.log(`Saved user: ${JSON.stringify(user, null, 2)}`);
};

// Test login logic
// const testLogin = async () => {
//   const email = 'test@example.com';
//   const plainPassword = 'plainpassword';

//   const user = await User.findOne({ email });
//   if (!user) {
//     console.log('No user found');
//     return;
//   }

//   const isMatch = await bcrypt.compare(plainPassword, user.password);
//   console.log(`Password match: ${isMatch}`);
// };

// // Run tests
// (async () => {
//   await testUser();
//   await testLogin();
// })();


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
