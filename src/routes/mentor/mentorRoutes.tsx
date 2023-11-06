import { Mentor } from "../../App";
import LandingPageMentor from "../../pages/Mentor/LandingPageMentees";
import MentorAuthProvider from "./MentorAuthProvider";
import SchedulerPage from "../../pages/Mentor/SchedulerPage";
import MentorsProfile from "../../pages/Mentor/MentorsProfile";
import MentorPricingCardShimmer from "../../componenets/Mentee/Shimmers/MentorPricingCardShimmer";
import SubscribedMentees from "../../pages/Mentor/SubscribedMentees";

import InboxPageMentor from "../../pages/Mentor/InboxPageMentor";
import MentorHeaderShimmer from "../../componenets/Mentee/Shimmers/MentorHeaderShimmer";
import ConfirmationModal from "../../componenets/General/Modals/CancelConfirmationModal";
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
      element: (
        <ConfirmationModal
          isOpen={undefined}
          onConfirm={undefined}
          onCancel={undefined}
          message={undefined}
        />
      ),
    },
  ],
};
