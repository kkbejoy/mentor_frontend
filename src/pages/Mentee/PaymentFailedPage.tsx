import React from "react";
import NavbarHome from "../../componenets/General/Navbar/navbar";
import PaymentFailure from "../../componenets/Mentee/Payments/PaymentFailure ";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";

const PaymentFailedPage = () => {
  return (
    <div>
      <NavbarHome />
      <PaymentFailure />
      <FooterComponent />
    </div>
  );
};

export default PaymentFailedPage;
