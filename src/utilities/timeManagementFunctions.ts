import moment from "moment";
export const convertTimeToISoFormat = (inputTime) => {
  try {
    const parsedDateTime = moment(
      inputTime,
      "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
    );
    const isoFormattedDateTime = parsedDateTime.format("YYYY-MM-DDTHH:mm");
    // console.log("Iso Formatted TIme", isoFormattedDateTime);
    return isoFormattedDateTime;
  } catch (error) {
    console.log(error);
  }
};

export const addOneHour = (inputTime) => {
  // Parse the original date-time using Moment.js
  const dateTime = moment(inputTime);

  // Add 1 hour
  dateTime.add(1, "hour");

  // Format the updated date-time as ISO 8601
  const updatedDateTime = dateTime.format("YYYY-MM-DDTHH:mm");

  console.log(updatedDateTime);
  return updatedDateTime;
};
