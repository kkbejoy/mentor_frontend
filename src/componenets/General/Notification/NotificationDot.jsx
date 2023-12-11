import React from "react";

const NotificationDot = () => {
  return (
    <div className="relative">
      {/* Example element with notification dot */}
      <div className="relative inline-block">
        <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"></div>
      </div>

      {/* Another example element without a dot */}
      {/* <div className="inline-block"></div> */}
    </div>
  );
};

export default NotificationDot;
