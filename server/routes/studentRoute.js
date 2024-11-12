// Importing express using ES module syntax
import express from "express";

// Creating an express router
const router = express.Router();

// Importing studentController with named imports
import {
  getAllStudents,
  getStudentById,
  getFilteredStudents,
  addStudent,
} from "../controllers/studentController.js";

// Route to get all students data
router.get("/allStudents", getAllStudents);

// Route to get a single student by ID and display student info with average grade
router.get("/student/:id", getStudentById);

// Route to get all students with optional filtering based on query params
router.get("/students", getFilteredStudents);

// Route to add a new student
router.post("/addstudent", addStudent);

export default router;
