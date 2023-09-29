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
export const store = configureStore({
  reducer: {
    menteeAuth: menteeReducer,
    mentorAuth: mentorReducer,
    moderatorAuth: moderatorReducer,
    menteesList: menteesTableDetailsReducer,
    mentorsList: mentorsTableDetailsReducer,
    mentorApplicantsList: mentorApplicantsReducer,
    mentorSearchInput: setMentorSearchTextReducer,
    mentorSearchResult: mentorsSearchResultReducer,
    mentorProfileData: mentorProfileDetailsReducer,
    mentorTimeSlots: mentorTimeSlotReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
