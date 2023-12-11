import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import axios from "axios";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of mentees from backend
export const fetchBookedTimeSlots = createAsyncThunk(
  "data/fetchBookedTimeSlots",
  async () => {
    try {
      const menteeId = getMenteeIdFromLocalStorage();

      console.log("Boked tome slots", menteeId);
      const response = await menteesAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTEE_Booked_Time_SLots}/${menteeId}`
      );

      console.log("Booked tome slots:", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//Mentor Search result slice
const menteeBookedTimeSlotSlice = createSlice({
  name: "menteeBookedTimeSlots",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookedTimeSlots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookedTimeSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookedTimeSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const menteeBookedTimeSlotReducer = menteeBookedTimeSlotSlice.reducer;
