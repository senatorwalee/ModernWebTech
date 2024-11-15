import express from 'express'
import postingsRecordModel from '../Schema/postingsSchema.js'
const router = express.Router()




//defining route for getting, deleting ,uddating and adding post

//for posting a new listing
router.post("/", async (req,res) => {
    try {
        const newPostingBody = req.body;
        const newRecord = new postingsRecordModel(newPostingBody);
        const savedRecord = await newRecord.save();

        res.status(201).send(savedRecord)
    } catch (error) {
        res.status(500).send(error)

    }
})

//to gey all postings by a particular user
router.get('/getAllPostingsByUserId/:userId',async(req,res)=>{
    try {
        const userId = req.params.userId;
        const postinsByUser = await postingsRecordModel.find({userId:userId})
        if (postinsByUser.length === 0) {
            return res.status(404).send("No Postings found for the user.");
        }
        res.status(200).send(postinsByUser)
        
    } catch (error) {
        res.status(500).send(error.message)
        
    }
})




export default router;