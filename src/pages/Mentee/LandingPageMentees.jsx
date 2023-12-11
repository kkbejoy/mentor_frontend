import React from "react";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
import HeroSection from "../../componenets/General/Hero/HeroSection";

const LandingPageMentee = () => {
  return (
    <div>
      <NavbarMentee />
      {/* <h2 className="bg-red-400">Hello</h2> */}
      <HeroSection />
      <FooterComponent />
    </div>
  );
};

export default LandingPageMentee;
