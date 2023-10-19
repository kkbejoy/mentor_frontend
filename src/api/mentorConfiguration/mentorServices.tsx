import axios from "axios";
import mentorAxiosInstance from "./mentorInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import { ErrorModal } from "../../componenets/General/Modals/ErrorModal";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import { Toaster, toast } from "sonner";

//API linking Mentor Registration
export const mentorRegistration = async (values) => {
  try {
    const mentorRegistrationResponse = await axios.post(
      `${BASE_URL}${END_POINTS.MENTOR_REGISTER}`,
      values
    );
    return mentorRegistrationResponse;
  } catch (error) {
    console.log("Error");
  }
};

//API linking  Mentor Login
export const mentorLoginAPI = async (
  email: string,
  password: string
): Promise<MentorLoginResponse> => {
  const credentials = { email: email, password: password };

  const response = await axios.post(
    `${BASE_URL}` + `${END_POINTS.MENTOR_LOGIN}`,
    credentials
  );
  return response;
};

//API linking Mentro Logout
export const mentorLogOut = async (mentorDetails) => {
  try {
    console.log("Mentor Details:", mentorDetails);
    const response = await mentorAxiosInstance.post(
      `${BASE_URL}` + `${END_POINTS.MENTOR_LOGOUT}`,
      mentorDetails
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Mentor New Timeslot allotment to Server API
export const mentorNewTimeSlotApi = async (slotDetails) => {
  try {
    const { mentorId } = getUserIdAndToken("mentorAuth");
    const response = await mentorAxiosInstance.post(
      BASE_URL + END_POINTS.MENTOR_Iime_Slots + "/id",
      { slotDetails, mentorId }
    );
    toast.success("Slot allocated Succssfully");
    // console.log("Response from new time slot allotment api", response);
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Slot allotment Failed");

    throw error;
  }
};

// API Fetching alloted slot details
export const fetchAllotedSlotDetails = async (slotId) => {
  try {
    const response = await mentorAxiosInstance.get(
      `${BASE_URL}${END_POINTS.MENTOR_ALLOTED_SLOT_DETAILS}/${slotId}`
    );
    console.log("Response Alloted Time slots", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//API for deleting Existing Slots

export const deleteSlot = async (slotId) => {
  try {
    const response = await mentorAxiosInstance.delete(
      `${BASE_URL}${END_POINTS.MENTOR_ALLOTED_SLOT_DETAILS}/${slotId}`
    );
    console.log("Response From slot deletion", response);
    toast.success("Slot Deleted");
    return response;
  } catch (error) {
    toast.error("Slot deleted");
    console.log(error);
  }
};
//API Uploading Image to cloudinary
export const imageUploadToCloudinary = async (formdata) => {
  try {
    console.log("Image upload ");
    const response = await axios.post(
      END_POINTS.MENTOR_CLOUDINARY_Upload,
      formdata
    );
    console.log("Response Form cloudinary Databse: ", response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Update Profile Infos

export const updateMentorProfile = async (updatedFields) => {
  try {
    const { mentorId } = getUserIdAndToken("mentorAuth");
    console.log("Mentor id from update api", mentorId);
    const response = await mentorAxiosInstance.patch(
      `${BASE_URL}${END_POINTS.MENTOR_Profile_Update}/${mentorId}`,
      updatedFields
    );
    console.log("Mentor Profile Updatation", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Api for sending messages

export const sentMessageFromMentor = async (message, conversationId) => {
  try {
    const { mentorId } = getUserIdAndToken("mentorAuth");

    const sendResponse = await mentorAxiosInstance.post(
      `${BASE_URL}${END_POINTS.MENTORS_Send_Message}/${conversationId}`,
      { message, sender: mentorId }
    );
    console.log("Response From mentor Send messafe", sendResponse);
    return sendResponse.data;
  } catch (error) {
    console.log("Error from send massage api", error);
  }
};
