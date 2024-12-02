import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Import the useAuth hook

const NavbarComponent = () => {
  const { user, isAuthenticated, logout } = useAuth(); // Destructure user and authentication status
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Navbar: isAuthenticated", isAuthenticated);
    console.log("Navbar: user", user);
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    logout(); // Log the user out
    navigate("/"); // Redirect to the login page after logging out
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand style={{ color: "white", fontWeight: "bold" }}>
        Student Course App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {isAuthenticated ? (
            <>
              <Nav.Link as={Link} to="/students" style={{ color: "white" }}>
                Students
              </Nav.Link>
              <Nav.Link as={Link} to="/courses" style={{ color: "white" }}>
                Courses
              </Nav.Link>
              <Nav.Link as={Link} to="/add-student" style={{ color: "white" }}>
                Add Student
              </Nav.Link>
              <Nav.Link as={Link} to="/add-course" style={{ color: "white" }}>
                Add Course
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/" style={{ color: "white" }}>
                Log In
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" style={{ color: "white" }}>
                Sign Up
              </Nav.Link>
            </>
          )}
        </Nav>
        {isAuthenticated && (
          <Nav className="ms-auto"> {/* This class will push the logout link to the far right */}
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleLogout}
              style={{ color: "white", fontWeight:'bolder' }}
            >
              Log Out
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
