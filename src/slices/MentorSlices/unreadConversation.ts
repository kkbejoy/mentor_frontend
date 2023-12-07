import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMentorIdFromLocalStorage } from "../../utilities/reusableFunctions";
import { BASE_URL } from "../../constants/constants";
import mentorAxiosInstance from "../../api/mentorConfiguration/mentorInterceptor";
import END_POINTS from "../../constants/endpoints";

const initialState = {
  unreadCount: 0,
  isLoading: false,
  error: null,
};

export const fetchTheNumberOfUnreadMesagesMentorSide = createAsyncThunk(
  "data/fetchTheNumberOfUnreadMesagesMentorSide",
  async () => {
    const mentorId = getMentorIdFromLocalStorage();

    const responseFromAPI = await mentorAxiosInstance.get(
      `${BASE_URL}${END_POINTS.MENTOR_Get_UNREAD_Conversations_COUNT}?mentorId=${mentorId}`
    );
    console.log("Mentor Side Unread Message Count Response:", responseFromAPI);
    return responseFromAPI?.data?.unreadConversations;
  }
);

const unreadMessagesCountMentorSide = createSlice({
  name: "unreadMessagesCount",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheNumberOfUnreadMesagesMentorSide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTheNumberOfUnreadMesagesMentorSide.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || null;
        }
      )
      .addCase(
        fetchTheNumberOfUnreadMesagesMentorSide.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.unreadCount = action.payload;
          state.error = null;
        }
      );
  },
});

export const unreadMessagesCountMentorReducer =
  unreadMessagesCountMentorSide.reducer;
