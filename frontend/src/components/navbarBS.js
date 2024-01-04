import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const NavbarBootstrap = () => {
  return (
    <Navbar className="px-4" bg="light" data-bs-theme="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>
          <i class="fa-solid fa-feather-pointed"></i> Cupid Connect
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/register">
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
