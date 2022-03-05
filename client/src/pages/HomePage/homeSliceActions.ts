import { createAsyncThunk } from "@reduxjs/toolkit";
import bugServices from "../../api/bugServices";
import { IUserIssues } from "../../Interfaces";

export type state = {
  userIssues: IUserIssues[];
  status: string;
};

export const initialState: state = {
  userIssues: [],
  status: "",
};

export const fetchUserAssignedIssues = createAsyncThunk(
  "home/fetchUserIssues",
  async (data: { projectIds: string[]; userId: string }, thunkAPI) => {
    try {
      const response = await bugServices.fetchUserBugs(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
