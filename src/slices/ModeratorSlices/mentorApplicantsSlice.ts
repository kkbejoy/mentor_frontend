import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moderatorAxiosInstance from "../../api/moderatorConfiguration/moderatorInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch Mentor Applicants
export const fetchMentorApplicantsList = createAsyncThunk(
  "data/fetchMentorApplicantsList",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log("APi");
      const response = await moderatorAxiosInstance.get(
        BASE_URL + END_POINTS.MODERATOR_Mentor_Applicants_List
      );
      //   const data = await response.JSON();
      console.log("Mentor Applicants List :", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//Mentor Applicants List slice
const mentorApplicantsListData = createSlice({
  name: "mentorApplicantsListTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorApplicantsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMentorApplicantsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMentorApplicantsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const mentorApplicantsReducer = mentorApplicantsListData.reducer;
