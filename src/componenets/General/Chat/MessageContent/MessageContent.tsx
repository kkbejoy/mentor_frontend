import React, { useEffect, useRef } from "react";
import ReceivedMessages from "../ReceivedMessages/ReceivedMessages";
import SendMessagesComponent from "../SendMessages/SendMessagesComponent";

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
              if (text?.sender?.senderType === "mentor") {
                return <ReceivedMessages text={text?.content} />;
              } else if (text?.sender?.senderType === "mentee") {
                return (
                  <>
                    <div className="flex justify-end ">
                      <SendMessagesComponent text={text?.content} />
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
                return <ReceivedMessages text={text.content} />;
              } else if (text?.sender?.senderType === "mentor") {
                return (
                  <>
                    <div className="flex justify-end ">
                      <SendMessagesComponent text={text?.content} />
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
