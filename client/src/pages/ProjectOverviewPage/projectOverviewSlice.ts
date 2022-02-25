import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  state,
  initialState,
  setStatusLoading,
  setStatusFailed,
  setCurrentProject,
  addProjectBug,
  updateProjectBug,
  addTeamMember,
} from "./projectOverviewActions";

export const ProjectOverviewSlice = createSlice({
  name: "CurrentProject",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch project details i.e. full issues and  full team members (currently only includes id's)
    builder.addCase(setCurrentProject.pending, setStatusLoading);
    builder.addCase(setCurrentProject.rejected, setStatusFailed);
    builder.addCase(
      setCurrentProject.fulfilled,
      (state: state, action) => {
        state.value = action.payload.fullProject;
        state.status = "success";
      }
    );

    //Add bug
    builder.addCase(addProjectBug.pending, setStatusLoading);
    builder.addCase(addProjectBug.rejected, setStatusFailed);
    builder.addCase(addProjectBug.fulfilled, (state: state, action) => {
      state.value.issues = [...state.value.issues, action.payload.newBug];
      state.status = "success";
    });

    //Add team member
    builder.addCase(addTeamMember.pending, setStatusLoading);
    builder.addCase(addTeamMember.rejected, setStatusFailed);
    builder.addCase(addTeamMember.fulfilled, (state: state, action) => {
      state.value.team = action.payload.team;
      state.status = "success";
    });

    //edit Bug
    builder.addCase(updateProjectBug.pending, setStatusLoading);
    builder.addCase(updateProjectBug.rejected, setStatusFailed);
    builder.addCase(updateProjectBug.fulfilled, (state: state, action) => {
      state.value.issues.map((issue) => {
        return issue._id === action.payload.bug._id
          ? action.payload.bug
          : issue;
      });
      state.status = "success";
    });
  },
});

export const projectActions = ProjectOverviewSlice.actions;

export default ProjectOverviewSlice.reducer;
