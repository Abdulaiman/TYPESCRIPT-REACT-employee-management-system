import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome } from "react-icons/fa";
const NavBar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const logoutHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Navbar className="shadow" sticky="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">{<FaHome />}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/staff">Staff</Nav.Link>
            <Nav.Link href="/departments">Departments</Nav.Link>
            <NavDropdown title="Others" id="basic-nav-dropdown">
              <NavDropdown.Item href="/coplaints">Complaints</NavDropdown.Item>
              <NavDropdown.Item href="/leaves">Leaves</NavDropdown.Item>
              <NavDropdown.Item href="/notice">Notice</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" onClick={logoutHandler}>
                LOGOUT
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
