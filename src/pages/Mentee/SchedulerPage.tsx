import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import CalenderComponent from "../../componenets/Mentee/Scheduler/CalenderComponent";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import { fetchTimeSlotsMenteeSide } from "../../slices/MenteeSlices/timeSlotSlice";

const SchedulerPage = () => {
  const dispatch = useDispatch();
  const [renderCalender, setCalenderRerender] = useState({});

  const { menteeId } = getUserIdAndToken("menteeAuth");

  useEffect(() => {
    dispatch(fetchTimeSlotsMenteeSide(menteeId));
  }, [menteeId]);
  return (
    <div>
      <NavbarMentee />
      <div className="w-3/4 mx-auto my-10">
        <CalenderComponent setCalenderRerender={setCalenderRerender} />
      </div>
    </div>
  );
};

export default SchedulerPage;
