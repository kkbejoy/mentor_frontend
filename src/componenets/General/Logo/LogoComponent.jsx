import React from "react";
import { logoThumbnail } from "../../../constants/endpoints";

const LogoComponent = () => {
  return (
    <div className="w-10 h-10 rounded-full">
      <img src={logoThumbnail} alt="" />
    </div>
  );
};

export default LogoComponent;
