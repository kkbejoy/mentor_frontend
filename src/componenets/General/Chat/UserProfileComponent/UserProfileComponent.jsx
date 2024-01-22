import React from "react";
import { Link } from "react-router-dom";
import { getTimeDifference } from "../../../../utilities/timeManagementFunctions";

const UserProfileComponent = ({
  profile,
  userType,
  conversationId,
  activeOrNot,
}) => {
  const inputTime = profile?.latestMessage?.createdAt;
  const time = getTimeDifference(inputTime);
  if (userType === "mentee") {
    return (
      <div
        className={`${
          profile?.latestMessage?.sender?.senderType === "mentor"
            ? profile?.latestMessage?.isRead
              ? "bg-slate-50"
              : "bg-slate-200 font-semibold"
            : "bg-white"
        } cursor-pointer gap-2 border-2 shadow-xl hover:bg-slate-300 max-h-24 min-h-20 max-w-sm min-w-sm`}
        key={profile._id}
      >
        <Link to={`/mentees/connect/inbox/${profile._id}`}>
          <div
            className={`flex flex-col-2 gap-4 ${
              activeOrNot
                ? "bg-blue-50 shadow-inner transition-colors"
                : "bg-none transition-colors"
            }`}
          >
            <div className="hidden sm:block max-w-md text-center  w-14 h-14  rounded-full">
              <img
                className="ml-2 md:w-10 md:h-10 lg:w-14 lg:h-14  mx-auto rounded-full object-cover mt-5"
                src={
                  profile?.participants[0]?.mentor?.profileImageUrl
                    ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profile?.participants[0]?.mentor?.profileImageUrl}`
                    : `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg`
                }
                alt=""
              />
            </div>
            <div className="flex flex-col-2 justify-start  w-3/4 ">
              <div className="flex flex-col-2 ">
                <div className="  my-5 w-[26vh]">
                  <h1 className="text-xl focus:scale-105 px-2 truncate">
                    {" "}
                    {profile?.participants[0]?.mentor?.firstName}{" "}
                    {profile?.participants[0]?.mentor?.lastName}
                  </h1>
                  <p className="text-xs mb-2 flex justify-between  px-2 truncate">
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
    return (
      <div
        className={`${
          profile?.latestMessage?.sender?.senderType === "mentee"
            ? profile?.latestMessage?.isRead
              ? "bg-slate-50"
              : "bg-slate-200"
            : "bg-slate-50"
        } cursor-pointer  gap-2 border-2 shadow-xl hover:bg-slate-300 max-h-24 min-h-20 max-w-sm min-w-sm`}
        key={profile._id}
      >
        <Link to={`/mentors/connect/inbox/${profile._id}`}>
          <div
            className={`flex flex-col-2 gap-4 ${
              activeOrNot
                ? "bg-blue-50 shadow-inner transition-colors"
                : "bg-none transition-colors"
            }`}
          >
            <div className="hidden sm:block  text-center w-14 h-14 ">
              {" "}
              <img
                className="ml-2 md:w-10 md:h-10 lg:w-14 lg:h-14  mx-auto rounded-full object-cover mt-5"
                src={
                  profile.participants[0]?.mentee?.profileImageUrl
                    ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profile.participants[0]?.mentee?.profileImageUrl}`
                    : `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg`
                }
                alt=""
              />
            </div>
            <div className="flex flex-col-2 justify-start w-3/4 ">
              <div className="flex flex-col-2 ">
                <div className="  my-5 w-[26vh]">
                  <h1 className="text-xl px-2 focus:scale-105 truncate">
                    {profile?.participants[0]?.mentee?.firstName}{" "}
                    {profile?.participants[0]?.mentee?.lastName}
                  </h1>
                  <p className="text-xs px-2 mb-2 flex justify-between truncate">
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
