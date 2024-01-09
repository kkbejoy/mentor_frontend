import React from "react";
import MenteeRegisterComponent from "../componenets/General/Register/MenteesRegisterComponent.jsx";
import { SideBanner } from "../componenets/General/LeftSideBanner/SideBanner.jsx";
const MenteeRegisterPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col lg:flex-row lg:mx-auto lg:px-0 ">
      <SideBanner />
      <MenteeRegisterComponent />
    </div>
  );
};

export default MenteeRegisterPage;
