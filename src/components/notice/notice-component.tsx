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
import "./notice-styles.css";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import React, { useState, useEffect } from "react";

interface Inotice {
  notices: { header: String; notice: String; date: String; _id: string }[];
}
const Notice: React.FC = (): JSX.Element => {
  const token: string | null = localStorage.getItem("token");
  const [show, setShow] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const user: { role: String; firstName: String } = JSON.parse(
    `${localStorage.getItem("user")}`
  );
  const [noticeInfo, setNoticeInfo] = useState({
    header: "",
    notice: "",
  });
  const [notices, setNotices] = useState<Inotice["notices"]>();
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${DOMAIN.URL}/api/v1/notice`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setNotices(data.data.notices);
    };
    getData();
  }, [token]);
  const onNoticeInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoticeInfo({
      ...noticeInfo,
      [e.target.name]: e.target.value,
    });
  };
  const id = localStorage.getItem("id");
  const onEditNotice = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await axios.patch(
      `${DOMAIN.URL}/api/v1/notice/${id}`,
      {
        header: noticeInfo.header === "" ? undefined : noticeInfo.header,
        notice: noticeInfo.notice === "" ? undefined : noticeInfo.notice,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const data = await axios.get(`${DOMAIN.URL}/api/v1/notice`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setNotices(data.data.notices);
    setShowAlert(true);
    setShow(false);
  };
  const onDeleteNotice = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: String
  ) => {
    await axios.delete(`${DOMAIN.URL}/api/v1/notice/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await axios.get(`${DOMAIN.URL}/api/v1/notice`, {
      headers: { authorization: `Bearer ${token}` },
    });

    setNotices(data.data.notices);
    setShowAlert(true);
  };
  const onAddNotice = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    await axios.post(`${DOMAIN.URL}/api/v1/notice`, noticeInfo, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await axios.get(`${DOMAIN.URL}/api/v1/notice`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setNotices(data.data.notices);
    setShowAdd(false);
    setShowAlert(true);
  };
  return (
    <Container>
      <Row>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Notice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>Edit Notice</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="header">Header</Form.Label>
                    <Form.Control
                      id="header"
                      placeholder="header"
                      onChange={onNoticeInfoChange}
                      name="header"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="notice">Notice</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="notice"
                      placeholder="notice"
                      onChange={onNoticeInfoChange}
                      name="notice"
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
            <Button variant={"success"} type="submit" onClick={onEditNotice}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row>
        <Modal show={showAdd} onHide={() => setShowAdd(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Card.Title>Add Notice</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="header">Header</Form.Label>
                    <Form.Control
                      id="header"
                      placeholder="header"
                      onChange={onNoticeInfoChange}
                      name="header"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="notice">Notice</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="notice"
                      placeholder="notice"
                      onChange={onNoticeInfoChange}
                      name="notice"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"danger"} onClick={() => setShowAdd(false)}>
              close
            </Button>
            <Button variant={"success"} type="submit" onClick={onAddNotice}>
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
      <Row className="notice-header">
        <Col>
          <h1>All Notice</h1>
        </Col>
        {user?.role === "admin" ? (
          <Col>
            <Button variant="info" onClick={() => setShowAdd(true)}>
              Add Notice
            </Button>
          </Col>
        ) : (
          ""
        )}
      </Row>
      {notices?.map(
        (
          el: { header: String; notice: String; date: String; _id: string },
          i: number
        ) => (
          <Row key={`${i}`} className="notice-container">
            <Card className="text-center">
              <Card.Header>Notice {`${i + 1}`}</Card.Header>
              <Card.Body>
                <Card.Title>{el.header}</Card.Title>
                <Card.Text>{el.notice}</Card.Text>
                {user?.role === "admin" ? (
                  <>
                    <Button
                      variant="danger"
                      className="delete-btn"
                      onClick={(e) => {
                        onDeleteNotice(e, el._id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.setItem("id", el._id);
                        setShow(true);
                      }}
                      variant="success"
                    >
                      Edit
                    </Button>{" "}
                  </>
                ) : (
                  ""
                )}
              </Card.Body>
              <Card.Footer className="text-muted">
                Posted On: {el.date?.slice(0, 10)}
              </Card.Footer>
            </Card>
          </Row>
        )
      )}
    </Container>
  );
};
export default Notice;
