import { configureStore } from "@reduxjs/toolkit";
import { menteeReducer } from "../slices/menteesAuthSlice";
import { mentorReducer } from "../slices/mentorsAuthSlice";
import { moderatorReducer } from "../slices/moderatorsAuthSlice";

export const store = configureStore({
  reducer: {
    menteeAuth: menteeReducer,
    mentorAuth: mentorReducer,
    moderatorAuth: moderatorReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
