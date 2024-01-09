import React from "react";
import BorderLine from "../BorderLine/VerticalBorderLine";
import ButtonComponenet from "../Buttons/Button";
import { UilBookmarkFull } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const MentorCards = ({ mentor }) => {
  return (
    <div className="mt-10 mb-10  ">
      {" "}
      <div className="max-w-3xl max-h-30 min-h-25 mx-auto bg-white rounded-xl overflow-hidden shadow-2xl flex hover:shadow-stone-500">
        <div className="w-1/3 my-auto px-2">
          <img
            className=" w-30 h-30 mx-auto px-1 object-cover align-center rounded-full shadow-sm"
            src={
              mentor?.profileImageUrl
                ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${mentor?.profileImageUrl}`
                : `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg`
            } // Replace with the actual image URL
            alt="Profile"
          />
        </div>
        {/* <VerticalLine /> */}
        <div className="p-6 w-2/3 min-h-[25vh]">
          <div className="font-bold text-2xl mb-2 truncate">
            {mentor.firstName} {mentor.lastName}
          </div>
          <div className="text-gray-600 text-sm truncate">
            {mentor?.jobTitle} @ {mentor?.firmName}
          </div>

          <p className="text-gray-700 text-base  ">{mentor.shortBio}</p>
          <div className="text-gray-600 text-sm truncate">
            {mentor?.location}
          </div>
          <div className="text-gray-700 text-base">
            <span className="text-yellow-500">5.0</span> (27 reviews)
          </div>
          {/* <div className="text-gray-600 text-sm">Active today</div>
          <div className="text-gray-600 text-sm">
            Usually responds in a day or two
          </div> */}
          {/* <BorderLine /> */}
          {/* <ButtonComponenet ButtonName={"Save"} /> */}
          <div className="flex ">
            <UilBookmarkFull color="orange" />
          </div>
        </div>
        <div className="p-6 w-1/3">
          <div className="text-gray-700 font-semibold">Skills</div>{" "}
          <BorderLine />
          <ul className="list-disc pl-4">
            {mentor?.expertise?.slice(0, 3).map((skill) => {
              return <li>{skill}</li>;
            })}
          </ul>
          <div className="mt-4">
            <BorderLine />
            <div className="text-gray-700 font-semibold">Hourly Fees</div>
            <div className="text-base text-gray-700">₹{mentor.hourlyRate}</div>
          </div>{" "}
          <Link
            to={`/mentees/browse/mentor/profile/${mentor._id}`}
            state={{ mentorId: mentor._id }}
          >
            <ButtonComponenet
              ButtonName={"Profile"}
              handleButtonClcik={undefined}
              BackgroundColor={"red-500"}
            />
          </Link>
        </div>
      </div>{" "}
    </div>
  );
};

export default MentorCards;
