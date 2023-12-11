import React, { useEffect } from "react";
import MentorPricingCard from "./MentorPricingCard";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mentorProfileDetails } from "../../slices/MenteeSlices/mentorProfile";
import { UilLocationPinAlt } from "@iconscout/react-unicons";
import { UilSuitcase } from "@iconscout/react-unicons";
import MentorContactCard from "./MentorContactCard";
import MentorPricingCardShimmer from "./Shimmers/MentorPricingCardShimmer";
import MentorHeaderShimmer from "./Shimmers/MentorHeaderShimmer";
//Component
const MentorProfileIntro = ({ mentorDetailsObject, subscriptionStatus }) => {
  const isLoadingMentorDetails = useSelector(
    (state) => state.mentorProfileData.isLoading
  );
  console.log("Mentor Object:", isLoadingMentorDetails);
  // if (1 == 1) return <MentorHeaderShimmer />;
  return (
    <div className="shadow-inherit mx-auto py-5">
      <div className="max-w-full mx-5 bg-white rounded-xl overflow-hidden  shadow-lg flex">
        <div className="w-1/2 p-6">
          <div className="flex items-center mb-4 ">
            <div className=" w-44 h-44 shadow-lg max-w-sm  rounded-3xl overflow-hidden transition-transform hidden md:block ">
              <img
                src={
                  mentorDetailsObject?.profileImageUrl
                    ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${mentorDetailsObject?.profileImageUrl}`
                    : `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg`
                } // Replace with your image URL
                alt="User Profile"
                className="w-full h-full object-cover "
              />
            </div>
            <div className="ml-4">
              <div className="text-3xl font-bold my-2 ">
                {mentorDetailsObject?.firstName} {mentorDetailsObject?.lastName}
              </div>
              <div className="flex flex-col-2">
                <div className="text-gray-900 text-sm">
                  <UilSuitcase />
                </div>
                <div className="text-gray-800 text-sm font-normal pl-1">
                  {mentorDetailsObject?.jobTitle} @{" "}
                  {mentorDetailsObject?.firmName}
                </div>
              </div>
              <div className="text-gray-800 text-sm">
                {mentorDetailsObject?.shortBio}
              </div>
              <div className="flex flex-col-2 ">
                <div className="text-gray-600 text-sm  ">
                  <UilLocationPinAlt />
                </div>{" "}
                <div className="text-gray-600 text-sm pl-1 ">
                  {mentorDetailsObject?.location}
                </div>
              </div>
              <div className="text-gray-700 text-base hidden md:block ">
                <span className="text-yellow-500">5.0</span> (17 reviews)
              </div>
              <div className="text-gray-600 text-xs hidden md:block ">
                Active today
              </div>
              {/* <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Play intro
              </button> */}
            </div>
          </div>
        </div>
        <div className="w-1/2 items-center flex">
          <div className="w-1/2 p-6 flex  hidden md:block ">
            {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full float-right">
              Save
            </button> */}
            <div className="mt-4">
              <div className=" ">
                <h3 className="font-bold text-center text-black mb-4">
                  Areas of Interests
                </h3>
              </div>
              <div className="flex space-x-2">
                {mentorDetailsObject?.expertise?.map((skill) => {
                  return (
                    <span className="bg-blue-900 text-white text-center px-3 py-1 rounded text-xs hover:bg-blue-800 transition-transform">
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-1/2">
            {isLoadingMentorDetails ? (
              <MentorPricingCardShimmer />
            ) : subscriptionStatus ? (
              <MentorContactCard />
            ) : (
              <MentorPricingCard
                mentorId={mentorDetailsObject?._id}
                mentorFees={mentorDetailsObject?.hourlyRate}
                mentorPriceId={mentorDetailsObject?.stripePriceId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileIntro;
