import React from "react";
import { Link } from "react-router-dom";

const PaymentFailure = ({ errorMessage }) => {
  return (
    <div className="flex flex-col items-center h-screen">
      {" "}
      <div className="bg-red-200 p-4 rounded-lg shadow-lg my-auto">
        <h2 className="text-2xl font-semibold text-red-700 text-center">
          Payment Failed
        </h2>
        <p className="text-lg text-red-800 text-center">
          {errorMessage || "An error occurred during the payment process."}
        </p>
        <div className="text-center text-blue-500">
          <Link to={"/mentees"}>Mentees Home Page</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
