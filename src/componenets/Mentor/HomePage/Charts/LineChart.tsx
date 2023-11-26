import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChatLineGraphSkeleton from "../../../General/Charts/Loaders/ChartLineGraphLoader";
import { useSelector } from "react-redux";

const LineChart = ({ InputData }) => {
  const isDataLoading = useSelector(
    (state) => state?.mentorHomePageEnrolledMenteesForGraph?.isLoading
  );
  const [inputData, setInputData] = useState({
    labels: InputData?.map((data) => data._id.day + "-" + data._id.month),
    datasets: [
      {
        label: "Mentees Gained",
        data: InputData?.map((data) => data.count),
        borderColor: "green",
      },
    ],
  });

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart
      chartInstance.current = new ChartJS(ctx, {
        type: "line",
        data: inputData,
      });
    }
  }, [inputData]);

  return (
    <div className=" h-96 w-2/3 mt-7 px-20">
      <p className="text-left font-semibold">New Mentees Enrollments</p>
      {!isDataLoading ? (
        <Line ref={chartRef} data={inputData} className=" shadow-lg p-3" />
      ) : (
        <ChatLineGraphSkeleton />
      )}{" "}
    </div>
  );
};

export default LineChart;
