import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("theme") || "winter",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("theme", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const theme = (state) => state.theme.value;

export default themeSlice.reducer;
