import { Suspense, lazy } from "react";
import { Mentor } from "../../App";
import LandingPageMentor from "../../pages/Mentor/LandingPageMentors";
import MentorAuthProvider from "./MentorAuthProvider";
// import SchedulerPage from "../../pages/Mentor/SchedulerPage";
// import MentorsProfile from "../../pages/Mentor/MentorsProfile";
// import SubscribedMentees from "../../pages/Mentor/SubscribedMentees";
import { SuspenseLoader } from "../../componenets/General/SuspenseLoader/SuspenseLoader";

// import InboxPageMentor from "../../pages/Mentor/InboxPageMentor";
// import VideoCallInterfaceMentorSidePage from "../../pages/Mentor/VideoCallInterface";
// import TicketsMentorSidePage from "../../pages/Mentor/TicketsMentorSide";
// import ErrorPage from "../../componenets/General/Fallback/ErrorPage";
// import MentorCardShimmers from "../../componenets/General/Cards/MentorCardShimmers";

//Lazy Loaded Pages
const VideoCallInterfaceMentorSidePage = lazy(() =>
  import("../../pages/Mentor/VideoCallInterface")
);

const SchedulerPage = lazy(() => import("../../pages/Mentor/SchedulerPage"));
const MentorsProfile = lazy(() => import("../../pages/Mentor/MentorsProfile"));

const InboxPageMentor = lazy(() =>
  import("../../pages/Mentor/InboxPageMentor")
);

const SubscribedMentees = lazy(() =>
  import("../../pages/Mentor/SubscribedMentees")
);
const TicketsMentorSidePage = lazy(() =>
  import("../../pages/Mentor/TicketsMentorSide")
);
const ErrorPage = lazy(() =>
  import("../../componenets/General/Fallback/ErrorPage")
);
const MentorCardShimmers = lazy(() =>
  import("../../componenets/General/Cards/MentorCardShimmers")
);

//Mentor Routes
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
      path: "scheduler",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <SchedulerPage />
        </Suspense>
      ),
    },
    {
      path: "profile",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <MentorsProfile />
        </Suspense>
      ),
    },
    {
      path: "subscribed-mentees",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <SubscribedMentees />
        </Suspense>
      ),
    },
    {
      path: "connect/inbox/:conversationId?",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <InboxPageMentor />
        </Suspense>
      ),
    },
    {
      path: "connect/live/:conversationId?",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <VideoCallInterfaceMentorSidePage />
        </Suspense>
      ),
    },
    {
      path: "tickets",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <TicketsMentorSidePage />
        </Suspense>
      ),
    },
    // {
    //   path: "trail",
    //   element: <MentorCardShimmers />,
    // },
  ],
};
