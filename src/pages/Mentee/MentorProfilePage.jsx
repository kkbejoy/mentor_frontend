import React, { useEffect } from "react";
import MentorPricingCard from "../../componenets/Mentee/MentorPricingCard";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import MentorProfileIntro from "../../componenets/Mentee/MentorProfileIntro";
import MentorAboutComponent from "../../componenets/Mentor/MentorAboutComponent";
import MentorReviewComponenet from "../../componenets/Mentee/MentorReviewComponenet";
import BorderLine from "../../componenets/General/BorderLine/BorderLine";
import { useDispatch, useSelector } from "react-redux";
import { mentorProfileDetails } from "../../slices/MenteeSlices/mentorProfile";
import { useParams } from "react-router-dom";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
const MentorProfilePage = () => {
  const dispatch = useDispatch();
  const mentorDetailsObject = useSelector(
    (state) => state?.mentorProfileData?.data?.mentorData
  );
  const isThisMentorSubscriptionActive = useSelector(
    (state) => state?.mentorProfileData?.data?.isEnrollmentActive
  );
  console.log("mentor object from page:", mentorDetailsObject);
  const params = useParams();
  const { id: mentorId } = params;

  useEffect(() => {
    console.log("Location Data", mentorId);
    dispatch(mentorProfileDetails(mentorId));
  }, [mentorId]);
  return (
    <div>
      <NavbarMentee />
      <MentorProfileIntro
        mentorDetailsObject={mentorDetailsObject}
        subscriptionStatus={isThisMentorSubscriptionActive}
      />
      {/* <MentorPricingCard /> */}
      <BorderLine />
      <MentorAboutComponent mentorAbout={mentorDetailsObject?.bio} />
      <MentorReviewComponenet />
      <FooterComponent />
    </div>
  );
};

export default MentorProfilePage;
