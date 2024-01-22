import React from "react";
import ButtonComponenet from "../Buttons/Button";
import BorderLine from "../BorderLine/BorderLine";
import { Link } from "react-router-dom";

const MentorCardShimmers = () => {
  return (
    <div className="my-10 mx-2 ">
      <Link
      // to={`/mentees/browse/mentor/profile/${mentor?._id}`}
      // state={{ mentorId: mentor?._id }}
      >
        <div className="max-w-3xl h-64 mx-auto bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col sm:flex-row">
          {/* Profile Image Placeholder */}
          <div className="w-full sm:w-1/3 my-auto px-2">
            <div className="w-32 h-32 bg-gradient-to-r from-zinc-500 to-gray-200 animate-pulse rounded-full mx-auto"></div>
          </div>

          {/* Mentor Info Placeholder */}
          <div className="p-6 w-full sm:w-2/3 ">
            <div className="font-bold text-xl mb-2 bg-gradient-to-r from-zinc-900 to-gray-200 animate-pulse">
              <div className="w-3/4 h-6 "></div>
            </div>
            <div className="text-gray-600 text-sm bg-gradient-to-r from-zinc-900 to-gray-200 animate-pulse">
              <div className="w-1/4 h-4 "></div>
            </div>
            <p className="text-gray-700 text-base  ">
              <div className="w-full h-4 "></div>
              <div className="w-full h-4 "></div>
              <div className="w-3/4 h-4 "></div>
            </p>
            <div className="text-gray-600 text-sm bg-gradient-to-r from-zinc-900 to-gray-200 animate-pulse">
              <div className="w-1/3 h-4"></div>
            </div>
            <div className="text-gray-700 text-base bg-gradient-to-r from-zinc-900 to-gray-200 animate-pulse">
              <div className="w-12 h-4 inline-block"></div>{" "}
            </div>
            <div className="w-full h-8 bg-gradient-to-r from-zinc-900 to-gray-200 animate-pulse mt-2"></div>
          </div>

          {/* Skills and Hourly Rate Placeholder */}
          <div className="p-6 w-full sm:w-1/3">
            <div className="text-gray-700 w-28 h-6 font-semibold bg-gradient-to-r from-zinc-900 to-gray-200 animate-pulse  mb-2"></div>
            {/* <BorderLine /> */}

            <ul className="list-disc pl-4 w-28 bg-gradient-to-r from-zinc-900 to-gray-200 animate-pulse mt-16  h-6 ">
              {/* <li>JavaScript</li>
              <li>Vue.js</li>
              <li>Angular</li>
              <li>+ 30 more</li> */}
            </ul>

            <div className="mt-4 ">
              {" "}
              {/* <BorderLine /> */}
              <div className="text-gray-700 font-semibold  w-26 h-4 bg-gradient-to-r from-zinc-900 to-gray-200 animate-pulse mb-2"></div>
              <div className="text-base text-gray-700  w-26 h-4 bg-gradient-to-r from-zinc-900 to-gray-200 animate-pulse"></div>
            </div>
            {/* <ButtonComponenet ButtonName={"Subscribe"} /> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MentorCardShimmers;
