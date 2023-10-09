import { Mentee } from "../../App";
import StripePaymentComponent from "../../componenets/Mentee/Stripe Component/StripeComponent";
import SubscibedMentorsList from "../../componenets/Mentee/SubscibedMentorsList/SubscibedMentorsList";
import BrowseMentorPage from "../../pages/Mentee/BrowseMentorPage";
import LandingPageMentee from "../../pages/Mentee/LandingPageMentees";
import MentorProfilePage from "../../pages/Mentee/MentorProfilePage";
import PaymentFailedPage from "../../pages/Mentee/PaymentFailedPage";
import PaymentSuccesPage from "../../pages/Mentee/PaymentSuccesPage";
import SchedulerPage from "../../pages/Mentee/SchedulerPage";
import StripePaymentPage from "../../pages/Mentee/StripePaymentPage";
import SubscribedMentorsPage from "../../pages/Mentee/SubscribedMentorsPage";
import MenteeAuthProvider from "./MenteeAuthProvider";
export const MenteeRoute = {
  path: "/mentees",
  element: (
    <MenteeAuthProvider>
      <Mentee />
    </MenteeAuthProvider>
  ),
  children: [
    {
      path: "",
      element: <LandingPageMentee />,
    },
    {
      path: "browse/mentor/:search",
      element: <BrowseMentorPage />,
    },
    {
      path: "browse/mentor/profile/:id",
      element: <MentorProfilePage />,
    },
    {
      path: "subscribed-mentors",
      element: <SubscribedMentorsPage />,
    },
    {
      path: "payment/success/:paymentId",
      element: <PaymentSuccesPage />,
    },
    {
      path: "payment/failed",
      element: <PaymentFailedPage />,
    },
    {
      path: "schedules",
      element: <SchedulerPage />,
    },
  ],
};
