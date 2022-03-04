import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProject } from "../../Interfaces";
import {
  state,
  initialState,
  setStatusLoading,
  setStatusFailed,
  getUserProjects,
  addProject,
  deleteProject,
  updateProject,
} from "./projectPageActions";

const ProjectsPageSlice = createSlice({
  name: "Projects",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*fetch projects*/
    builder.addCase(getUserProjects.pending, setStatusLoading);
    builder.addCase(getUserProjects.rejected, setStatusFailed);
    builder.addCase(getUserProjects.fulfilled, (state, action: PayloadAction<{ projects: IProject[] }>) => {
      state.value = action.payload.projects;
      state.status = "success";
    });
    /* add project*/
    builder.addCase(addProject.pending, setStatusLoading);
    builder.addCase(addProject.rejected, setStatusFailed);
    builder.addCase(addProject.fulfilled, (state, action: PayloadAction<IProject>) => {
      state.value.push(action.payload);
      state.status = "success";
    });
    /* delete project*/
    builder.addCase(deleteProject.pending, setStatusLoading);
    builder.addCase(deleteProject.rejected, setStatusFailed);
    builder.addCase(deleteProject.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
      state.value = state.value.filter((project) => project._id !== action.payload.id);
      state.status = "success";
    });

    /*update project*/
    builder.addCase(updateProject.pending, setStatusLoading);
    builder.addCase(updateProject.rejected, setStatusFailed);
    builder.addCase(updateProject.fulfilled, (state: state, action: PayloadAction<{ project: IProject }>) => {
      state.value = state.value.map((project) => {
        if (project._id === action.payload.project._id) {
          return action.payload.project;
        } else {
          return project;
        }
      });
      state.status = "success";
    });
  },
});

export default ProjectsPageSlice.reducer;
