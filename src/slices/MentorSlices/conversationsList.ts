import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import mentorAxiosInstance from "../../api/mentorConfiguration/mentorInterceptor";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import { toast } from "sonner";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async Thunk fucntion to fetch datas of mentees from backend
export const fetchMentorConversations = createAsyncThunk(
  "data/fetchMentorConversations",
  async () => {
    try {
      const { mentorId } = await getUserIdAndToken("mentorAuth");
      const response = await mentorAxiosInstance.post(
        `${BASE_URL}${END_POINTS.MENTOR_Get_Conversations}`,
        { mentorId }
      );
      console.log("Mentor Side convo list", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Somethng went wrong from conversation fetching api");
    }
  }
);

//Mentor Search result slice
const mentorConversationsSlice = createSlice({
  name: "mentorConversations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMentorConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMentorConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const fetchMentorConversationsReducer = mentorConversationsSlice.reducer;
