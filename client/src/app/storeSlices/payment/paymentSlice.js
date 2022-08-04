import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: null,
};

export const paymentSlice = createSlice({
  name: "Payment",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    resetPayment: (state, action) => {
      state.payment = null;
    },
  },
});

export const { setPayment, resetPayment } = paymentSlice.actions;

export const payment = (state) => state.payment.payment;

export default paymentSlice.reducer;
