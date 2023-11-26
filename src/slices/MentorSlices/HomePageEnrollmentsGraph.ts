import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import END_POINTS, { BASE_URL } from "../../constants/endpoints";
import mentorAxiosInstance from "../../api/mentorConfiguration/mentorInterceptor";
import { getUserIdAndToken } from "../../utilities/reusableFunctions";
import { toast } from "sonner";

const initialState = {
  data: [],
  isLoading: false,
  erorr: null,
};

export const fetchEnrolledMenteesCount = createAsyncThunk(
  "data/fetchEnrolledMenteesCount",
  async () => {
    try {
      const { mentorId } = await getUserIdAndToken("mentorAuth");
      console.log("Hello", mentorId);
      const responseFromApi = await mentorAxiosInstance.get(
        `${BASE_URL}${END_POINTS.MENTOR_HOME_PAGE_ENROLLMENT_DETAILS}/${mentorId}`
      );
      console.log("enrolled Mentees count", responseFromApi);
      return responseFromApi?.data?.enrollmentObject;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!!!");
    }
  }
);

const EnrolledMenteesCountSlice = createSlice({
  name: "mentorLiveSessionsList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledMenteesCount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnrolledMenteesCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchEnrolledMenteesCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});
export const fetchEnrolledMenteesCountReducer =
  EnrolledMenteesCountSlice.reducer;
