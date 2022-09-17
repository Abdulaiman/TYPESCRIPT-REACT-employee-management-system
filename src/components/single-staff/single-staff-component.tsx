import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";

import "./single-staff-styles.css";
const SingleStaff = () => {
  const [staffInfo, setStaffInfo] = useState({
    address: "",
    allowedLeaves: "",
    birthday: "",
    city: "",
    country: "",
    department: { name: "" },
    email: "",
    firstName: "",
    gender: "",
    isVerified: false,
    lastName: "",
    leavesTaken: "",
    mobileNumber: "",
    role: "",
    _id: "",
  });
  const [departments, setDepartments] = useState([
    {
      name: "",
      _id: "",
    },
  ]);

  const token: string | null = localStorage.getItem("token");
  const staffId: string | null = localStorage.getItem("id");
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${DOMAIN.URL}/api/v1/users/${staffId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setStaffInfo(data?.data?.user);
      const deps = await axios.get(`${DOMAIN.URL}/api/v1/departments`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setDepartments(deps?.data?.departments);
    };
    getData();
  }, [token, staffId]);

  const onSaveChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = await axios.patch(
      `${DOMAIN.URL}/api/v1/users/update-user/${staffId}`,
      staffInfo,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    setStaffInfo(data?.data?.user);
    setShow(true);
  };

  return (
    <Container>
      <Card className="shadow-lg staff-card">
        <Alert
          show={show}
          onClose={() => setShow(false)}
          variant={"success"}
          dismissible
        >
          updated successfully
        </Alert>
        <Form>
          <Row className="text-head">
            <Col>
              <h1>Staff Info</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  defaultValue={staffInfo.firstName}
                  type="text"
                  placeholder="firstname"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="firstName"
                />
              </Form.Group>{" "}
            </Col>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  defaultValue={staffInfo.lastName}
                  type="text"
                  placeholder="Lastname"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="lastName"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  defaultValue={staffInfo.email}
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>{" "}
            </Col>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  defaultValue={staffInfo.address}
                  type="text"
                  placeholder="Address"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="address"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>City</Form.Label>
                <Form.Control
                  defaultValue={staffInfo.city}
                  type="text"
                  placeholder="city"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="city"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>{" "}
            </Col>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  defaultValue={staffInfo.country}
                  type="text"
                  placeholder="Country"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="country"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>gender</Form.Label>
                <Form.Select
                  defaultValue={staffInfo.gender}
                  aria-label="Default select example"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="gender"
                >
                  <option>Select</option>
                  <option value={"male"}>male</option>
                  <option value={"female"}>female</option>
                </Form.Select>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>{" "}
            </Col>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  defaultValue={staffInfo.mobileNumber}
                  type="text"
                  placeholder="Mobile"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="mobileNumber"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>leaves taken</Form.Label>
                <Form.Control
                  defaultValue={staffInfo.leavesTaken}
                  type="text"
                  placeholder="leaves taken"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="leavesTaken"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>{" "}
            </Col>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  defaultValue={staffInfo?.birthday?.slice(0, 10)}
                  type="date"
                  placeholder="date"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="birthday"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>{" "}
            </Col>
            <Col>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>department</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setStaffInfo({
                      ...staffInfo,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="department"
                >
                  <>
                    <option>select</option>
                    {departments?.map((el: { name: string }, i: number) => (
                      <option key={`${i + 1}`}>{el.name}</option>
                    ))}
                  </>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button onClick={onSaveChange} variant="success" type="submit">
            save
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
export default SingleStaff;
