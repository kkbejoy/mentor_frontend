import React, { useEffect, useState } from "react";
import NavbarModerator from "../../componenets/Moderator/NavbarModerator";
import MenteeLists from "../../componenets/Moderator/Tables/MenteeLists";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
const MenteesListPage = () => {
  return (
    <div>
      {/* <NavbarModerator /> */}
      <HorizontalDivider title={"Mentees List"} />
      <MenteeLists />
      {/* <FooterComponent /> */}
    </div>
  );
};
export default MenteesListPage;
