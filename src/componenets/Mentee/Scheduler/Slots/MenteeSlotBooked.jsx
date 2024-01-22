import React from "react";

const MenteeSlotBooked = ({ props, formattedTime }) => {
  return (
    <div className=" shadow-md text-black h-full text-center bg-yellow-500  transform-cpu transition-transform hover:scale-101">
      <div className="flex flex-col-2">
        <img
          className="w-1/4 h-1/4 rounded-full object-cover pt-1"
          src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${props?.event?.mentorProfileImage}`}
          alt=""
          loading="lazy"
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

export default MenteeSlotBooked;
