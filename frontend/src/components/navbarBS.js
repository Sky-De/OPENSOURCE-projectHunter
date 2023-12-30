import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export const NavbarBootstrap = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home">
          <i class="fa-solid fa-feather-pointed"></i> CupidConnect
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link className="nav-link" to="/">
            Home
          </Nav.Link>
          <Nav.Link className="nav-link" to="./pages/Register">
            Register
          </Nav.Link>
          <Nav.Link className="nav-link" to="#pricing">
            Pricing
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
