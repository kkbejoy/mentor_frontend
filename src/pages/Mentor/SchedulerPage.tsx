import { useElements } from "@stripe/react-stripe-js";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import CalenderComponent from "../../componenets/Mentor/Scheduler/CalenderComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMentorTimeSlots } from "../../slices/MentorSlices/AvailableTimeSlotsSlice";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";

const SchedulerPage = () => {
  const dispatch = useDispatch();
  const { mentorId } = getUserIdAndToken("mentorAuth");

  useEffect(() => {
    dispatch(fetchMentorTimeSlots(mentorId));
    console.log("Mentor id", mentorId);
  }, [mentorId]);
  return (
    <div>
      <NavbarMentor />
      <div className="w-3/4 mx-auto my-10">
        <CalenderComponent />
      </div>
    </div>
  );
};

export default SchedulerPage;
