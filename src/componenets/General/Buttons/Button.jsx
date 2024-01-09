import React from "react";

const ButtonComponenet = ({
  ButtonName,
  handleButtonClcik,
  BackgroundColor,
}) => {
  return (
    <div>
      <button
        onClick={(e) => handleButtonClcik()}
        className={`mt-4 bg-${
          BackgroundColor ? BackgroundColor : "mentorBlue"
        } hover:${
          BackgroundColor ? "bg-" + BackgroundColor + "-100" : "bg-blue-900"
        } text-white font-bold py-2 px-4 rounded`}
      >
        {ButtonName}
      </button>
    </div>
  );
};

export default ButtonComponenet;
