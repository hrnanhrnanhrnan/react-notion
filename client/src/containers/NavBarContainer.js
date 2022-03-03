import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export const NavBarContainer = () => {

    return (
        <Navbar display="flex"  bg="dark" variant="dark" expand="sm" className="pb-3 sticky-top">
        <Container>
          <Navbar.Brand>Hemsida</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">home</Nav.Link>
              <Nav.Link as={NavLink} to="/getdata">get data</Nav.Link>
              <Nav.Link as={NavLink} to="/test">test</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
    
}