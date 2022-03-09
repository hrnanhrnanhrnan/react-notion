import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export const NavBarContainer = () => {
  const auth = useAuth()

  //On logout click in Navbar, call logout in AuthContext
  const handleClick = () => {
    auth.logout()
  }

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
              <Nav.Link onClick={handleClick}>logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}