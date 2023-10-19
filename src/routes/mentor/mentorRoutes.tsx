import { Mentor } from "../../App";
import LandingPageMentor from "../../pages/Mentor/LandingPageMentees";
import MentorAuthProvider from "./MentorAuthProvider";
import SchedulerPage from "../../pages/Mentor/SchedulerPage";
import MentorsProfile from "../../pages/Mentor/MentorsProfile";

import SubscribedMentees from "../../pages/Mentor/SubscribedMentees";

import InboxPageMentor from "../../pages/Mentor/InboxPageMentor";
export const MentorRoutes = {
  path: "/mentors",
  element: (
    <MentorAuthProvider>
      <Mentor />
    </MentorAuthProvider>
  ),
  children: [
    {
      path: "",
      element: <LandingPageMentor />,
    },
    {
      path: "search/mentor/:search",
      element: <LandingPageMentor />,
    },
    {
      path: "scheduler",
      element: <SchedulerPage />,
    },
    {
      path: "/mentors/profile",
      element: <MentorsProfile />,
    },
    {
      path: "/mentors/subscribed-mentees",
      element: <SubscribedMentees />,
    },
    {
      path: "connect/inbox/:conversationId?",
      element: <InboxPageMentor />,
    },
    {
      path: "/mentors/trail",
      element: <InboxPageMentor />,
    },
  ],
};
