import React from "react";
import ButtonComponenet from "../General/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { stripeCheckOut } from "../../api/menteesConfiguration/menteeServices";
import { BASE_URL } from "../../constants/constants";
import { toast } from "sonner";

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
          if (res?.response?.status === 409) {
            toast.error("You are already subscribed to this Mentor");
          } else if (res?.status === 201) {
            console.log("To checkout Page");
            window.location.href = res?.data.url;
          } else {
            console.log("responses from stripe checklopit", res);
            throw new Error("Something unexpected happend");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Somthing unexpected happend");
          throw new Error(error);
          // window.location.href = BASE_URL;
        });
      // navigate("/mentees/create-checkout");
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
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
        BackgroundColor="green-500"
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
