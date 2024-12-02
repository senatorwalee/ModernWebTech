import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Context/AuthContext"; // Ensure AuthProvider is imported from the context
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import NavbarComponent from "./components/NavbarComponent";
import StudentList from "./components/StudentList";
import CourseList from "./components/CourseList";
import AddStudent from "./components/AddStudents";
import AddCourse from "./components/AddCourse";

const App = () => {
  return (
    <AuthProvider>  {/* Move AuthProvider here to wrap the entire app */}
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();  // Now use the hook inside AppRoutes where AuthProvider is already applied

  return (
    <>
      {/* Render Navbar only if the user is authenticated */}
      {isAuthenticated && <NavbarComponent />}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          
          {/* Protected routes */}
          <Route 
            path="/students" 
            element={isAuthenticated ? <StudentList /> : <Navigate to="/" />} 
          />
          <Route 
            path="/courses" 
            element={isAuthenticated ? <CourseList /> : <Navigate to="/" />} 
          />
          <Route 
            path="/add-student" 
            element={isAuthenticated ? <AddStudent /> : <Navigate to="/" />} 
          />
          <Route 
            path="/add-course" 
            element={isAuthenticated ? <AddCourse /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
