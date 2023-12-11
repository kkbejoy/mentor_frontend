import { Moderator } from "../../App";
import ErrorPage from "../../componenets/General/Fallback/ErrorPage";
import LandingPageModerator from "../../pages/Moderator/LandingPageModerator";
import MenteesListPage from "../../pages/Moderator/MenteesListPage";
import MentroApplicantsPage from "../../pages/Moderator/MentorApplicants";
import MentorsListPage from "../../pages/Moderator/MentorsList";
import TicketsPage from "../../pages/Moderator/TicketsPage";
import ModeratorAuthProvider from "./ModeratorAuthProvider";

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
      element: <LandingPageModerator />,
    },
    {
      path: "mentees-list",
      element: <MenteesListPage />,
    },
    {
      path: "mentors-list",
      element: <MentorsListPage />,
    },
    {
      path: "mentor-applicants",
      element: <MentroApplicantsPage />,
    },
    {
      path: "tickets",
      element: <TicketsPage />,
    },
  ],
};
