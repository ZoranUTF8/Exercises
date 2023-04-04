import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import * as localStorageOperations from "../../utils/localStorageOperations";
import PropTypes from "prop-types";

const NavbarComponent = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorageOperations.remove_user_from_local_storage(user);
    setUser(null);
  };
  return (
    <Navbar className="custom-navbar-color" expand="md">
      <Container fluid>
        <Navbar.Brand href="#home">Blog</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        />
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
        </Navbar.Collapse>
        {user && (
          <Nav>
            <Nav.Link>Logged in as: {user.name}</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
NavbarComponent.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  setUser: PropTypes.func.isRequired,
};
export default NavbarComponent;
