import React from "react";

const PaymentDetailsComponent = () => {
  return (
    <div className="w-1/2 flex flex-col justify-center items-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>

      <h6 className="text-2sm font-narrow mb-4">
        Please verify the below billing details
      </h6>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="menteeName"
            className="block text-sm font-medium mb-1"
          >
            Mentee Name : "Bejoy K K"
          </label>
          <input
            disabled
            type="text"
            id="menteeName"
            name="menteeName"
            className="w-full border rounded px-3 py-2"
            // placeholder="Enter Mentee Name"
            value={"Bejoy K K"}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mentorName"
            className="block text-sm font-medium mb-1"
          >
            Mentor Name
          </label>
          <input
            disabled
            type="text"
            id="mentorName"
            name="mentorName"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter Mentor Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mentorFees"
            className="block text-sm font-medium mb-1"
          >
            Mentor Fees
          </label>
          <input
            disabled
            type="text"
            id="mentorFees"
            name="mentorFees"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter Mentor Fees"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="subscriptionFrom"
            className="block text-sm font-medium mb-1"
          >
            Subscription From
          </label>
          <input
            disabled
            type="date"
            id="subscriptionFrom"
            name="subscriptionFrom"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="subscriptionTo"
            className="block text-sm font-medium mb-1"
          >
            Subscription To
          </label>
          <input
            disabled
            type="date"
            id="subscriptionTo"
            name="subscriptionTo"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsComponent;
