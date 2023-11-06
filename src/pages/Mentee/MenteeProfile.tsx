import React from "react";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
import MenteeProfileImageUploader from "../../componenets/Mentee/Profile/MenteeProfileImageUploader";

const MenteeProfile = () => {
  return (
    <div>
      <NavbarMentee />
      <HorizontalDivider title={"Profile"} />
      <MenteeProfileImageUploader />
    </div>
  );
};

export default MenteeProfile;
