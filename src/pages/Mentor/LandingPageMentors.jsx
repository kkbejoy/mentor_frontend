import React, { useEffect } from "react";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import UpcommingLiveList from "../../componenets/Mentor/HomePage/UpcommingLiveList";
import { useDispatch, useSelector } from "react-redux";

import ChatLineGraphSkeleton from "../../componenets/General/Charts/Loaders/ChartLineGraphLoader";
import { fetchEnrolledMenteesCount } from "../../slices/MentorSlices/HomePageEnrollmentsGraph";
import Welcome from "../../componenets/Mentor/HomePage/Welcome";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
const LazyLineChart = React.lazy(() =>
  import("../../componenets/Mentor/HomePage/Charts/LineChart")
);
const LandingPageMentor = () => {
  const dispatch = useDispatch();
  const enrollmentData = useSelector(
    (state) => state?.mentorHomePageEnrolledMenteesForGraph?.data
  );

  console.log("Enrollment Data", enrollmentData);
  useEffect(() => {
    dispatch(fetchEnrolledMenteesCount());
  }, []);
  return (
    <div className="">
      <NavbarMentor />
      {/* <LineChart UserData={UserData} /> */}
      <Welcome />
      <div className="flex h-screen mt-3">
        <React.Suspense fallback={<ChatLineGraphSkeleton />}>
          <LazyLineChart InputData={enrollmentData} />
        </React.Suspense>
        <UpcommingLiveList />
      </div>
      <FooterComponent />
    </div>
  );
};

export default LandingPageMentor;
