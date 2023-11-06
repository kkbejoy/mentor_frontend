import React, { useEffect, useState } from "react";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import ChatUsersListComponent from "../../componenets/General/Chat/ChatUsersListComponent";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
import InteractionsComponent from "../../componenets/General/Chat/InteractionsComponent/InteractionsComponent";
import { sentMessageFromMentee } from "../../api/menteesConfiguration/menteeServices";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenteeConversations,
  markAsReadMenteeSide,
} from "../../slices/MenteeSlices/conversationsSlice";
import {
  addNewMessage,
  fetchMessageWithConversationId,
} from "../../slices/MenteeSlices/messageSlice";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants/endpoints";
import { useLocation, useParams } from "react-router-dom";
import EmptyMessageComponent from "../../componenets/General/Chat/EmptyMessage/EmptyMessageComponent";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";
import { addMenteeNotification } from "../../slices/MenteeSlices/menteeNotificationSlice";
import { toast } from "sonner";
import {
  notificationFormatter,
  setUpSocket,
} from "../../utilities/chatUtilities";
// import { setSocket } from "../../slices/socketSlice";
import { setSocket } from "../../slices/socketSlice";
let socketBaseConnection;
const InboxPageMentee = () => {
  //States
  const [socketConnected, setSocketConnection] = useState(false);
  const [messagesSocket, setSocketMessages] = useState(); //To manage realtime Messages
  const [newMessageFromSocket, setNewMessageFromSocket] = useState({}); //To manage realtime Messages

  const dispatch = useDispatch();
  const location = useParams();
  const menteeId = getMenteeIdFromLocalStorage();

  //Getting Chat Rooms for a Particular User From Redux
  const { conversationId } = location;
  // const socket = useSelector((state) => state.socket);
  const menteeNotifications = useSelector((state) => state.menteeNotifications);
  const menteeConversations = useSelector(
    (state) => state.menteeConversations?.data?.conversations
  );
  //Getting Messages for a Particular Converstaion id From Redux
  const messages = useSelector((state) => state.menteeMessage.data);

  //user Effect

  //Use Effect that excecute for every State change
  useEffect(() => {
    socketBaseConnection = setUpSocket(menteeId);

    socketBaseConnection?.on("messageReveived", (newMessage) => {
      // toast.success("new Message receive dfrom mentee", newMessage);
      // console.log("New Message reveived Mentor side ", newMessage);
      // console.log("New Message reveived Mentor side ", messages[224]);
      if (newMessage?.sender?.senderType === "mentee") return;
      if (Object.values(messages)?.includes(newMessage)) {
        console.log("Message already inside");
      } else {
        console.log("Message Not on Redux. So adding to Redux", newMessage);
        setNewMessageFromSocket(newMessage);
      }
    });
  }, []);

  //Message Emitting socket
  useEffect(() => {
    socketBaseConnection?.emit("new message", messagesSocket);
  }, [messagesSocket]);

  //Changes the chat Room
  useEffect(() => {
    dispatch(fetchMenteeConversations());
    dispatch(fetchMessageWithConversationId(conversationId));
    dispatch(markAsReadMenteeSide(conversationId));
    // socketBaseConnection?.emit("chat room", conversationId);
  }, [conversationId, location]);

  //Received New Message From socket
  useEffect(() => {
    // console.log("Meesage to soket", newMessageFromSocket);
    const formattedMessage = notificationFormatter(newMessageFromSocket);
    if (newMessageFromSocket?.conversation?._id === conversationId) {
      dispatch(addNewMessage(newMessageFromSocket));
      dispatch(addMenteeNotification(formattedMessage));
    }

    // toast(
    //   `Receivedd a new message from ${newMessageFromSocket?.sender?.senderId?.firstName}`
    // );
  }, [newMessageFromSocket]);

  // useEffect that excecutes for evey new Messeage entered by the user
  // useEffect(() => {
  //   // socket?.emit("new message", messagesSocket);
  // }, [messagesSocket]);
  return (
    //Supply the API function and data to here as props.
    <div>
      <NavbarMentee />
      <div className="flex flex-col-2 overflow-hidden">
        {" "}
        <ChatUsersListComponent
          conversationsList={menteeConversations}
          userType="mentee"
          conversationId={conversationId}
        />
        {conversationId ? (
          <InteractionsComponent
            userType="mentee"
            sentMessageAPI={sentMessageFromMentee}
            messages={messages}
            fetchMessageFunction={fetchMessageWithConversationId}
            conversationsList={menteeConversations}
            conversationId={conversationId}
            setSocketMessage={setSocketMessages}
            addNewMessage={addNewMessage}
          />
        ) : (
          <EmptyMessageComponent />
        )}
      </div>

      {/* <FooterComponent /> */}
    </div>
  );
};

export default InboxPageMentee;
