import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"


//Displays the navbar, takes in eventhandler through props from Navbarcontainer
export const NavbarComponent = (props) => {
    return (
        <Navbar display="flex"  bg="dark" variant="dark" expand="sm" className="pb-3 sticky-top">
        <Container>
          <Navbar.Brand>{props.logo} : {props.user.label}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <header> <Nav.Link as={NavLink}  to="/home">home</Nav.Link></header>
            <header><Nav.Link as={NavLink} to="/projects">projects</Nav.Link></header>
            <header><Nav.Link as={NavLink} to="/timereport">timereport</Nav.Link></header>
            <header> {props.user.adminAuthorized && <Nav.Link as={NavLink} to="/manager">admin {props.warnings?.length > 0 ? <span className="badge bg-danger">{props.warnings?.length}</span> : null}</Nav.Link>}</header>
            <header>{props.user.adminAuthorized && <Nav.Link as={NavLink} to="/projectleader">test</Nav.Link>}</header>
            <header> <Nav.Link onClick={props.handleClick}>logout</Nav.Link></header>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}