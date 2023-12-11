import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import mentorAxiosInstance from "../../api/mentorConfiguration/mentorInterceptor";
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchMessageMentorSide = createAsyncThunk(
  "data/fetchMessageMentorSide",
  async (conversationId) => {
    try {
      if (!conversationId) throw new Error("No conversation Id");
      const messages = await mentorAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTORS_Get_Messages}/${conversationId}`
      );
      console.log("Mesage from message api slice", messages);
      return messages?.data?.messages;
    } catch (error) {
      console.log("Message api erroro", error);
    }
  }
);

const mentorMessageSlice = createSlice({
  name: "mentorMessages",
  initialState: initialState,
  reducers: {
    addNewMessagMentorSide: (state, action) => {
      state.data?.push(action?.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessageMentorSide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessageMentorSide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action?.payload;
      })
      .addCase(fetchMessageMentorSide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});
export const { addNewMessagMentorSide } = mentorMessageSlice.actions;

export const mentorMessageReducer = mentorMessageSlice.reducer;
