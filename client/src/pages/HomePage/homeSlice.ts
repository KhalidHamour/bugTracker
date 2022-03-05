import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserAssignedIssues, state, initialState } from "./homeSliceActions";

export const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserAssignedIssues.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserAssignedIssues.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(fetchUserAssignedIssues.fulfilled, (state: state, action) => {
      state.status = "success";
      state.issues = action.payload.userBugs;
    });
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice.reducer;
