import React from "react";
import { useSelector } from "react-redux";

const MentorAboutComponent = ({ mentorAbout }) => {
  return (
    <div className="w-3/5 p-5">
      <div className=" bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">About</h2>

        <p className="text-gray-600">{mentorAbout}</p>
      </div>
    </div>
  );
};

export default MentorAboutComponent;
