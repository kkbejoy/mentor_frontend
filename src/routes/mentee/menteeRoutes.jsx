import { Suspense, lazy } from "react";
import { Mentee } from "../../App";
import MenteeAuthProvider from "./MenteeAuthProvider";
import { SuspenseLoader } from "../../componenets/General/SuspenseLoader/SuspenseLoader";
// import InboxPageMentee from "../../pages/Mentee/InboxPageMentee";
// import InboxEmptyPage from "../../pages/Mentee/InboxEmptyPage";
// import MenteeProfile from "../../pages/Mentee/MenteeProfile";
// import BookedSlotsList from "../../pages/Mentee/BookedSlotsList";
// import VideoCallInterfaceMenteeSidePage from "../../pages/Mentee/VideoCallInterface";
// import TicketsMenteePage from "../../pages/Mentee/TicketsMenteePage";
// import PaymentFailedPage from "../../pages/Mentee/PaymentFailedPage";
// import PaymentSuccesPage from "../../pages/Mentee/PaymentSuccesPage";

// import SchedulerPage from "../../pages/Mentee/SchedulerPage";
// import SubscribedMentorsPage from "../../pages/Mentee/SubscribedMentorsPage";
// import BrowseMentorPage from "../../pages/Mentee/BrowseMentorPage";
// import LandingPageMentee from "../../pages/Mentee/LandingPageMentees";
// import MentorProfilePage from "../../pages/Mentee/MentorProfilePage";

import ErrorPage from "../../componenets/General/Fallback/ErrorPage";
// import SpinnerModal from "../../componenets/General/LoadingSpinners/SpinnerModal";
// import FallbackLoader from "../../componenets/General/LoadingSpinners/FallbackLoader";

//Lazy Loaded Componenents
const BrowseMentorPage = lazy(() =>
  import("../../pages/Mentee/BrowseMentorPage")
);
const LandingPageMentee = lazy(() =>
  import("../../pages/Mentee/LandingPageMentees")
);
const MentorProfilePage = lazy(() =>
  import("../../pages/Mentee/MentorProfilePage")
);
const PaymentSuccesPage = lazy(() =>
  import("../../pages/Mentee/PaymentSuccesPage")
);
const SubscribedMentorsPage = lazy(() =>
  import("../../pages/Mentee/SubscribedMentorsPage")
);
const SchedulerPage = lazy(() => import("../../pages/Mentee/SchedulerPage"));
const VideoCallInterfaceMenteeSidePage = lazy(() =>
  import("../../pages/Mentee/VideoCallInterface")
);
const BookedSlotsList = lazy(() =>
  import("../../pages/Mentee/BookedSlotsList")
);
const MenteeProfile = lazy(() => import("../../pages/Mentee/MenteeProfile"));
const InboxPageMentee = lazy(() =>
  import("../../pages/Mentee/InboxPageMentee")
);

const TicketsMenteePage = lazy(() =>
  import("../../pages/Mentee/TicketsMenteePage")
);

// const InboxPageMentee =React.lazy(import("../../pages/Mentee/InboxPageMentee"))
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
      element: (
        <Suspense fallback={SuspenseLoader}>
          <LandingPageMentee />,
        </Suspense>
      ),
    },
    {
      path: "profile",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <MenteeProfile />,
        </Suspense>
      ),
    },
    {
      path: "browse/mentor/:search",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <BrowseMentorPage />,
        </Suspense>
      ),
    },
    {
      path: "browse/mentor/profile/:id",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <MentorProfilePage />,
        </Suspense>
      ),
    },
    {
      path: "subscribed-mentors",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <SubscribedMentorsPage />,
        </Suspense>
      ),
    },
    {
      path: "payment/success/:paymentId",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <PaymentSuccesPage />,
        </Suspense>
      ),
    },
    // {
    //   path: "payment/failed",
    //   element: <PaymentFailedPage />,
    // },
    {
      path: "schedules",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <SchedulerPage />
        </Suspense>
      ),
    },

    {
      path: "connect/inbox/:conversationId?",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <InboxPageMentee />
        </Suspense>
      ),
    },
    {
      path: "connect/live/:conversationId?",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <VideoCallInterfaceMenteeSidePage />
        </Suspense>
      ),
    },
    {
      path: "booked-slots",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <BookedSlotsList />,
        </Suspense>
      ),
    },
    {
      path: "tickets",
      element: (
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold items-center">
              Loading...
            </div>
          }
        >
          <TicketsMenteePage />,
        </Suspense>
      ),
    },
    {
      path: "trail",
      element: <SuspenseLoader />,
    },
  ],
};
