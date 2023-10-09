import React, { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import Modal from "react-modal";

import { convertTimeForMentorSlotViewModal } from "../../../utilities/calenderUtilities";
import { deleteSlot } from "../../../api/mentorConfiguration/mentorServices";

const SlotUpdateForm = ({
  updateModalOpen,
  setUpdateModal,
  SlotObject,
  setCalenderRerender,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  console.log("Modal Data", SlotObject.resonseFromDb);

  SlotObject.then((slot) => {
    console.log(slot);
    setData(slot.resonseFromDb);
  });

  const dateObject = convertTimeForMentorSlotViewModal(data.start, data.end);

  const handleSlotDeletion = async () => {
    try {
      console.log("Handle Slot Deletion", data?._id);
      const res = deleteSlot(data?._id);
      setCalenderRerender(res);
      setUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        isOpen={updateModalOpen}
        onRequestClose={() => setUpdateModal(false)}
        contentLabel="My Modal" // Add a content label for accessibility
        className="w-full max-w-lg h-[75vh] bg-white rounded-lg shadow-lg items-center mx-auto mt-20"
      >
        <div className=" p-5 ">
          <h1 className="text-xl text-center font-bold align-middle">
            Allotted Slot
          </h1>

          {/* <Formik> */}
          <form className="space-y-6">
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
              <div>
                <h2 className="text-md font-normal text-gray-950 mx-2">
                  {data?.menteeQueryTitle ? data?.menteeQueryTitle : null}
                </h2>
              </div>
            </div>

            <div className="flex flex-row mt-3">
              <div>
                <h1 className="text-md font-semibold text-gray-950">
                  Details:
                </h1>
              </div>
              <div>
                <h2 className="text-md font-normal text-gray-950 mx-2">
                  {data?.menteeQueryDescription
                    ? data?.menteeQueryDescription
                    : null}
                </h2>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSlotDeletion}
                className="flex w-1/2  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Loading......." : "Remove Slot"}
              </button>
            </div>
          </form>
          {/* </Formik> */}
        </div>
      </Modal>
    </>
  );
};

export default SlotUpdateForm;
