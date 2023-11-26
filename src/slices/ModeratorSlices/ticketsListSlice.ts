import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moderatorAxiosInstance from "../../api/moderatorConfiguration/moderatorInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of Mentor Available Time slots
export const fetchTicketsRaisedFromModeratorSide = createAsyncThunk(
  "data/fetchTicketsRaisedFromModeratorSide",
  async () => {
    try {
      //   const menteeId = await getMenteeIdFromLocalStorage();
      const response = await moderatorAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MODERATOR_Tickets}`
      );
      console.log("All Tickets API", response);

      return response?.data?.responseFromDb;
    } catch (error) {
      console.log("Error From Fetching Tickets list mentee side", error);
      throw error;
    }
  }
);

//Slice
const ticketsListModeratorSideSlice = createSlice({
  name: "ticketsListModeratorSideSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsRaisedFromModeratorSide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTicketsRaisedFromModeratorSide.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchTicketsRaisedFromModeratorSide.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || null;
        }
      );
  },
});

export const moderatorSideTicketsListReducer =
  ticketsListModeratorSideSlice.reducer;
