import axios from "axios";
import END_POINTS, { BASE_URL } from "../constants/endpoints";

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

export const mentorRegistration = async (values) => {
  try {
    const mentorRegistrationResponse = axios.post(
      `${BASE_URL}` + `${END_POINTS.MENTOR_REGISTER}`,
      values
    );
    return mentorRegistrationResponse;
  } catch (error) {
    console.log("Error");
  }
};

export const menteeGoogleSignIn = async () => {
  try {
    console.log("axios");
    const response = axios.get(
      "http://localhost:5000/api/mentees/google_auth_mentee"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
