import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Form, Link } from "react-router-dom";
import {
  getMenteeIdFromLocalStorage,
  getUserIdAndToken,
} from "../../../utilities/reusableFunctions";
import { getMenteeNameFromLocalStorage } from "../../../utilities/localStorageUtilities";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscribedMentorsList } from "../../../slices/MenteeSlices/subscribedMentorsListSlice";
import { convertTimeToISoFormat } from "../../../utilities/timeManagementFunctions";
import { sub } from "date-fns";

const RaiseANewTicketModal = () => {
  const [isLoading, setLoading] = useState(false);
  const [subject, setSubject] = useState("false");
  const [content, setContent] = useState("false");

  const { menteeId } = getUserIdAndToken("menteeAuth");

  const subscribedMentorsList = useSelector(
    (state) => state.menteeSideSubscribedMentorsList
  );
  const date = new Date();
  const currentDate = convertTimeToISoFormat(date);
  // console.log("List of subscibed mentors", subscribedMentorsList);
  const menteeName = getMenteeNameFromLocalStorage();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSubscribedMentorsList(menteeId));
  }, []);
  const initialValues = {
    accussedMentor: "",
    subject: "",
    content: "",
  };
  console.log("subject", subject);
  const handleTicketSubmit = async (
    values,
    { setSubmitting, setFieldError }
  ) => {
    try {
      console.log("Button clicked", values);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <Modal
        isOpen={true}
        // onRequestClose={() => setNewSlotModal(false)}
        contentLabel="My Modal" // Add a content label for accessibility
        className="w-full max-w-lg h-[80vh] bg-white rounded-lg shadow-lg items-center mx-auto mt-20"
      >
        <div className=" p-5 ">
          <h1 className="text-xl text-center font-bold align-middle">
            Raise a Ticket
          </h1>
          <Formik
            initialValues={initialValues}
            // validationSchema={menteesInputWhileFixingTimeSlot}
            onSubmit={handleTicketSubmit}
          >
            <Form className="space-y-6 pt-4">
              <div>
                <div className=" flex flex-col-2">
                  {" "}
                  {/* <img
                    className="w-1/6 h-1/6 rounded-full object-cover pt-3"
                    src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${slotObject.mentorProfileImage}`}
                    alt=""
                  /> */}
                  <div className="p-2">
                    <h1 className="text-xl font-normal pt-5 hover:scale-105  transform-cpu transition-transform ">
                      {/* <Link
                        to={`/mentees/browse/mentor/profile/${slotObject.mentorId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {slotObject.mentorName}{" "}
                      </Link> */}
                    </h1>
                  </div>
                </div>
                <div className="flex fex-col-2 pt-2">
                  <div>
                    <h1 className="block text-md font-medium text-gray-900">
                      From: {menteeName}
                    </h1>
                  </div>
                  <div>
                    {/* <h2 className=" mx-2 text-sm">{dateObject?.date}</h2> */}
                  </div>
                </div>
                <div className="flex fex-col-2">
                  <div>
                    <h1 className="block text-md font-medium text-gray-900">
                      Date: {currentDate}
                    </h1>
                  </div>
                  <div>
                    {/* <h2 className=" mx-2 text-sm">
                      {dateObject?.startTime}-{dateObject?.endTime}
                    </h2> */}
                  </div>
                </div>{" "}
                <label
                  htmlFor="accussedMentor"
                  className="block text-sm font-medium leading-6 pt-5 text-gray-900 "
                >
                  Select the Accussed
                </label>
                <div className="mt-2">
                  <Field
                    as="select"
                    id="accussedMentor"
                    name="accussedMentor"
                    type="text"
                    autoComplete="off"
                    required
                    className="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {subscribedMentorsList?.data.map((enrollment) => {
                      return (
                        <option
                          value={enrollment?.mentorId?._id}
                          key={enrollment?.mentorId?._id}
                        >
                          {enrollment?.mentorId?.firstName +
                            enrollment?.mentorId?.lastName}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="accussedMentor"
                    component="div"
                    className="text-red-500"
                  ></ErrorMessage>
                </div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium leading-6 pt-5 text-gray-900 "
                >
                  Subject
                </label>
                <div className="mt-2">
                  <Field
                    onchange={(e) => {
                      setSubject(e.target.value);
                    }}
                    id="subject"
                    name="subject"
                    type="text"
                    autoComplete="off"
                    required
                    className="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></Field>
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-red-500"
                  ></ErrorMessage>
                </div>{" "}
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 mt-5 text-gray-900"
                >
                  Tell us a little about the issue you have faced.
                </label>
                <div className="mt-2">
                  <Field
                    id="content"
                    name="content"
                    type="text"
                    autoComplete="off"
                    className="block w-full h-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />{" "}
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="text-red-500"
                  ></ErrorMessage>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  //   onSubmit={handleTicketSubmit}
                  className="flex w-1/2 justify-center rounded-md bg-mentorBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading ? "Loading......." : "Raise a Ticket"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default RaiseANewTicketModal;
