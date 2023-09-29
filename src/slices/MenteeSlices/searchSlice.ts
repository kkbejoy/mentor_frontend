import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  error: null,
};
const mentorSearchInputSlice = createSlice({
  name: "mentorSearchInput",
  initialState,
  reducers: {
    setMentorSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setMentorSearchText } = mentorSearchInputSlice.actions;
export const setMentorSearchTextReducer = mentorSearchInputSlice.reducer;
