import React from "react";
import RegistrationSuccssComponent from "../componenets/General/Register/RegistrationSuccess";
import { SideBanner } from "../componenets/General/LeftSideBanner/SideBanner";
const RegistrationSuccssPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col lg:flex-row lg:mx-auto lg:px-0">
      <SideBanner />
      <RegistrationSuccssComponent />
    </div>
  );
};

export default RegistrationSuccssPage;
