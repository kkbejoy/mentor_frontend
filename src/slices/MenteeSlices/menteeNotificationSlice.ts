// notificationsSlice.js
import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import { getMenteeIdFromLocalStorage } from "../../utilities/reusableFunctions";
import menteesAxiosInstance from "../../api/menteesConfiguration/menteeInterceptor";
import { BASE_URL } from "../../constants/constants";
import END_POINTS from "../../constants/endpoints";
import { getTimeDifference } from "../../utilities/timeManagementFunctions";

export const getMenteeNotification = createAsyncThunk(
  "data/menteeNotifications",
  async () => {
    try {
      const menteeId = await getMenteeIdFromLocalStorage();
      const responseFromAPI = await menteesAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTEES_Notifications}/${menteeId}`
      );

      // Return the data from the API response
      return responseFromAPI.data.notifications;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const menteeNotificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    isLoading: false,
    error: null,
    isRead: true,
  },
  reducers: {
    addMenteeNotification: (state, action) => {
      state.notifications.push(action.payload);
      state.isRead = false; // Ensure action.payload is an object
    },
    removeMenteeNotification: (state, action) => {
      // Modify the filtering logic based on your notification structure
      state.notifications = state.notifications.filter(
        (notification) => notification.someUniqueField !== action.payload
      );
    },
    markAsRead: (state, action) => {
      state.isRead = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenteeNotification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMenteeNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload; // Update the notifications array
      })
      .addCase(getMenteeNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { addMenteeNotification, removeMenteeNotification, markAsRead } =
  menteeNotificationsSlice.actions;

export const menteeNotificationsReducer = menteeNotificationsSlice.reducer;
