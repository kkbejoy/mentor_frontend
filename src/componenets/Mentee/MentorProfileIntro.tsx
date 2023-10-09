import React, { useEffect } from "react";
import MentorPricingCard from "./MentorPricingCard";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mentorProfileDetails } from "../../slices/MenteeSlices/mentorProfile";
import { UilLocationPinAlt } from "@iconscout/react-unicons";
import { UilSuitcase } from "@iconscout/react-unicons";

//Component
const MentorProfileIntro = ({ mentorDetailsObject }) => {
  console.log("Mentor Object:", mentorDetailsObject);

  return (
    <div className="shadow-inherit mx-auto py-5">
      <div className="max-w-full mx-5 bg-white rounded-xl overflow-hidden  shadow-lg flex">
        <div className="w-1/2 p-6">
          <div className="flex items-center mb-4">
            <div className="w-1/2 h-1/2 shadow-lg rounded-full overflow-hidden">
              <img
                src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${mentorDetailsObject?.profileImageUrl}`} // Replace with your image URL
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <div className="text-3xl font-bold">
                {mentorDetailsObject?.firstName} {mentorDetailsObject?.lastName}
              </div>
              <div className="flex flex-col-2">
                <div className="text-gray-600 text-sm">
                  <UilSuitcase />
                </div>
                <div className="text-gray-600 text-sm pl-1">
                  {mentorDetailsObject?.jobTitle} @{" "}
                  {mentorDetailsObject?.firmName}
                </div>
              </div>
              <div className="text-gray-600 text-sm">
                {mentorDetailsObject?.shortBio}
              </div>
              <div className="flex flex-col-2">
                <div className="text-gray-600 text-sm">
                  <UilLocationPinAlt />
                </div>{" "}
                <div className="text-gray-600 text-sm pl-1">
                  {mentorDetailsObject?.location}
                </div>
              </div>
              <div className="text-gray-700 text-base">
                <span className="text-yellow-500">5.0</span> (17 reviews)
              </div>
              <div className="text-gray-600 text-sm">Active today</div>
              {/* <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Play intro
              </button> */}
            </div>
          </div>
        </div>
        <div className="w-1/2 items-center flex">
          <div className="w-1/2 p-6 flex">
            {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full float-right">
              Save
            </button> */}
            <div className="mt-4">
              <div className=" font-semibold">
                <h3 className="font-bold text-green-700">Areas of Interests</h3>
              </div>
              <div className="flex space-x-2">
                <span className="bg-grey-700 text-black px-3 py-1 rounded-full">
                  Skill 1
                </span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full">
                  Skill 2
                </span>
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full">
                  Skill 3
                </span>
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <h2>
              <MentorPricingCard
                mentorId={mentorDetailsObject?._id}
                mentorFees={mentorDetailsObject?.hourlyRate}
                mentorPriceId={mentorDetailsObject?.stripePriceId}
              />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileIntro;
