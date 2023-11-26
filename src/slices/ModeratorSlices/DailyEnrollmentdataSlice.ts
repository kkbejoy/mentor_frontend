import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moderatorAxiosInstance from "../../api/moderatorConfiguration/moderatorInterceptor";
import { BASE_URL } from "../../constants/constants";
import END_POINTS from "../../constants/endpoints";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchDailyEnrollmentData = createAsyncThunk(
  "data/fetchDailyEnrollmentdata",
  async () => {
    try {
      const responseFromApi = await moderatorAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MODERATOR_HOMEPAGE_DAILY_ENROLLMENTDATA}`
      );
      console.log("resposnde from Daly enrollmner data", responseFromApi);
      return responseFromApi?.data?.dailyEnrollmentData;
    } catch (error) {
      console.log(error);
    }
  }
);

const dailyEnrollmentData = createSlice({
  name: "dailyEnrollmentData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyEnrollmentData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDailyEnrollmentData.rejected, (state, actions) => {
        state.error = actions?.error?.message || null;
        state.isLoading = false;
      })
      .addCase(fetchDailyEnrollmentData.fulfilled, (state, actions) => {
        state.data = actions?.payload;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const dailyEnrollmentDataReducer = dailyEnrollmentData.reducer;
