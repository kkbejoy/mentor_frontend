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
    <div className="bg-green-200 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-700">
        Payment Successful
      </h2>
      <p className="text-lg text-green-800">Thank you for your payment!</p>

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
  );
};

export default PaymentSuccess;
