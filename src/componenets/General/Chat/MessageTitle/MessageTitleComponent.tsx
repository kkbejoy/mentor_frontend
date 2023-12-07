import React from "react";
import { Link } from "react-router-dom";

const MessageTitleComponent = ({ senderName, senderImage, senderId }) => {
  console.log("Image url", senderId);
  return (
    <div className="flex flex-col-2 bg-gray-100 ">
      <div className="h-20">
        <img
          className="ml-2 h-1/2 rounded-full object-cover mt-5"
          src={`https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${senderImage}`}
          alt=""
        />
      </div>
      <div className="h-[7vh]">
        {" "}
        <Link to={`/browse/mentor/profile/${senderId}`} target="blank">
          <h1 className="text-center font-semibold pl-3 pt-4">{senderName}</h1>
        </Link>
        <h1 className=" font-xs text-left pl-4"></h1>
      </div>
    </div>
  );
};

export default MessageTitleComponent;
