import React, { useState } from "react";

import { Field, Formik, Form, ErrorMessage } from "formik";
import { mentorNewTimeSlotApi } from "../../../api/mentorConfiguration/mentorServices";
import {
  addOneHour,
  convertTimeToISoFormat,
} from "../../../utilities/timeManagementFunctions";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { Toaster, toast } from "sonner";
import { fetchMentorTimeSlots } from "../../../slices/MentorSlices/AvailableTimeSlotsSlice";
import { getUserIdAndToken } from "../../../utilities/reusableFunctions";
import { addOneHourWithGMT } from "../../../utilities/timeManagementFunctions";
const MentorFormModalComponent = ({
  newSlotModalOpen,
  setNewSlotModal,
  startTime,
  setCalenderRerenderFunction,
  renderState,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { mentorId } = getUserIdAndToken("mentorAuth");

  const formattedTime = convertTimeToISoFormat(startTime);
  const endTime = addOneHour(formattedTime);
  const endTimeInGMT = addOneHourWithGMT(startTime);
  const initialValues = {
    start: formattedTime,
    end: endTime,
    type: "available",
    mentorPreferences: "",
  };
  console.log("Start time", startTime);

  const handleNewScheduleSubmission = async (
    values,
    { setSubmitting, setFieldError }
  ) => {
    try {
      setLoading(true);
      const SlotBookingObject = {
        start: startTime,
        end: endTimeInGMT,
        type: "available",
      };
      console.log("Time:", SlotBookingObject);
      const respose = mentorNewTimeSlotApi(SlotBookingObject);
      respose.then((res) => {
        const newRes = { ...renderState, ...res };
        setLoading(false);
        setNewSlotModal(false);
        setCalenderRerenderFunction(newRes);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="w-1/2">
    //   <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
    <>
      <Modal
        isOpen={newSlotModalOpen}
        onRequestClose={() => setNewSlotModal(false)}
        contentLabel="My Modal" // Add a content label for accessibility
        className="w-full max-w-lg h-fit p-5 bg-white rounded-lg shadow-lg items-center mx-auto mt-20"
      >
        <div className=" p-5 ">
          <h1 className="text-xl text-center font-bold align-middle">
            Add Available Time Slots
          </h1>
          <Formik
            initialValues={initialValues}
            // validationSchema={menteeRegistrationValidationSchema}
            onSubmit={handleNewScheduleSubmission}
          >
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="mentorPreferences"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter preffered modes during this time
                </label>
                <div className="mt-2">
                  <Field
                    id="mentorPreferences"
                    name="mentorPreferences"
                    type="text"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="start"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Time
                </label>
                <div className="mt-2">
                  <Field
                    disabled
                    id="start"
                    name="start"
                    type="datetime-local"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="end"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  End Time
                </label>
                <div className="mt-2">
                  <Field
                    disabled
                    id="end"
                    name="end"
                    type="datetime-local"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button className="flex w-1/2  justify-center rounded-md bg-mentorBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {isLoading ? "Loading......." : "Add Slot"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
      <Toaster />
    </>
  );
};

export default MentorFormModalComponent;
