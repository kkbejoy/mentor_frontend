import React, { useEffect, useRef } from "react";
import ReceivedMessages from "../ReceivedMessages/ReceivedMessages";
import SendMessagesComponent from "../SendMessages/SendMessagesComponent";
import {
  convertMessageCreatedTime,
  convertTimeToISoFormat,
} from "../../../../utilities/timeManagementFunctions";

const MessageContent = ({ messages, userType }) => {
  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom when the component mounts or whenever new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  if (userType === "mentee") {
    // console.log("Mentee Message", messages[0]);
    return (
      <div
        className=" chat-container h-[68vh] bg-white border-x-2  overflow-x-hidden border-gray-100"
        ref={chatContainerRef}
        // style={"overflow-y: auto"}
      >
        {messages
          ? messages.map((text) => {
              // console.log("text", text);
              if (text?.sender?.senderType === "mentor") {
                const time = convertMessageCreatedTime(text?.createdAt);
                return <ReceivedMessages text={text?.content} time={time} />;
              } else if (text?.sender?.senderType === "mentee") {
                const time = convertMessageCreatedTime(text?.createdAt);

                return (
                  <>
                    <div className="flex justify-end ">
                      <SendMessagesComponent text={text?.content} time={time} />
                    </div>
                  </>
                );
              }
            })
          : null}
        <div
          id="your-scrollable-element"
          ref={chatContainerRef}
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {/* Your chat messages */}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className=" chat-container h-[68vh] bg-white border-x-2  overflow-x-hidden border-gray-100"
        ref={chatContainerRef}
        // style={"overflow-y: auto"}
      >
        {messages
          ? messages.map((text) => {
              if (text?.sender?.senderType === "mentee") {
                const time = convertMessageCreatedTime(text?.createdAt);
                return <ReceivedMessages text={text.content} time={time} />;
              } else if (text?.sender?.senderType === "mentor") {
                const time = convertMessageCreatedTime(text?.createdAt);
                return (
                  <>
                    <div className="flex justify-end ">
                      <SendMessagesComponent text={text?.content} time={time} />
                    </div>
                  </>
                );
              }
            })
          : null}
      </div>
    );
  }
};

export default MessageContent;
