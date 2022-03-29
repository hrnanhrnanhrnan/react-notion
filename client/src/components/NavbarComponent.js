import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import {useAuth} from "../contexts/AuthContext"


//Displays the navbar, takes in eventhandler through props from Navbarcontainer
export const NavbarComponent = (props) => {
  const auth = useAuth()
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
              {props.user.adminAuthorized && <Nav.Link as={NavLink} to="/admin">admin {auth.timereportsOutOfSpan?.length > 0 ? <span className="badge bg-danger">{auth.timereportsOutOfSpan?.length}</span> : null}</Nav.Link>}
              {props.user.adminAuthorized && <Nav.Link as={NavLink} to="/test">test</Nav.Link>}
              <Nav.Link onClick={props.handleClick}>logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}