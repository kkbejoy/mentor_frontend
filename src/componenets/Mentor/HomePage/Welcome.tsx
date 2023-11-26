import React from "react";
import { getMentorNameFromLocalStorage } from "../../../utilities/localStorageUtilities";

const Welcome = () => {
  const mentorName = getMentorNameFromLocalStorage();
  return (
    <div>
      <h1 className="text-center text-sm font-normal my-8 px-6">
        {" "}
        Welcome back,{" "}
        <span className="font-semibold text-lg">{mentorName}</span> 😊! We're
        thrilled to see you on your mentor dashboard. Your commitment to guiding
        and supporting our community is truly appreciated. As you navigate
        through your dashboard, remember that your expertise and insights make a
        significant impact on the growth of our mentees. If there's anything you
        need or any way we can enhance your mentoring experience, feel free to
        reach out. Together, we're creating an environment where knowledge
        flourishes, and success becomes a shared journey. Thank you for being a
        valued member of our mentor community. Happy mentoring!
      </h1>
    </div>
  );
};

export default Welcome;
