import axios from "axios";
import mentorAxiosInstance from "./mentorInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import { ErrorModal } from "../../componenets/General/Modals/ErrorModal";
import {
  getMentorIdFromLocalStorage,
  getUserIdAndToken,
} from "../../utilities/reusableFunctions";
import { Toaster, toast } from "sonner";
import { setSocket } from "../../slices/socketSlice";
import { setUpSocket } from "../../utilities/chatUtilities";

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
    throw error;
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
    if (response?.response?.status == "400") {
      // console.log("Failedddddddddddddddddddddddddddddddddddddddd");
      throw new Error("400 error");
    }
    toast.success("Slot allocated Succssfully");
    console.log(
      "Response from new time slot allotment api",
      response?.response
    );
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
    // console.log("Response Alloted Time slots", response.data);
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
    toast.success("Profile Updated successfully");
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong ");
    throw error;
  }
};

//API For Updating Mentor Skills

export const addNewMentorSkill = async (newSkills) => {
  try {
    const mentorId = await getMentorIdFromLocalStorage();

    const responseFromAPI = await mentorAxiosInstance.patch(
      `${BASE_URL}${END_POINTS.MENTOR_Skills_Update}/${mentorId}`,
      { newSkills }
    );
    console.log("Respon from skill updation", responseFromAPI);
    toast.success("Skill Added");
    return responseFromAPI;
  } catch (error) {
    console.log(error);
    toast.error("Error");
  }
};

// API To remove a  skill from Mentor SKill array

export const removeAskillFromMentorSkillArray = async (skill) => {
  try {
    const mentorId = await getMentorIdFromLocalStorage();
    const responseFromAPI = await mentorAxiosInstance.post(
      `${BASE_URL}${END_POINTS.MENTOR_Skills_Update}/${mentorId}`,
      { skill }
    );
    console.log("Response From skill removals", responseFromAPI);
    toast.success("Skill Deleted succssfully");
    return responseFromAPI;
  } catch (error) {
    toast.error("Delettion Failed");
    console.log(error);
    return error;
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
    sendResponse.data.responseFromMessageCreation.receiver =
      sendResponse.data.responseFromMessageCreation.conversation.participants[0].mentee;
    // console.log("Response From mentor Send messafe", sendResponse);
    return sendResponse.data;
  } catch (error) {
    console.log("Error from send massage api", error);
    toast.error("Something went Wrong from the Send API");
  }
};

//Raise a New Ticket Form Mentor SIde

export const raiseANewTicketFromMentorSide = async ({
  accussedId,
  subject,
  content,
}) => {
  try {
    const ticketObject = {
      complaint: {
        // complaintType: "mentor",
        accusedId: accussedId,
      },
      content: content,
    };
    const { mentorId } = getUserIdAndToken("mentorAuth");
    const responseFromApi = await mentorAxiosInstance.post(
      `${BASE_URL}${END_POINTS.MENTOR_Tickets}/${mentorId}`,
      { ticketObject }
    );

    console.log("Response from TIcket post API", responseFromApi);
    return responseFromApi;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
