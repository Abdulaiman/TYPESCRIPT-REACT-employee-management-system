import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./chart-styles.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = (): JSX.Element => {
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
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data = {
    labels: dashStatsStr,
    datasets: [
      {
        label: "Leave type",
        data: dashStatsNum,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "LeaveType",
        data: dashStatsNum,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarChart;
