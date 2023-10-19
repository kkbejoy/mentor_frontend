import React from "react";
import StripePaymentComponent from "../../componenets/Mentee/Stripe Component/StripeComponent";
import { SideBanner } from "../../componenets/General/LeftSideBanner/SideBanner";
import LeftSidePaymentForm from "../../componenets/Mentee/Stripe Component/LeftSidePaymentForm";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import PaymentDetailsComponent from "../../componenets/Mentee/Stripe Component/PaymentDetailsLeftSideComponenet";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
const StripePaymentPage = () => {
  return (
    <div>
      <NavbarMentee />
      <div className="flex">
        <PaymentDetailsComponent />
        <StripePaymentComponent />
      </div>{" "}
      <FooterComponent />
    </div>
  );
};

export default StripePaymentPage;
