import { Moderator } from "../../App";
import LandingPageModerator from "../../pages/Moderator/LandingPageModerator";

export const ModeratorRoutes = {
  path: "/moderator",
  element: <Moderator />,
  children: [
    {
      path: "",
      element: <LandingPageModerator />,
    },
  ],
};
