import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUsers, FaLandmark, FaUsersSlash } from "react-icons/fa";
import DOMAIN from "../../utils/proxy";
import BarChart from "../charts/bar-chart-component";
import LineChart from "../charts/line-chart";
import "./dashboard-styles.css";

export interface Stats {
  stats2: { _id?: String; sum?: Number }[];
}

const Dashboard: React.FC = (): JSX.Element => {
  const [staffsNum, setStaffsNum] = useState<Number>(0);
  const [departmentsNum, setDapartmentsNum] = useState<Number>(0);
  const [leavesNum, setLeavesNum] = useState<Number>(0);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `${DOMAIN.URL}/api/v1/users/get-dashboard-data`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setStaffsNum(data?.data?.staff);
      setDapartmentsNum(data?.data?.dep);
      setLeavesNum(data?.data?.leave);
    };
    getData();
  }, [token]);

  return (
    <Container className="dashboard-container">
      <Row>
        <div className="dashboard-title">
          <h1>DASHBOARD</h1>
        </div>
      </Row>
      <Row>
        <Col>
          <div className="box-container">
            <h3>Staffs</h3>
            <div className="dashboardCard ">
              <div className="dashboard-icon">{<FaUsers />}</div>
              <div className="dashboard-number">{`${staffsNum}`}</div>
            </div>
          </div>
        </Col>

        <Col>
          <div className="box-container dep">
            <h3>departments</h3>
            <div className="dashboardCard 1">
              <div className="dashboard-icon">{<FaLandmark />}</div>
              <div className="dashboard-number">{`${departmentsNum}`}</div>
            </div>
          </div>
        </Col>

        <Col>
          <div className="box-container leave">
            <h3>laeves</h3>
            <div className="dashboardCard 1">
              <div className="dashboard-icon">{<FaUsersSlash />}</div>
              <div className="dashboard-number">{`${leavesNum}`}</div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <BarChart />
        </Col>
        <Col>
          <LineChart />
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
