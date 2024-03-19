import React from "react";

export const SuspenseLoader = () => {
  return (
    <div className="flex flex-col justify-center text-center h-screen text-lg font-semibold items-center">
      <div className="text-black">
        {" "}
        <h1 className="text-center animate-pulse text-gradient-to-r from-mentorBlue to-gray-100">
          Mentornudge.online
        </h1>
        <h1 className="text-center animate-pulse ">Loading...</h1>
      </div>
    </div>
  );
};
