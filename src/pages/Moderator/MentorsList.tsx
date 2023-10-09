import React, { useEffect, useState } from "react";
import NavbarModerator from "../../componenets/Moderator/NavbarModerator";
import MentorsListsComponent from "../../componenets/Moderator/Tables/MentorsList";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
const MentorsListPage = () => {
  return (
    <div>
      <NavbarModerator />
      <HorizontalDivider title={"MentorsList"} />

      <MentorsListsComponent />
    </div>
  );
};
export default MentorsListPage;
