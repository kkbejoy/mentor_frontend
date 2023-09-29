import { createBrowserRouter } from "react-router-dom";
import { homeRoutes } from "./homeRoutes/HomeRoutes";
import { ModeratorRoutes } from "./moderator/moderatorRoutes";
import { MenteeRoute } from "./mentee/menteeRoutes";
import { MentorRoutes } from "./mentor/mentorRoutes";

export const ApplicationBaseRoutes = createBrowserRouter([
  homeRoutes,
  ModeratorRoutes,
  MenteeRoute,
  MentorRoutes,
]);
