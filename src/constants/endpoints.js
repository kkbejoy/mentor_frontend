const env = import.meta.env;

export const BASE_URL = env.VITE_SERVER_URL;

const END_POINTS = {
  //Mentee Or General Routes
  MENTEE_LOGIN: "/api/mentees/login",
  MENTEE_REGISTER: "/api/mentees/register",
  MENTEE_LOGOUT: "/api/mentees/logout",
  MENTEE_GOOGLE_AUTH: "/api/mentees/google_auth_mentee",
  MENTEE_AccessTokenRegenerate: "/api/mentees/regenerate_access_token",
  MENTEE_MENTOR_Search: "/api/mentees/mentors",
  MENTEE_MENTOR_Profile: "/api/mentees/mentor/profile",
  MENTEE_Stripe_Publishible_Key: "/api/mentees/stripe-config",
  MENTEE_Stripe_Intent: "/api/mentees/create-payment-intent",
  MENTEE_Stripe_CHECKOUT: "/api/mentees/create-checkout",
  MENTEE_PAYMENT_SUCCESS: "/api/mentees/enrollment-success",
  MENTEE_ALL_SUBSCRIBED_MENTROS: "/api/mentees/subscribed-mentors",
  MENTEES_Time_Slots: "/api/mentees/timeslots",
  MENTEES_Subscribed_Mentors: "/api/mentees/subscribed-mentors",
  MENTEES_Notifications: "/api/mentees/notifications",
  MENTEE_Profile_Update: "/api/mentees/edit-profile",
  MENTEE_Booked_Time_SLots: "/api/mentees/booked-slots",
  MENTEE_Tickets: "/api/mentees/raise-ticket",
  MENTEE_SEND_OTP: "/api/mentees/sent-otp",
  MENTEE_NEW_PASSWORD_SUBMISSION: "/api/mentees/verify-otp",

  //Chat Routes
  MENTEES_Conversations_Read_Unread: "/api/chats/messages",
  MENTEES_GetMessagesBetweenMentorAndMentee: "/api/chats/messages",
  MENTEES_Send_Message: "/api/chats/mentee-messages",
  MENTEES_Get_Conversations: "/api/chats/mentee-messages",
  MENTEES_Get_UNREAD_Conversations_COUNT: "/api/chats/mentee-messages",
  MENTEES_Get_Messages: "/api/chats/mentee-messages",
  MENTEES_VERIFY_LIVE: "/api/chats/verify-live",

  MENTORS_Send_Message: "/api/chats/mentor-messages",
  MENTOR_Get_Conversations: "/api/chats/mentor-messages",
  MENTOR_Get_UNREAD_Conversations_COUNT: "/api/chats/mentor-messages",
  MENTORS_Get_Messages: "/api/chats/mentor-messages",

  MENTEE_TRAIL_ROUTE: "/api/mentees/trail",
  MENTEE_CLOUDINARY_Upload:
    "https://api.cloudinary.com/v1_1/dlcsyyk7z/image/upload",

  //Mentor
  MENTOR_LOGIN: "/api/mentors/login",
  MENTOR_REGISTER: "/api/mentors/register",
  MENTOR_LOGOUT: "/api/mentors/logout",
  MENTOR_AccessTokenRegenerate: "/api/mentors/regenerate_access_token",
  MENTOR_Iime_Slots: "/api/mentors/available-timeslots",

  MENTOR_ALLOTED_SLOT_DETAILS: "/api/mentors/slot-details",
  MENTOR_CLOUDINARY_Upload:
    "https://api.cloudinary.com/v1_1/dlcsyyk7z/image/upload",
  MENTOR_Profile_Update: "/api/mentors/edit-profile",
  MENTOR_Skills_Update: "/api/mentors/add-new-skill",

  MENTOR_SUBSCRIBED_Mentees: "/api/mentors/subscribed-mentees",
  MENTOR_Tickets: "/api/mentors/raise-ticket",

  //MENTOR HomePage
  MENTOR_HOME_PAGE_LIVE_LIST: "/api/mentors/todays-live-slots",
  MENTOR_HOME_PAGE_ENROLLMENT_DETAILS: "/api/mentors/daily-enrollment-object",

  //Moderator
  MODERATOR_LOGIN: "/api/moderator/login",
  MODERATOR_LOGOUT: "/api/moderator/logout",
  MODERATOR_AccessTokenRegenerate: "/api/moderator/regenerate_access_token",
  MODERATOR_Mentees_List: "/api/moderator/mentees",
  MODERATOR_Mentors_List: "/api/moderator/mentors",
  MODERATOR_Tickets: "/api/moderator/tickets",

  MODERATOR_Mentor_Applicants_List: "/api/moderator/mentor_requests",
  MODERATOR_Mentees_BlockUnBlock: "/api/moderator/mentees_status_change",
  MODERATOR_Mentors_BlockUnBlock: "/api/moderator/mentor_status_change",
  MODERATOR_Mentors_Applicant_Accept_Request:
    "/api/moderator/mentor_request_accept",
  MODERATOR_HOMEPAGE_DAILY_ENROLLMENTDATA: "/api/moderator/daily-enrollments",
  MODERATOR_HOMEPAGE_DAILY_MENTEE_REGISTRATION:
    "/api/moderator/daily-new-mentees",
};

export const logoThumbnail =
  "https://res.cloudinary.com/dlcsyyk7z/image/upload/v1702289419/mentors/_51de1e0b-0b1c-43c2-bfce-76456422ecdb_ziz1z3.jpg";
export default END_POINTS;
