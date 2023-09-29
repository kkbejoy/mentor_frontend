import React, { useState } from "react";

import { Field, Formik, Form, ErrorMessage } from "formik";
import { mentorNewTimeSlotApi } from "../../../api/mentorConfiguration/mentorServices";
import {
  addOneHour,
  convertTimeToISoFormat,
} from "../../../utilities/timeManagementFunctions";
import Modal from "react-modal";
Modal.setAppElement("#root");

const MentorFormModalComponent = ({
  newSlotModalOpen,
  setNewSlotModal,
  startTime,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const formattedTime = convertTimeToISoFormat(startTime);
  console.log("start time from modal component:", formattedTime);
  const endTime = addOneHour(formattedTime);

  const initialValues = {
    start: formattedTime,
    end: endTime,
    type: "available",
    mentorPreferences: "",
  };

  const handleNewScheduleSubmission = async (
    values,
    { setSubmitting, setFieldError }
  ) => {
    try {
      setLoading(true);
      console.log("Form Entry:", values);
      const respose = mentorNewTimeSlotApi(values);
      respose.then((res) => {
        setNewSlotModal(false);
        setLoading(false);
      });
    } catch (error) {}
  };
  return (
    <div className="w-1/2">
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal
        isOpen={newSlotModalOpen}
        onRequestClose={() => setNewSlotModal(false)}
        contentLabel="My Modal" // Add a content label for accessibility
      >
        <h1 className="text-xl font-bold align-middle">
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
            <div>
              <button className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {isLoading ? "Loading......." : "Add Slot"}
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default MentorFormModalComponent;
