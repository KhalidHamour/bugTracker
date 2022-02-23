import { createAsyncThunk } from "@reduxjs/toolkit";
import bugServices from "../../api/bugServices";
import projectServices from "../../api/projectServices";

export const setCurrentProject = createAsyncThunk(
  "projectsOverview/getFullProject",
  async (id: string, thunkAPI) => {
    try {
      const response = await projectServices.fetchFullProject(id);

      return response.data;
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
  }
);
