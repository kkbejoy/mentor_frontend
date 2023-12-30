import React, { useEffect, useState } from "react";
import { SideBanner } from "../componenets/General/LeftSideBanner/SideBanner.jsx";
import LoginRoot from "../componenets/General/Login/LoginRoot.jsx";
import { useLocation, useParams } from "react-router-dom";
// import SuccessModal from "../componenets/General/Modals/SuccessModal.jsx/index.js";

export const LoginPage = () => {
  const [isSuccess, setSuccess] = useState(false);
  const params = useLocation();

  const userType = params?.search.slice(1);
  // new URLSearchParams(params?.search);
  // params?.search;
  // const
  console.log("User Type from Params:", userType);
  return (
    <div>
      <div className="flex h-full flex-1 flex-col lg:flex-row lg:mx-auto lg:px-0">
        {" "}
        {console.log("is SuccessModal", isSuccess)}
        <SideBanner />
        <LoginRoot
          setSuccess={setSuccess}
          isSuccess={isSuccess}
          userType={userType}
        ></LoginRoot>
      </div>
    </div>
  );
};

// export default LoginPage;
