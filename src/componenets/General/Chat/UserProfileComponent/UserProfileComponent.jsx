import React from "react";
import { Link } from "react-router-dom";
import { getTimeDifference } from "../../../../utilities/timeManagementFunctions";

const UserProfileComponent = ({
  profile,
  userType,
  conversationId,
  activeOrNot,
}) => {
  // if (userType === "mentee") console.log("Mentee side Proifles", profile);
  // if (userType === "mentor") console.log("Mentor side Proifles", profile);
  console.log("Conversations Profile", profile);
  const inputTime = profile?.latestMessage?.createdAt;
  const time = getTimeDifference(inputTime);
  if (userType === "mentee") {
    return (
      <div
        className={`${
          profile?.latestMessage?.sender?.senderType === "mentor"
            ? profile?.latestMessage?.isRead
              ? "bg-slate-50"
              : "bg-slate-200"
            : "bg-slate-50"
        } cursor-pointer  hover:bg-slate-300`}
        key={profile._id}
      >
        <Link to={`/mentees/connect/inbox/${profile._id}`}>
          <div
            className={`flex flex-col-2 justify-between ${
              activeOrNot
                ? "bg-gray-400 transition-colors"
                : "bg-none transition-colors"
            }`}
          >
            <div className="text-center  w-1/4">
              <img
                className="ml-2 h-1/2 rounded-full object-cover mt-5"
                src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profile?.participants[0]?.mentor?.profileImageUrl}`}
                alt=""
              />
            </div>
            <div className="flex flex-col-2 justify-start  w-2/3 ">
              <div className="flex flex-col-2 ">
                <div className="  my-5 w-[26vh]">
                  <h1 className="text-lg focus:scale-105 ">
                    {" "}
                    {profile?.participants[0]?.mentor?.firstName}{" "}
                    {profile?.participants[0]?.mentor?.lastName}
                  </h1>
                  <p className="text-xs mb-2 flex justify-between truncate">
                    {profile?.latestMessage?.content}
                  </p>
                </div>
                <div className="text-end justify-end my-5 mr-3">
                  {" "}
                  <h1 className="text-xs font-extralight mr-1"> {time}</h1>
                </div>
              </div>{" "}
            </div>
          </div>{" "}
        </Link>
      </div>
    );
  } else if (userType === "mentor") {
    console.log("Mentor side", activeOrNot);
    return (
      <div
        className={`${
          profile?.latestMessage?.sender?.senderType === "mentee"
            ? profile?.latestMessage?.isRead
              ? "bg-slate-50"
              : "bg-slate-200"
            : "bg-slate-50"
        } cursor-pointer  hover:bg-slate-300`}
        key={profile._id}
      >
        <Link to={`/mentors/connect/inbox/${profile._id}`}>
          <div
            className={`flex flex-col-2 justify-between ${
              activeOrNot
                ? "bg-gray-400 transition-colors"
                : "bg-none transition-colors"
            }`}
          >
            <div className="text-center  w-1/4">
              {" "}
              <img
                className="ml-2 h-1/2 rounded-full object-cover mt-5"
                src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profile.participants[0]?.mentee?.profileImageUrl}`}
                alt=""
              />
            </div>
            <div className="flex flex-col-2 justify-start w-2/3 ">
              <div className="flex flex-col-2 ">
                <div className="  my-5 w-[26vh]">
                  <h1 className="text-lg focus:scale-105 ">
                    {profile?.participants[0]?.mentee?.firstName}{" "}
                    {profile?.participants[0]?.mentee?.lastName}
                  </h1>
                  <p className="text-xs mb-2 flex justify-between truncate">
                    {profile?.latestMessage?.content}
                  </p>
                </div>
                <div className="text-end justify-end my-5">
                  {" "}
                  <h1 className="text-xs font-extralight mr-1">{time}</h1>
                </div>
              </div>{" "}
            </div>
          </div>{" "}
        </Link>
      </div>
    );
  }
};

export default UserProfileComponent;
