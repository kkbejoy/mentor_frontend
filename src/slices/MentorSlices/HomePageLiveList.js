import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import mentorAxiosInstance from "../../api/mentorConfiguration/mentorInterceptor";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import { toast } from "sonner";

const initialState = {
  data: [],
  isLoading: false,
  erorr: null,
};

export const fetchUpcomingLivesMentorHomePage = createAsyncThunk(
  "data/fetchUpcomingLivesMentorHomePage",
  async () => {
    try {
      const { mentorId } = await getUserIdAndToken("mentorAuth");
      console.log("Hello", mentorId);
      const responseFromApi = await mentorAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTOR_HOME_PAGE_LIVE_LIST}/${mentorId}`
      );
      console.log("Response from thunk, homepage api", responseFromApi);
      return responseFromApi?.data?.sessionDetails;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!!!");
    }
  }
);

const mentorUpcomingLiveListSlice = createSlice({
  name: "mentorLiveSessionsList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingLivesMentorHomePage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingLivesMentorHomePage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUpcomingLivesMentorHomePage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});
export const mentorUpcomingLiveListReducer =
  mentorUpcomingLiveListSlice.reducer;
