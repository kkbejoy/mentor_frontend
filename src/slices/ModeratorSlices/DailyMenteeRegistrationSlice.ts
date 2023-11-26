import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moderatorAxiosInstance from "../../api/moderatorConfiguration/moderatorInterceptor";
import { BASE_URL } from "../../constants/constants";
import END_POINTS from "../../constants/endpoints";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
export const fetchDailyMenteeRegistrationData = createAsyncThunk(
  "data/fetchDailyMenteeRegistration",
  async () => {
    try {
      const responseFromApi = await moderatorAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MODERATOR_HOMEPAGE_DAILY_MENTEE_REGISTRATION}`
      );

      console.log("Response from API", responseFromApi);
      return responseFromApi.data?.newMenteeDetail;
    } catch (error) {
      console.log(error);
    }
  }
);

const dailyMenteeRegistrationSlice = createSlice({
  name: "dailyMenteeRegistration",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyMenteeRegistrationData.pending, (state) => {
        state.isLoading;
      })
      .addCase(fetchDailyMenteeRegistrationData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || null;
      })
      .addCase(fetchDailyMenteeRegistrationData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      });
  },
});

export const dailyMenteeRegistrationReducer =
  dailyMenteeRegistrationSlice.reducer;
