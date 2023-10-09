import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";
import { formatCalenderSlots } from "../../utilities/calenderUtilities";
import { resolvePath } from "react-router-dom";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of Mentor Available Time slots
export const fetchSubscribedMentorsList = createAsyncThunk(
  "data/fetchSubscribedMentorsList",
  async (menteeId) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await menteesAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTEES_Subscribed_Mentors}/${menteeId}`
      );
      console.log(
        "Response from subscribed mentors list :",
        response.data.allMentorsSubscribed
      );

      return response.data.allMentorsSubscribed;
    } catch (error) {
      console.log("Error From subscibed Mentors", error);
      throw error;
    }
  }
);

//Slice
const subscibedMentorsList = createSlice({
  name: "subscibedMentorsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribedMentorsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubscribedMentorsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubscribedMentorsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const subscibedMentorsListReducer = subscibedMentorsList.reducer;
