import axios from "axios";
import menteesAxiosInstance from "./menteeInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import {
  getMenteeIdFromLocalStorage,
  getUserIdAndToken,
} from "../../utilities/reusableFunctions";

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
    console.log("res", response);
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
  console.log("respose from api", response);
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
    console.log("res", response);
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
    console.log("Response from Stripe", response);
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
    console.log("Stripe CHeckout", response);
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
