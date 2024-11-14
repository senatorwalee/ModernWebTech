// controllers/courseController.js
import { courses } from "../data/coursesData.js";
import { studentData } from "../data/studentData.js";

// Get all ongoing courses (from students' enrolled courses)
export const getOngoingCourses = (req, res) => {
  const ongoingCourses = studentData.map((student) => student.coursesEnrolled);
  res.status(200).send(ongoingCourses);
};

//Get all courses
export const getAllCourses = (req, res) => {
  res.status(200).json(courses);
};

// Get all courses with optional filtering
export const getFilteredCourses = (req, res) => {
  const { id, name, department, isOpen } = req.query;

  let filteredCourses = courses;

  // Apply filters based on query params
  if (id)
    filteredCourses = filteredCourses.filter(
      (course) => course.id === parseInt(id)
    );
  if (name)
    filteredCourses = filteredCourses.filter((course) =>
      course.name.toLowerCase().includes(name.toLowerCase())
    );
  if (department)
    filteredCourses = filteredCourses.filter(
      (course) => course.department.toLowerCase() === department.toLowerCase()
    );
  if (isOpen !== undefined)
    filteredCourses = filteredCourses.filter(
      (course) => course.isOpen === (isOpen === "true")
    );

  res.status(200).send(filteredCourses);
};

// Add a new course to the course list
export const addCourses = (req, res) => {
  const { id, name, department, isOpen } = req.body;
  //validating fields
  if (!id || !name || !department || isOpen === undefined) {
    return res
      .status(400)
      .json({
        message: "All fields (id, name, department, isOpen) are required",
      });
  }

   // Check if a course with the same id or name already exists
   const duplicateCourse = courses.find(
    (course) => course.id === parseInt(id) || course.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicateCourse) {
    return res.status(400).json({
      message: "A course with the same ID or name already exists",
    });
  }
  const newCourse = {
    id: parseInt(id),
    name,
    department,
    isOpen: isOpen === "true",
  };

  courses.push(newCourse); 
  res
    .status(201)
    .json({ message: "Course added successfully", course: newCourse });
};

//Updating a course in the student-course list
export const updateCourseList = (req, res) => {
  const { id, name, department, isOpen } = req.body;
  //validating fields
  if (!id || !name || !department || isOpen === undefined) {
    return res
      .status(400)
      .json({
        message: "All fields (id, name, department, isOpen) are required",
      });
  }
  //finding the object to be updated
  const updatedIndex = courses.findIndex(
    (course) => course.id === parseInt(id)
  );
  //validating and updating after finding the index
  if (updatedIndex === -1) {
    res.status(404).json({ message: "Course not found" });
  }

  const updatedCourse = {
    ...courses[updatedIndex], //using spread opearator to kepp existing properties just in case
    id: parseInt(id),
    name,
    department,
    isOpen: isOpen === "true",
  };

  res.status(200).json({message:"Course has been uodated successfully", courses:courses[updatedIndex]})
};
//deleting a course from the student-course list
export const deleteCourse=(res,req)=>{
    const { id, name, department, isOpen } = req.body;
  //validating fields
  if (!id || !name || !department || isOpen === undefined) {
    return res
      .status(400)
      .json({
        message: "All fields (id, name, department, isOpen) are required",
      });
  }

  //finding the object to be updated
  const deleteIndex = courses.findIndex(
    (course) => course.id === parseInt(id)
  );
  //validating and updating after finding the index
  if (deleteIndex === -1) {
    res.status(404).json({ message: "Course not found" });
  }

  //deleting the course object using the index
  courses.splice(deleteIndex,1);
  // Sending response after deletion
  res.status(200).json({ message: "Course deleted successfully" });
}
