import { createSlice } from "@reduxjs/toolkit";

export interface currentPage {
  value: string;
}

const initialState: currentPage = { value: "Home" };

const layoutSlice = createSlice({
  name: "currentPage",
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, payload) => {
      state.value = payload.payload;
    },
  },
});

export const { setCurrentPage } = layoutSlice.actions;

export default layoutSlice.reducer;
