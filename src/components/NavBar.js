import { IconContext } from "react-icons";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import { FaUserCircle } from "react-icons/fa";

function NavBar() {
  return (
    <Navbar bg="light" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Ecommerce</Navbar.Brand>

        
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}

        <Button variant="light" size="sm" className={"justify-content-end circle"}>
        <IconContext.Provider value={{size: "2em", color: "gray", className: "FaUserCircle" }}>
            <FaUserCircle/>
        </IconContext.Provider>            
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavBar;
