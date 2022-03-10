import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"

//Displays the navbar, takes in eventhandler through props from Navbarcontainer
export const NavbarComponent = (props) => {
    return (
        <Navbar display="flex"  bg="dark" variant="dark" expand="sm" className="pb-3 sticky-top">
        <Container>
          <Navbar.Brand>Lion-org</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/home">home</Nav.Link>
              <Nav.Link as={NavLink} to="/projects">projects</Nav.Link>
              <Nav.Link as={NavLink} to="/test">test</Nav.Link>
              <Nav.Link onClick={props.handleClick}>logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}