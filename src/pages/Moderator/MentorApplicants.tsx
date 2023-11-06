import React from "react";
import NavbarModerator from "../../componenets/Moderator/NavbarModerator";
import MenteeLists from "../../componenets/Moderator/Tables/MenteeLists";
import Table from "../../componenets/Moderator/Tables/Table Layout/MenteeTable";
import MentorApplicantsListsComponent from "../../componenets/Moderator/Tables/MentorApplicantsList";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";

const MentroApplicantsPage = () => {
  return (
    <div>
      <NavbarModerator />
      <HorizontalDivider title={"Mentorship Applicants"} />

      <MentorApplicantsListsComponent />
      {/* <FooterComponent /> */}
    </div>
  );
};

export default MentroApplicantsPage;
