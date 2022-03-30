import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"


//Displays the navbar, takes in eventhandler through props from Navbarcontainer
export const NavbarComponent = (props) => {
  console.log("navbar mountade")
    return (
        <Navbar display="flex"  bg="dark" variant="dark" expand="sm" className="pb-3 sticky-top">
        <Container>
          <Navbar.Brand>{props.logo} : {props.user.label}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/home">home</Nav.Link>
              <Nav.Link as={NavLink} to="/projects">projects</Nav.Link>
              <Nav.Link as={NavLink} to="/timereport">timereport</Nav.Link>
              {props.user.adminAuthorized && <Nav.Link as={NavLink} to="/manager">manager</Nav.Link>}
              {props.user.adminAuthorized && <Nav.Link as={NavLink} to="/projectleader">projectleader {props.warnings?.length > 0 ? <span className="badge bg-danger">{props.warnings?.length}</span> : null}</Nav.Link>}
              <Nav.Link onClick={props.handleClick}>logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}