import React from "react";
import { Link } from "react-router-dom";

const PaymentFailure = ({ errorMessage }) => {
  return (
    <div className="items-center ">
      {" "}
      <div className="bg-red-200 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-red-700">Payment Failed</h2>
        <p className="text-lg text-red-800">
          {errorMessage || "An error occurred during the payment process."}
        </p>

        <Link to={"/mentees"}>Mentees Home Page</Link>
      </div>
    </div>
  );
};

export default PaymentFailure;
