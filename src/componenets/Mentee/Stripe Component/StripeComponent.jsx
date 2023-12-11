import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckOutForm from "./CheckOutForm";
import {
  fetchStripeIntent,
  fetchStripePublishableKey,
} from "../../../api/menteesConfiguration/menteeServices";

const StripePaymentComponent = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  let publishableKey: string;
  useEffect(() => {
    fetchStripePublishableKey().then((res) => {
      console.log("stripe Pubkey:", res);

      const {
        data: { publishableKey },
      } = res;
      setStripePromise(() => loadStripe(publishableKey));
    });
  }, []);
  useEffect(() => {
    fetchStripeIntent().then((res) => {
      console.log("stripe intent:", res);
      const {
        data: { clientSecret },
      } = res;
      setClientSecret(clientSecret);
    });
  }, []);
  return (
    <div className="w-1/2 mx-auto my-auto bg-white-300">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
};
export default StripePaymentComponent;
