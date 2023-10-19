import React from "react";
import { Link } from "react-router-dom";

const UserProfileComponent = ({ profile, userType }) => {
  // if (userType === "mentee") console.log("Mentee side Proifles", profile);
  // if (userType === "mentor") console.log("Mentor side Proifles", profile);

  if (userType === "mentee") {
    return (
      <div className=" bg-slate-50 cursor-pointer  hover:bg-slate-300 ">
        <Link to={`/mentees/connect/inbox/${profile._id}`}>
          <div className="flex flex-col-2 justify-between">
            <div className="text-center  w-1/4">
              {" "}
              <img
                className="ml-2 h-1/2 rounded-full object-cover mt-5"
                src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profile.participants[0].mentor.profileImageUrl}`}
                alt=""
              />
            </div>
            <div className="flex flex-col-2 justify-start  w-2/3 ">
              <div className="flex flex-col-2 ">
                <div className="  my-5 w-[26vh]">
                  <h1 className="text-lg focus:scale-105 ">
                    {" "}
                    {profile.participants[0].mentor.firstName}{" "}
                    {profile.participants[0].mentor.lastName}
                  </h1>
                  <p className="text-xs mb-2 flex justify-between truncate">
                    Latest messges
                  </p>
                </div>
                <div className="text-end justify-end my-5">
                  {" "}
                  <h1 className="text-xs font-extralight mr-1">5.32 am</h1>
                </div>
              </div>{" "}
            </div>
          </div>{" "}
        </Link>
      </div>
    );
  } else if (userType === "mentor") {
    return (
      <div className=" bg-slate-50 cursor-pointer  hover:bg-slate-300 ">
        <Link to={`/mentors/connect/inbox/${profile._id}`}>
          <div className="flex flex-col-2 justify-between">
            <div className="text-center  w-1/3">
              {" "}
              <img
                className="ml-2 h-1/2 rounded-full object-cover mt-5"
                src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${profile.participants[0].mentor.profileImageUrl}`}
                alt=""
              />
            </div>
            <div className="flex flex-col-2  w-2/3 ">
              <div className="flex flex-col-2 ">
                <div className="  my-5 w-[26vh]">
                  <h1 className="text-lg focus:scale-105 ">
                    {profile.participants[0].mentee.firstName}{" "}
                    {profile.participants[0].mentee.lastName}
                  </h1>
                  <p className="text-xs mb-2 flex justify-between truncate">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam rerum quas saepe itaque officia magni assumenda, at
                    pariatur illum praesentium repellat, molestiae doloribus ea
                    ad soluta? Exercitationem praesentium deleniti magnam.
                  </p>
                </div>
                <div className="text-end justify-end my-5">
                  {" "}
                  <h1 className="text-xs font-extralight mr-1">5.32 am</h1>
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
