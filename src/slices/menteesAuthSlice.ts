import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import END_POINTS from "../constants/endpoints";
import { BASE_URL } from "../constants/constants";
import { MenteeLoginInput, MenteeLoginResponse } from "../types/menteesType";
interface MenteesSlice {
  isMenteeAuthenticated: boolean;
  menteeName: string | null;
  menteeRefreshToken: string | null;
  menteeAccessToken: string | null;
  menteeId: string | null;
  error: string | null;
  isLoading: "idle" | "pending";
}

const initialState: MenteesSlice = {
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
      });
  },
});

export const menteeAsyncLogin = createAsyncThunk<
  MenteeLoginResponse,
  MenteeLoginInput
>("auth/mentees", async ({ email, password }) => {
  try {
    console.log("email", email, password);
    const response = await menteeLoginAPI(email, password);
    console.log("respose from api", response);
    return response.data;
  } catch (error) {
    console.log("error from slice", error);
    throw new Error(error.message);
  }
});
const menteeLoginAPI = async (
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

// export const { menteeLogin, menteeLogout } = menteesSlice.actions;
// export const menteeSelector = (state: RootState) => ({
//   isAuthenticated: state.mentees?.isAuthenticated,
//   menteeName: state.mentees?.menteeName,
//   accessToken: state.mentees?.accessToken,
//   refreshToken: state.mentees?.refreshToken,
// });
export const menteeReducer = menteesSlice.reducer;
