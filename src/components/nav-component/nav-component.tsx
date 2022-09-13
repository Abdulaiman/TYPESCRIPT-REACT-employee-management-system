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
    <Navbar
      className="shadow"
      // bg="light"
      style={{ backgroundColor: "#000080", color: "#ffffff" }}
      sticky="top"
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="/" style={{ color: "#ffffff" }}>
          {<FaHome />}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/staffs" style={{ color: "#ffffff" }}>
              Staff
            </Nav.Link>
            <Nav.Link href="/departments" style={{ color: "#ffffff" }}>
              Departments
            </Nav.Link>
            <NavDropdown
              style={{ backgroundColor: "#ffffff", borderRadius: ".5rem" }}
              title="Others"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/coplaints">Complaints</NavDropdown.Item>
              <NavDropdown.Item href="/leaves">Leaves</NavDropdown.Item>
              <NavDropdown.Item href="/notices">Notices</NavDropdown.Item>
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
