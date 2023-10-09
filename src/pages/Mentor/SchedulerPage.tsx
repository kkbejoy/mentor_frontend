import { useElements } from "@stripe/react-stripe-js";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import CalenderComponent from "../../componenets/Mentor/Scheduler/CalenderComponent";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMentorTimeSlots } from "../../slices/MentorSlices/AvailableTimeSlotsSlice";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import { Toaster } from "sonner";

const SchedulerPage = () => {
  const dispatch = useDispatch();
  const { mentorId } = getUserIdAndToken("mentorAuth");
  const [renderCalender, setCalenderRerender] = useState({});

  useEffect(() => {
    dispatch(fetchMentorTimeSlots(mentorId));
    console.log("Mentor id", mentorId);
  }, [dispatch, mentorId, renderCalender]);
  return (
    <div>
      <NavbarMentor />
      <div className="w-3/4 mx-auto my-10">
        <CalenderComponent setCalenderRerender={setCalenderRerender} />
      </div>
      <Toaster />
    </div>
  );
};

export default SchedulerPage;
