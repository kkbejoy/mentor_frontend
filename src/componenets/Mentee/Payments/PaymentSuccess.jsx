import React, { useEffect } from "react";
import { makeEnrollmentActive } from "../../../api/menteesConfiguration/menteeServices";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = ({ amount, paymentMethod, transactionId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = new URL("https://example.com" + location.pathname);
  const id = url.pathname.split("/").pop();
  console.log(id);
  useEffect(() => {
    makeEnrollmentActive(id).then((res) => {
      navigate("/mentees");
    });
  });
  return (
    <div className="flex flex-col items-center p-4 rounded-lg shadow-lg h-screen">
      <div className="bg-gradient-to-r from-green-200 ... animate-pulse p-4 rounded-lg shadow-2xl my-auto">
        {" "}
        <h2 className="text-2xl font-semibold  text-back text-center">
          Payment Successful
        </h2>
        <p className="text-lg text-green-800 text-center">
          Thank you for your payment!
        </p>
        {amount && (
          <p className="text-lg text-green-800">
            <strong>Amount:</strong> ${amount}
          </p>
        )}
        {paymentMethod && (
          <p className="text-lg text-green-800">
            <strong>Payment Method:</strong> {paymentMethod}
          </p>
        )}
        {transactionId && (
          <p className="text-lg text-green-800">
            <strong>Transaction ID:</strong> {transactionId}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
