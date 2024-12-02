import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; 
import { useAuth } from "../Context/AuthContext"; 
import { Form, Button, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; 

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth(); // Use the login function from AuthContext
  const navigate = useNavigate(); // Access the useNavigate hook for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      
      const response = await loginUser(formData); 
      setMessage(response.message); // Display success message

      // we log in the user via the context
      login();

      
      navigate("/students"); 
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

      {/* Login Form */}
      <Container className="mt-5" style={{ maxWidth: "400px" }}>
        <h2>Login</h2>

        {/* Display Success or Error Messages */}
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Bootstrap Form using react-bootstrap */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100">
            Login
          </Button>
        </Form>

        {/* Sign up link below the login form */}
        <div className="mt-3 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="btn-link">
              Sign up here
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
