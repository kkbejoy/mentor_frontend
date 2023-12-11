import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of mentees from backend
export const mentorProfileDetails = createAsyncThunk(
  "data/mentorProfileDetails",
  async (mentorId) => {
    try {
      console.log("MentorId", mentorId);
      const response = await menteesAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTEE_MENTOR_Profile}/${mentorId}`
      );
      console.log("Mentor Details", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//Mentor Search result slice
const mentorProfileDetailsSlice = createSlice({
  name: "mentorProfileDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mentorProfileDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(mentorProfileDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(mentorProfileDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const mentorProfileDetailsReducer = mentorProfileDetailsSlice.reducer;
