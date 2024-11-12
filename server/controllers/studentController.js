// Importing the student data
import { studentData } from "../data/studentData.js";
import { courses } from "../data/coursesData.js";

// Get all students data
export const getAllStudents = (req, res) => {
  res.status(200).send(studentData);
};

// Get a single student by ID with average grade
export const getStudentById = (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = studentData.find((student) => student.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student cannot be found" });
  }

  student.averageGrade = student.averageScore();
  res.status(200).send(student);
};

// Get all students with optional filtering
export const getFilteredStudents = (req, res) => {
  const { id, name, department, semester, coursesEnrolled, completedCourses } =
    req.query;
  let filteredStudents = studentData;

  if (id)
    filteredStudents = filteredStudents.filter(
      (student) => student.id === parseInt(id)
    );
  if (name)
    filteredStudents = filteredStudents.filter((student) =>
      student.name.toLowerCase().includes(name.toLowerCase())
    );
  if (department)
    filteredStudents = filteredStudents.filter((student) =>
      student.department.toLowerCase().includes(department.toLowerCase())
    );
  if (semester)
    filteredStudents = filteredStudents.filter((student) =>
      student.semester.toLowerCase().includes(semester.toLowerCase())
    );
  if (coursesEnrolled)
    filteredStudents = filteredStudents.filter((student) =>
      student.coursesEnrolled.some((course) =>
        course.toLowerCase().includes(coursesEnrolled.toLowerCase())
      )
    );
  if (completedCourses)
    filteredStudents = filteredStudents.filter((student) =>
      student.completedCourses.some((course) =>
        course.toLowerCase().includes(completedCourses.toLowerCase())
      )
    );

  if (filteredStudents.length > 0) {
    res.status(200).json(filteredStudents);
  } else {
    res.status(204).json([]);
  }
};

export const addStudent = (req, res) => {
  const { id, name, department, semester, coursesEnrolled, completedCourses } = req.body;

  // Validate that required fields are present (completedCourses is optional)
  if (!id || !name || !department || !semester || !coursesEnrolled) {
    return res.status(400).json({ message: "All fields must be filled in except completedCourses" });
  }

  // Validate that the ID is a valid number
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).json({ message: "'id' must be a valid number" });
  }

  // Check if the student ID already exists in the studentData array
  const existingStudent = studentData.find((student) => student.id === parsedId);
  if (existingStudent) {
    return res.status(400).json({ message: `A student with ID ${parsedId} already exists` });
  }

  // Validate field types
  if (
    typeof name !== "string" ||
    typeof department !== "string" ||
    typeof semester !== "string" ||
    !Array.isArray(coursesEnrolled)
  ) {
    return res.status(400).json({
      message: "Invalid input: please check the types of your fields",
    });
  }

  // Validate coursesEnrolled
  if (!coursesEnrolled.every((course) => typeof course === "string")) {
    return res.status(400).json({
      message: "Invalid input: coursesEnrolled should contain strings",
    });
  }

  // If completedCourses is provided we validate it
  if (completedCourses) {
    if (!Array.isArray(completedCourses)) {
      return res.status(400).json({ message: "completedCourses must be an array" });
    }

    if (
      !completedCourses.every(
        (course) =>
          typeof course.name === "string" && typeof course.grade === "number"
      )
    ) {
      return res.status(400).json({
        message: "Invalid input in completedCourses: each course should have a name and a grade",
      });
    }

    // Validate that each course in completedCourses exists in the list of available courses
    const invalidCompletedCourses = completedCourses.filter(
      (course) => !courses.some((c) => c.name === course.name)
    );

    if (invalidCompletedCourses.length > 0) {
      return res.status(400).json({
        message: `Invalid courses in completedCourses: ${invalidCompletedCourses
          .map((course) => course.name)
          .join(", ")}`,
      });
    }

    // Validate that grades are between 0 and 100
    const invalidGrades = completedCourses.filter(
      (course) => course.grade < 0 || course.grade > 100
    );

    if (invalidGrades.length > 0) {
      return res.status(400).json({
        message: `Invalid grades for courses: ${invalidGrades
          .map((course) => `${course.name}: ${course.grade}`)
          .join(", ")}`,
      });
    }

    // Ensure that there are no duplicate courses between enrolled and completed
    const duplicateCourses = coursesEnrolled.filter((course) =>
      completedCourses.some((completedCourse) => completedCourse.name === course)
    );

    if (duplicateCourses.length > 0) {
      return res.status(400).json({
        message: `Courses cannot be in both enrolled and completed: ${duplicateCourses.join(", ")}`
      });
    }
  }

  // Creating the new student object
  const newStudent = {
    id: parsedId,
    name,
    department,
    semester,
    coursesEnrolled,
    completedCourses: completedCourses || [], // Default to an empty array if not provided
  };

  // Adding the new student to the studentData array
  studentData.push(newStudent);

  // Respond with the newly created student
  res.status(201).json({ message: "Student added successfully", student: newStudent });
};



