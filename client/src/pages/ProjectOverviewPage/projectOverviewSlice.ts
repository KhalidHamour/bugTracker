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
  addRole,
  editRole,
  editTeamMemberRole,
  assignBug,
  deleteBug,
  removeTeamMember,
  deleteRole,
} from "./projectOverviewActions";

export const ProjectOverviewSlice = createSlice({
  name: "CurrentProject",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch project details i.e. full issues and  full team members (currently only includes id's)
    builder.addCase(setCurrentProject.pending, setStatusLoading);
    builder.addCase(setCurrentProject.rejected, setStatusFailed);
    builder.addCase(setCurrentProject.fulfilled, (state: state, action) => {
      state.value = action.payload.fullProject;
      state.status = "success";
    });

    //Add bug
    builder.addCase(addProjectBug.pending, setStatusLoading);
    builder.addCase(addProjectBug.rejected, setStatusFailed);
    builder.addCase(addProjectBug.fulfilled, (state: state, action) => {
      state.value.issues = [...state.value.issues, action.payload.newBug];
      state.status = "success";
    });

    //edit Bug
    builder.addCase(updateProjectBug.pending, setStatusLoading);
    builder.addCase(updateProjectBug.rejected, setStatusFailed);
    builder.addCase(updateProjectBug.fulfilled, (state: state, action) => {
      state.value.issues = state.value.issues.map((issue) => {
        return issue._id === action.payload.bug._id ? action.payload.bug : issue;
      });
      state.status = "success";
    });

    //assign Bug
    builder.addCase(assignBug.pending, setStatusLoading);
    builder.addCase(assignBug.rejected, setStatusFailed);
    builder.addCase(assignBug.fulfilled, (state: state, action) => {
      state.value.issues = state.value.issues.map((bug) => {
        if (bug._id === action.payload.bug._id) {
          return action.payload.bug;
        } else {
          return bug;
        }
      });
      state.status = "success";
    });

    //delete Bug
    builder.addCase(deleteBug.pending, setStatusLoading);
    builder.addCase(deleteBug.rejected, setStatusFailed);
    builder.addCase(deleteBug.fulfilled, (state: state, action) => {
      state.value.issues = state.value.issues.filter((bug) => bug._id !== action.payload.id);
      state.status = "success";
    });

    //Add team member
    builder.addCase(addTeamMember.pending, setStatusLoading);
    builder.addCase(addTeamMember.rejected, setStatusFailed);
    builder.addCase(addTeamMember.fulfilled, (state: state, action) => {
      state.value.team = action.payload.team;
      state.status = "success";
    });

    //delete team member
    builder.addCase(removeTeamMember.pending, setStatusLoading);
    builder.addCase(removeTeamMember.rejected, setStatusFailed);
    builder.addCase(removeTeamMember.fulfilled, (state: state, action) => {
      state.value.team = action.payload.team;
      state.value.issues = action.payload.issues;
      state.status = "success";
    });

    //edit team member Role
    builder.addCase(editTeamMemberRole.pending, setStatusLoading);
    builder.addCase(editTeamMemberRole.rejected, setStatusFailed);
    builder.addCase(editTeamMemberRole.fulfilled, (state: state, action) => {
      state.value.team = action.payload.newTeam;
      state.status = "success";
    });

    //Add team role
    builder.addCase(addRole.pending, setStatusLoading);
    builder.addCase(addRole.rejected, setStatusFailed);
    builder.addCase(addRole.fulfilled, (state: state, action) => {
      state.value.team.roles = action.payload;
      state.status = "success";
    });

    //edit team role
    builder.addCase(editRole.pending, setStatusLoading);
    builder.addCase(editRole.rejected, setStatusFailed);
    builder.addCase(editRole.fulfilled, (state: state, action) => {
      state.value.team = action.payload.team;
      state.status = "success";
    });
    //delete team role
    builder.addCase(deleteRole.pending, setStatusLoading);
    builder.addCase(deleteRole.rejected, setStatusFailed);
    builder.addCase(deleteRole.fulfilled, (state: state, action) => {
      state.value.team = action.payload.team;
      state.status = "success";
    });
  },
});

export const projectActions = ProjectOverviewSlice.actions;

export default ProjectOverviewSlice.reducer;
