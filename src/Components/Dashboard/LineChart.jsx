import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

export default function LineChart({ startDate, endDate }) {
  // console.log(startDate, "from line chart");
  // console.log(endDate, "from line chart");

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // handle chart data

  async function getChartData() {
    return axios
      .get(
        "http://nilelon.somee.com/api/AdminDashboard/GetAdminOrdersChartData",
        {
          params: {
            status: "Ordered",
            startDate: "2024-08-01T12:54:16.606Z",
            endDate: "2024-10-02T12:54:16.606Z",
          },
        }
      )
      .then((res) => {
        console.log("RECEIVED ORDERS", res.data.result);

        const returnedData = res.data.result;
        // const labels = returnedData.map((item)=>);
        // const data = returnedData.map((item)=>);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getChartData();
  }, []);

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Received orders",
        data: [0, 90, 100, 150, 110, 200],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        tension: 0.4, // Smooth lines
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointBorderWidth: 2,
        pointRadius: 5,
        fill: true, // Area fill under the line
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 250,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw + " orders"; // Label for tooltip
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={lineChartData} options={lineChartOptions} />
    </div>
  );
}
