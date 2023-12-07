import { Mentor } from "../../App";
import LandingPageMentor from "../../pages/Mentor/LandingPageMentors";
import MentorAuthProvider from "./MentorAuthProvider";
import SchedulerPage from "../../pages/Mentor/SchedulerPage";
import MentorsProfile from "../../pages/Mentor/MentorsProfile";
import SubscribedMentees from "../../pages/Mentor/SubscribedMentees";

import InboxPageMentor from "../../pages/Mentor/InboxPageMentor";
import ConfirmationModal from "../../componenets/General/Modals/CancelConfirmationModal";
import VideoCallInterfaceMentorSidePage from "../../pages/Mentor/VideoCallInterface";
import Example from "../../componenets/General/Trail/trail";
import ProfileInformationEditComponent from "../../componenets/Mentor/Profile/ProfileInformationEditComponent";
import TicketsMentorSidePage from "../../pages/Mentor/TicketsMentorSide";
import RaiseANewTicketModal from "../../componenets/General/Modals/RaiseANewTicketModal";
import HomePageTypewriter from "../../componenets/General/Typewriter/HomePageTypewriter";
import HomePageMentorCards from "../../componenets/General/Cards/HomePageMentorCards";
import NotificationDot from "../../componenets/General/Notification/NotificationDot";
import NotificationDropdown from "../../componenets/General/Notification/MenteeNotificationDropdown";
import ErrorPage from "../../componenets/General/Fallback/ErrorPage";
import EmojiPicketComponent from "../../componenets/General/Emoji Picker/EmojiPicketComponent";

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
      path: "connect/live/:conversationId?",
      element: <VideoCallInterfaceMentorSidePage />,
    },
    {
      path: "tickets",
      element: <TicketsMentorSidePage />,
    },
    {
      path: "/mentors/trail",
      element: <EmojiPicketComponent />,
    },
  ],
};
