import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailyEnrollmentData } from "../../../slices/ModeratorSlices/DailyEnrollmentdataSlice";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChatLineGraphSkeleton from "../../General/Charts/Loaders/ChartLineGraphLoader";

const DailyEnrollmentGraph = () => {
  const dispatch = useDispatch();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const dailyEnrollmentData = useSelector(
    (state) => state?.moderatorDailyEnrollmentData?.data
  );
  const isDataLoading = useSelector(
    (state) => state?.moderatorDailyEnrollmentData?.isLoading
  );

  const [inputData, setInputData] = useState({
    labels: dailyEnrollmentData?.map(
      (data) => data._id.day + "-" + data._id.month
    ),
    datasets: [
      {
        label: "Mentees Gained",
        data: dailyEnrollmentData?.map((data) => data.count),
        color: "red",
        // backgroundColor: "green",
        borderColor: "green",
        fill: false,
      },
    ],
  });

  console.log("Dailyu enrollment data from state", inputData);
  useEffect(() => {
    dispatch(fetchDailyEnrollmentData());
  }, []);

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
    <div className=" h-96 w-2/3 mt-7 px-20 shadow-lg m-3 ">
      <p className="text-left font-semibold"> Enrollments Data</p>
      {!isDataLoading ? (
        <Line ref={chartRef} data={inputData} className="  p-3" />
      ) : (
        <ChatLineGraphSkeleton />
      )}{" "}
    </div>
  );
};

export default DailyEnrollmentGraph;
