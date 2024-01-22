import React from "react";
import NavbarModerator from "../../componenets/Moderator/NavbarModerator";
import DailyEnrollmentGraph from "../../componenets/Moderator/charts/DailyEnrollmentGraph";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
import DailyNewMenteesRegistration from "../../componenets/Moderator/charts/DailyNewMenteesRegistration";
import Welcome from "../../componenets/Moderator/Welcome";

const LandingPageModerator = () => {
  return (
    <div>
      {/* <NavbarModerator /> */}
      <Welcome />
      <div className="flex h-screen mt-3">
        <DailyEnrollmentGraph />
        <DailyNewMenteesRegistration />
      </div>
      <FooterComponent />
    </div>
  );
};

export default LandingPageModerator;
