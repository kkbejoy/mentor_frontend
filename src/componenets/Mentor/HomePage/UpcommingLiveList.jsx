import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingLivesMentorHomePage } from "../../../slices/MentorSlices/HomePageLiveList";
import {
  compareTimeWithCurrentTime,
  extractDateFromInput,
  extractTimeFromInput,
} from "../../../utilities/timeManagementFunctions";
import { BASE_URL } from "../../../constants/constants";
import { toast } from "sonner";

const UpcommingLiveList = () => {
  const dispatch = useDispatch();
  const liveData = useSelector(
    (state) => state?.mentorHomePageTodaysLiveList?.data
  );
  console.log("Upcoming live lst", liveData);
  useEffect(() => {
    console.log("From useEffects");
    dispatch(fetchUpcomingLivesMentorHomePage());
  }, []);

  const handleMentorGoLive = async (slotId, menteeName) => {
    try {
      window.open(`http://localhost:5173/mentors/connect/live/${slotId}`);
    } catch (error) {
      console.log("error:", error);
      toast.error("Please refresh the page..!!");
    }
  };
  return (
    <div className="w-fit bg-white flex items-end ">
      {" "}
      <div className="mx-auto items-center text-center h-screen overflow-y-clip ">
        <h1 className="text-md font-semibold text-black">
          Upcoming Live Sessions{" "}
          <span className="text-sm font-thin">(next 24hr)</span>
        </h1>
        <span className="text-sm font-thin">
          (Link to Live Room will become available at the scheduled time)
        </span>
        <table className="mx-auto mt-4 ">
          <tr className="border-b border-gray-200 hover:bg-gray-100  ">
            {/* <th className="py-3 px-6 text-center">Sl</th> */}
            <th className="py-3 px-6">Mentee </th>
            {/* <th className="py-3 px-6">Date</th> */}
            <th className="py-3 px-6">Time</th>
            <th className="py-3 px-6 text-center">
              {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> */}
              Go Live
              {/* </button> */}
            </th>
          </tr>
          {/* //Map this component */}
          {liveData?.map((slots, index) => {
            const time = extractTimeFromInput(slots?.start);
            const difference = compareTimeWithCurrentTime(slots?.start);

            console.log("Current TIme", difference);

            console.log("Slots", slots);
            return (
              <tr
                key={slots._id}
                className="border-b border-gray-200 hover:bg-gray-100 shadow-lg hover:bg-red-50"
              >
                {/* <td className="py-3 px-6 text-center shadow-sm">{index + 1}</td> */}
                <td className="py-3 px-6">
                  {slots?.menteeId?.firstName} {slots?.menteeId?.lastName}
                </td>
                {/* <td className="py-3 px-6">{Date}</td> */}
                <td className="py-3 px-6">{time}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() =>
                      handleMentorGoLive(slots?._id, slots?.menteeId?.firstName)
                    }
                    className={` bg-gradient-to-r from-green-700 to-green-500 animate-pulse text-white font-normal py-2 px-4 rounded-full transition-transform ${
                      difference ? null : "hidden"
                    } hover:bg-green-700 hover:scale-105`}
                  >
                    Go Live
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default UpcommingLiveList;
