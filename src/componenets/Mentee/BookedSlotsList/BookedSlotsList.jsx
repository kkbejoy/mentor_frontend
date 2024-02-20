/* eslint-disable no-useless-catch */
import React, { useState } from "react";
import {
  compareTimeWithCurrentTime,
  extractDateFromInput,
  extractTimeFromInput,
} from "../../../utilities/timeManagementFunctions";
import ConfirmationModal from "../../General/Modals/CancelConfirmationModal";
import { cancelABookedSlot } from "../../../api/menteesConfiguration/menteeServices";
import { CLIENT_URL } from "../../../constants/constants";

const BookedSlotsListComponenet = ({
  BookeSotsList,
  setPageRerender,
  pageRerenderState,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleMenteeGoLive = async (slotId, menteeName) => {
    try {
      window.open(`${CLIENT_URL}/mentees/connect/live/${slotId}`);
    } catch (error) {
      console.log("error:", error);
      toast.error("Please refresh the page..!!");
    }
  };

  const handleSlotCancelButton = async (slotId) => {
    try {
      console.log(slotId);
      const responseFromAPI = await cancelABookedSlot(slotId);
      setPageRerender({ ...pageRerenderState, ...responseFromAPI });
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        setModalOpen={undefined}
        confirmAPI={undefined}
        onCancel={undefined}
        message={undefined}
      />
      <div className="mx-auto items-center text-center h-screen overflow-y-clip ">
        <table className="mx-auto mt-4 ">
          <tr className="border-b border-gray-200 hover:bg-gray-100  shadow-md">
            <th className="py-3 px-6 text-center">Sl</th>
            <th className="py-3 px-6">Mentor </th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">Time</th>
            <th className="py-3 px-6 text-center">
              {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> */}
              Actions
              {/* </button> */}
            </th>
          </tr>
          {/* //Map this component */}
          {BookeSotsList?.map((slots, index) => {
            const Date = extractDateFromInput(slots?.start);
            const time = extractTimeFromInput(slots?.start);
            const difference = compareTimeWithCurrentTime(slots?.start);

            console.log("Slots", slots);
            return (
              <tr
                key={slots._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-center shadow-sm">{index + 1}</td>
                <td className="py-3 px-6">
                  {slots?.mentorId?.firstName} {slots?.mentorId?.lastName}
                </td>
                <td className="py-3 px-6">{Date}</td>
                <td className="py-3 px-6">{time}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleSlotCancelButton(slots._id)}
                    className={`bg-red-500 hover:bg-red-700 text-white font-normal py-2 px-4 rounded-full ${
                      difference ? "hidden" : null
                    }`}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleMenteeGoLive(slots?._id, slots?.menteeId?.firstName)
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
    </>
  );
};

export default BookedSlotsListComponenet;
