import React from "react";

const ReceivedMessages = ({ text, time }) => {
  return (
    <div className="bg-slate-400  max-w-3xl max-h-[100vh] min-w-2xl  rounded-lg p-4 my-3 ml-2">
      <div className="text-black text-sm">
        <p>{text}</p>
      </div>
      <div className="max-w-fit text-gray-700">
        {" "}
        <p className="text-xs mt-2">{time ? time : ""}</p>
      </div>
    </div>
  );
};

export default ReceivedMessages;
