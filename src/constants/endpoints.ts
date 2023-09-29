export const BASE_URL = "http://localhost:5000";

const END_POINTS = {
  //Mentee Or General Routes
  MENTEE_LOGIN: "/api/mentees/login",
  MENTEE_REGISTER: "/api/mentees/register",
  MENTEE_LOGOUT: "/api/mentees/logout",
  MENTEE_GOOGLE_AUTH: "/api/mentees/google_auth_mentee",
  MENTEE_AccessTokenRegenerate: "/api/mentees/regenerate_access_token",
  MENTEE_MENTOR_Search: "/api/mentees/mentors/:search",
  MENTEE_MENTOR_Profile: "/api/mentees/mentor/profile",
  MENTEE_Stripe_Publishible_Key: "/api/mentees/stripe-config",
  MENTEE_Stripe_Intent: "/api/mentees/create-payment-intent",
  MENTEE_Stripe_CHECKOUT: "/api/mentees/create-checkout",
  MENTEE_PAYMENT_SUCCESS: "/api/mentees/enrollment-success",
  MENTEE_TRAIL_ROUTE: "/api/mentees/trail",

  //Mentor
  MENTOR_LOGIN: "/api/mentors/login",
  MENTOR_REGISTER: "/api/mentors/register",
  MENTOR_LOGOUT: "/api/mentors/logout",
  MENTOR_AccessTokenRegenerate: "/api/mentors/regenerate_access_token",
  MENTOR_Iime_Slots: "/api/mentors/available-timeslots",

  //Moderator
  MODERATOR_LOGIN: "/api/moderator/login",
  MODERATOR_LOGOUT: "/api/moderator/logout",
  MODERATOR_AccessTokenRegenerate: "/api/moderator/regenerate_access_token",
  MODERATOR_Mentees_List: "/api/moderator/mentees",
  MODERATOR_Mentors_List: "/api/moderator/mentors",
  MODERATOR_Mentor_Applicants_List: "/api/moderator/mentor_requests",
  MODERATOR_Mentees_BlockUnBlock: "/api/moderator/mentees_status_change",
  MODERATOR_Mentors_BlockUnBlock: "/api/moderator/mentor_status_change",
  MODERATOR_Mentors_Applicant_Accept_Request:
    "/api/moderator/mentor_request_accept",
};

export default END_POINTS;
