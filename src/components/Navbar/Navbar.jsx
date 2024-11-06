import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; 
import Logout from '../Logout/Logout'

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
      <Container>
        <Navbar.Brand>
          <span className="brand-part1">Carbon</span>
          <span className="brand-part2">Track</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/dashboard">Dashboard</Link></Nav.Link>
            <NavDropdown title="Profile" id="nav-dropdown" align="start">
                <NavDropdown.Item><Link to="/login" style={{paddingLeft:'5px'}}>Login</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/register" style={{paddingLeft:'5px'}}>Register</Link></NavDropdown.Item>
                <NavDropdown.Item><Logout/></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
