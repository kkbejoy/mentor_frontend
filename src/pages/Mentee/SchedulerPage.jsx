import CalenderComponent from "../../componenets/Mentee/Scheduler/CalenderComponent";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import { fetchTimeSlotsMenteeSide } from "../../slices/MenteeSlices/timeSlotSlice";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";

const SchedulerPage = () => {
  const dispatch = useDispatch();
  const [renderCalender, setCalenderRerender] = useState({});

  const { menteeId } = getUserIdAndToken("menteeAuth");

  useEffect(() => {
    dispatch(fetchTimeSlotsMenteeSide(menteeId));
  }, [menteeId, renderCalender]);
  return (
    <div>
      <NavbarMentee />
      <div className="w-3/4 mx-auto my-10">
        <CalenderComponent
          setCalenderRerenderFunction={setCalenderRerender}
          renderState={renderCalender}
        />
      </div>{" "}
      <FooterComponent />
    </div>
  );
};

export default SchedulerPage;
