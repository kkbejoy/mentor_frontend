import moment from "moment";
import { formatDistanceToNow, parseISO } from "date-fns";
export const convertTimeToISoFormat = (inputTime) => {
  try {
    const parsedDateTime = moment(
      inputTime,
      "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
    );
    const isoFormattedDateTime = parsedDateTime.format("YYYY-MM-DDTHH:mm");
    console.log("Iso Formatted TIme", isoFormattedDateTime);
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

  // console.log(updatedDateTime);
  return updatedDateTime;
};

//ADD ONe HOur WITH GMT

export const addOneHourWithGMT = (inputTIme) => {
  try {
    let date = new Date(inputTIme);
    date.setHours(date.getHours() + 1);
    return date;
  } catch (error) {
    console.log(error);
  }
};

export const getTimeDifference = (time) => {
  try {
    const dateString = time.toString();
    const createdAtUTC = parseISO(dateString);
    const timeAgo = formatDistanceToNow(createdAtUTC, { addSuffix: true });
    // console.log("Time ago", timeAgo);
    return timeAgo;
  } catch (error) {
    console.log(error);
  }
};

export const convertMessageCreatedTime = (time) => {
  try {
    const formattedTime = moment(time).format("h:mm A");
    return formattedTime;
  } catch (error) {
    console.log(error);
  }
};

//Extract date from input
export const extractDateFromInput = (time) => {
  try {
    const Date = moment(time).format("MMMM Do YYYY");
    console.log("Date:", Date);
    return Date;
  } catch (error) {
    console.log(error);
  }
};

//Extract Time from input
export const extractTimeFromInput = (time) => {
  try {
    const Time = moment(time).format("h:mm a");
    console.log("TIme:", Time);
    return Time;
  } catch (error) {
    console.log(error);
  }
};

//Compare time with the current Time and return true if the input time is past hte current time

export const compareTimeWithCurrentTime = (time) => {
  try {
    const currentTime = new Date();
    const inputTime = new Date(time);
    const result = currentTime > inputTime;

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
