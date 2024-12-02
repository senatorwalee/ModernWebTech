import axios from "axios";

// Base URL for the backend
const API_BASE_URL = "http://localhost:8000";


// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw error;
  }
};


//for siging up
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};


// Fetch all students
export const fetchStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/allStudents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Fetch all courses
export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/allcourses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Add a new student
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/students/addstudent`,
      studentData
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response.data.message;
    if (error.response && error.response.status === 400) {
      
      if (errMsg.includes("already exists")) {
        throw new Error("Student already exist in database");
      }
    }
    console.error("Error adding student:", error);
    throw error;
  }
};

// Add a new course
export const addCourse = async (courseData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/courses/addcourses`,
      courseData
    );
    return response.data;
  } catch (error) {
    const errorMsg = error.response.data.message;
    if (error.response && error.response.status === 400) {
    } else if (errorMsg.includes("All fields")) {
      throw new Error("Please fill in all required fields.");
    } else if (errorMsg.includes("already exists")) {
      throw new Error("A course with this ID or name already exists.");
    } else {
      console.error("Error adding course:", error);
      throw error;
    }
  }
};

// Delete a course
export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
