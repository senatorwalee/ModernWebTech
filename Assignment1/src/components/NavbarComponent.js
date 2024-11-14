import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" style={{color:'white',fontWeight:'bold' }}>Student Course App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" style={{color:'white' }}>Students</Nav.Link>
          <Nav.Link as={Link} to="/courses" style={{color:'white'}}>Courses</Nav.Link>
          <Nav.Link as={Link} to="/add-student" style={{color:'white'}}>Add Student</Nav.Link>
          <Nav.Link as={Link} to="/add-course" style={{color:'white'}}>Add Course</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
