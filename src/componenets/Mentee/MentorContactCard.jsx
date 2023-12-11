import React from "react";
import { UilTrees } from "@iconscout/react-unicons";
import { UilChat } from "@iconscout/react-unicons";
import { UilVideo } from "@iconscout/react-unicons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMessagesBetweenMentorAndMentee } from "../../api/menteesConfiguration/menteeServices";
import { toast } from "sonner";
const MentorContactCard = () => {
  const params = useParams();
  const navigate = useNavigate();
  const metorId = params?.id;
  console.log("params", params);
  const handleChatButtonClick = async () => {
    try {
      console.log("Button clicked");
      const responseFromMessages = await getMessagesBetweenMentorAndMentee(
        metorId
      );
      const conversationId = responseFromMessages.conversations._id;
      navigate(`/mentees/connect/inbox/${conversationId}`);
    } catch (error) {
      toast.error("Some error");
    }
  };
  return (
    <div className="  inline-block top-0 z-50  max-w-md mx-auto  bg-gradient-to-r from-mentorBlue to-gray-100 rounded-xl border-spacing-3 p-6  animate-none ">
      <div className="flex text-2xl font-semi-bold cursor-pointer p-1 rounded my-3 transition-colors hover:bg-red-50">
        <div className="text-md mr-2">
          <UilTrees color="#00FF00" />
        </div>
        <div className="text-sm font-semibold">Community</div>
      </div>
      <div
        onClick={handleChatButtonClick}
        className="flex text-2xl my-3   p-1 rounded cursor-pointer transition-colors hover:bg-red-50"
      >
        <div
          className="text-md mr-2 cursor-pointer"
          onClick={handleChatButtonClick}
        >
          <UilChat color="#FFA500" />
        </div>
        <div className="text-sm font-semibold cursor-pointer">Chat</div>
      </div>

      <div className="flex text-2xl font-semi-bold p-1 rounded my-3 transition-colors hover:bg-red-50">
        <div className="text-md mr-2  font-thin">
          <Link to={"/mentees/schedules"}>
            {" "}
            <UilVideo color="#4169E1" />
          </Link>
        </div>
        <div className="text-sm font-semibold border-spacing-2 ">
          <Link to={"/mentees/schedules"}> Schedule a live Session</Link>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="  top-0 z-50  max-w-md mx-auto bg-white rounded-xl  p-6 ">
  //     <div className="text-2xl font-bold">/ Hour</div>

  //     <div className="text-gray-600 text-sm">
  //       4 calls per month (60min/call)
  //     </div>
  //     <div className="text-gray-600 text-sm">Unlimited Q&A via chat</div>
  //     <div className="text-gray-600 text-sm">
  //       Expect responses in 24 hours or less
  //     </div>
  //     {/* <ButtonComponenet
  //       ButtonName={"Subscribe Now"}
  //       handleButtonClcik={handleSubscriptionButton}
  //     /> */}
  //     {/* <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
  //     Subscribe Now
  //   </button> */}
  //     <div className="text-gray-600 text-sm mt-4">
  //       Flat fee, no hidden costs
  //     </div>
  //     {/* <div className="text-gray-600 text-sm">
  //     7-day free trial! Cancel anytime.
  //   </div> */}
  //     <div className="text-gray-600 text-sm">Lock in this price now!</div>
  //   </div>
  // );
};

export default MentorContactCard;
