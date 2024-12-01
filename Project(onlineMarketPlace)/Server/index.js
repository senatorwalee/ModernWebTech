import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import configurePassport from "./config/passport.js";

import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/db.js";

const app = express();

// import https from ''

import postingsRouter from "./Routes/postingsRoutes.js";
import loginRoute from "./Routes/LoginRoute.js";
import signupRoute from "./Routes/SignupRoute.js"

// Session configuration
try {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 14 * 24 * 60 * 60,
      }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    })
  );
} catch (err) {
  console.error("Session initialization error:", err);
}

try {
  app.use(passport.initialize());
  app.use(passport.session());
} catch (err) {
  console.error("Passport initialization error:", err);
}
app.use(cors())
// Middleware to parse JSON request body
app.use(express.json());

//middleware to use the
app.use("/", postingsRouter);
app.use('/login', loginRoute);
app.use("/auth", signupRoute);

//connecting to Db
connectDB();

// Configure Passport
configurePassport(passport);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
