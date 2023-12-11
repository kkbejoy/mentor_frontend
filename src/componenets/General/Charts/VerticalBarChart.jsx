import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

const VerticalBarChart = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Category 1", "Category 2", "Category 3", "Category 4"],
        datasets: [
          {
            label: "Data Set 1",
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(75,192,192,0.6)",
            hoverBorderColor: "rgba(75,192,192,1)",
            data: [65, 59, 80, 81],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default VerticalBarChart;
