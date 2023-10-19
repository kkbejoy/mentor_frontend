import React, { useState } from "react";
import { UilEnvelopeUpload } from "@iconscout/react-unicons";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import { addNewMessage } from "../../../../slices/MenteeSlices/messageSlice";
import { useDispatch } from "react-redux";
const MessageInputComponent = ({
  sentMessageAPI,
  conversationId,
  addNewMessage,
  setSocketMessage,
}) => {
  const [inputValue, setinputValue] = useState("");
  const dispatch = useDispatch();
  //Submit Form
  const handleMessageSending = async (values, { resetForm }) => {
    try {
      const messageInput = values.messageInput;
      console.log("Message input", values);
      if (values.messageInput.trim() === "") {
        // console.log("no inpu");
        return;
      }
      const responseFromMessageSendAPI = await sentMessageAPI(
        messageInput,
        conversationId
      );
      setinputValue("");
      //Passing Message to Socket
      setSocketMessage(responseFromMessageSendAPI.responseFromMessageCreation);
      //Adding the new Message to Redux Store
      dispatch(
        addNewMessage(responseFromMessageSendAPI.responseFromMessageCreation)
      );
      resetForm();
    } catch (error) {
      console.log(error);
      // toast.error("Message Sending failed... Please refersh the page");
    }
  };

  //Formik Inital Values
  const initialValues = {
    messageInput: "",
  };
  return (
    <div className=" h-[10vh] justify-center rounded-full p-3 w-full">
      <Formik onSubmit={handleMessageSending} initialValues={initialValues}>
        <Form>
          {" "}
          <div className="flex ">
            <Field
              name="messageInput"
              autoComplete="off"
              // value={inputValue}
              placeholder="Please type your query or question here              "
              className=" text-center h-[7vh] bg-gray-100 rounded-md w-full mx-5 border-spacing-2 "
            />
            <button className="w=2/5 mr-9">
              <UilEnvelopeUpload color="mentorBlue" />
            </button>{" "}
          </div>
          <div className="flex justify-center text-center">
            <button
              type="submit"
              onClick={() =>
                handleMessageSending({ messageInput: "Hello " }, {})
              }
              value="Hello"
              className="bg-gray-200 rounded-md mt-2 p-3"
            >
              Hello
            </button>{" "}
            <button
              type="submit"
              onClick={() => handleMessageSending({ messageInput: "👍🏻 " }, {})}
              value="👍🏻"
              className="bg-gray-200 rounded-md mt-2 p-3 mx-2"
            >
              👍🏻
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MessageInputComponent;