import Homepage from "../../pages/Homepage";
import MenteeRegisterPage from "../../pages/MenteeRegisterPage";
import MentorRegisterPage from "../../pages/MentorRegisterPage";
// import RegistrationSuccssPage from "../../pages/RegistrationSuccess";
import { EnterEmailIdPage } from "../../pages/ResetPassword/EnterEmailIdPage";
// import NoMatchComponent from "../../componenets/General/NoMatchComponent/NoMatchComponent";

import { LoginPage } from "../../pages/LoginPage";
import { Home } from "../../App";
// import HeroSection from "../../componenets/General/Hero/HeroSection";
import BrowseMentorPage from "../../pages/Mentee/BrowseMentorPage";
import MentorProfilePage from "../../pages/Mentee/MentorProfilePage";
import GoogleSuccessPage from "../../componenets/General/Login/GoogleAuth/GoogleSuccessPage";
import ErrorPage from "../../componenets/General/Fallback/ErrorPage";
export const homeRoutes = {
  path: "/",
  element: <Home />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "browse/mentor/:search",
      element: <BrowseMentorPage />,
    },
    {
      path: "browse/mentor/profile/:id",
      element: <MentorProfilePage />,
    },
    {
      path: "/auth/login",
      element: <LoginPage />,
    },
    {
      path: "/auth/mentee-register",
      element: <MenteeRegisterPage />,
    },
    {
      path: "/auth/mentor-register",
      element: <MentorRegisterPage />,
    },
    // {
    //   path: "/auth/registrationsuccess",
    //   element: <RegistrationSuccssPage />,
    // },
    // {
    //   path: "/auth/mentor/forgotpassword",
    //   element: <EnterEmailIdPage />,
    // },
    {
      path: "/auth/mentee/forgotpassword",
      element: <EnterEmailIdPage />,
    },
    {
      path: "/auth/mentee/googleauthsuccess/:data?",
      element: <GoogleSuccessPage />,
    },
    // {
    //   path: "*",
    //   element: <NoMatchComponent />,
    // },
  ],
};
