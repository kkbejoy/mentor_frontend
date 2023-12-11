import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import END_POINTS from "../constants/endpoints";
import { BASE_URL } from "../constants/constants";
// import { MenteeLoginInput, MenteeLoginResponse } from "../types/menteesType";
import {
  menteeLoginAPI,
  menteeLogOut,
} from "../api/menteesConfiguration/menteeServices";
import { deleteUserFromLocalStoreage } from "../utilities/reusableFunctions";
// interface MenteesSlice {
//   isMenteeAuthenticated: boolean;
//   menteeName: string | null;
//   menteeRefreshToken: string | null;
//   menteeAccessToken: string | null;
//   menteeId: string | null;
//   error: string | null;
//   isLoading: "idle" | "pending";
// }

const initialState = {
  isMenteeAuthenticated: false,
  menteeName: null,
  menteeAccessToken: null,
  menteeRefreshToken: null,
  menteeId: null,
  isLoading: "idle",
  error: null,
};
const menteesSlice = createSlice({
  name: "mentees",
  initialState,
  reducers: {
    // menteeLogin: (state, action: PayloadAction<MenteesSlice>) => {
    //   state.isAuthenticated = true;
    //   state.menteeName = action.payload.menteeName;
    //   state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    // },
    // menteeLogout: (state) => {
    //   state.isAuthenticated = false;
    //   state.menteeName = null;
    //   state.accessToken = null;
    //   state.refreshToken = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(menteeAsyncLogin.fulfilled, (state, action) => {
        state.isMenteeAuthenticated = true;
        state.menteeName = action.payload.menteeName;
        state.menteeAccessToken = action.payload.accessToken;
        state.menteeRefreshToken = action.payload.refreshToken;
        state.menteeId = action.payload.menteeId;
        state.isLoading = "idle";
        state.error = null;
      })
      .addCase(menteeAsyncLogin.rejected, (state, action) => {
        state.isMenteeAuthenticated = false;
        state.isLoading = "idle";
        state.error = action.error.message || null;
      })
      .addCase(menteeAsyncLogin.pending, (state, action) => {
        state.isMenteeAuthenticated = false;
        state.error = null;
        state.isLoading = "pending";
      })
      .addCase(menteeAsyncLogout.fulfilled, (state, action) => {
        state.isMenteeAuthenticated = false;
        state.menteeId = null;
        state.menteeName = null;
        state.menteeAccessToken = null;
        state.menteeRefreshToken = null;
        state.isLoading = "idle";
        state.error = null;
      });
  },
});

//Login
export const menteeAsyncLogin = createAsyncThunk(
  "auth/mentees",
  async ({ email, password }) => {
    try {
      console.log("email", email, password);
      const response = await menteeLoginAPI(email, password);
      console.log("respose from thunk", response.data);

      return response.data;
    } catch (error) {
      console.log("error from slice", error);
      throw new Error(error.message);
    }
  }
);

//Logout
export const menteeAsyncLogout = createAsyncThunk(
  "auth/mentees/logout",
  async (menteeLoggedinDetails) => {
    try {
      console.log(menteeLoggedinDetails);
      const response = await menteeLogOut(menteeLoggedinDetails);
      await deleteUserFromLocalStoreage("menteeAuth");
      console.log(response);
      return undefined;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
// export const { menteeLogin, menteeLogout } = menteesSlice.actions;
// export const menteeSelector = (state: RootState) => ({
//   isAuthenticated: state.mentees?.isAuthenticated,
//   menteeName: state.mentees?.menteeName,
//   accessToken: state.mentees?.accessToken,
//   refreshToken: state.mentees?.refreshToken,
// });
export const menteeReducer = menteesSlice.reducer;
