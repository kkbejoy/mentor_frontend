import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
export const fetchMenteeProfileData = createAsyncThunk(
  "data/fetchMenteeProfileData",
  async () => {
    try {
      console.log("Menteeeeeeeeeee");
      const menteeId = await getMenteeIdFromLocalStorage();
      console.log("menteeId", menteeId);
      const responseFromAPI = await menteesAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTEE_Profile_Update}/${menteeId}`
      );
      console.log("Mentee Profile data from THunk", responseFromAPI);
      return responseFromAPI?.data?.menteeProfileDetails;
    } catch (error) {
      console.log(error);
    }
  }
);

const menteeProfileDataSlice = createSlice({
  name: "menteeProfileData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenteeProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenteeProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchMenteeProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export const menteeProfileDetailReducer = menteeProfileDataSlice.reducer;
