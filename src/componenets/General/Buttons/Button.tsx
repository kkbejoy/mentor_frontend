import React from "react";

const ButtonComponenet = ({ ButtonName, handleButtonClcik }) => {
  return (
    <div>
      <button
        onClick={(e) => handleButtonClcik()}
        className="mt-4 bg-mentorBlue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
      >
        {ButtonName}
      </button>
    </div>
  );
};

export default ButtonComponenet;
