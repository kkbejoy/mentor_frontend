import axios from "axios";
import mentorAxiosInstance from "./mentorInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import { ErrorModal } from "../../componenets/General/Modals/ErrorModal";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";

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

    // console.log("Response from new time slot allotment api", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
