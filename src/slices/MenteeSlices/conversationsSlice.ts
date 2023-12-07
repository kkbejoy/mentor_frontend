import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";
import { toast } from "sonner";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
export const markAsReadMenteeSide = createAsyncThunk(
  "data/markAsReadMenteeSide",
  async (conversationId) => {
    try {
      const responseFromAPI = await menteesAxiosInstance.patch(
        `${BASE_URL}${END_POINTS.MENTEES_Conversations_Read_Unread}`,
        { conversationId }
      );
      console.log("Response from Read unread", responseFromAPI);
      // return responseFromAPI;
    } catch (error) {
      console.log(error);
    }
  }
);
//Async Thunk fucntion to fetch datas of mentees from backend
export const fetchMenteeConversations = createAsyncThunk(
  "data/fetchMenteeConversations",
  async (mentorName) => {
    try {
      const menteeId = await getMenteeIdFromLocalStorage();
      const response = await menteesAxiosInstance.post(
        `${BASE_URL}${END_POINTS.MENTEES_Get_Conversations}?mentorName=hello`,
        { menteeId }
      );
      console.log("Conversations response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Somethng went wrong from conversation fetching api");
    }
  }
);

//Mentor Search result slice
const menteeConversationsSlice = createSlice({
  name: "menteeConversations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenteeConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenteeConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMenteeConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const menteeConversationsReducer = menteeConversationsSlice.reducer;
