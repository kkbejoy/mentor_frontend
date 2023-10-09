import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";
import { formatCalenderSlots } from "../../utilities/calenderUtilities";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of Mentor Available Time slots
export const fetchTimeSlotsMenteeSide = createAsyncThunk(
  "data/fetchTimeSlotsMenteeSide",
  async (menteeId) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await menteesAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTEES_Time_Slots}/${menteeId}`
      );
      // console.log("Unformatted Ttime slots mentee side", response);

      const formattedDate = await formatCalenderSlots(response.data.timeSlots);
      // console.log("formatted Ttime slots mentee side", formattedDate);
      return formattedDate;
    } catch (error) {
      console.log("Error From Time slot mentee side", error);
      throw error;
    }
  }
);

//Slice
const timeSlotSliceMenteeSlice = createSlice({
  name: "timeSlotSliceMenteeSide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeSlotsMenteeSide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTimeSlotsMenteeSide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTimeSlotsMenteeSide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const menteeSideTimeSlotReducer = timeSlotSliceMenteeSlice.reducer;
