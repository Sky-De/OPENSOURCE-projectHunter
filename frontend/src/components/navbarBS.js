import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../css/NavbarBS.css";

export const NavbarBootstrap = () => {
  return (
    <Navbar className="px-5" id="navbar-custom" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand id="navbar-brand">
          <i class="fa-solid fa-feather-pointed"></i> Tindeggle
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center">
          <LinkContainer id="nav-link" className="mr-4" to="/home">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer id="nav-link" className="mr-4" to="/">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Nav.Link>
              <button id="nav-link-special">Sign Up</button>
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
