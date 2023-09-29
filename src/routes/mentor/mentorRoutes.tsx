import { Mentor } from "../../App";
import LandingPageMentor from "../../pages/Mentor/LandingPageMentees";
import MentorAuthProvider from "./MentorAuthProvider";
import SchedulerPage from "../../pages/Mentor/SchedulerPage";
import MentorFormModalComponent from "../../componenets/Mentor/Scheduler/MentorFormModalComponent";
export const MentorRoutes = {
  path: "/mentors",
  element: (
    <MentorAuthProvider>
      <Mentor />
    </MentorAuthProvider>
  ),
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
      path: "trail",
      element: <MentorFormModalComponent />,
    },
    {
      path: "",
      element: <LandingPageMentor />,
    },
  ],
};
