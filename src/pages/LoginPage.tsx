import React from "react";
import { SideBanner } from "../componenets/General/LeftSideBanner/SideBanner";
import LoginRoot from "../componenets/General/Login/LoginRoot";

export const LoginPage: React.FC = () => {
  return (
    <div>
      <div className="flex h-full flex-1 flex-col lg:flex-row lg:mx-auto lg:px-0">
        <SideBanner />
        <LoginRoot></LoginRoot>
      </div>
    </div>
  );
};

// export default LoginPage;
