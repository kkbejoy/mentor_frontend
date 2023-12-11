import React, { useCallback, useEffect, useState } from "react";
import NavbarMentor from "../../componenets/Mentor/NavbarMentor";
import ChatUsersListComponent from "../../componenets/General/Chat/ChatUsersListComponent";
import InteractionsComponent from "../../componenets/General/Chat/InteractionsComponent/InteractionsComponent";
import {
  markAsReadMessageFromMentorSide,
  sentMessageFromMentor,
} from "../../api/mentorConfiguration/mentorServices";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewMessagMentorSide,
  fetchMessageMentorSide,
} from "../../slices/MentorSlices/messageSlice";
import { fetchMentorConversations } from "../../slices/MentorSlices/conversationsList";
import { useParams } from "react-router-dom";
import EmptyMessageComponent from "../../componenets/General/Chat/EmptyMessage/EmptyMessageComponent";
import {
  getMenteeIdFromLocalStorage,
  getMentorIdFromLocalStorage,
} from "../../utilities/reusableFunctions";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants/endpoints";
import { toast } from "sonner";
import { addNewMessage } from "../../slices/MenteeSlices/messageSlice";
var socket;
const InboxPageMentor = () => {
  const [messagesSocket, setSocketMessages] = useState(); //To manage realtime Messages
  const [newMessageFromSocket, setNewMessageFromSocket] = useState({}); //To manage realtime Messages

  const mentorId = getMentorIdFromLocalStorage();
  const location = useParams();
  const { conversationId } = location;
  const messages = useSelector((state) => state.mentorMessage.data);
  const mentorConversations = useSelector(
    (state) => state.mentorConversations?.data?.conversations
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(BASE_URL);

    //Set up  a socket for a person
    console.log("Mentor Id", mentorId);
    socket.emit("setup", mentorId);
    socket.on("connection", () => {
      console.log(" Socket Connection", socket);
    });
    //new Message
    socket.on("new message", (newMessage) => {
      console.log("New Message reveived Mentor side ", newMessage);
    });
    console.log(" Socket Checking");

    socket.on("messageReveived", (newMessage) => {
      // toast.success("new Message receive dfrom mentee", newMessage);
      console.log("New Message reveived Mentor side ", newMessage);
      if (newMessage?.sender?.senderType === "mentor") return;
      setNewMessageFromSocket(newMessage);
    });
    socket.emit("chat room", conversationId);

    return () => {
      socket.off("connection");
      socket.off("messageReveived");
      socket.off("new message");
    };
  }, []);
  useEffect(() => {
    dispatch(fetchMessageMentorSide(conversationId));
    dispatch(fetchMentorConversations());
    markAsReadMessageFromMentorSide(conversationId);
    // socket.emit("chat room", conversationId);
  }, [conversationId]);
  // useEffect(() => {
  //   socket.on("new Message", (newMessage) => {
  //     console.log("Received New Mesage", newMessage);
  //   });
  // });
  // useEffect(() => {
  //   console.log("Form socket io useEfect");
  //   socket.emit("chat room", conversationId);
  // }, [conversationId]);
  useEffect(() => {
    if (newMessageFromSocket?.conversation?._id === conversationId) {
      console.log("Mesage Recieved", newMessageFromSocket);

      dispatch(addNewMessagMentorSide(newMessageFromSocket));
    }
    dispatch(fetchMentorConversations());
  }, [newMessageFromSocket]);
  useEffect(() => {
    socket?.emit("new message", messagesSocket);
    dispatch(fetchMentorConversations());

    // socket?.emit("notification", messagesSocket);
  }, [messagesSocket]);
  return (
    <div>
      <NavbarMentor />
      <div className="flex flex-col-2 overflow-hidden">
        {" "}
        <ChatUsersListComponent
          userType="mentor"
          conversationsList={mentorConversations}
          conversationId={conversationId}
        />
        {conversationId ? (
          <InteractionsComponent
            userType="mentor"
            sentMessageAPI={sentMessageFromMentor}
            messages={messages}
            fetchMessageFunction={fetchMessageMentorSide}
            conversationsList={mentorConversations}
            conversationId={conversationId}
            setSocketMessage={setSocketMessages}
            addNewMessage={addNewMessagMentorSide}
          />
        ) : (
          <EmptyMessageComponent />
        )}
      </div>
    </div>
  );
};

export default InboxPageMentor;
