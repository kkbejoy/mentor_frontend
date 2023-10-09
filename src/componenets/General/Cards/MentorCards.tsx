import React from "react";
import BorderLine from "../BorderLine/BorderLine";
import VerticalLine from "../BorderLine/VerticalBorderLine";
import ButtonComponenet from "../Buttons/Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MentorCards = ({ mentor }) => {
  return (
    <div className="mt-5">
      {" "}
      <Link
        to={`/mentees/browse/mentor/profile/${mentor._id}`}
        state={{ mentorId: mentor._id }}
      >
        <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg flex">
          <div className="w-1/3 my-auto px-2">
            <img
              className=" w-auto h-1/3 mx-auto px-1 object-cover align-center rounded-full"
              src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${mentor?.profileImageUrl}`} // Replace with the actual image URL
              alt="Profile"
            />
          </div>
          {/* <VerticalLine /> */}
          <div className="p-6 w-2/3">
            <div className="font-bold text-xl mb-2">
              {mentor.firstName} {mentor.lastName}
            </div>
            <div className="text-gray-600 text-sm">
              {mentor?.jobTitle} @ {mentor?.firmName}
            </div>

            <p className="text-gray-700 text-base">{mentor.shortBio}</p>
            <div className="text-gray-600 text-sm">{mentor?.location}</div>
            <div className="text-gray-700 text-base">
              <span className="text-yellow-500">5.0</span> (27 reviews)
            </div>
            {/* <div className="text-gray-600 text-sm">Active today</div>
          <div className="text-gray-600 text-sm">
            Usually responds in a day or two
          </div> */}
            {/* <BorderLine /> */}
            <ButtonComponenet ButtonName={"Save"} />
          </div>
          <div className="p-6 w-1/3">
            <div className="text-gray-700 font-semibold">Skills</div>{" "}
            <BorderLine />
            <ul className="list-disc pl-4">
              <li>JavaScript</li>
              <li>Vue.js</li>
              <li>Angular</li>
              <li>+ 30 more</li>
            </ul>
            <div className="mt-4">
              <BorderLine />
              <div className="text-gray-700 font-semibold">Hourly Fees</div>
              <div className="text-base text-gray-700">
                ₹{mentor.hourlyRate}
              </div>
            </div>
            <ButtonComponenet ButtonName={"Subscribe"} />
          </div>
        </div>{" "}
      </Link>
    </div>
  );
};

export default MentorCards;
