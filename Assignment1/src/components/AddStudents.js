import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { addStudent } from "../api";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    department: "",
    semester: "",
    coursesEnrolled: "",
    completedCourses: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Converting courses input into arrays
    const coursesEnrolledArray = formData.coursesEnrolled
      .split(",")
      .map((course) => course.trim());
    const completedCoursesArray = formData.completedCourses
      ? formData.completedCourses.split(",").map((course) => course.trim()) // If not empty, split the completed courses
      : [];

    const studentData = {
      ...formData,
      id: parseInt(formData.id),
      coursesEnrolled: coursesEnrolledArray,
      completedCourses: completedCoursesArray,
    };

    try {
      const response = await addStudent(studentData);
      setSuccess(response.message);
      setFormData({
        id: "",
        name: "",
        department: "",
        semester: "",
        coursesEnrolled: "",
        completedCourses: "",
      });
    } catch (err) {
      setError(`Failed to add course due to:  ${err.message}`);
    }
  };

  return (
    <div
      className="container m-4"
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <h2>Add New Student</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="id">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="semester">
          <Form.Label>Semester</Form.Label>
          <Form.Control
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="coursesEnrolled">
          <Form.Label>Courses Enrolled (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="coursesEnrolled"
            value={formData.coursesEnrolled}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            Enter courses separated by commas.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="completedCourses">
          <Form.Label>Completed Courses (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="completedCourses"
            value={formData.completedCourses}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Enter completed courses separated by commas (optional).
          </Form.Text>
        </Form.Group>

        <Button variant="dark" type="submit" className="mt-3">
          Add Student
        </Button>
      </Form>
    </div>
  );
};

export default AddStudent;
