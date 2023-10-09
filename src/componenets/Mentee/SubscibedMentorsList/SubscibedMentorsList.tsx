import React from "react";
import { useNavigate } from "react-router-dom";

const SubscibedMentorsList = ({ enrollment }) => {
  const navigate = useNavigate();

  console.log("enrollmenr", enrollment);
  const handleButtonClick = async (mentorId) => {
    try {
      console.log("Button clicked", mentorId);
      navigate(`/mentees/browse/mentor/profile/${mentorId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="md:p-3 w-full md:w-full  overflow-hidden text-center  rounded-lg transform-gpu transition-transform hover:scale-105">
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <img
            className="rounded-t-lg"
            src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${enrollment?.mentorId?.profileImageUrl}`}
            alt=""
          />
          <a href="#!">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {enrollment?.mentorId?.firstName} {enrollment?.mentorId?.lastName}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-300">
            {enrollment?.mentorId?.jobTitle} @ {enrollment?.mentorId?.firmName}
          </p>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {enrollment?.mentorId?.shortBio}
          </p>
          <button
            onClick={(e) => handleButtonClick(enrollment?.mentorId?._id)}
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscibedMentorsList;
