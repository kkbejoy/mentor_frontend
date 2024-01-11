import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePageMentorCards = ({ profile, index }) => {
  const navigate = useNavigate();
  const handleNavigation = async () => {
    try {
      navigate(`/mentees/browse/mentor/profile/${profile._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <motion.div
        initial={{ x: index * 100, y: -100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 0.1, delay: index * 0.25 }}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.1 },
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="p-3 h-full w-full md:w-full  overflow-hidden text-center  rounded-lg transform-gpu transition-transform hover:scale-105 cursor-pointer"
      >
        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-200">
          <div
            className="relative overflow-hidden bg-cover bg-no-repeat "
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <img
              className="rounded-full  mx-auto w-1/2 h-1/2 pt-3"
              src={
                profile?.profileImageUrl
                  ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profile?.profileImageUrl}`
                  : `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg`
              }
              alt=""
            />
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-black">
              {profile.firstName + " " + profile.lastName}
            </h5>
            <p className="mb-1 text-sm text-neutral-600 dark:text-black">
              {profile.jobTitle + "@ " + profile.firmName}
            </p>
            <p className="mb-2 text-neutral-600 dark:text-blacktext-xs truncate ">
              {profile?.shortBio
                ? profile?.shortBio
                : "6+ experience, tech-business-prod"}
            </p>
            <button
              onClick={handleNavigation}
              type="button"
              className=" bg-green-400 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Profile
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HomePageMentorCards;
