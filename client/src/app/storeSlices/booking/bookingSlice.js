import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.booking = action.payload;
    },
    updateBookings: (state, action) => {
      state.booking = state.booking.map((booking) => {
        if (booking.id === action.payload.id) {
          return action.payload;
        }
        return booking;
      });
    },
  },
});

export const { setBooking, updateBookings } = bookingSlice.actions;

export const booking = (state) => state.bookings.booking;

export default bookingSlice.reducer;
