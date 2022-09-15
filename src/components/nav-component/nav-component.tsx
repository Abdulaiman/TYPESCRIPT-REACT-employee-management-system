import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome } from "react-icons/fa";
const NavBar: React.FC = (): JSX.Element => {
  const user: { role: String } = JSON.parse(`${localStorage.getItem("user")}`);

  const logoutHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    localStorage.clear();
  };
  return (
    <Navbar
      className="shadow"
      style={{ backgroundColor: "#000080", color: "#ffffff" }}
      sticky="top"
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="/" style={{ color: "#ffffff" }}>
          {<FaHome />}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: "#ffffff" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user?.role === "admin" ? (
              <Nav.Link href="/staffs" style={{ color: "#ffffff" }}>
                Staff
              </Nav.Link>
            ) : (
              ""
            )}
            <Nav.Link href="/departments" style={{ color: "#ffffff" }}>
              Departments
            </Nav.Link>
            <NavDropdown
              style={{ backgroundColor: "#ffffff", borderRadius: ".5rem" }}
              title="Others"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/complaints">Complaints</NavDropdown.Item>
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
