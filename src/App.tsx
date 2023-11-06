import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { notificationFormatter, setUpSocket } from "./utilities/chatUtilities";
import { getMenteeIdFromLocalStorage } from "./utilities/reusableFunctions";
import {
  addMenteeNotification,
  getMenteeNotification,
} from "./slices/MenteeSlices/menteeNotificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessagMentorSide } from "./slices/MentorSlices/messageSlice";
import NavbarMentee from "./componenets/Mentee/NavbarMentee";

export function Home() {
  return (
    <>
      {/* <NavbarMentee /> */}
      <Outlet /> <Toaster />
    </>
  );
}

export function Moderator() {
  return (
    <>
      <Outlet /> <Toaster />
    </>
  );
}

export function Mentee() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.menteeMessage.data);

  let socketBaseConnection;
  useEffect(() => {
    const menteeId = getMenteeIdFromLocalStorage();
    const notifications = dispatch(getMenteeNotification());
    socketBaseConnection = setUpSocket(menteeId);
  }, []);
  useEffect(() => {
    socketBaseConnection?.on("notification", (notification) => {
      dispatch(addMenteeNotification(notification));
      toast("New Notification");
    });
    socketBaseConnection?.on("scheduler", (scheduler) => {
      toast("Schedule changed by mentor");
    });

    //New  message

    socketBaseConnection?.on("messageReveived", (newMessage) => {
      console.log("New Message reveived On Mentees side ", newMessage);
      // console.log("New Message reveived Mentor side ", messages[224]);
      if (newMessage?.sender?.senderType === "mentee") return;
      if (Object.values(messages)?.includes(newMessage)) {
        console.log("Message alaready ");
      } else {
        const formattedMessage = notificationFormatter(newMessage);
        dispatch(addMenteeNotification(formattedMessage));
        toast(`New message from ${newMessage?.sender?.senderId?.firstName}`);
      }
    });

    // const socketBaseConnection = setUpSocket(menteeId);
  });
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
export function Mentor() {
  return (
    <>
      <Outlet /> <Toaster />
    </>
  );
}
