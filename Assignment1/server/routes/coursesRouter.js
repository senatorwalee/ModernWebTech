// routes/courseRoutes.js
import express from "express";
import {
  getOngoingCourses,
  getFilteredCourses,
  getAllCourses,
  addCourses,
  updateCourseList,
  deleteCourse
} from "../controllers/courseController.js";

const router = express.Router();

// Route to get all ongoing courses
router.get("/ongoingcourses", getOngoingCourses);

// Route to get all courses with optional filtering
router.get("/filtercourses", getFilteredCourses);

// Route to add new ongoing courses
router.post("/addcourses", addCourses);

// Route to get all courses
router.get("/allcourses", getAllCourses);
//Route to update the couse list
router.put("/updatecourses", updateCourseList);
//Route for deleting a course from the student-course list
router.delete("/deletecourse", deleteCourse)

//tester route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route works!' });
});


export default router;
