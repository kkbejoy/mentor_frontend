import React from "react";
import ButtonComponenet from "../Buttons/Button";
import BorderLine from "../BorderLine/BorderLine";
import { Link } from "react-router-dom";

const MentorCardShimmers = () => {
  return (
    <div className="mt-5">
      <Link
        to={`/mentees/browse/mentor/profile/${mentor?._id}`}
        state={{ mentorId: mentor?._id }}
      >
        <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg flex flex-col sm:flex-row">
          {/* Profile Image Placeholder */}
          <div className="w-full sm:w-1/3 my-auto px-2">
            <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-full mx-auto"></div>
          </div>

          {/* Mentor Info Placeholder */}
          <div className="p-6 w-full sm:w-2/3">
            <div className="font-bold text-xl mb-2">
              <div className="w-3/4 h-6 bg-gray-300 animate-pulse"></div>
            </div>
            <div className="text-gray-600 text-sm">
              <div className="w-1/4 h-4 bg-gray-300 animate-pulse"></div>
            </div>
            <p className="text-gray-700 text-base">
              <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-300 animate-pulse"></div>
            </p>
            <div className="text-gray-600 text-sm">
              <div className="w-1/3 h-4 bg-gray-300 animate-pulse"></div>
            </div>
            <div className="text-gray-700 text-base">
              <div className="w-12 h-4 bg-gray-300 animate-pulse inline-block"></div>{" "}
              (27 reviews)
            </div>
            <div className="w-20 h-8 bg-gray-300 animate-pulse mt-2"></div>
          </div>

          {/* Skills and Hourly Rate Placeholder */}
          <div className="p-6 w-full sm:w-1/3">
            <div className="text-gray-700 font-semibold">Skills</div>
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
            <ButtonComponenet
              ButtonName={"Subscribe"}
              handleButtonClcik={undefined}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MentorCardShimmers;
