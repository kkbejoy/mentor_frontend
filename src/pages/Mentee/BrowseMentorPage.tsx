import React, { useEffect } from "react";
import SearchComponent from "../../componenets/General/SearchComponent/SearchComponent";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import { MentorSearchResultComponent } from "../../componenets/Mentee/MentorSearchResultComponent";
import BorderLine from "../../componenets/General/BorderLine/BorderLine";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";

const BrowseMentorPage = () => {
  return (
    <div>
      <NavbarMentee />
      <SearchComponent />
      <BorderLine />
      <MentorSearchResultComponent />
      <FooterComponent />
    </div>
  );
};

export default BrowseMentorPage;
