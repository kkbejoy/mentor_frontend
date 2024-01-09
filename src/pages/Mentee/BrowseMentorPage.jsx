import React, { useEffect } from "react";
import SearchComponent from "../../componenets/General/SearchComponent/SearchComponent";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import { MentorSearchResultComponent } from "../../componenets/Mentee/MentorSearchResultComponent";
import BorderLine from "../../componenets/General/BorderLine/BorderLine";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
import FilterComponent from "../../componenets/General/Filter/FilterComponent";
import { isMenteeAuthenticated } from "../../utilities/authenticationUtilities";
import NavbarHome from "../../componenets/General/Navbar/navbar";

const BrowseMentorPage = () => {
  const menteeAuthenticated = isMenteeAuthenticated();
  console.log("Mentee Auth data for navbar:", menteeAuthenticated);

  return (
    <div>
      {menteeAuthenticated ? <NavbarMentee /> : <NavbarHome />}
      <SearchComponent />
      <FilterComponent applyFilter={undefined} />
      <BorderLine />
      <MentorSearchResultComponent />
      <FooterComponent />
    </div>
  );
};

export default BrowseMentorPage;
