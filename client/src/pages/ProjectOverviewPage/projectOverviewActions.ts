import { createAsyncThunk } from "@reduxjs/toolkit";
import bugServices from "../../api/bugServices";
import projectServices from "../../api/projectServices";
import teamServices from "../../api/teamServices";
import { IProject } from "../../Interfaces";

export type state = { value: IProject; status: string };

export const initialState: state = {
  value: {
    _id: "",
    name: "",
    team: { _id: "", projectId: "", members: [], roles: [] },
    issues: [],
    __v: 0,
  },
  status: "",
};

export const setStatusLoading = (state: state) => {
  state.status = "loading";
};
export const setStatusFailed = (state: state) => {
  state.status = "falied";
};

export const setCurrentProject = createAsyncThunk(
  "projectsOverview/getFullProject",
  async (id: string, thunkAPI) => {
    try {
      const response = await projectServices.fetchFullProject(id);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProjectBug = createAsyncThunk(
  "projectsOverview/addBug",
  async (
    data: {
      bug: { title: string; description: string; creatorId: string };
      projectId: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await bugServices.create(data.bug, data.projectId);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addTeamMember = createAsyncThunk(
  "ProjectOverview/addTeamMember",
  async (data: { email: string; id: string }, thunkAPI) => {
    try {
      const response = await teamServices.addProjectTeamMember(data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProjectBug = createAsyncThunk(
  "projectsOverview/updateBug",
  async (
    data: {
      bug: {
        title?: string;
        description?: string;
        status?: string;
        assignedTo?: string;
      };
      _id: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await bugServices.update(data._id, data.bug);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
