import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import mentorAxiosInstance from "../../api/mentorConfiguration/mentorInterceptor";
import { formatCalenderSlots } from "../../utilities/calenderUtilities";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of Mentor Available Time slots
export const fetchMentorTimeSlots = createAsyncThunk(
  "data/fetchMentorTimeSlots",
  async (mentorId) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await mentorAxiosInstance.get(
        BASE_URL + END_POINTS.MENTOR_Iime_Slots + "/" + mentorId
      );

      const formattedDate = await formatCalenderSlots(
        response.data.allTimeSlots
      );
      console.log("formatted timeslots", response, formattedDate);
      return formattedDate;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//Data slice
const mentorTimeSlotSlice = createSlice({
  name: "mentorTimeSlotSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorTimeSlots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMentorTimeSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMentorTimeSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const mentorTimeSlotReducer = mentorTimeSlotSlice.reducer;
