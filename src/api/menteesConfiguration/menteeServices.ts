import axios from "axios";
import menteesAxiosInstance from "./menteeInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import {
  getMenteeIdFromLocalStorage,
  getUserIdAndToken,
} from "../../utilities/reusableFunctions";
import { Toaster, toast } from "sonner";
import mentorAxiosInstance from "../mentorConfiguration/mentorInterceptor";
import { useDispatch } from "react-redux";
import { addNewMessage } from "../../slices/MenteeSlices/messageSlice";

//API For Mentee Registration
export const menteeRegistration = async (values) => {
  try {
    const menteeRegistrationResponse = axios.post(
      `${BASE_URL}` + `${END_POINTS.MENTEE_REGISTER}`,
      values
    );
    return menteeRegistrationResponse;
  } catch (error) {
    console.log("error from catch", error);
  }
};

//API linking Mentee Google sign in
export const menteeGoogleSignIn = async () => {
  try {
    console.log("axios");
    const response = await axios.get(
      "http://localhost:5000/api/mentees/google_auth_mentee"
    );
    // console.log("res", response);
    return response;
  } catch (error) {
    console.log("Error:", error);
  }
};

//Api Linkinng Mentees Normal sign in
export const menteeLoginAPI = async (
  email: string,
  password: string
): Promise<MenteeLoginResponse> => {
  const credentials = { email: email, password: password };

  const response = await axios.post(
    `${BASE_URL}` + `${END_POINTS.MENTEE_LOGIN}`,
    credentials
  );
  // console.log("respose from api", response);
  return response;
};

//API linking Mentees Logout
export const menteeLogOut = async (menteeDetails) => {
  try {
    console.log("MenteeDerILS:", menteeDetails);
    const response = await menteesAxiosInstance.post(
      `${BASE_URL}` + `${END_POINTS.MENTEE_LOGOUT}`,
      menteeDetails
    );
    // console.log("res", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//API Fetching Stripe Publishable key

export const fetchStripePublishableKey = async () => {
  try {
    const response = await menteesAxiosInstance.get(
      BASE_URL + END_POINTS.MENTEE_Stripe_Publishible_Key
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//API Fetching Stripe Intent

export const fetchStripeIntent = async () => {
  try {
    const response = await menteesAxiosInstance.post(
      BASE_URL + END_POINTS.MENTEE_Stripe_Intent
    );
    // console.log("Response from Stripe", response);
    return response;
  } catch (error) {
    console.log("Error", error);
  }
};

//Stripe CheckOut

export const stripeCheckOut = async (mentorPriceId, mentorId) => {
  try {
    const { menteeId } = await getUserIdAndToken("menteeAuth");
    console.log("Menteee di from stripe chekckui", menteeId);
    const response = await menteesAxiosInstance.post(
      BASE_URL + END_POINTS.MENTEE_Stripe_CHECKOUT,
      { mentorPriceId: mentorPriceId, menteeId: menteeId, mentorId: mentorId }
    );
    // console.log("Stripe CHeckout", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//API making Enrollment active

export const makeEnrollmentActive = async (mentorId) => {
  try {
    const menteeId = await getMenteeIdFromLocalStorage();
    console.log("mentee id from axios", menteeId);
    const response = menteesAxiosInstance.post(
      BASE_URL + END_POINTS.MENTEE_PAYMENT_SUCCESS,
      { mentorId, menteeId }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//API for  Getting all Mentors Subscribed by a menteee

export const fetchAllSubscribedMentees = async () => {
  try {
    const menteeId = await getMenteeIdFromLocalStorage();
    const response = await menteesAxiosInstance.get(
      `${BASE_URL}${END_POINTS.MENTEE_ALL_SUBSCRIBED_MENTROS}/${menteeId}`
    );
    // console.log("All subscibed mentors", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//API to Book Mentor avaliable slots from mentee side

export const fixMentorSlotByMentee = async (values, slotId) => {
  try {
    const menteeId = await getMenteeIdFromLocalStorage();
    values.menteeId = menteeId;
    const resonse = await menteesAxiosInstance.post(
      BASE_URL + END_POINTS.MENTEES_Time_Slots + "/" + "1",
      { values, slotId }
    );
    toast.success("Slot allocated Succssfully");
    return resonse.data;
  } catch (error) {
    console.log(error);
    toast.error("Slot allocation Failed");
    throw error;
  }
};

//API For Sending Messages

export const sentMessageFromMentee = async (message, conversationId) => {
  try {
    const menteeId = await getMenteeIdFromLocalStorage();
    console.log("Message Sent api Mentee Side:", message, menteeId);
    // const conversationId = "6524e9e2941ba2b335e63c5f";
    const response = await menteesAxiosInstance.post(
      `${BASE_URL}${END_POINTS.MENTEES_Send_Message}/${conversationId}`,
      { message, sender: menteeId }
    );
    console.log(
      "Send message to database response",
      response.data.responseFromMessageCreation
    );
    // const check = await addNewMessage(
    //   response.data.responseFromMessageCreation
    // );
    toast.success("Message successfully sent");
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Something went Wrong from the API");
  }
};

//Fetch the conversation Details for Mentee

// export const fetchConversations = async () => {
//   try {
//     const menteeId = await getMenteeIdFromLocalStorage();
//     const responseFromConversationsAPI = await mentorAxiosInstance.post(
//       `${BASE_URL} ${END_POINTS.MENTEES_Get_Conversations}`,
//       menteeId
//     );
//     console.log(
//       "Response form Fetch conversations",
//       responseFromConversationsAPI
//     );
//   } catch (error) {
//     toast.error("Somthing went wrong from Fetchng converestions");
//   }
// };
