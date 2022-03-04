import { createAsyncThunk } from "@reduxjs/toolkit";
import bugServices from "../../api/bugServices";
import projectServices from "../../api/projectServices";
import teamServices from "../../api/teamServices";
import { IProject, IRole } from "../../Interfaces";

export type state = { value: IProject; status: string };

export const initialState: state = {
  value: {
    _id: "",
    creator: "",
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

export const addRole = createAsyncThunk(
  "ProjectOverview/addRole",
  async (data: { projectId: string; roleName: string }, thunkAPI) => {
    try {
      const response = await teamServices.addRole(data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editRole = createAsyncThunk(
  "ProjectOverview/editRole",
  async (data: { projectId: string; role: IRole }, thunkAPI) => {
    try {
      const response = await teamServices.editRole(data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "ProjectOverview/deleteRole",
  async (data: { projectId: string; roleId: string }, thunkAPI) => {
    try {
      const response = await teamServices.deleteRole(data);

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

export const editTeamMemberRole = createAsyncThunk(
  "ProjectOverview/editTeamMemberRole",
  async (data: { teamId: string; memberId: string; newRoleName: string }, thunkAPI) => {
    try {
      const response = await teamServices.editTeamMemberRole(data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeTeamMember = createAsyncThunk(
  "ProjectOverview/removeTeamMember",
  async (data: { projectId: string; userId: string }, thunkAPI) => {
    try {
      const response = await teamServices.removeTeamMember(data);

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
        assignedTo?: string[];
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
export const assignBug = createAsyncThunk(
  "projectsOverview/assignBug",
  async (
    data: {
      bugId: string;
      userIds: string[];
    },
    thunkAPI
  ) => {
    try {
      const response = await bugServices.assignBug(data.bugId, data.userIds);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteBug = createAsyncThunk(
  "projectsOverview/deleteBug",
  async (
    data: {
      bugId: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await bugServices.deleteBug(data.bugId);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
