import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { plugins } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";

export default function ReturnsChart() {
  const [chartData, setchartData] = useState({ labels: [], datasets: [] });
  const [colors, setcolors] = useState([
    "#3A6FF8",
    "#14CC26",
    "#FFBE17",
    "#FF613E",
  ]);

  async function getChartData() {
    return await axios
      .get(
        "http://nilelon.somee.com/api/AdminReturnedOrder/GetTopReturnedStores"
      )
      .then((res) => {
        console.log(res.data.result);
        const returnedData = res.data.result;

        const labels = returnedData.map((store) => store.storeName);
        const datasets = returnedData.map((store) => store.returnedItemCount);

        setchartData({
          labels: labels,
          datasets: [
            {
              label: "Store Returns",
              data: datasets,
              backgroundColor: colors.slice(0, chartData.length),
              borderColor: "FFBA56",
              fill: true,
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  useEffect(() => {
    getChartData();
  }, []);

  const returnsChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRation: false,
    barThickness: 30,
  };
  return (
    <div>
      <Bar data={chartData} options={returnsChartOptions} />
    </div>
  );
}
