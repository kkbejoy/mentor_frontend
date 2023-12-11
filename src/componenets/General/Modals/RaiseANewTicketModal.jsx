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
import { raiseANewTicketFromMenteeSide } from "../../../api/menteesConfiguration/menteeServices";
import { toast } from "sonner";
import { userTypes } from "../../../constants/constants";
import { fetchSubscribedMenteesList } from "../../../slices/MentorSlices/subscibedMentees";
import { raiseANewTicketFromMentorSide } from "../../../api/mentorConfiguration/mentorServices";

const RaiseANewTicketModal = ({
  userType,
  modalState,
  modalFunction,
  pageRerenderFunction,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [accussedId, setAccusedId] = useState("");

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const { menteeId } = getUserIdAndToken("menteeAuth");

  //List of Subscribed Mentors by a Menteee For Mentee side
  const subscribedMentorsList = useSelector(
    (state) => state.menteeSideSubscribedMentorsList?.data
  );

  //List of Mentees Subscribed to this mentor for Mentor side
  const menteesSubscribedToThisMentor = useSelector(
    (state) => state.subscribedMenteesList.data
  );
  const date = new Date();
  const currentDate = convertTimeToISoFormat(date);
  // console.log("List of subscibed mentors", menteesSubscribedToThisMentor);
  const menteeName = getMenteeNameFromLocalStorage();

  useEffect(() => {
    userType === userTypes.MENTEE
      ? dispatch(fetchSubscribedMentorsList(menteeId))
      : dispatch(fetchSubscribedMenteesList());
  }, []);

  //Form Submission Function
  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(" Tikcet objct", accussedId, subject, content);
      if (!accussedId || accussedId === "") {
        toast.error("Choose an Accussed");
        return;
      }
      let responseFromAPI;
      if (userType === userTypes.MENTEE) {
        responseFromAPI = await raiseANewTicketFromMenteeSide({
          accussedId,
          subject,
          content,
        });
      } else {
        responseFromAPI = await raiseANewTicketFromMentorSide({
          accussedId,
          subject,
          content,
        });
      }
      pageRerenderFunction({ ...responseFromAPI });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      modalFunction(false);
    }
  };
  return (
    <>
      {" "}
      <Modal
        isOpen={modalState}
        onRequestClose={() => modalFunction(false)}
        contentLabel="My Modal" // Add a content label for accessibility
        className="w-full max-w-lg h-[80vh] bg-white rounded-lg p-5 shadow-lg items-center mx-auto mt-20"
      >
        <div className=" p-5 ">
          <h1 className="text-xl text-center font-bold align-middle">
            Raise a Ticket
          </h1>
        </div>

        {/* <Formik initialValues={initialValues} onSubmit={handleTicketSubmit}> */}
        <>
          <div className=" pt-2">
            <div>
              <h1 className="block text-md font-medium text-gray-900">
                From: {menteeName}( {userType})
              </h1>
            </div>

            <div>
              <h1 className="block text-md font-medium text-gray-900 pt-3">
                Date: {currentDate}
              </h1>
            </div>
          </div>{" "}
          <form>
            <div>
              <label
                htmlFor="accussedMentor"
                className="block text-sm font-medium leading-6 pt-5 text-gray-900 "
              >
                Select the Accussed
              </label>{" "}
              <div className="mt-2">
                <select
                  // as="select"
                  id="accussedMentor"
                  name="accussedMentor"
                  // type="text"
                  onChange={(e) => setAccusedId(e.target.value)}
                  autoComplete="off"
                  required
                  className="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
                  {userType === userTypes.MENTEE
                    ? subscribedMentorsList?.map((enrollment) => {
                        return (
                          <option
                            value={enrollment?.mentorId?._id}
                            key={enrollment?.mentorId?._id}
                          >
                            {enrollment?.mentorId?.firstName +
                              enrollment?.mentorId?.lastName}
                          </option>
                        );
                      })
                    : menteesSubscribedToThisMentor.map((enrollment, index) => {
                        return (
                          <option value={enrollment?.menteeId?._id} key={index}>
                            {enrollment?.menteeId?.firstName +
                              enrollment?.menteeId?.lastName}
                          </option>
                        );
                      })}
                </select>{" "}
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium leading-6 pt-5 text-gray-900 "
              >
                Subject
              </label>{" "}
              <div className="mt-2">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={(e) => setSubject(e.target.value)}
                  className="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>
            <div>
              {" "}
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 mt-5 text-gray-900"
              >
                Tell us a little about the issue you have faced.
              </label>{" "}
              <input
                id="content"
                name="content"
                type="text"
                onChange={(e) => setContent(e.target.value)}
                autoComplete="off"
                className="block w-full h-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
            <button
              type="submit"
              onClick={(e) => handleTicketSubmit(e)}
              className="flex w-1/2 justify-center mx-auto mt-3 rounded-md bg-mentorBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Loading......." : "Raise a Ticket"}
            </button>
          </form>
        </>
        {/* </Formik> */}
      </Modal>
    </>
  );
};

export default RaiseANewTicketModal;
