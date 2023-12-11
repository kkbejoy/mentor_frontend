import axios from "axios";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import moderatorAxiosInstance from "./moderatorInterceptor";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import { localStorageFields } from "../../constants/localStorageFileds";
import { toast } from "sonner";

//API linking Mentro Logout
export const moderatorLogOut = async (mentorDetails) => {
  try {
    console.log("Mentor Details:", mentorDetails);
    const response = await moderatorAxiosInstance.post(
      `${BASE_URL}` + `${END_POINTS.MODERATOR_LOGOUT}`,
      mentorDetails
    );
    console.log("res", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//API linking login
export const moderatorLoginAPI = async (email, password) => {
  const credentials = { email: email, password: password };

  const response = await axios.post(
    `${BASE_URL}` + `${END_POINTS.MODERATOR_LOGIN}`,
    credentials
  );
  console.log("respose from api", response);
  return response;
};

//API Linking Mentee Block/Unblock
export const menteeBlockUnblockAPI = async (id) => {
  try {
    const response = await moderatorAxiosInstance.patch(
      `${BASE_URL}` + `${END_POINTS.MODERATOR_Mentees_BlockUnBlock}`,
      { menteeId: id }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//API Linking Mentor Block/Unblock
export const mentorBlockUnblockAPI = async (id) => {
  try {
    const response = await moderatorAxiosInstance.patch(
      `${BASE_URL}` + `${END_POINTS.MODERATOR_Mentors_BlockUnBlock}`,
      { mentorId: id }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//API Linking Mentor Applicants list
export const mentorApplicantsRequestAcceptAPI = async (id, name, email) => {
  try {
    const response = await moderatorAxiosInstance.patch(
      `${BASE_URL}` +
        `${END_POINTS.MODERATOR_Mentors_Applicant_Accept_Request}`,
      { mentorId: id, mentorName: name, mentorEmail: email }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//API Linking Ticket status modification

export const modifyTicketStatus = async (ticketId) => {
  try {
    console.log("Hello");
    const responseFromAPI = await moderatorAxiosInstance.patch(
      `${BASE_URL}${END_POINTS.MODERATOR_Tickets}`,
      { ticketId }
    );
    console.log("Response from status mod", responseFromAPI);
    toast.success("User Blocked");
    return responseFromAPI;
  } catch (error) {
    console.log(error);
  }
};
