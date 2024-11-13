// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent.js';
import StudentList from './components/StudentList.js';
import CourseList from './components/CourseList.js';
import AddStudent from './components/AddStudents.js';
import AddCourse from './components/AddCourse.js';

const App = () => {
  return (
    <Router >
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/add-course" element={<AddCourse />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
