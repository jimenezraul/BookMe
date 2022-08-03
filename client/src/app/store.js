import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./storeSlices/counter/counterSlice";
import themeReducer from "./storeSlices/theme/themeSlice";
import appointmentReducer from "./storeSlices/appointments/appointmentSlice";
import guestReducer from "./storeSlices/guest/guestSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    appointments: appointmentReducer,
    guest: guestReducer,
  },
});
