import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUserAndRemoveFromLocalStorage } from "../../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(
      logoutUserAndRemoveFromLocalStorage(`${currentUser.name} logged out.`)
    );
  };

  return (
    <Navbar className="custom-navbar-color" expand="md">
      <Container fluid>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="app" className="nav-link">
              Blog
            </Link>

            <Link to="app/allusers" className="nav-link">
              All users
            </Link>
          </Nav>
        </Navbar.Collapse>
        {currentUser && (
          <Nav>
            <Nav.Link>Logged in as: {currentUser.name}</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
export default NavbarComponent;
