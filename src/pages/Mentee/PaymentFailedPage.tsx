import React from "react";
import NavbarHome from "../../componenets/General/Navbar/navbar";
import PaymentFailure from "../../componenets/Mentee/Payments/PaymentFailure ";

const PaymentFailedPage = () => {
  return (
    <div>
      <NavbarHome />
      <PaymentFailure />
    </div>
  );
};

export default PaymentFailedPage;
