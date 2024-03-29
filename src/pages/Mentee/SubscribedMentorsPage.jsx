import React, { useEffect } from "react";
import SubscibedMentorsList from "../../componenets/Mentee/SubscibedMentorsList/SubscibedMentorsList";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import SubscribedMentorsCardComponent from "../../componenets/Mentee/SubscibedMentorsList/SubscribedMentorsCardComponent";
import { fetchSubscribedMentorsList } from "../../slices/MenteeSlices/subscribedMentorsListSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";

const SubscribedMentorsPage = () => {
  const subscribedMentorsList = useSelector(
    (state) => state.menteeSideSubscribedMentorsList
  );

  const isLoadingSubscriptionList = useSelector(
    (state) => state.menteeSideSubscribedMentorsList.isLoading
  );

  const { menteeId } = getUserIdAndToken("menteeAuth");
  console.log(
    "Data from mentee side subscribed Mentors",
    subscribedMentorsList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSubscribedMentorsList(menteeId));
  }, []);
  return (
    <div className="">
      <NavbarMentee />
      <HorizontalDivider title={"Subscibed Mentors"} />
      <div className="grid ml-5 py-4 md:grid-cols-5 items-center px-10 h-screen">
        {subscribedMentorsList
          ? subscribedMentorsList.data.map((enrollment, index) => {
              console.log("From map:,", enrollment);
              return (
                <SubscibedMentorsList
                  key={enrollment._id}
                  enrollment={enrollment}
                  index={index}
                />
              );
            })
          : null}
      </div>
      <FooterComponent />
    </div>
  );
};

export default SubscribedMentorsPage;
