import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postingsRouter from './Routes/postingsRoutes.js'

const app = express();
//to parse all incoming json file
app.use(express.json());

dotenv.config()

const mongoURI =
process.env.MONGODB_URI ;

//connecting to Mongodb
mongoose.connect(mongoURI).then(() =>
  console.log("Connected Successfully to Mongodb")).catch((err) => {
    console.log(
      `Counld not connect to Mongodb database due to : ${err.message}`
    );
  })


  
//middleware to use the 
app.use('/postings',postingsRouter)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
