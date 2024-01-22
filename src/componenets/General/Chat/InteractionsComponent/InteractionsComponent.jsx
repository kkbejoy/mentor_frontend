import React, { useEffect } from "react";
import MessageTitleComponent from "../MessageTitle/MessageTitleComponent";
import MessageContent from "../MessageContent/MessageContent";
import MessageInputComponent from "../MessageInput/MessageInputComponent";
import { userTypes } from "../../../../constants/constants";
import { io } from "socket.io-client";

import { extractNameAndImageUrlForChat } from "../../../../utilities/chatUtilities";

const InteractionsComponent = ({
  sentMessageAPI,
  messages,
  userType,
  fetchMessageFunction,
  conversationsList,
  conversationId,
  setSocketMessage,
  addNewMessage,
}) => {
  //Extracting User Name and Image url
  const profile = extractNameAndImageUrlForChat(
    conversationsList,
    conversationId,
    userType
  );

  return (
    <aside className=" h-screen w-3/4 mx-auto">
      {/* header */}
      <MessageTitleComponent
        senderName={profile?.name}
        senderImage={profile?.imageUrl}
        senderId={profile?._id}
        userType={userType}
      />
      {/* messages */}
      <MessageContent messages={messages} userType={userType} />
      {/* Message input */}
      <MessageInputComponent
        sentMessageAPI={sentMessageAPI}
        conversationId={conversationId}
        addNewMessage={addNewMessage}
        setSocketMessage={setSocketMessage}
      />
    </aside>
  );
};

export default InteractionsComponent;
