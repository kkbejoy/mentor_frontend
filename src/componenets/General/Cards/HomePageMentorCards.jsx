import React from "react";
import { useNavigate } from "react-router-dom";

const HomePageMentorCards = ({ profile }) => {
  const navigate = useNavigate();
  const handleNavigation = async () => {
    try {
      navigate(`/browse/mentor/profile/${profile._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white h-[350px] text-black rounded-xl mx-3 shadow-lg transition-all">
      <div className="h-48 rounded-t-xl  flex justify-center items-center">
        <img
          src={
            profile?.profileImageUrl
              ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profile?.profileImageUrl}`
              : `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg`
          }
          alt=""
          className="h-36 w-36 rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 p-4">
        <p className="text-xl font-semibold ">
          {profile.firstName + " " + profile.lastName}
        </p>
        <p className="text-md font-semibold ">
          {profile.jobTitle + "@ " + profile.firmName}
        </p>
        {/* <p className="text-md font-semibold truncate ">{profile.shortBio}</p> */}
        <button
          onClick={handleNavigation}
          className="bg-mentorBlue text-white text-lg px-6 py-1 rounded-xl "
        >
          Profile
        </button>
      </div>
    </div>
  );
};

export default HomePageMentorCards;
