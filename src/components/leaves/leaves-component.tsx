import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
  Card,
  Form,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import { useCallback } from "react";
interface Ileaves {
  leaves: {
    type: String;
    from: String;
    to: String;
    city: String;
    status: String;
    postDate: String;
    employee: { firstName: String };
    declineMessage: string;
    _id: string;
  }[];
}

const Leaves: React.FC = (): JSX.Element => {
  const [waitingLeaves, setWaitingLeaves] = useState<Ileaves["leaves"]>();
  const [approvedLeaves, setApprovedLeaves] = useState<Ileaves["leaves"]>();
  const [myLeaves, setMyLeaves] = useState<Ileaves["leaves"]>();
  const [declinedLeaves, setDeclinedLeaves] = useState<Ileaves["leaves"]>();
  const [newLeaveData, setNewLeaveData] = useState({
    type: "",
    from: "",
    to: "",
  });
  const [show, setShow] = useState<boolean>(false);
  const [showAddLeave, setShowAddLeave] = useState<boolean>(false);
  const [declineMessage, setDeclineMessage] = useState({
    declineMessage: "",
    status: "declined",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const user: { role: String } = JSON.parse(`${localStorage.getItem("user")}`);

  const token: string | null = localStorage.getItem("token");
  const getAndSetData = useCallback(async () => {
    const data = await axios.get(
      `${DOMAIN.URL}/api/v1/leaves/get-waiting-for-approval-leaves`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const dataApproved = await axios.get(
      `${DOMAIN.URL}/api/v1/leaves/get-approved-leaves`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const dataDeclined = await axios.get(
      `${DOMAIN.URL}/api/v1/leaves/get-declined-leaves`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const myLeaves = await axios.get(
      `${DOMAIN.URL}/api/v1/leaves/get-my-leaves`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    setMyLeaves(myLeaves?.data?.leaves);
    setDeclinedLeaves(dataDeclined?.data?.leaves);

    setWaitingLeaves(data?.data?.leaves);
    setApprovedLeaves(dataApproved?.data?.leaves);
  }, [token]);

  useEffect(() => {
    const getData = async () => {
      getAndSetData();
    };
    getData();
  }, [token, getAndSetData]);

  const onDeleteHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    name: String
  ) => {
    e.preventDefault();
    localStorage.setItem("id", id);
    await axios.delete(`${DOMAIN.URL}/api/v1/leaves/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    getAndSetData();
    setShowAlert(true);
  };

  const onApprovedHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    name: String
  ) => {
    e.preventDefault();
    localStorage.setItem("id", id);
    await axios.patch(
      `${DOMAIN.URL}/api/v1/leaves/${id}`,
      { status: "approved" },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    setShowAlert(true);
  };

  const onDeclineHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = localStorage.getItem("id");
    await axios.patch(`${DOMAIN.URL}/api/v1/leaves/${id}`, declineMessage, {
      headers: { authorization: `Bearer ${token}` },
    });
    getAndSetData();
    setShow(false);
    setShowAlert(true);
  };
  const onAddLeaveHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await axios.post(`${DOMAIN.URL}/api/v1/leaves`, newLeaveData, {
      headers: { authorization: `Bearer ${token}` },
    });
    getAndSetData();
    setShowAddLeave(false);
    setShowAlert(true);
  };
  return (
    <Container className="staff-container">
      <Row>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Decline</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>Decline</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="declineInfo">
                      decline Message
                    </Form.Label>
                    <Form.Control
                      id="declineInfo"
                      as="textarea"
                      placeholder="decline message"
                      onChange={(e) => {
                        setDeclineMessage({
                          ...declineMessage,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      name="declineMessage"
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
            <Button
              variant={"success"}
              type="submit"
              onClick={onDeclineHandler}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row>
        <Modal show={showAddLeave} onHide={() => setShowAddLeave(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>Create Leave</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="type">Type</Form.Label>
                    <Form.Select
                      id="type"
                      placeholder="type"
                      onChange={(e) => {
                        setNewLeaveData({
                          ...newLeaveData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      name="type"
                    >
                      <option>select</option>
                      <option>vacation</option>
                      <option>sick-leave</option>
                      <option>emergency</option>
                      <option>holiday</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="from">From</Form.Label>
                    <Form.Control
                      id="from"
                      placeholder="from"
                      type="date"
                      onChange={(e) => {
                        setNewLeaveData({
                          ...newLeaveData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      name="from"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="to">To</Form.Label>
                    <Form.Control
                      id="to"
                      placeholder="to"
                      type="date"
                      onChange={(e) => {
                        setNewLeaveData({
                          ...newLeaveData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      name="to"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"danger"} onClick={() => setShowAddLeave(false)}>
              close
            </Button>
            <Button
              variant={"success"}
              type="submit"
              onClick={onAddLeaveHandler}
            >
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
      {user?.role === "admin" ? (
        <>
          <Row className="text-head">
            <Col>
              <h1>Waiting Leaves</h1>
            </Col>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Posted on</th>
                  <th>Decline</th>
                  <th>Approve</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {waitingLeaves?.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{el?.employee?.firstName}</td>
                      <td>{el.type}</td>
                      <td>{el?.from?.slice(0, 10)}</td>
                      <td>{el?.to?.slice(0, 10)}</td>
                      <td>
                        <Button
                          variant={
                            el.status === "waiting-for-approval"
                              ? "secondary"
                              : "success"
                          }
                        >
                          {el?.status}
                        </Button>
                      </td>
                      <td>{el?.postDate?.slice(0, 10)}</td>
                      <td>
                        <Button
                          type="submit"
                          variant="info"
                          onClick={(e) => {
                            localStorage.setItem("id", el._id);
                            setShow(true);
                          }}
                        >
                          Decline
                        </Button>
                      </td>
                      <td>
                        <Button
                          type="submit"
                          variant="success"
                          onClick={(e) => {
                            onApprovedHandler(
                              e,
                              el._id,
                              el?.employee?.firstName
                            );
                          }}
                        >
                          Approve
                        </Button>
                      </td>
                      <td>
                        <Button
                          type="submit"
                          variant="danger"
                          onClick={(e) => {
                            onDeleteHandler(e, el._id, el?.employee?.firstName);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
          <Row className="text-head">
            <Col>
              <h1>Approved Leaves</h1>
            </Col>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>from</th>
                  <th>to</th>
                  <th>status</th>
                  <th>posted on</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {approvedLeaves?.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{el?.employee?.firstName}</td>
                      <td>{el.type}</td>
                      <td>{el?.from?.slice(0, 10)}</td>
                      <td>{el?.to?.slice(0, 10)}</td>
                      <td>
                        <Button
                          variant={
                            el.status === "waiting-for-approval"
                              ? "danger"
                              : "success"
                          }
                        >
                          {el?.status}
                        </Button>
                      </td>
                      <td>{el?.postDate?.slice(0, 10)}</td>
                      <td>
                        <Button
                          type="submit"
                          variant="danger"
                          onClick={(e) => {
                            onDeleteHandler(e, el._id, el?.employee?.firstName);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
          <Row className="text-head">
            <Col>
              <h1>Declined Leaves</h1>
            </Col>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>from</th>
                  <th>to</th>
                  <th>posted on</th>
                  <th>status</th>
                  <th>message</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {declinedLeaves?.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{el?.employee?.firstName}</td>
                      <td>{el.type}</td>
                      <td>{el?.from?.slice(0, 10)}</td>
                      <td>{el?.to?.slice(0, 10)}</td>
                      <td>{el?.postDate?.slice(0, 10)}</td>
                      <td>
                        <Button variant={"info"}>{el?.status}</Button>
                      </td>
                      <td>{el?.declineMessage}</td>
                      <td>
                        <Button
                          type="submit"
                          variant="danger"
                          onClick={(e) => {
                            onDeleteHandler(e, el._id, el?.employee?.firstName);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>{" "}
        </>
      ) : (
        <>
          <Row className="text-head">
            <Col>
              <h1>My Leaves</h1>
            </Col>
            <Col>
              <Button
                className="verify-btn"
                onClick={() => setShowAddLeave(true)}
              >
                Create Leave
              </Button>
            </Col>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>from</th>
                  <th>to</th>
                  <th>status</th>
                  <th>message</th>
                  <th>posted on</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {myLeaves?.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{el?.employee?.firstName}</td>
                      <td>{el.type}</td>
                      <td>{el?.from?.slice(0, 10)}</td>
                      <td>{el?.to?.slice(0, 10)}</td>
                      <td>
                        <Button
                          variant={
                            el.status === "declined"
                              ? "warning"
                              : el.status === "waiting-for-approval"
                              ? "info"
                              : "success"
                          }
                        >
                          {el?.status}
                        </Button>
                      </td>
                      <td>
                        {!el?.declineMessage
                          ? "No Message"
                          : `${el.declineMessage}`}
                      </td>
                      <td>{el?.postDate?.slice(0, 10)}</td>
                      <td>
                        <Button
                          type="submit"
                          variant="danger"
                          onClick={(e) => {
                            onDeleteHandler(e, el._id, el?.employee?.firstName);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </>
      )}
    </Container>
  );
};
export default Leaves;
