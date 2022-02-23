import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBug, IProject } from "../../Interfaces";
import {
  addProjectBug,
  setCurrentProject,
  updateProjectBug,
} from "./projectOverviewActions";

type state = { value: IProject; status: string };

const initialState: state = {
  value: { _id: "", name: "", team: [], issues: [], __v: 0 },
  status: "",
};

export const ProjectOverviewSlice = createSlice({
  name: "CurrentProject",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch project details in terms of issues and team members;
    builder.addCase(setCurrentProject.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(setCurrentProject.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(
      setCurrentProject.fulfilled,
      (state: state, action) => {
        state.value = action.payload.fullProject;
        state.status = "success";
      }
    );
    //Add bug
    builder.addCase(addProjectBug.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(addProjectBug.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(addProjectBug.fulfilled, (state: state, action) => {
      state.value.issues = [...state.value.issues, action.payload.newBug];
      state.status = "success";
    });

    //edit Bug

    builder.addCase(updateProjectBug.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(updateProjectBug.rejected, (state: state) => {
      state.status = "failed";
    });
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
