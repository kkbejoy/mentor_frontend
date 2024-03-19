import { Moderator } from "../../App";
import { Suspense, lazy } from "react";
import ModeratorAuthProvider from "./ModeratorAuthProvider";
import ErrorPage from "../../componenets/General/Fallback/ErrorPage";
// import LandingPageModerator from "../../pages/Moderator/LandingPageModerator";
// import MenteesListPage from "../../pages/Moderator/MenteesListPage";
// import MentroApplicantsPage from "../../pages/Moderator/MentorApplicants";
// import MentorsListPage from "../../pages/Moderator/MentorsList";
// import TicketsPage from "../../pages/Moderator/TicketsPage";
// const VideoCallInterfaceMentorSidePage = lazy(() =>
//   import("../../pages/Mentor/VideoCallInterface")
// );

// const VideoCallInterfaceMentorSidePage = lazy(() =>
//   import("../../pages/Mentor/VideoCallInterface")
// );

// const VideoCallInterfaceMentorSidePage = lazy(() =>
//   import("../../pages/Mentor/VideoCallInterface")
// );
import { SuspenseLoader } from "../../componenets/General/SuspenseLoader/SuspenseLoader";

//Lazy Loaded Pages
const MentorsListPage = lazy(() => import("../../pages/Moderator/MentorsList"));

const MentroApplicantsPage = lazy(() =>
  import("../../pages/Moderator/MentorApplicants")
);

const MenteesListPage = lazy(() =>
  import("../../pages/Moderator/MenteesListPage")
);

const LandingPageModerator = lazy(() =>
  import("../../pages/Moderator/LandingPageModerator")
);

const TicketsPage = lazy(() => import("../../pages/Moderator/TicketsPage"));

export const ModeratorRoutes = {
  path: "/moderator",
  element: (
    <ModeratorAuthProvider>
      <Moderator />
    </ModeratorAuthProvider>
  ),
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <LandingPageModerator />,
        </Suspense>
      ),
    },
    {
      path: "mentees-list",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <MenteesListPage />,
        </Suspense>
      ),
    },
    {
      path: "mentors-list",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <MentorsListPage />,
        </Suspense>
      ),
    },
    {
      path: "mentor-applicants",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <MentroApplicantsPage />,
        </Suspense>
      ),
    },
    {
      path: "tickets",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <TicketsPage />
        </Suspense>
      ),
    },
  ],
};
