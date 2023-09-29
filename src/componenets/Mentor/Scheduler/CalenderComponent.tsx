import moment from "moment";
import Calendar from "./Calendar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MentorFormModalComponent from "./MentorFormModalComponent";

export default function CalenderComponent() {
  const [newSlotModalOpen, setNewSlotModal] = useState(false);
  const [updateModalOpen, setUpdateModal] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const [slot, setSlot] = useState();
  const timeSlotData = useSelector((state) => state.mentorTimeSlots.data);
  console.log("Time slot data", timeSlotData);
  let formattedSlots;
  formattedSlots = timeSlotData.map((slot) => ({
    end: moment(slot.endTime).toDate(),
    menteeId: slot.menteeId,
    mentorId: slot.mentorId,
    start: moment(slot.startTime).toDate(),
    title: "Hello", // You can set a static title or modify this as needed
  }));

  const handleSelect = async (start, end) => {
    setStartTime(start);
    setUpdateModal(false);
    setNewSlotModal(true);
    // e.preventDefault();
    try {
      // console.log("Key Pressed: Select", start, end);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedEvent = async (e) => {
    setNewSlotModal(false);
    setUpdateModal(true);

    try {
      console.log("Key Pressed: Event");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {newSlotModalOpen && startTime && (
        <div className="w-3/4 mx-auto my-10">
          <MentorFormModalComponent
            startTime={startTime}
            newSlotModalOpen={newSlotModalOpen}
            setNewSlotModal={setNewSlotModal}
          />
        </div>
      )}
      <Calendar
        selectable
        defaultView="week"
        views={["month", "week", "day"]}
        events={timeSlotData}
        style={{ height: 1200 }}
        onSelectSlot={({ start, end }) => handleSelect(start, end)}
        onSelectEvent={(e) => handleSelectedEvent(e)}
      />
    </>
  );
}
