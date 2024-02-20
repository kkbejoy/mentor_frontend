import React from "react";

export const SuspenseLoader = () => {
  return (
    <div className="text-center h-screen text-lg font-semibold items-center">
      <div className="text-blue-900">
        {" "}
        <h1 className="text-center animate-pulse text-gradient-to-r from-mentorBlue to-gray-100">
          MentorNudge.online
        </h1>
        <h1 className="text-center animate-pulse bg-gradient-to-r from-mentorBlue to-gray-100">
          Loading...
        </h1>
      </div>
    </div>
  );
};
