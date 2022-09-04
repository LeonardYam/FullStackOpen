import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    display(state, action) {
      return action.payload;
    },
    clear(state, action) {
      if (state && state.id === action.payload) {
        return initialState;
      }
    },
  },
});

export const { display, clear } = notificationSlice.actions;

const secondsToDisplay = 5;
let nextId = 0;
export const setNotification = (notification) => {
  return async (dispatch) => {
    const id = nextId++;
    dispatch(display({ id, ...notification }));
    setTimeout(() => {
      dispatch(clear(id));
    }, secondsToDisplay * 1000);
  };
};

export default notificationSlice.reducer;
