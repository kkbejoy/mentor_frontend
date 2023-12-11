import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moderatorAxiosInstance from "../../api/moderatorConfiguration/moderatorInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of mentees from backend
export const fetchMentosList = createAsyncThunk(
  "data/fetchMentorsList",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await moderatorAxiosInstance.get(
        BASE_URL + END_POINTS.MODERATOR_Mentors_List
      );
      //   const data = await response.JSON();
      console.log("Mentors data From Axios APi:", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//Data slice
const mentorsListTableData = createSlice({
  name: "mentorsListTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentosList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMentosList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMentosList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const mentorsTableDetailsReducer = mentorsListTableData.reducer;
