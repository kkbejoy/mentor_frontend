import React from "react";
import ButtonComponenet from "../General/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { stripeCheckOut } from "../../api/menteesConfiguration/menteeServices";

const MentorPricingCard = ({ mentorId, mentorFees, mentorPriceId }) => {
  const navigate = useNavigate();

  const handleSubscriptionButton = async () => {
    try {
      console.log(
        "Subscribe Button Clicked",
        mentorId,
        mentorFees,
        mentorPriceId
      );

      const responses = stripeCheckOut(mentorPriceId, mentorId);
      console.log("Reponse from title page", responses);
      responses
        .then((res) => {
          console.log("responses from stripe checklopit", res);
          window.location.href = res?.data.url;
        })
        .catch((error) => {
          console.log(error);
        });
      // navigate("/mentees/create-checkout");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="  top-0 z-50  max-w-md mx-auto bg-white rounded-xl  p-6 ">
      <div className="text-2xl font-bold">{mentorFees} / Hour</div>

      <div className="text-gray-600 text-sm">
        4 calls per month (60min/call)
      </div>
      <div className="text-gray-600 text-sm">Unlimited Q&A via chat</div>
      <div className="text-gray-600 text-sm">
        Expect responses in 24 hours or less
      </div>
      <ButtonComponenet
        ButtonName={"Subscribe Now"}
        handleButtonClcik={handleSubscriptionButton}
      />
      {/* <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
        Subscribe Now
      </button> */}
      <div className="text-gray-600 text-sm mt-4">
        Flat fee, no hidden costs
      </div>
      {/* <div className="text-gray-600 text-sm">
        7-day free trial! Cancel anytime.
      </div> */}
      <div className="text-gray-600 text-sm">Lock in this price now!</div>
    </div>
  );
};

export default MentorPricingCard;
