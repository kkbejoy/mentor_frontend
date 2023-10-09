import moment from "moment";

export const formatCalenderSlots = (timeSlotData) => {
  try {
    console.log("Input Time Array to convert", timeSlotData);
    const formattedSlot = timeSlotData.map((slot) => ({
      _id: slot._id,
      type: slot.type,
      end: moment(slot.end).toDate(),
      menteeId: slot.menteeId,
      mentorId: slot.mentorId._id,
      mentorName: slot.mentorId.firstName + " " + slot.mentorId.lastName,
      mentorProfileImage: slot.mentorId.profileImageUrl,
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

//Time coversion to simple format

export const convertTimeForMentorSlotViewModal = (start, end) => {
  try {
    const date = moment(start).format("MMMM Do YYYY");
    const startTime = moment(start).format(" h:mm a");
    const endTime = moment(end).format(" h:mm a");
    console.log("Date", start, end);

    console.log("Date", date, startTime, endTime);
    return { date, startTime, endTime };
  } catch (error) {
    console.log(error);
  }
};
