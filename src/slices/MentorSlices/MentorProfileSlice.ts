import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMentorIdFromLocalStorage } from "../../utilities/reusableFunctions";
import mentorAxiosInstance from "../../api/mentorConfiguration/mentorInterceptor";
import { BASE_URL } from "../../constants/constants";
import END_POINTS from "../../constants/endpoints";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
export const fetchMentorProfileData = createAsyncThunk(
  "data/fetchMentorProfileData",
  async () => {
    try {
      const mentorId = await getMentorIdFromLocalStorage();
      console.log("mentor Id", mentorId);
      const responseFromAPI = await mentorAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTOR_Profile_Update}/${mentorId}`
      );
      console.log("Mentor Profile data from THunk", responseFromAPI);
      return responseFromAPI?.data?.profileData;
    } catch (error) {
      console.log(error);
    }
  }
);

const mentorProfileDataSlice = createSlice({
  name: "mentorProfileData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMentorProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchMentorProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export const mentorProfileDetailReducer = mentorProfileDataSlice.reducer;
