import React from "react";
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

const BarChart = () => {
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

  const labels = ["holiday", "sick-leave", "vacation", "emergency"];

  const data = {
    labels,
    datasets: [
      {
        label: "Leave type",
        data: labels.map((el, i) => i),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "LeaveType",
        data: labels.map((el, i) => i),
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
