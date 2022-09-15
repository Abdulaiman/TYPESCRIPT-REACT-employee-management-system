import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Alert,
  Card,
} from "react-bootstrap";
import "./complaints-styles.css";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import React, { useState, useEffect } from "react";

interface Icomplaints {
  complaints: {
    header: String;
    complaint: String;
    postDate: String;
    _id: string;
    anonymous: String;
    employee: { name: String; firstName: String };
  }[];
}
const Complaints: React.FC = (): JSX.Element => {
  const token: string | null = localStorage.getItem("token");
  const [show, setShow] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const user: { role: String; firstName: String } = JSON.parse(
    `${localStorage.getItem("user")}`
  );
  const [complaintsInfo, setComplaintsInfo] = useState({
    header: "",
    complaint: "",
    anonymous: "",
  });
  const [complaints, setComplaints] = useState<Icomplaints["complaints"]>();
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${DOMAIN.URL}/api/v1/complaints`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setComplaints(data.data.complaints);
    };
    getData();
  }, [token]);
  const onComplaintsInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplaintsInfo({
      ...complaintsInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onComplaintsInfoChangeSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setComplaintsInfo({
      ...complaintsInfo,
      [e.target.name]: e.target.value,
    });
  };
  const id = localStorage.getItem("id");
  const onEditComplaint = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await axios.patch(
      `${DOMAIN.URL}/api/v1/complaints/${id}`,
      {
        header:
          complaintsInfo.header === "" ? undefined : complaintsInfo.header,
        complaint:
          complaintsInfo.complaint === ""
            ? undefined
            : complaintsInfo.complaint,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const data = await axios.get(`${DOMAIN.URL}/api/v1/complaints`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setComplaints(data.data.complaints);
    setShowAlert(true);
    setShow(false);
  };
  const onDeleteComplaints = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: String
  ) => {
    await axios.delete(`${DOMAIN.URL}/api/v1/complaints/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await axios.get(`${DOMAIN.URL}/api/v1/complaints`, {
      headers: { authorization: `Bearer ${token}` },
    });

    setComplaints(data.data.complaints);
    setShowAlert(true);
  };
  console.log(complaintsInfo);
  const onAddComplaint = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    await axios.post(`${DOMAIN.URL}/api/v1/complaints`, complaintsInfo, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await axios.get(`${DOMAIN.URL}/api/v1/complaints`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setComplaints(data.data.complaints);
    setShowAdd(false);
    setShowAlert(true);
  };
  return (
    <Container>
      <Row>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Complaints</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>Edit Complaints</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="header">Header</Form.Label>
                    <Form.Control
                      id="header"
                      placeholder="header"
                      onChange={onComplaintsInfoChange}
                      name="header"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="complaints">Complaints</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="complaints"
                      placeholder="complaints"
                      onChange={onComplaintsInfoChange}
                      name="complaints"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"danger"} onClick={() => setShow(false)}>
              close
            </Button>
            <Button variant={"success"} type="submit" onClick={onEditComplaint}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row>
        <Modal show={showAdd} onHide={() => setShowAdd(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Complaint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>Add Complaints</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="header">Header</Form.Label>
                    <Form.Control
                      id="header"
                      placeholder="header"
                      onChange={onComplaintsInfoChange}
                      name="header"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="complaint">Complaints</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="complaint"
                      placeholder="complaint"
                      onChange={onComplaintsInfoChange}
                      name="complaint"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>anonymous</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={onComplaintsInfoChangeSelect}
                      name="anonymous"
                    >
                      <option>Select</option>
                      <option value={"true"}>true</option>
                      <option value={"false"}>false</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"danger"} onClick={() => setShowAdd(false)}>
              close
            </Button>
            <Button variant={"success"} type="submit" onClick={onAddComplaint}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row>
        <Alert
          show={showAlert}
          onClose={() => setShowAlert(false)}
          variant={"success"}
          dismissible
        >
          Done
        </Alert>
      </Row>
      <Row className="complaints-header">
        <Col>
          <h1>Employee Complaints</h1>
        </Col>
        {user?.role === "staff" ? (
          <Col>
            <Button variant="info" onClick={() => setShowAdd(true)}>
              Add Complaints
            </Button>
          </Col>
        ) : (
          ""
        )}
      </Row>
      {complaints?.map(
        (
          el: {
            header: String;
            complaint: String;
            postDate: String;
            _id: string;
            anonymous: String;
            employee: { name: String; firstName: String };
          },
          i: number
        ) => {
          console.log(el);
          console.log(user);
          return (
            <Row key={`${i}`} className="complaints-container">
              <Card className="text-center">
                <Card.Header>Complaints {`${i + 1}`}</Card.Header>
                <Card.Body>
                  <Card.Title>{el.header}</Card.Title>
                  <Card.Text>{el.complaint}</Card.Text>
                  {el?.employee?.firstName === user?.firstName ? (
                    <>
                      <Button
                        variant="danger"
                        className="delete-btn"
                        onClick={(e) => {
                          onDeleteComplaints(e, el._id);
                        }}
                      >
                        Delete
                      </Button>
                      {user?.role === "admin" ? (
                        ""
                      ) : (
                        <Button
                          onClick={() => {
                            localStorage.setItem("id", el._id);
                            setShow(true);
                          }}
                          variant="success"
                        >
                          Edit
                        </Button>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Card.Body>
                <Card.Footer className="text-muted">
                  Posted by:{" "}
                  {el.anonymous === "true"
                    ? `anonymous ${el.postDate?.slice(0, 10)}`
                    : `${
                        el?.employee?.firstName?.toUpperCase() ||
                        el?.employee?.name
                      } On:${el.postDate?.slice(0, 10)}`}
                </Card.Footer>
              </Card>
            </Row>
          );
        }
      )}
    </Container>
  );
};
export default Complaints;
