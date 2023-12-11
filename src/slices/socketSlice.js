import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";

const socketSlice = createSlice({
  name: "Socket",
  initialState: null,
  reducers: {
    setSocket: (state, action) => {
      return action.payload;
    },
  },
});

export const setSocket = createAsyncThunk(
  "Socket/setSocket",
  async (socket, thunkAPI) => {
    thunkAPI.dispatch(socketSlice.actions.setSocket(socket));
    console.log("Socket from thunk", socket);
    return socket;
  }
);

// export const { setSocket } = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
