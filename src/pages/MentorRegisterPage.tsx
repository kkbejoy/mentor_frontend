import React from "react";
import { MentorRegisterComponent } from "../componenets/General/Register/MentorRegistrationComponent.tsx.tsx";
import { SideBanner } from "../componenets/General/LeftSideBanner/SideBanner.tsx";
const MentorRegisterPage: React.FC = () => {
  return (
    <div className="flex h-full flex-1 flex-col lg:flex-row lg:mx-auto lg:px-0">
      <SideBanner />
      <MentorRegisterComponent />
    </div>
  );
};

export default MentorRegisterPage;
