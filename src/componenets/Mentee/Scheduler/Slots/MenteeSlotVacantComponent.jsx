import React from "react";

const MenteeSlotVacantComponent = ({ props, formattedTime }) => {
  // console.log("Compoent", props, formattedTime);
  return (
    <div className=" h-full shadow-md bg-green-400  text-black text-center transform-cpu transition-transform hover:scale-105">
      <div className="flex flex-col-2">
        <img
          className="w-1/4 h-1/4 rounded-full object-cover pt-1"
          src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${props?.event?.mentorProfileImage}`}
          alt=""
        />{" "}
        <div className="w-full">
          <h1 className="font-normal pt-2"> {props?.event?.mentorName} </h1>

          <h2 className="text-xs font-light text-center">
            {formattedTime?.startTime}- {formattedTime?.endTime}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MenteeSlotVacantComponent;
