import React, { useEffect, useState } from "react";
import NavbarModerator from "../../componenets/Moderator/NavbarModerator";
import MentorsListsComponent from "../../componenets/Moderator/Tables/MentorsList";
const MentorsListPage = () => {
  return (
    <div>
      <NavbarModerator />
      <MentorsListsComponent />
    </div>
  );
};
export default MentorsListPage;
