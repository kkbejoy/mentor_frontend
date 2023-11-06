import React, { useEffect, useState } from "react";
import NavbarModerator from "../../componenets/Moderator/NavbarModerator";
import MentorsListsComponent from "../../componenets/Moderator/Tables/MentorsList";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
const MentorsListPage = () => {
  return (
    <div>
      <NavbarModerator />
      <HorizontalDivider title={"MentorsList"} />
      <MentorsListsComponent />
      {/* <FooterComponent /> */}
    </div>
  );
};
export default MentorsListPage;
