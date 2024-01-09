import React from "react";
import { Link } from "react-router-dom";
import { logoThumbnail } from "../../../constants/endpoints";
import { HeroSectionTypewriterWords } from "../../../constants/messageToFront";
export const SideBanner = () => {
  return (
    <div className="sticky top-0 w-full h-screen lg:w-2/5 p-4 bg-mentorBlue flex flex-col items-center justify-center ">
      <p className="text-white text-center">
        <Link to={"/"}>
          {" "}
          <img className="h-28 w-28 rounded-full" src={logoThumbnail} alt="" />
        </Link>
      </p>
      <h2 className="text-xl text-white font-semibold mb-2">Mentor Nudge</h2>
      <p className="text-white text-center">{HeroSectionTypewriterWords[1]}</p>
    </div>
  );
};

// export default SideBanner;
