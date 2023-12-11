import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import END_POINTS from "../constants/endpoints";
// import { BASE_URL } from "../constants/constants";
// import {
//   ModeratorLoginInput,
//   ModeratorLoginResponse,
//   ModeratorsSlice,
// } from "../types/moderatorTypes";
import { deleteUserFromLocalStoreage } from "../utilities/reusableFunctions";
import {
  moderatorLogOut,
  moderatorLoginAPI,
} from "../api/moderatorConfiguration/moderatorServices";

const initialState = {
  isModeratorAuthenticated: false,
  moderatorName: null,
  moderatorAccessToken: null,
  moderatorRefreshToken: null,
  moderatorId: null,
  isLoading: "idle",
  error: null,
};
const moderatorSlice = createSlice({
  name: "moderator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(moderatorAsyncLogin.fulfilled, (state, action) => {
        state.isModeratorAuthenticated = true;
        state.moderatorName = action.payload.moderatorName;
        state.moderatorAccessToken = action.payload.moderatorAccessToken;
        state.moderatorRefreshToken = action.payload.moderatorRefreshToken;
        // state.moderatorId = action.payload.moderatorId;
        state.isLoading = "idle";

        state.error = null;
      })
      .addCase(moderatorAsyncLogin.rejected, (state, action) => {
        state.isModeratorAuthenticated = false;
        state.isLoading = "idle";
        state.error = action.error.message || null;
      })
      .addCase(moderatorAsyncLogin.pending, (state) => {
        state.isModeratorAuthenticated = false;
        state.error = null;
        state.isLoading = "pending";
      });
  },
});

export const moderatorAsyncLogin = createAsyncThunk(
  "auth/moderator",
  async ({ email, password }) => {
    try {
      console.log("email", email, password);
      const response = await moderatorLoginAPI(email, password);
      console.log("respose from api", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
);

//Logout
export const moderatorAsyncLogout = createAsyncThunk(
  "auth/moderator/logout",
  async (moderatorLoggedinDetails) => {
    try {
      console.log(moderatorLoggedinDetails);
      const response = await moderatorLogOut(moderatorLoggedinDetails);
      await deleteUserFromLocalStoreage("moderatorAuth");
      console.log(response);
      return undefined;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const moderatorReducer = moderatorSlice.reducer;
