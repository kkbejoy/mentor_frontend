import { Mentor } from "../../App";
import LandingPageMentor from "../../pages/Mentor/LandingPageMentees";
import MentorAuthProvider from "./MentorAuthProvider";
import SchedulerPage from "../../pages/Mentor/SchedulerPage";
import MentorFormModalComponent from "../../componenets/Mentor/Scheduler/MentorFormModalComponent";
import MentorsProfile from "../../pages/Mentor/MentorsProfile";
import { ErrorModal } from "../../componenets/General/Modals/ErrorModal";
import SuccessModal from "../../componenets/General/Modals/SuccessModal";
import SubscribedMentees from "../../pages/Mentor/SubscribedMentees";
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
      path: "/mentors/profile",
      element: <MentorsProfile />,
    },
    {
      path: "/mentors/subscribed-mentees",
      element: <SubscribedMentees />,
    },
    {
      path: "/mentors/trail",
      element: (
        <SuccessModal
          isOpen={true}
          onRequestClose={"1122"}
          errorMessage={"122"}
        />
      ),
    },
  ],
};
