// importing express using ES module
import express from 'express'
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import configurePassport from './config/passport.js';
import cors from 'cors'
//creating an instance of an express application
const app = express();
// import crypto  from 'crypto';
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret);

//importing routes
import studentRouter from './routes/studentRoute.js'
import coursesRouter from './routes/coursesRouter.js';
import loginRoutes from './routes/LogIn.js';
import signupRoutes from "./routes/SignUp.js";

// cors middleware
app.use(cors());

app.use(express.urlencoded({extended:true}))

//middileware to parse any inccoming json 
app.use(express.json())

import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

// Session configuration
app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, 
        ttl: 14 * 24 * 60 * 60, 
      }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
      },
    })
  );
  



//mounting trouters to thier corresponding route
app.use('/students',studentRouter)
app.use('/courses',coursesRouter)
app.use('/login', loginRoutes);
app.use("/auth", signupRoutes);


//connecting to Db
connectDB();

// Configure Passport
configurePassport(passport);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//creating and listening to port
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
    
})

