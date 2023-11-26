import { configureStore } from "@reduxjs/toolkit";
import { menteeReducer } from "../slices/menteesAuthSlice";
import { mentorReducer } from "../slices/mentorsAuthSlice";
import { moderatorReducer } from "../slices/moderatorsAuthSlice";
import { menteesTableDetailsReducer } from "../slices/ModeratorSlices/menteesTableSlice";
import { mentorsTableDetailsReducer } from "../slices/ModeratorSlices/mentorsTableSlice";
import { mentorApplicantsReducer } from "../slices/ModeratorSlices/mentorApplicantsSlice";
import { setMentorSearchTextReducer } from "../slices/MenteeSlices/searchSlice";
import { mentorsSearchResultReducer } from "../slices/MenteeSlices/mentorSearchResultSlice";
import { mentorProfileDetailsReducer } from "../slices/MenteeSlices/mentorProfile";
import { mentorTimeSlotReducer } from "../slices/MentorSlices/AvailableTimeSlotsSlice";
import { menteeSideTimeSlotReducer } from "../slices/MenteeSlices/timeSlotSlice";
import { subscibedMentorsListReducer } from "../slices/MenteeSlices/subscribedMentorsListSlice";
import { subscibedMenteesListReducer } from "../slices/MentorSlices/subscibedMentees";
import { menteeConversationsReducer } from "../slices/MenteeSlices/conversationsSlice";
import { menteeMessageReducer } from "../slices/MenteeSlices/messageSlice";
import { mentorMessageReducer } from "../slices/MentorSlices/messageSlice";
import { fetchMentorConversationsReducer } from "../slices/MentorSlices/conversationsList";
import { menteeNotificationsReducer } from "../slices/MenteeSlices/menteeNotificationSlice";
import { socketReducer } from "../slices/socketSlice";
import { menteeBookedTimeSlotReducer } from "../slices/MenteeSlices/bookedTimeSlots";
import { mentorUpcomingLiveListReducer } from "../slices/MentorSlices/HomePageLiveList";
import { fetchEnrolledMenteesCountReducer } from "../slices/MentorSlices/HomePageEnrollmentsGraph";
import { mentorProfileDetailReducer } from "../slices/MentorSlices/MentorProfileSlice";
import { menteeProfileDetailReducer } from "../slices/MenteeSlices/menteeProfileDetail";
import { menteeSideTicketsListReducer } from "../slices/MenteeSlices/TicketsList";
import { mentorSideTicketsReducer } from "../slices/MentorSlices/MentorTicketsSlice";
import { moderatorSideTicketsListReducer } from "../slices/ModeratorSlices/ticketsListSlice";
import { dailyEnrollmentDataReducer } from "../slices/ModeratorSlices/DailyEnrollmentdataSlice";
import { dailyMenteeRegistrationReducer } from "../slices/ModeratorSlices/DailyMenteeRegistrationSlice";
export const store = configureStore({
  reducer: {
    menteeAuth: menteeReducer,
    menteeProfileDetails: menteeProfileDetailReducer,
    menteeSideTimeSlot: menteeSideTimeSlotReducer,
    menteeSideSubscribedMentorsList: subscibedMentorsListReducer,
    menteeNotifications: menteeNotificationsReducer,
    menteeConversations: menteeConversationsReducer,
    menteeMessage: menteeMessageReducer,
    menteeBookedTime: menteeBookedTimeSlotReducer,
    menteeSideTicektsList: menteeSideTicketsListReducer,
    moderatorAuth: moderatorReducer,
    menteesList: menteesTableDetailsReducer,
    mentorsList: mentorsTableDetailsReducer,
    mentorApplicantsList: mentorApplicantsReducer,
    mentorSearchInput: setMentorSearchTextReducer,
    mentorSearchResult: mentorsSearchResultReducer,
    mentorProfileData: mentorProfileDetailsReducer,
    mentorAuth: mentorReducer,
    mentorMessage: mentorMessageReducer,
    mentorConversations: fetchMentorConversationsReducer,
    mentorTimeSlots: mentorTimeSlotReducer,
    mentorHomePageTodaysLiveList: mentorUpcomingLiveListReducer,
    mentorHomePageEnrolledMenteesForGraph: fetchEnrolledMenteesCountReducer,
    mentorSideTickets: mentorSideTicketsReducer,
    subscribedMenteesList: subscibedMenteesListReducer,
    mentorProfileDetailsState: mentorProfileDetailReducer,
    moderatorSideTicketsList: moderatorSideTicketsListReducer,
    moderatorDailyEnrollmentData: dailyEnrollmentDataReducer,
    moderatorMenteeRegistrationData: dailyMenteeRegistrationReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific action types
        ignoredActions: ["socket/setSocket/fulfilled"], // Replace with your action type

        // Ignore specific paths in the state
        ignoredPaths: ["socket"], // Replace with your state paths
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
