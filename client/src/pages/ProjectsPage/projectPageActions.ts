import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProject } from "../../Interfaces";
import projectServices from "../../api/projectServices";

export type state = { status: string; value: IProject[] };

export const initialState: { status: string; value: IProject[] } = {
  status: "",
  value: [],
};

export const setStatusLoading = (state: state) => {
  state.status = "loading";
};
export const setStatusFailed = (state: state) => {
  state.status = "falied";
};

export const getUserProjects = createAsyncThunk("projects/getProjects", async (ids: string[], thunkAPI) => {
  try {
    const response = await projectServices.fetchUserProjects(ids);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (data: { projectName: string; creatorId: string }, thunkAPI) => {
    try {
      const response = await projectServices.createNewProject(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProject = createAsyncThunk("projects/deleteProject", async (id: string, thunkAPI) => {
  try {
    const response = await projectServices.remove(id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (data: { projectId: string; name: string }, thunkAPI) => {
    try {
      const response = await projectServices.update(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
