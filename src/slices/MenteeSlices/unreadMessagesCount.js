import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMenteeIdFromLocalStorage,
  getUserIdAndToken,
} from "../../utilities/reusableFunctions";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";

const initialState = {
  unreadCount: 0,
  isLoading: false,
  error: null,
};

export const fetchTheNumberOfUnreadMesages = createAsyncThunk(
  "data/fetchunreadmessages",
  async () => {
    const menteeId = getMenteeIdFromLocalStorage();

    const responseFromAPI = await menteesAxiosInstance.get(
      `${BASE_URL}${END_POINTS.MENTEES_Get_UNREAD_Conversations_COUNT}?menteeId=${menteeId}`
    );
    console.log("Reswponse from fetching Unread Convo count", responseFromAPI);
    return responseFromAPI?.data?.unreadConversations;
  }
);

const unreadMessagesCountMenteeSide = createSlice({
  name: "unreadMessagesCount",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheNumberOfUnreadMesages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTheNumberOfUnreadMesages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchTheNumberOfUnreadMesages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unreadCount = action.payload;
        state.error = null;
      });
  },
});

export const unreadMessagesCountMenteeReducer =
  unreadMessagesCountMenteeSide.reducer;
