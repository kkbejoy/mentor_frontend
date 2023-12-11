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
export const fetchMenteesList = createAsyncThunk(
  "data/fetchMenteesList",
  async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await moderatorAxiosInstance.get(
        BASE_URL + END_POINTS.MODERATOR_Mentees_List
      );
      //   const data = await response.JSON();
      console.log("Mentees data :", response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//Data slice
const menteesListTableData = createSlice({
  name: "menteesListTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenteesList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenteesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMenteesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const menteesTableDetailsReducer = menteesListTableData.reducer;
