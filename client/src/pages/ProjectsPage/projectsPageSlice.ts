import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProject } from "../../Interfaces";
import {
  getUserProjects,
  addProject,
  deleteProject,
  updateProject,
} from "./projectPageActions";

type state = { status: string; value: IProject[] };

const initialState: { status: string; value: IProject[] } = {
  status: "",
  value: [],
};

const ProjectsPageSlice = createSlice({
  name: "Projects",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*fetch projects*/
    builder.addCase(getUserProjects.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(getUserProjects.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(
      getUserProjects.fulfilled,
      (state, action: PayloadAction<{ projects: IProject[] }>) => {
        state.value = action.payload.projects;
        state.status = "success";
      }
    );
    /* add project*/
    builder.addCase(addProject.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(addProject.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(
      addProject.fulfilled,
      (state, action: PayloadAction<IProject>) => {
        state.value.push(action.payload);
        state.status = "success";
      }
    );
    /* delete project*/
    builder.addCase(deleteProject.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(deleteProject.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<{ id: string }>) => {
        state.value = state.value.filter(
          (project) => project._id !== action.payload.id
        );
        state.status = "success";
      }
    );

    /*update project*/
    builder.addCase(updateProject.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(updateProject.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(
      updateProject.fulfilled,
      (
        state: state,
        action: PayloadAction<{ updatedProject: IProject }>
      ) => {
        state.value.map((project) => {});
        //TODO:"complete this"
        state.status = "success";
      }
    );

    /*(reducers/actions) based on project overview slice*/
  },
});

export default ProjectsPageSlice.reducer;
