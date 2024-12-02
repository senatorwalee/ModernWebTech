// src/components/CourseList.js
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchCourses } from '../api'; 

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    getCourses();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Course List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Is Open</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.department}</td>
                <td>{course.isOpen ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseList;
