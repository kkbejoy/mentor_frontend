import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of Mentor Available Time slots
export const fetchTicketsRaisedByThisMentee = createAsyncThunk(
  "data/fetchTicketsRaisedByThisMentee",
  async () => {
    try {
      const menteeId = await getMenteeIdFromLocalStorage();
      const response = await menteesAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTEE_Tickets}/${menteeId}`
      );
      console.log("Response from fetching tickets form mentee Side", response);

      return response?.data.listOfTickets;
    } catch (error) {
      console.log("Error From Fetching Tickets list mentee side", error);
      throw error;
    }
  }
);

//Slice
const ticketsListMenteeSideSlice = createSlice({
  name: "ticketsListMenteeSide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsRaisedByThisMentee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTicketsRaisedByThisMentee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTicketsRaisedByThisMentee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const menteeSideTicketsListReducer = ticketsListMenteeSideSlice.reducer;
