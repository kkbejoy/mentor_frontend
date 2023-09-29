import moment from "moment";

export const formatCalenderSlots = (timeSlotData) => {
  try {
    console.log("Input Time Array to convert", timeSlotData);
    const formattedSlot = timeSlotData.map((slot) => ({
      end: moment(slot.end).toDate(),
      menteeId: slot.menteeId,
      mentorId: slot.mentorId,
      start: moment(slot.start).toDate(),
      title: slot.mentorPreferences,
      description: slot.description,
    }));
    return formattedSlot;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
