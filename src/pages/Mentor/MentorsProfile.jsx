import React, { useEffect, useState } from "react";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
import ProfileImageUploader from "../../componenets/Mentor/Profile/ProfileImageUploader ";
import ProfileInformationEditComponent from "../../componenets/Mentor/Profile/ProfileInformationEditComponent";

const MentorsProfile = () => {
  const [reRenderState, setRerender] = useState({});
  return (
    <div>
      {/* <NavbarMentor /> */}
      <HorizontalDivider title={"Mentor Profile"} />
      {/* <div className="w-3/4"> */}
      <ProfileInformationEditComponent
        setRerender={setRerender}
        reRenderState={reRenderState}
      />
      {/* </div> */}
      {/* <ProfileImageUploader /> */}
    </div>
  );
};

export default MentorsProfile;
