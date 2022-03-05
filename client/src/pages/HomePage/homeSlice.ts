import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserIssues } from "../../Interfaces";
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
    builder.addCase(
      fetchUserAssignedIssues.fulfilled,
      (state: state, action: PayloadAction<{ userBugs: IUserIssues[] }>) => {
        state.status = "success";
        state.userIssues = action.payload.userBugs;
      }
    );
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice.reducer;
