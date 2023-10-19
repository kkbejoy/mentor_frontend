import React from "react";

const SendMessagesComponent = ({ text }) => {
  return (
    <div className=" bg-sendMessages max-w-3xl min-w-2xl max-h-[100vh] rounded-lg p-4 my-3 mr-2 ">
      <div className=" text-white text-sm">
        <p>{text}</p>{" "}
      </div>{" "}
      <div className=" ml-auto max-w-fit text-slate-200 ">
        {" "}
        <p className="text-xs mt-2 ">10.30 am</p>
      </div>
    </div>
  );
};

export default SendMessagesComponent;
