import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: null,
};

export const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuest: (state, action) => {
      state.guest = action.payload;
    },
    resetGuest: (state, action) => {
      state.guest = null;
    },
  },
});

export const { setGuest, resetGuest } = guestSlice.actions;

export const guest = (state) => state.guest.guest;

export default guestSlice.reducer;
