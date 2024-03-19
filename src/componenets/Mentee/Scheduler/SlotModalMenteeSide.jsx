import React, { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {
  addOneHour,
  convertTimeToISoFormat,
} from "../../../utilities/timeManagementFunctions";
import Modal from "react-modal";
import { fixMentorSlotByMentee } from "../../../api/menteesConfiguration/menteeServices";
import { convertTimeForMentorSlotViewModal } from "../../../utilities/calenderUtilities";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { menteesInputWhileFixingTimeSlot } from "../../../validations/menteesInputWhileSlotFixing";
import { fetchTimeSlotsMenteeSide } from "../../../slices/MenteeSlices/timeSlotSlice";
import { setUpSocket } from "../../../utilities/chatUtilities";
import { getMenteeIdFromLocalStorage } from "../../../utilities/reusableFunctions";

Modal.setAppElement("#root");

const SlotModalMenteeSide = ({
  newSlotModalOpen,
  setNewSlotModal,
  slotObject,
  menteeId,
  renderState,
  setCalenderRerenderFunction,
}) => {
  let socket;
  const [isLoading, setLoading] = useState(false);
  const [slotStatus, setSlotStatus] = useState({});
  const formattedStartTime = convertTimeToISoFormat(slotObject.start);

  const endTime = addOneHour(formattedStartTime);
  const dateObject = convertTimeForMentorSlotViewModal(
    formattedStartTime,
    endTime
  );
  useEffect(() => {
    socket = setUpSocket(menteeId);
  }, []);
  useEffect(() => {
    socket.emit("slotBooked", slotStatus);
  }, [slotStatus]);
  //Initial Form Values
  const initialValues = {
    menteeQueryTitle: " ",
    menteeQueryDescription: "",
  };

  //Function to fix  a time slot
  const handleSlotAllocationByMentee = async (
    values,
    { setSubmitting, setFieldError }
  ) => {
    try {
      setLoading(true);

      delete values.end;
      delete values.start;
      const respose = fixMentorSlotByMentee(values, slotObject._id);
      console.log("Res00", respose);

      respose.then((res) => {
        console.log("Res001", res);
        setSlotStatus(res);
        const newRes = { ...renderState, ...res };
        setCalenderRerenderFunction(newRes);
        setNewSlotModal(false);
        setLoading(false);
      });
      respose.catch((error) => {
        console.log("Err", error);
        throw error;
      });
    } catch (error) {
      toast.error("Sorry SLot allocation failed");
      setLoading(false);
      setCalenderRerenderFunction(error);
      setNewSlotModal(false);
      console.log("Error", error);
    }
  };
  return (
    <>
      {" "}
      <Modal
        isOpen={newSlotModalOpen}
        onRequestClose={() => setNewSlotModal(false)}
        contentLabel="My Modal" // Add a content label for accessibility
        className="w-full p-3 max-w-lg h-[78vh] bg-white rounded-lg shadow-lg items-center mx-auto mt-20"
      >
        <div className=" p-5 ">
          <h1 className="text-xl text-center font-bold align-middle">
            Schedule a Live Session with Your Mentor{" "}
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={menteesInputWhileFixingTimeSlot}
            onSubmit={handleSlotAllocationByMentee}
          >
            <Form className="space-y-6 pt-4">
              <div>
                <div className=" flex flex-col-2">
                  {" "}
                  <img
                    className="w-1/6 h-1/6 rounded-full object-cover pt-3"
                    src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${slotObject.mentorProfileImage}`}
                    alt=""
                  />
                  <div className="p-2">
                    <h1 className="text-xl font-normal pt-5 hover:scale-105  transform-cpu transition-transform ">
                      <Link
                        to={`/mentees/browse/mentor/profile/${slotObject.mentorId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {slotObject.mentorName}{" "}
                      </Link>
                    </h1>
                  </div>
                </div>
                <div className="flex fex-col-2 pt-2">
                  <div>
                    <h1 className="block text-md font-medium text-gray-900">
                      Date:
                    </h1>
                  </div>
                  <div>
                    <h2 className=" mx-2 text-sm">{dateObject?.date}</h2>
                  </div>
                </div>
                <div className="flex fex-col-2">
                  <div>
                    <h1 className="block text-md font-medium text-gray-900">
                      Time:
                    </h1>
                  </div>
                  <div>
                    <h2 className=" mx-2 text-sm">
                      {dateObject?.startTime}-{dateObject?.endTime}
                    </h2>
                  </div>
                </div>

                <label
                  htmlFor="menteeQueryTitle"
                  className="block text-sm font-medium leading-6 pt-5 text-gray-900 "
                >
                  Please share the topic you'd like to discuss
                </label>
                <div className="mt-2">
                  <Field
                    id="menteeQueryTitle"
                    name="menteeQueryTitle"
                    type="text"
                    component="textarea"
                    autoComplete="off"
                    required
                    className="px-2 block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="menteeQueryTitle"
                    component="div"
                    className="text-red-500"
                  ></ErrorMessage>
                </div>

                <label
                  htmlFor="menteeQueryDescription"
                  className="block text-sm font-medium leading-6 mt-5 text-gray-900"
                >
                  Tell us a little about the topic you'd like to discuss.
                </label>
                <div className="mt-2">
                  <Field
                    id="menteeQueryDescription"
                    name="menteeQueryDescription"
                    type="text"
                    component="textarea"
                    rows="5"
                    autoComplete="off"
                    className="px-2 block w-full h-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                  <ErrorMessage
                    name="menteeQueryDescription"
                    component="div"
                    className="text-red-500"
                  ></ErrorMessage>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex w-1/2 justify-center rounded-md bg-mentorBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading ? "Loading......." : "Confirm this time"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default SlotModalMenteeSide;
