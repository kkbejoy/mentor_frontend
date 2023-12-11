import React from "react";

const MentorColorCodeComponent = () => {
  return (
    <div
      className="flex flex-col-3 justify-end items-end text-right py-2
    "
    >
      {" "}
      <div className="flex items-center ">
        <div className="w-4 h-4 bg-green-500 rounded-full mr-2  ml-4"></div>
        <span className="text-sm">Booked</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2 ml-4"></div>
        <span className="text-sm">Vacant</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-slate-500 rounded-full mr-2  ml-4"></div>
        <span className="text-sm">Completed</span>
      </div>
    </div>
  );
};

export default MentorColorCodeComponent;
