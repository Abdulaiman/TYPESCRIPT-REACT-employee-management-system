import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import { useNavigate, Link } from "react-router-dom";

const SignUp: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    mobileNumber: "",
    birthday: "",
    gender: "",
    city: "",
    country: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const data = await axios.post(`${DOMAIN.URL}/api/v1/users/sign-up`, input);

    localStorage.setItem("token", data.data.token);

    navigate("/");
  };
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#BE93D4",
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          borderRadius: "2rem",
        }}
      >
        <Card.Title
          style={{
            textAlign: "center",
            color: "#BE93D4",
            height: "3rem",
            borderBottom: "1px solid grey",
            fontSize: "2rem",
          }}
        >
          Sign Up
        </Card.Title>
        <Card.Body>
          <Form style={{ width: "30rem" }}>
            <Row>
              {" "}
              <Form.Group className="mb-3">
                <Form.Label htmlFor={"emailAddress"}>email adress</Form.Label>
                <Form.Control
                  id={"emailAddress"}
                  placeholder={"example@example.com"}
                  value={input?.email}
                  onChange={handleChange}
                  name={"email"}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={"firstName"}>First Name</Form.Label>
                  <Form.Control
                    id={"firstName"}
                    placeholder={"firstName"}
                    value={input?.firstName}
                    onChange={handleChange}
                    name={"firstName"}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={"lastName"}>Last Name</Form.Label>
                  <Form.Control
                    id={"lastName"}
                    placeholder={"lastName"}
                    value={input?.lastName}
                    onChange={handleChange}
                    name={"lastName"}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={"password"}>password</Form.Label>
                  <Form.Control
                    id={"password"}
                    placeholder={"password"}
                    value={input?.password}
                    onChange={handleChange}
                    type="password"
                    name={"password"}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={"password"}>confirm password</Form.Label>
                  <Form.Control
                    id={"confirm password"}
                    placeholder={"confirm password"}
                    value={input?.passwordConfirm}
                    onChange={handleChange}
                    type="password"
                    name={"passwordConfirm"}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={"name"}>Mobile Number</Form.Label>
                  <Form.Control
                    id={"mobileNumber"}
                    placeholder={"mobileNumber"}
                    value={input?.mobileNumber}
                    onChange={handleChange}
                    name={"mobileNumber"}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={"name"}>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    id={"birthday"}
                    placeholder={"birthday"}
                    value={input?.birthday}
                    onChange={handleChange}
                    name={"birthday"}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={"name"}>City</Form.Label>
                  <Form.Control
                    id={"city"}
                    placeholder={"city"}
                    value={input?.city}
                    onChange={handleChange}
                    name={"city"}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={"name"}>Country</Form.Label>
                  <Form.Control
                    id={"country"}
                    placeholder={"country"}
                    value={input?.country}
                    onChange={handleChange}
                    name={"country"}
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
                    aria-label="Default select example"
                    onChange={(e) => {
                      setInput({
                        ...input,
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
                <Form.Group className="mb-3">
                  <Form.Label htmlFor={"name"}>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    id={"address"}
                    placeholder={"address"}
                    value={input?.address}
                    onChange={handleChange}
                    name={"address"}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              <Form.Text>
                go back to? <Link to={"/login"}>login</Link>
              </Form.Text>
            </div>
            <Button
              type="submit"
              onClick={onSubmitHandler}
              style={{
                backgroundColor: "#BE93D4",
                cursor: "pointer",
                border: "none",
              }}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
