import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${DOMAIN.URL}/api/v1/users`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(data);
      setStaffs(data?.data?.users);
    };
    getData();
  }, [token]);

  const onDetailsHander = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    name: String
  ) => {
    e.preventDefault();
    localStorage.setItem("id", id);
    navigate(`/staffs/${name}`);
  };

  return (
    <Container className="staff-container">
      <Row className="text-head">
        <Col>
          <h1>All Staffs</h1>
        </Col>
        <Col>
          <Button className="verify-btn">verify members</Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First</th>
              <th>Email</th>
              <th>City/Country</th>
              <th>leaves/20</th>
              <th>Department</th>
              <th>Role</th>
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
                    {el.city}/{el.country}
                  </td>
                  <td>
                    {`${el.leavesTaken}`}/{`${el.allowedLeaves}`}
                  </td>
                  <td>{el?.department?.name}</td>
                  <td>{el.role}</td>
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
