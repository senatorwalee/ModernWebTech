import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { addCourse } from "../api";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    department: "",
    isOpen: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const courseData = {
      id: parseInt(formData.id),
      name: formData.name,
      department: formData.department,
      isOpen: formData.isOpen,
    };

    try {
        const response = await addCourse(courseData);
        setSuccess(response.message);
        setFormData({
          id: "",
          name: "",
          department: "",
          isOpen: false,
        });
      } catch (err) {
        setError(err.message);
      }
    }
  return (
    <div className="container mt-4" style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Add New Course</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="id">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Course Name</Form.Label>
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

        <Form.Group controlId="isOpen">
          <Form.Check
            type="checkbox"
            label="Is Course Open?"
            name="isOpen"
            checked={formData.isOpen}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="mt-3">
          Add Course
        </Button>
      </Form>
    </div>
  );
};

export default AddCourseForm;
