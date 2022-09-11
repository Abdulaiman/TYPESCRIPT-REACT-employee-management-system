import { Container, Row, Col } from "react-bootstrap";
import { FaUsers, FaLandmark, FaUsersSlash } from "react-icons/fa";
import BarChart from "../charts/bar-chart-component";
import LineChart from "../charts/line-chart";
import "./dashboard-styles.css";
const Dashboard: React.FC = (): JSX.Element => {
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
              <div className="dashboard-number">79</div>
            </div>
          </div>
        </Col>

        <Col>
          <div className="box-container dep">
            <h3>departments</h3>
            <div className="dashboardCard 1">
              <div className="dashboard-icon">{<FaLandmark />}</div>
              <div className="dashboard-number">79</div>
            </div>
          </div>
        </Col>

        <Col>
          <div className="box-container leave">
            <h3>laeves</h3>
            <div className="dashboardCard 1">
              <div className="dashboard-icon">{<FaUsersSlash />}</div>
              <div className="dashboard-number">79</div>
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
