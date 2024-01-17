import { Mentor } from "../../App";
import LandingPageMentor from "../../pages/Mentor/LandingPageMentors";
import MentorAuthProvider from "./MentorAuthProvider";
import SchedulerPage from "../../pages/Mentor/SchedulerPage";
import MentorsProfile from "../../pages/Mentor/MentorsProfile";
import SubscribedMentees from "../../pages/Mentor/SubscribedMentees";

import InboxPageMentor from "../../pages/Mentor/InboxPageMentor";
import VideoCallInterfaceMentorSidePage from "../../pages/Mentor/VideoCallInterface";
import TicketsMentorSidePage from "../../pages/Mentor/TicketsMentorSide";
import ErrorPage from "../../componenets/General/Fallback/ErrorPage";

export const MentorRoutes = {
  path: "/mentors",
  element: (
    <MentorAuthProvider>
      <Mentor />
    </MentorAuthProvider>
  ),
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <LandingPageMentor />,
    },
    // {
    //   path: "search/mentor/:search",
    //   element: <LandingPageMentor />,
    // },
    {
      path: "scheduler",
      element: <SchedulerPage />,
    },
    {
      path: "profile",
      element: <MentorsProfile />,
    },
    {
      path: "subscribed-mentees",
      element: <SubscribedMentees />,
    },
    {
      path: "connect/inbox/:conversationId?",
      element: <InboxPageMentor />,
    },
    {
      path: "connect/live/:conversationId?",
      element: <VideoCallInterfaceMentorSidePage />,
    },
    {
      path: "tickets",
      element: <TicketsMentorSidePage />,
    },
    // {
    //   path: "/mentors/trail",
    //   element: <EmojiPicketComponent />,
    // },
  ],
};
