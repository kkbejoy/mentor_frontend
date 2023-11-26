/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mentorAxiosInstance from "../../api/mentorConfiguration/mentorInterceptor";
import { BASE_URL } from "../../constants/constants";
import END_POINTS from "../../constants/endpoints";
import { getMentorIdFromLocalStorage } from "../../utilities/reusableFunctions";

const initialState = {
  date: [],
  isLoading: false,
  error: null,
};
export const fetchTicketsRaisedByThisMentor = createAsyncThunk(
  "data/mentorTickets",
  async () => {
    try {
      const mentorId = await getMentorIdFromLocalStorage();
      const mentorTicketsAPI = await mentorAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTOR_Tickets}/${mentorId}`
      );
      console.log("Resposnse from mentor Tickets api", mentorTicketsAPI);
      return mentorTicketsAPI?.data?.listOfTickets;
    } catch (error) {
      throw error;
    }
  }
);

const mentorTicketsSlice = createSlice({
  name: "mentorTicketSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsRaisedByThisMentor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTicketsRaisedByThisMentor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchTicketsRaisedByThisMentor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export const mentorSideTicketsReducer = mentorTicketsSlice.reducer;
