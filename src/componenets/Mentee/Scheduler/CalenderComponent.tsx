import Calendar from "./Calendar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserIdAndToken } from "../../../utilities/reusableFunctions";
import { convertTimeForMentorSlotViewModal } from "../../../utilities/calenderUtilities";
import MenteeSlotVacantComponent from "./Slots/MenteeSlotVacantComponent";
import MenteeSlotBooked from "./Slots/MenteeSlotBooked";
import MenteeSlotCompleted from "./Slots/MenteeSlotCompleted";
import MenteeColorCodeComponent from "./ColorCode/MenteeColorCodeComponent";
import SchedulerTitleMentee from "./Title/SchedulerTitleMentee";
import SlotModalMenteeSide from "./SlotModalMenteeSide";
import TooltipComponents from "./TooltipComponents/TooltipComponents";

export default function CalenderComponent({
  setCalenderRerenderFunction,
  renderState,
}) {
  const dispatch = useDispatch();
  const [newSlotModalOpen, setNewSlotModal] = useState(false);
  const [updateModalOpen, setUpdateModal] = useState(false);
  const [startTime, setStartTime] = useState();
  const [slotId, setSlotId] = useState();
  const [slotObject, setSlotObject] = useState();

  const [slot, setSlot] = useState();

  const timeSlotData = useSelector((state) => state.menteeSideTimeSlot.data);
  // console.log("Time slot data", timeSlotData);
  const { menteeId } = getUserIdAndToken("menteeAuth");

  const handleSelectedEvent = async (
    start,
    end,
    mentorName,
    mentorId,
    mentorProfileImage,
    type,
    _id
  ) => {
    try {
      if (type == "booked" || type == "completed") {
        return;
      }
      setStartTime(start);
      setUpdateModal(false);
      setNewSlotModal(true);
      setSlotId(_id);
      setSlotObject({
        start,
        end,
        mentorName,
        mentorId,
        mentorProfileImage,
        type,
        _id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const components = {
    event: (props: any) => {
      const slotType = props?.event?.type;
      const start = props?.event?.start;
      const end = props?.event?.end;

      const formattedTime = convertTimeForMentorSlotViewModal(start, end);
      // const formattedTime = convertTimeForMentorSlotViewModal(start, end);
      switch (slotType) {
        case "available":
          return (
            <MenteeSlotVacantComponent
              props={props}
              formattedTime={formattedTime}
            />
          );
        case "booked":
          return (
            <MenteeSlotBooked props={props} formattedTime={formattedTime} />
          );
        case "completed":
          return (
            <MenteeSlotCompleted props={props} formattedTime={formattedTime} />
          );
      }
    },
  };

  return (
    <>
      {newSlotModalOpen && startTime && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          {/* <div className="w-full max-w-sm h-[50vh] bg-white rounded-lg shadow-lg"> */}
          <SlotModalMenteeSide
            menteeId={menteeId}
            newSlotModalOpen={newSlotModalOpen}
            setNewSlotModal={setNewSlotModal}
            slotObject={slotObject}
            setCalenderRerenderFunction={setCalenderRerenderFunction}
            renderState={renderState}
          />
          {/* </div> */}
        </div>
      )}{" "}
      <SchedulerTitleMentee />
      <MenteeColorCodeComponent />
      <Calendar
        selectable
        defaultView="week"
        views={["month", "week"]}
        events={timeSlotData}
        style={{ height: 1200 }}
        onSelectSlot={({
          start,
          end,
          mentorName,
          menteeId,
          mentorProfileImage,
        }) =>
          handleSelect(start, end, mentorName, menteeId, mentorProfileImage)
        }
        onSelectEvent={({
          start,
          end,
          mentorName,
          mentorId,
          mentorProfileImage,
          type,
          _id,
        }) =>
          handleSelectedEvent(
            start,
            end,
            mentorName,
            mentorId,
            mentorProfileImage,
            type,
            _id
          )
        }
        components={components}
        min={"Fri Oct 06 2023 05:00:00 GMT+0530"}
      />
    </>
  );
}
