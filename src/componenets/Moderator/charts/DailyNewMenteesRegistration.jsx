import React, { useEffect, useRef, useState } from "react";

import ChatLineGraphSkeleton from "../../General/Charts/Loaders/ChartLineGraphLoader";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { useDispatch, useSelector } from "react-redux";
import { fetchDailyMenteeRegistrationData } from "../../../slices/ModeratorSlices/DailyMenteeRegistrationSlice";

const DailyNewMenteesRegistration = () => {
  const dispatch = useDispatch();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const dailyMenteeRegistrationData = useSelector(
    (state) => state?.moderatorMenteeRegistrationData?.data
  );

  const isDataLoading = useSelector(
    (state) => state?.moderatorMenteeRegistrationData?.isLoading
  );
  const [inputData, setInputData] = useState({
    labels: dailyMenteeRegistrationData?.map(
      (data) => data._id.day + "-" + data._id.month
    ),
    datasets: [
      {
        label: "New Mentees",
        data: dailyMenteeRegistrationData?.map((data) => data.count),
        borderColor: "Red",
      },
    ],
  });

  console.log("Daily mentee reg:", inputData);
  useEffect(() => {
    dispatch(fetchDailyMenteeRegistrationData());
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
    <div className=" h-96 w-2/3 mt-7 px-20 shadow-lg m-3">
      <p className="text-left font-semibold">New Mentees</p>
      {!isDataLoading ? (
        <Line ref={chartRef} data={inputData} className="  p-3" />
      ) : (
        <ChatLineGraphSkeleton />
      )}{" "}
    </div>
  );
};

export default DailyNewMenteesRegistration;
