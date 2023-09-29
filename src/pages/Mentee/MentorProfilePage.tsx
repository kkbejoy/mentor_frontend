import React from "react";
import MentorPricingCard from "../../componenets/Mentee/MentorPricingCard";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import MentorProfileIntro from "../../componenets/Mentee/MentorProfileIntro";
import MentorAboutComponent from "../../componenets/Mentor/MentorAboutComponent";
import MentorReviewComponenet from "../../componenets/Mentee/MentorReviewComponenet";
import BorderLine from "../../componenets/General/BorderLine/BorderLine";
const MentorProfilePage = () => {
  return (
    <div>
      <NavbarMentee />
      <MentorProfileIntro />
      {/* <MentorPricingCard /> */}
      <BorderLine />
      <MentorAboutComponent />
      <MentorReviewComponenet />
    </div>
  );
};

export default MentorProfilePage;
