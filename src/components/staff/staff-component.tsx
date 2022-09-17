import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Alert,
} from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import "./staffs-styles.css";
import { useNavigate } from "react-router-dom";

interface Istaffs {
  staffs: {
    address: String;
    allowedLeaves: Number;
    birthday: String;
    city: String;
    country: String;
    department: { name: String };
    email: String;
    firstName: String;
    gender: String;
    isVerified: Boolean;
    lastName: String;
    leavesTaken: Number;
    mobileNumber: Number;
    password: String;
    role: String;
    _id: string;
  }[];
}

const Staffs: React.FC = (): JSX.Element => {
  const [staffs, setStaffs] = useState<Istaffs["staffs"]>();
  const [notApprovedStaffs, setNotApprovedStaffs] =
    useState<Istaffs["staffs"]>();
  const [show, setShow] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlertVerify, setShowAlertVerify] = useState<boolean>(false);
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("token");
  const getAndSetData = useCallback(async () => {
    const data = await axios.get(
      `${DOMAIN.URL}/api/v1/users/get-approved-users`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const data2 = await axios.get(
      `${DOMAIN.URL}/api/v1/users/get-not-approved-users`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    setStaffs(data?.data?.users);
    setNotApprovedStaffs(data2?.data?.users);
  }, [token]);
  useEffect(() => {
    getAndSetData();
  }, [token, getAndSetData]);

  const onDetailsHander = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    name: String
  ) => {
    e.preventDefault();
    localStorage.setItem("id", id);
    navigate(`/staffs/${name}`);
  };

  const onVerify = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: String
  ) => {
    e.preventDefault();

    await axios.patch(
      `${DOMAIN.URL}/api/v1/users/update-user/${id}`,
      {
        isVerified: true,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    getAndSetData();
    setShowAlertVerify(true);
  };

  return (
    <Container className="staff-container">
      <Alert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        variant={"success"}
        dismissible
      >
        Verified
      </Alert>
      <Row>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Staffs</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert
              show={showAlertVerify}
              onClose={() => setShowAlertVerify(false)}
              variant={"success"}
              dismissible
            >
              updated successfully
            </Alert>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First</th>
                  <th>Email</th>
                  <th>Verify</th>
                </tr>
              </thead>
              <tbody>
                {notApprovedStaffs?.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{el.firstName}</td>
                      <td>{el.email}</td>

                      <td>
                        <Button
                          type="submit"
                          variant="success"
                          onClick={(e) => {
                            onVerify(e, el._id);
                          }}
                        >
                          Verify
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"primary"} onClick={() => setShow(false)}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row className="text-head">
        <Col>
          <h1>All Staffs</h1>
        </Col>
        <Col>
          <Button className="verify-btn" onClick={() => setShow(true)}>
            verify members
          </Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First</th>
              <th>Email</th>
              <th>View/Update</th>
            </tr>
          </thead>
          <tbody>
            {staffs?.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{el.firstName}</td>
                  <td>{el.email}</td>
                  <td>
                    <Button
                      type="submit"
                      variant="success"
                      onClick={(e) => {
                        onDetailsHander(e, el._id, el.firstName);
                      }}
                    >
                      View/Update
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
export default Staffs;
