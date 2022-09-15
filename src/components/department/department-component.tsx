import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Card,
  Alert,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import "./department-styles.css";
import { useNavigate } from "react-router-dom";

interface Iinfo {
  staffs: {
    name: String;

    manager: { firstName: String };
    developers: { firstName: String }[];

    _id: string;
  }[];
  users: { lastName: String; firstName: String }[];
}

const Department: React.FC = (): JSX.Element => {
  const [departments, setDepartments] = useState<Iinfo["staffs"]>();
  const [show, setShow] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [department, setDepartment] = useState({
    name: "",
    manager: { name: "" },
    developers: { name: "" },
  });
  const [users, setUsers] = useState<Iinfo["users"]>();
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("token");

  const user: { role: String } = JSON.parse(`${localStorage.getItem("user")}`);
  useEffect(() => {
    const getData = async () => {
      const data2 = await axios.get(`${DOMAIN.URL}/api/v1/departments`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await axios.get(`${DOMAIN.URL}/api/v1/users`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setUsers(data?.data?.users);
      setDepartments(data2?.data?.departments);
    };
    getData();
  }, [token]);

  const onFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  };
  const onFormChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitDepartment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await axios.post(`${DOMAIN.URL}/api/v1/departments`, department, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data2 = await axios.get(`${DOMAIN.URL}/api/v1/departments`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await axios.get(`${DOMAIN.URL}/api/v1/users`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setUsers(data?.data?.users);
    setDepartments(data2?.data?.departments);
    setShowAlert(true);
    setShow(false);
  };

  const onDetailsHander = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    localStorage.setItem("id", id);
    setShowEdit(true);
  };

  const onEditDepartment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const departmentId = localStorage.getItem("id");
    await axios.patch(
      `${DOMAIN.URL}/api/v1/departments/${departmentId}`,
      department,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const data2 = await axios.get(`${DOMAIN.URL}/api/v1/departments`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await axios.get(`${DOMAIN.URL}/api/v1/users`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setUsers(data?.data?.users);
    setDepartments(data2?.data?.departments);
    setShowAlert(true);
    setShowEdit(false);
  };
  return (
    <Container className="department-container">
      <Alert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        variant={"success"}
        dismissible
      >
        Done
      </Alert>
      <Row>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>Create Department</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                      id="name"
                      placeholder="Name"
                      onChange={onFormChangeInput}
                      name="name"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label htmlFor={"manager"}>Manager</Form.Label>
                    <Form.Select
                      id="manager"
                      onChange={onFormChange}
                      name="manager"
                    >
                      <option>select</option>
                      {users?.map((el: { lastName: String }, i: number) => (
                        <option key={`${i + 1}`}>{el.lastName}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"primary"} onClick={() => setShow(false)}>
              close
            </Button>
            <Button type="submit" onClick={onSubmitDepartment}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row>
        <Modal show={showEdit} onHide={() => setShowEdit(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>Edit Department</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                      id="name"
                      placeholder="Name"
                      onChange={onFormChangeInput}
                      name="name"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label htmlFor={"manager"}>Manager</Form.Label>
                    <Form.Select
                      id="manager"
                      onChange={onFormChange}
                      name="manager"
                    >
                      <option>select</option>
                      {users?.map((el: { lastName: String }, i: number) => (
                        <option key={`${i + 1}`}>{el.lastName}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"primary"} onClick={() => setShowEdit(false)}>
              close
            </Button>
            <Button type="submit" onClick={onEditDepartment}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row className="text-head">
        <Col>
          <h1>All Departments</h1>
        </Col>
        {user?.role === "admin" ? (
          <Col>
            <Button
              className="verify-btn"
              onClick={() => {
                setShow(true);
              }}
            >
              Add Department
            </Button>
          </Col>
        ) : (
          ""
        )}
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Manager</th>
              <th>Developers</th>

              {user?.role === "admin" ? <th>Update</th> : ""}
            </tr>
          </thead>
          <tbody>
            {departments?.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{el.name}</td>
                  <td>{el?.manager?.firstName}</td>
                  <td>
                    {el?.developers?.map(
                      (el: { firstName: String }) => `${el.firstName}/`
                    )}
                  </td>

                  {user?.role === "admin" ? (
                    <td>
                      <Button
                        type="submit"
                        variant="success"
                        onClick={(e) => {
                          onDetailsHander(e, el._id);
                        }}
                      >
                        Update
                      </Button>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
export default Department;
