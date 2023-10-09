import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import mentorAxiosInstance from "../../api/mentorConfiguration/mentorInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import { toast } from "sonner";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of mentees from backend
export const fetchSubscribedMenteesList = createAsyncThunk(
  "data/fetchSubscribedMenteesList",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { mentorId } = getUserIdAndToken("mentorAuth");
      const response = await mentorAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTOR_SUBSCRIBED_Mentees}/${mentorId}`
      );
      //   const data = await response.JSON();
      console.log("List of subscribed Mentees :", response);
      return response.data.enrolledMentees;
    } catch (error) {
      console.log(error);
      toast.error("Error Fetching Mentees List");
    }
  }
);

//Data slice
const subscibedMenteesList = createSlice({
  name: "subscibedMenteesList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribedMenteesList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubscribedMenteesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubscribedMenteesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const subscibedMenteesListReducer = subscibedMenteesList.reducer;
