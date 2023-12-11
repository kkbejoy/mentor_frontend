import { BASE_URL, userTypes } from "../constants/constants";
import { io } from "socket.io-client";
import { getTimeDifference } from "./timeManagementFunctions";

export const extractNameAndImageUrlForChat = (
  conversationsList,
  conversationId,
  userType
) => {
  try {
    console.log("Conversation List", conversationsList);
    const profile = conversationsList?.reduce((profile, currentState) => {
      if (
        currentState._id === conversationId &&
        userType === userTypes.MENTEE
      ) {
        profile._id = currentState._id;
        profile.name =
          currentState.participants[0]?.mentor.firstName +
          " " +
          currentState.participants[0]?.mentor.lastName;
        profile.imageUrl = currentState.participants[0]?.mentor.profileImageUrl;
      } else if (
        currentState._id === conversationId &&
        userType === userTypes.MENTOR
      ) {
        profile._id = currentState._id;

        profile.name =
          currentState.participants[0]?.mentee.firstName +
          " " +
          currentState.participants[0]?.mentee.lastName;
        profile.imageUrl = currentState.participants[0]?.mentee.profileImageUrl;
      }
      // console.log("Conversation list", profile);
      return profile;
    }, {});
    return profile;
  } catch (error) {
    console.log(error);
  }
};

//Format message to Notifcation format to redux
export const notificationFormatter = (message) => {
  try {
    //Moment Js
    // const currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    // const messageSendTime = moment(message.createdAt).format(
    //   "MMMM Do YYYY, h:mm:ss a"
    // );
    // const timeDifferece = currentTime.diff(messageSendTime, "seconds");
    // console.log("Messag input to functoj", message);
    //Date fns
    if (Object.keys(message).length === 0) {
      // console.log("The object is empty.");
      return;
    }

    const time = getTimeDifference(message.createdAt);
    const formattedMessage = {};
    formattedMessage.content = `You have reveived a message from ${message.sender.senderId.firstName}`;
    formattedMessage.time = time;
    formattedMessage.type = "message";
    formattedMessage.isRead = false;

    return formattedMessage;
  } catch (error) {
    console.log(error);
  }
};

//SOCKEt setup
export const setUpSocket = (userId) => {
  try {
    const socket = io(BASE_URL);
    //Set up  a socket for a person
    socket.emit("setup", userId);
    socket?.on("connected", () => {
      console.log(" Socket Connection on");
    });
    socket.on("connect_error", (error) => {
      console.log("Socket connection error", error);
    });

    return socket;
  } catch (error) {
    console.log("Error from socket setup", error);
  }
};

//Sorting messages

export const sortMessages = (a, b) => {
  try {
    return (
      new Date(a.latestMessage.updatedAt) - new Date(b.latestMessage.updatedAt)
    );
  } catch (error) {
    console.log(error);
  }
};
