import { Mentee } from "../../App";
import LandingPageModerator from "../../pages/Moderator/LandingPageModerator";
import MenteesListPage from "../../pages/Moderator/MenteesListPage";
import MentroApplicantsPage from "../../pages/Moderator/MentorApplicants";
import MentorsListPage from "../../pages/Moderator/MentorsList";
import ModeratorAuthProvider from "./ModeratorAuthProvider";

export const ModeratorRoutes = {
  path: "/moderator",
  element: (
    <ModeratorAuthProvider>
      <Mentee />
    </ModeratorAuthProvider>
  ),
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
  ],
};
