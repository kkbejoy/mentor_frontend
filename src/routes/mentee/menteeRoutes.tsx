import { Mentee } from "../../App";
import StripePaymentComponent from "../../componenets/Mentee/Stripe Component/StripeComponent";
import BrowseMentorPage from "../../pages/Mentee/BrowseMentorPage";
import LandingPageMentee from "../../pages/Mentee/LandingPageMentees";
import MentorProfilePage from "../../pages/Mentee/MentorProfilePage";
import PaymentFailedPage from "../../pages/Mentee/PaymentFailedPage";
import PaymentSuccesPage from "../../pages/Mentee/PaymentSuccesPage";
import StripePaymentPage from "../../pages/Mentee/StripePaymentPage";
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
      path: "stripe/payment",
      element: <StripePaymentPage />,
    },
    {
      path: "payment/success/:paymentId",
      element: <PaymentSuccesPage />,
    },
    {
      path: "payment/failed",
      element: <PaymentFailedPage />,
    },
  ],
};
