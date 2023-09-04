import { createBrowserRouter } from "react-router-dom";
import { homeRoutes } from "./homeRoutes/HomeRoutes";
import { ModeratorRoutes } from "./moderator/moderatorRoutes";

export const ApplicationBaseRoutes = createBrowserRouter([
  homeRoutes,
  ModeratorRoutes,
]);
