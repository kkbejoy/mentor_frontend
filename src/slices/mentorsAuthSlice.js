import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import END_POINTS from "../constants/endpoints";
// import { BASE_URL } from "../constants/constants";
// import { MenteeLoginInput, MenteeLoginResponse } from "../types/menteesType";
// import { MentorLoginInput, MentorLoginResponse } from "../types/mentorType";
import { deleteUserFromLocalStoreage } from "../utilities/reusableFunctions";
import { menteeLogOut } from "../api/menteesConfiguration/menteeServices";
import {
  mentorLogOut,
  mentorLoginAPI,
} from "../api/mentorConfiguration/mentorServices";
// interface MentorSlice {
//   isMentorAuthenticated: boolean;
//   mentorName: string | null;
//   mentorRefreshToken: string | null;
//   mentorAccessToken: string | null;
//   mentorId: string | null;
//   error: string | null;
//   isLoading: "idle" | "pending";
// }

const initialState = {
  isMentorAuthenticated: false,
  mentorName: null,
  mentorAccessToken: null,
  mentorRefreshToken: null,
  mentorId: null,
  isLoading: "idle",
  error: null,
};
const mentorSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mentorAsyncLogin.fulfilled, (state, action) => {
        state.isMentorAuthenticated = true;
        state.mentorName = action.payload.mentorName;
        state.mentorAccessToken = action.payload.accessToken;
        state.mentorRefreshToken = action.payload.refreshToken;
        state.mentorId = action.payload.mentorId;
        state.isLoading = "idle";

        state.error = null;
      })
      .addCase(mentorAsyncLogin.rejected, (state, action) => {
        state.isMentorAuthenticated = false;
        state.isLoading = "idle";
        state.error = action.error.message || null;
      })
      .addCase(mentorAsyncLogin.pending, (state, action) => {
        state.isMentorAuthenticated = false;
        state.error = null;
        state.isLoading = "pending";
      });
  },
});

//Mentor Log out
export const mentorAsyncLogin = createAsyncThunk(
  "auth/mentors",
  async ({ email, password }) => {
    try {
      console.log("email", email, password);
      const response = await mentorLoginAPI(email, password);
      console.log("respose from api", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
);

//Logout
export const mentorAsyncLogout = createAsyncThunk(
  "auth/mentor/logout",
  async (mentorLoggedinDetails) => {
    try {
      console.log(mentorLoggedinDetails);
      const response = await mentorLogOut(mentorLoggedinDetails);
      await deleteUserFromLocalStoreage("mentorAuth");
      console.log(response);
      return undefined;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const mentorReducer = mentorSlice.reducer;
