import moment from "moment";
import Calendar from "./Calendar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MentorFormModalComponent from "./MentorFormModalComponent";
import SlotUpdateForm from "./SlotUpdateForm";
import { fetchAllotedSlotDetails } from "../../../api/mentorConfiguration/mentorServices";
// import "./calender.css";
import { convertTimeForMentorSlotViewModal } from "../../../utilities/calenderUtilities";
import MentorColorCodeComponent from "./ColorCode/MenteeColorCodeComponent";
import SchedulerTitleMentor from "./Title/SchedulerTitleMentee";
import { Toaster } from "sonner";

//Component
export default function CalenderComponent({
  setCalenderRerenderFunction,
  renderState,
}) {
  const maxDate = new Date("2023-10-06");
  const [newSlotModalOpen, setNewSlotModal] = useState(false);
  const [updateModalOpen, setUpdateModal] = useState(false);
  const [startTime, setStartTime] = useState();
  // const [endTime, setEndTime] = useState();
  const [updataModalData, setUpdateModalData] = useState("");

  const timeSlotData = useSelector((state) => state.mentorTimeSlots.data);

  // console.log("Mentor SIde input data", timeSlotData);

  let modalData = {};
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

  const handleSelectedEvent = async (id) => {
    // console.log("Id of Slot", id);
    modalData = fetchAllotedSlotDetails(id);
    // console.log("Modal data", modalData);
    setUpdateModalData(modalData);
    setNewSlotModal(false);
    setUpdateModal(true);

    try {
      console.log("Key Pressed: Event");
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
      // console.log("COmponent props", formattedTime);
      switch (slotType) {
        case "available":
          return (
            <div className=" h-full bg-yellow-300  text-black text-center transform-cpu transition-transform hover:scale-105">
              <h1 className="font-normal"></h1> Vacant
              <h2 className="text-sm font-light text-center">
                ( {formattedTime?.startTime} - {formattedTime?.endTime})
              </h2>
            </div>
          );
        case "booked":
          return (
            <div className="text-black h-full text-center shadow-md bg-green-400  transform-cpu transition-transform hover:scale-105">
              <h1 className="font-normal">
                {" "}
                Mentee: {props?.event?.menteeId?.firstName}{" "}
                {props?.event?.menteeId?.lastName}{" "}
              </h1>
              <h2 className="text-sm font-light text-center">
                ( {formattedTime?.startTime} - {formattedTime?.endTime})
              </h2>
            </div>
          );
        case "completed":
          return (
            <div className="bg-slate-500  shadow-md h-full text-center transform-cpu transition-transform hover:scale-105">
              <h1>Completed </h1>{" "}
              <h2 className="text-sm font-light text-center">
                ( {formattedTime?.startTime} - {formattedTime?.endTime})
              </h2>
            </div>
          );
      }
    },
  };
  return (
    <>
      {newSlotModalOpen && startTime && (
        <div className="fixed inset-0  shadow-md bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <MentorFormModalComponent
            startTime={startTime}
            newSlotModalOpen={newSlotModalOpen}
            setNewSlotModal={setNewSlotModal}
            setCalenderRerenderFunction={setCalenderRerenderFunction}
            renderState={renderState}
          />
        </div>
      )}
      <SchedulerTitleMentor />
      <MentorColorCodeComponent />
      <Calendar
        selectable
        defaultView="week"
        views={["month", "week"]}
        events={timeSlotData}
        style={{ height: 1200 }}
        onSelectSlot={({ start, end }) => handleSelect(start, end)}
        onSelectEvent={({ _id }) => handleSelectedEvent(_id)}
        min={"Fri Oct 06 2023 05:00:00 GMT+0530"}
        // max={"Fri Oct 06 2023 24:00:00 GMT+0530"}
        components={components}
      />

      {updateModalOpen && (
        <SlotUpdateForm
          updateModalOpen={updateModalOpen}
          setUpdateModal={setUpdateModal}
          SlotObject={updataModalData}
          setCalenderRerenderFunction={setCalenderRerenderFunction}
          renderState={renderState}
        />
      )}
    </>
  );
}
