import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import { Socket } from "socket.io-client";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchMessageWithConversationId = createAsyncThunk(
  "data/fetchMessage",
  async (conversationId) => {
    try {
      console.log("hello fromm fetch message");
      const messages = await menteesAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTEES_Get_Messages}/${conversationId}`
      );
      console.log("Mesage from message api slice", messages);
      return messages.data.messages;
    } catch (error) {
      console.log("Message api erroro", error);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    addNewMessage: (state, action) => {
      state?.data?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessageWithConversationId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessageWithConversationId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMessageWithConversationId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});
export const { addNewMessage } = messageSlice.actions;
export const menteeMessageReducer = messageSlice.reducer;
