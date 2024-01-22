import React from "react";
import { Link } from "react-router-dom";
import { userTypes } from "../../../../constants/constants";

const MessageTitleComponent = ({
  senderName,
  senderImage,
  senderId,
  userType,
}) => {
  return (
    <div className="flex flex-col-2 bg-gray-100 ">
      <div className="h-20">
        <img
          className="ml-2 h-1/2 rounded-full object-cover mt-5"
          src={
            senderImage
              ? `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1696240416/${senderImage}`
              : `https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg`
          }
          alt=""
        />
      </div>
      <div className="h-[7vh]">
        {" "}
        <Link
          to={
            userType === userTypes.MENTEE
              ? `/mentees/browse/mentor/profile/${senderId}`
              : null
          }
          target="blank"
        >
          <h1 className="text-center font-semibold pl-3 pt-4 my-2">
            {senderName}
          </h1>
        </Link>
        <h1 className=" font-xs text-left pl-4"></h1>
      </div>
    </div>
  );
};

export default MessageTitleComponent;
