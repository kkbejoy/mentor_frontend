import React from "react";
import StripePaymentComponent from "../../componenets/Mentee/Stripe Component/StripeComponent";
import { SideBanner } from "../../componenets/General/LeftSideBanner/SideBanner";
import LeftSidePaymentForm from "../../componenets/Mentee/Stripe Component/LeftSidePaymentForm";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import PaymentDetailsComponent from "../../componenets/Mentee/Stripe Component/PaymentDetailsLeftSideComponenet";
const StripePaymentPage = () => {
  return (
    <div>
      <NavbarMentor />
      <div className="flex">
        <PaymentDetailsComponent />
        <StripePaymentComponent />
      </div>
    </div>
  );
};

export default StripePaymentPage;
