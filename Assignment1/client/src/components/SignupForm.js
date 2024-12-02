import React, { useState } from "react";
import { signupUser } from "../api.js";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await signupUser(formData);
      setMessage(response.message); // Success message from API
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header style={{ backgroundColor: "black", padding: "20px", textAlign: "center" }}>
        <h1 style={{ color: "white", fontWeight: "bold" }}>Welcome to Student Records</h1>
      </header>

      <Container className="mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Signup</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100">
            Signup
          </Button>
        </Form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </Container>
    </div>
  );
};

export default SignupForm;
