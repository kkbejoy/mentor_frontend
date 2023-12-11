import React from "react";
import { PaymentElement, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import ButtonComponenet from "../../General/Buttons/Button";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        console.log("Error in stripe Undefined caswe");
        return;
      }

      setIsProcessing(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: "if_required",
      });
      const paymentIntnet = "";
      console.log("Error, intnetn", error, paymentIntnet);
      if (paymentIntnet) console.log("Payment INtent", paymentIntnet);
      if (error) {
        console.log("error", error);
        setMessage(error.message ?? "Soemthing went wrong1");
      } else if (paymentIntnet && paymentIntnet.status === "succeeded") {
        setMessage("Payment status:" + paymentIntent.status);
        console.log("Payment success");
      } else {
        setMessage("An unexpected error occured");
      }
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>

      {/* Stripe Card Element */}
      <div id="stripe-card-element" className="mb-4"></div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        {/* <ButtonComponenet ButtonName /> */}
        <div className="mx-auto">
          <button
            className="mt-4 mx-auto bg-mentorBlue hover:bg-blue-900 text-white text-center font-bold py-2 px-4 rounded"
            disabled={isProcessing || !stripe || !elements}
          >
            <span id="button-text">
              {isProcessing ? "Processing ..." : "Pay now"}
            </span>
          </button>
        </div>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default CheckOutForm;
