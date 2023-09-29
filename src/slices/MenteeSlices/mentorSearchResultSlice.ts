import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of mentees from backend
export const fetchMentorsListUsingSearchInput = createAsyncThunk(
  "data/fetchMentorsList",
  async (search) => {
    try {
      console.log("Search INput", search);
      const input = search ? search : "";
      const response = await axios.get(
        `${BASE_URL}${END_POINTS.MENTEE_MENTOR_Search}?search=${input}`
      );
      // .then((res) => {
      //   console.log("Mentor Search result from slice", res);
      // })
      // .catch((error) => {
      //   console.log(error);
      //   throw error;
      // });
      //   const data = await response.JSON();
      console.log("check1");
      // console.log("Mentor Search Result:", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//Mentor Search result slice
const mentorsSearchResultSlice = createSlice({
  name: "mentorsSearchResult",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorsListUsingSearchInput.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMentorsListUsingSearchInput.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMentorsListUsingSearchInput.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const mentorsSearchResultReducer = mentorsSearchResultSlice.reducer;
