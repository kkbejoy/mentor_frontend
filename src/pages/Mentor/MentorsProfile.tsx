import React from "react";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
import ProfileImageUploader from "../../componenets/Mentor/Profile/ProfileImageUploader ";

const MentorsProfile = () => {
  return (
    <div>
      <NavbarMentor />
      <HorizontalDivider title={"Profile"} />
      <ProfileImageUploader />
    </div>
  );
};

export default MentorsProfile;
