import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { color } from "chart.js/helpers";

export default function PieChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [colors, setcolors] = useState([
    "#3A6FF8",
    "#14CC26",
    "#FFBE17",
    "#FF613E",
  ]);

  // handle chart data
  async function getChartData() {
    return await axios
      .get("http://nilelon.somee.com/api/AdminDashboard/GetMostOrdersLocation")
      .then((res) => {
        const returnedData = res.data.result;
        console.log(returnedData, "PIE CHART");
        const labels = returnedData.map((item) => item.governate);
        const data = returnedData.map((item) => item.orderCount);

        // set data in chart
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Orders Location",
              data: data,
              backgroundColor: colors.slice(0, data.length),
            },
          ],
        });
      })
      .catch((errror) => {
        console.log(errror);
      });
  }

  useEffect(() => {
    getChartData();
  }, []);

  const pieChartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Doughnut data={chartData} options={pieChartOptions} />
    </div>
  );
}
