import React from "react";

const MenteeSlotCompleted = ({ props, formattedTime }) => {
  return (
    <div className="bg-slate-500 shadow-md h-full text-center transform-cpu transition-transform ">
      <h1>Completed </h1>{" "}
      <h2 className="text-xs font-light text-center">
        ( {formattedTime?.startTime} - {formattedTime?.endTime})
      </h2>
    </div>
  );
};

export default MenteeSlotCompleted;
