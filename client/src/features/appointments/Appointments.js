import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: null,
  services: null,
  date: null,
  time: null,
  confirm: null,
};

export const apponitmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    setServices: (state, action) => {
      state.services = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setConfirm: (state, action) => {
      state.confirm = action.payload;
    },
  },
});

export const { setStaff, setServices, setDate, setTime, setConfirm } =
  apponitmentSlice.actions;

export const appointment = (state) => state.appointment;

export default apponitmentSlice.reducer;
