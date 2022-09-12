import { useState, useEffect } from "react";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./chart-styles.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const LineChart = () => {
  const [dashStatsNum, SetDashStatsNum] = useState<Number[]>();
  const [dashStatsStr, SetDashStatsStr] = useState<String[]>();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `${DOMAIN.URL}/api/v1/leaves/get-leave-stats`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      SetDashStatsNum(
        data?.data?.stats2.map((el: { sum: Number; _id: String }) => el.sum)
      );
      SetDashStatsStr(
        data?.data?.stats2.map((el: { sum: Number; _id: String }) => el._id)
      );
    };
    getData();
  }, [token]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels: dashStatsStr,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: dashStatsNum,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line options={options} data={data} />
    </div>
  );
};
export default LineChart;
