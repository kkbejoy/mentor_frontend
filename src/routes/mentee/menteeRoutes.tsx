import { Mentee } from "../../App";

import BrowseMentorPage from "../../pages/Mentee/BrowseMentorPage";
import LandingPageMentee from "../../pages/Mentee/LandingPageMentees";
import MentorProfilePage from "../../pages/Mentee/MentorProfilePage";
import PaymentFailedPage from "../../pages/Mentee/PaymentFailedPage";
import PaymentSuccesPage from "../../pages/Mentee/PaymentSuccesPage";
import SchedulerPage from "../../pages/Mentee/SchedulerPage";
import SubscribedMentorsPage from "../../pages/Mentee/SubscribedMentorsPage";
import MenteeAuthProvider from "./MenteeAuthProvider";
import InboxPageMentee from "../../pages/Mentee/InboxPageMentee";
import InboxEmptyPage from "../../pages/Mentee/InboxEmptyPage";
import MenteeProfile from "../../pages/Mentee/MenteeProfile";
import BookedSlotsList from "../../pages/Mentee/BookedSlotsList";
import VideoCallInterfaceMenteeSidePage from "../../pages/Mentee/VideoCallInterface";
import TicketsMenteePage from "../../pages/Mentee/TicketsMenteePage";
import ErrorPage from "../../componenets/General/Fallback/ErrorPage";
export const MenteeRoute = {
  path: "/mentees",
  element: (
    <MenteeAuthProvider>
      <Mentee />
    </MenteeAuthProvider>
  ),
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <LandingPageMentee />,
    },
    {
      path: "profile",
      element: <MenteeProfile />,
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
    {
      // path: "connect/inbox",
      // element: <InboxEmptyPage />,
    },
    {
      path: "connect/inbox/:conversationId?",
      element: <InboxPageMentee />,
    },
    {
      path: "connect/live/:conversationId?",
      element: <VideoCallInterfaceMenteeSidePage />,
    },
    {
      path: "booked-slots",
      element: <BookedSlotsList />,
    },
    {
      path: "tickets",
      element: <TicketsMenteePage />,
    },
  ],
};
