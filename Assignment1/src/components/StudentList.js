// src/components/StudentList.js
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchStudents } from "../api"; 

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };
    getStudents();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Student List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Courses Enrolled</th>
            <th>Completed Courses</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.semester}</td>

                <td>
                  {student.coursesEnrolled &&
                  student.coursesEnrolled.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {student.coursesEnrolled.map((course,index) => (
                        <li key={index}>{course}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No courses enrolled</span>
                  )}
                </td>

                <td>
                  {student.completedCourses &&
                  student.completedCourses.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {student.completedCourses.map((course, index) => (
                        <li key={index}>
                          {course.name} - <strong>Grade:</strong> {course.grade}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No completed courses</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;
