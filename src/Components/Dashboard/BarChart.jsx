import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  async function getChartData() {
    return axios
      .get(
        "http://nilelon.somee.com/api/AdminDashboard/GetTopStoresByOrderCount"
      )
      .then((res) => {
        const returnedData = res.data.result;
        const labels = returnedData.map((store) => store.storeName);
        const data = returnedData.map((store) => store.orderCount);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Top Stores",
              data: data,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              fill: true,
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getChartData();
  }, []);

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 250,
        ticks: {
          stepSize: 50,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    // maintainAspectRatio: false,
    barThickness: 30,
  };

  return (
    <div className="">
      <Bar data={chartData} options={barChartOptions} />
    </div>
  );
}
