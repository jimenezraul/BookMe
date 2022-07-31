import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointment: {},
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
    deleteAppointment: (state, action) => {
      state.appointment = {};
    },
  },
});

export const { setAppointment, deleteAppointment } = appointmentSlice.actions;

export const appointment = (state) => state.appointments.appointment;

export default appointmentSlice.reducer;
