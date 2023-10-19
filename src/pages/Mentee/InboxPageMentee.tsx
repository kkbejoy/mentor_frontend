import React, { useEffect, useState } from "react";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import ChatUsersListComponent from "../../componenets/General/Chat/ChatUsersListComponent";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
import InteractionsComponent from "../../componenets/General/Chat/InteractionsComponent/InteractionsComponent";
import { sentMessageFromMentee } from "../../api/menteesConfiguration/menteeServices";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenteeConversations } from "../../slices/MenteeSlices/conversationsSlice";
import {
  addNewMessage,
  fetchMessageWithConversationId,
} from "../../slices/MenteeSlices/messageSlice";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants/endpoints";
import { useLocation, useParams } from "react-router-dom";
import EmptyMessageComponent from "../../componenets/General/Chat/EmptyMessage/EmptyMessageComponent";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";
var socket;
const InboxPageMentee = () => {
  const [socketConnected, setSocketConnection] = useState(false);
  const [messagesSocket, setSocketMessages] = useState(); //To manage realtime Messages
  const [newMessageFromSocket, setNewMessageFromSocket] = useState({}); //To manage realtime Messages

  const dispatch = useDispatch();
  const location = useParams();
  const menteeId = getMenteeIdFromLocalStorage();

  //Getting Chat Rooms for a Particular User From Redux
  const { conversationId } = location;
  const menteeConversations = useSelector(
    (state) => state.menteeConversations?.data?.conversations
  );

  //Getting Messages for a Particular Converstaion id From Redux

  const messages = useSelector((state) => state.menteeMessage.data);

  //Use Effect that excecute for every State change
  useEffect(() => {
    // dispatch(fetchMenteeConversations());
    // dispatch(fetchMessageWithConversationId(conversationId));

    //Socket Base connection
    socket = io(BASE_URL);
    //Set up  a socket for a person
    socket.emit("setup", menteeId);
    socket.on("connection", () => {
      console.log(" Socket Connection on");
    });
    socket.on("new message", (newMessage) => {
      console.log("nEw message reveived", newMessage);
    });
    socket.on("new message", (newMessage) => {
      console.log("New Message reveived Mentee side", newMessage);
    });
    socket.on("messageReveived", (newMessage) => {
      // toast.success("new Message receive dfrom mentee", newMessage);
      console.log("New Message reveived Mentor side ", newMessage);
      if (newMessage?.sender?.senderType === "mentee") return;
      setNewMessageFromSocket(newMessage);
    });
  });
  useEffect(() => {
    dispatch(fetchMenteeConversations());
    dispatch(fetchMessageWithConversationId(conversationId));
    // console.log("Form socket io useEfect");

    socket.emit("chat room", conversationId);

    //new Message
    // socket.on("new message", (newMessage) => {
    //   console.log("New Message reveived Mentee side", newMessage);
    // });
  }, [conversationId]);
  // useEffect(() => {
  //   socket.on("new Message", (newMessage) => {
  //     console.log("Received New Mesage", newMessage);
  //   });
  // });
  useEffect(() => {
    dispatch(addNewMessage(newMessageFromSocket));
  }, [newMessageFromSocket]);
  // useEffect that excecutes for evey new Messeage entered by the user
  useEffect(() => {
    socket?.emit("new message", messagesSocket);
  }, [messagesSocket]);
  return (
    //Supply the API function and data to here as props.
    <div>
      <NavbarMentee />
      <div className="flex flex-col-2 overflow-hidden">
        {" "}
        <ChatUsersListComponent
          conversationsList={menteeConversations}
          userType="mentee"
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
