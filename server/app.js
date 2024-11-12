// importing express using ES module
import express from 'express'
import cors from 'cors'
//creating an instance of an express application
const app = express();
//importing rhe student router
import studentRouter from './routes/studentRoute.js'
//importing the courses router
import coursesRouter from './routes/coursesRouter.js';

// cors middleware
app.use(cors());

app.use(express.urlencoded({extended:true}))

//middileware to parse any inccoming json 
app.use(express.json())

//mounting the studentRouter router at /studuent
app.use('/students',studentRouter)
//mounting the coursesRouter router at /studuent
app.use('/courses',coursesRouter)





//creating and listening to port
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
    
})

