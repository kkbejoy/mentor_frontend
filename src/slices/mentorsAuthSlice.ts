import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import END_POINTS from "../constants/endpoints";
import { BASE_URL } from "../constants/constants";
// import { MenteeLoginInput, MenteeLoginResponse } from "../types/menteesType";
import { MentorLoginInput, MentorLoginResponse } from "../types/mentorType";
interface MentorSlice {
  isMentorAuthenticated: boolean;
  mentorName: string | null;
  mentorRefreshToken: string | null;
  mentorAccessToken: string | null;
  mentorId: string | null;
  error: string | null;
  isLoading: "idle" | "pending";
}

const initialState: MentorSlice = {
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

export const mentorAsyncLogin = createAsyncThunk<
  MentorLoginResponse,
  MentorLoginInput
>("auth/mentors", async ({ email, password }) => {
  try {
    console.log("email", email, password);
    const response = await mentorLoginAPI(email, password);
    console.log("respose from api", response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});
const mentorLoginAPI = async (
  email: string,
  password: string
): Promise<MentorLoginResponse> => {
  const credentials = { email: email, password: password };

  const response = await axios.post(
    `${BASE_URL}` + `${END_POINTS.MENTOR_LOGIN}`,
    credentials
  );
  console.log("respose from api", response);
  return response;
};

export const mentorReducer = mentorSlice.reducer;
