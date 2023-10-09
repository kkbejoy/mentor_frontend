import React, { useEffect, useState } from "react";
import { SideBanner } from "../componenets/General/LeftSideBanner/SideBanner";
import LoginRoot from "../componenets/General/Login/LoginRoot";
import SuccessModal from "../componenets/General/Modals/SuccessModal";

export const LoginPage: React.FC = () => {
  const [isSuccess, setSuccess] = useState(false);
  useEffect(() => {}, [isSuccess]);
  return (
    <div>
      <div className="flex h-full flex-1 flex-col lg:flex-row lg:mx-auto lg:px-0">
        {" "}
        {console.log("is SuccessModal", isSuccess)}
        <SideBanner />
        <LoginRoot setSuccess={setSuccess} isSuccess={isSuccess}></LoginRoot>
      </div>
    </div>
  );
};

// export default LoginPage;
