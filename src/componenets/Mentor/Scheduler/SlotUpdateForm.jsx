import React, { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import Modal from "react-modal";

import { convertTimeForMentorSlotViewModal } from "../../../utilities/calenderUtilities";
import { deleteSlot } from "../../../api/mentorConfiguration/mentorServices";
import { setUpSocket } from "../../../utilities/chatUtilities";
import { getMentorIdFromLocalStorage } from "../../../utilities/reusableFunctions";

const SlotUpdateForm = ({
  updateModalOpen,
  setUpdateModal,
  SlotObject,
  setCalenderRerenderFunction,
  renderState,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [isDeleted, setDeleted] = useState(false);
  const mentorId = getMentorIdFromLocalStorage();
  const socketInstance = setUpSocket(mentorId);
  console.log("Slot object", SlotObject);
  useEffect(() => {
    // SlotObject.then((slot) => {
    // socketInstance?.emit("scheduler", slot.resonseFromDb);
    setData(SlotObject.resonseFromDb);
    // });
  }, [SlotObject]);

  useEffect(() => {}, [data]);

  const dateObject = convertTimeForMentorSlotViewModal(data.start, data.end);

  const handleSlotDeletion = async () => {
    try {
      setLoading(true);
      console.log("Delete Button Pressed");

      const res = await deleteSlot(data?._id);
      console.log("Resinse from deletetion", res);
      const newRes = { ...renderState, ...res };
      socketInstance?.emit("scheduler", res?.data?.notifyMentee);

      setData(true);
      setCalenderRerenderFunction(newRes);
      setLoading(false);
      setUpdateModal(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };
  return (
    <>
      <Modal
        isOpen={updateModalOpen}
        onRequestClose={() => setUpdateModal(false)}
        contentLabel="My Modal" // Add a content label for accessibility
        className="w-full p-5 max-w-lg h-fit bg-white rounded-lg shadow-lg items-center mx-auto mt-20"
      >
        <div className=" p-5 ">
          <h1 className="text-xl text-center font-bold align-middle">
            Allotted Slot
          </h1>

          {/* <Formik> */}
          <div className="space-y-6">
            <div className="flex flex-row mt-3">
              <div>
                <h1 className="text-md font-semibold text-gray-950">
                  Mentee Name:
                </h1>
              </div>
              <div>
                <h2 className="text-md font-normal text-gray-950 mx-2">
                  {data?.menteeId?.firstName ? data?.menteeId?.firstName : null}{" "}
                  {data?.menteeId?.firstName ? data?.menteeId.lastName : null}
                </h2>
              </div>
            </div>

            <div className="flex fex-col-2">
              <div>
                <h1 className="block text-md font-medium text-gray-900">
                  Time:
                </h1>
              </div>
              <div>
                <h2 className=" mx-2">
                  {dateObject.date},{dateObject.startTime}-{dateObject.endTime}
                </h2>
              </div>
            </div>

            <div className="flex flex-row mt-3">
              <div>
                <h1 className="text-md font-semibold text-gray-950">Status</h1>
              </div>
              <div>
                <h2 className="text-md font-normal text-gray-950 mx-2">
                  {data?.type ? data?.type : null}
                </h2>
              </div>
            </div>

            <div className="flex flex-row mt-3">
              <div>
                <h1 className="text-md font-semibold text-gray-950">
                  Discussion Topic:
                </h1>
              </div>
              <div className="flex overflow-x-hidden">
                <h2 className="text-md font-normal w-72 text-gray-950 mx-2  truncate">
                  {data?.menteeQueryTitle ? data?.menteeQueryTitle : null}
                </h2>
              </div>
            </div>

            <div className="flex flex-row mt-3 ">
              <div>
                <h1 className="text-md font-semibold text-gray-950">
                  Details:
                </h1>
              </div>
              <div className="h-52 flex overflow-y-auto">
                <h2 className="text-md font-normal h-52 flex  w-96 text-gray-950 mx-2 ">
                  {data?.menteeQueryDescription
                    ? data?.menteeQueryDescription
                    : null}
                </h2>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSlotDeletion}
                // className="flex w-1/2  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                className={`flex w-1/2 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                  isLoading ? "bg-gray-400 cursor-wait" : "bg-red-600"
                } ${
                  isLoading ? "pointer-events-none" : "pointer-events-auto"
                } hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {isLoading ? "Loading......." : "Remove Slot"}
              </button>
            </div>
          </div>
          {/* </Formik> */}
        </div>
      </Modal>
    </>
  );
};

export default SlotUpdateForm;
