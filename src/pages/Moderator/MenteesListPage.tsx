import React, { useEffect, useState } from "react";
import NavbarModerator from "../../componenets/Moderator/NavbarModerator";
import MenteeLists from "../../componenets/Moderator/Tables/MenteeLists";
const MenteesListPage = () => {
  return (
    <div>
      <NavbarModerator />
      <MenteeLists />
    </div>
  );
};
export default MenteesListPage;
