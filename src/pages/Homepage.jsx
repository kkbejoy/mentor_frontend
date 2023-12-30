import React from "react";
import Navbar from "../componenets/General/Navbar/navbar";
// import Navbar
import HeroSection from "../componenets/General/Hero/HeroSection";
import FooterComponent from "../componenets/General/Footer/FooterComponent";

const Homepage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection />
      <FooterComponent />
    </div>
  );
};

export default Homepage;
