import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  priceRange: "",
  rating: "",
  error: null,
};
const mentorSearchInputSlice = createSlice({
  name: "mentorSearchInput",
  initialState,
  reducers: {
    setMentorSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
});

export const { setMentorSearchText, setPriceRange, setRating } =
  mentorSearchInputSlice.actions;
export const setMentorSearchTextReducer = mentorSearchInputSlice.reducer;
