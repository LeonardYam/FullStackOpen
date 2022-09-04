import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear(state) {
      return initialState
    },
  },
});

export const { set, clear } = userSlice.actions;

export default userSlice.reducer;
