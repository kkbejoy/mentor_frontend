import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SubscibedMentorsList = ({ enrollment, index }) => {
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
    <div className="p-3 h-full w-full md:w-full  overflow-hidden text-center  rounded-lg transform-gpu transition-transform hover:scale-105 cursor-pointer">
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-200">
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat "
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <img
            className="rounded-full  mx-auto w-1/2 h-1/2 pt-3"
            src={
              enrollment?.mentorId?.profileImageUrl
                ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${enrollment?.mentorId?.profileImageUrl}`
                : `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg`
            }
            alt=""
          />
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-black">
            {enrollment?.mentorId?.firstName} {enrollment?.mentorId?.lastName}
          </h5>
          <p className="mb-1 text-sm text-neutral-600 dark:text-black">
            {enrollment?.mentorId?.jobTitle} @ {enrollment?.mentorId?.firmName}
          </p>
          <p className="mb-2 text-neutral-600 dark:text-blacktext-xs truncate ">
            {enrollment?.mentorId?.shortBio
              ? enrollment?.mentorId?.shortBio
              : "6+ experience, tech-business-prod"}
          </p>
          <button
            onClick={(e) => handleButtonClick(enrollment?.mentorId?._id)}
            type="button"
            className=" bg-green-400 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
