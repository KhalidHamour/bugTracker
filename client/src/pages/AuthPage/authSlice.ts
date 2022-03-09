import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject, IUser } from "../../Interfaces";
import { addProject, deleteProject } from "../ProjectsPage/projectPageActions";
import { emailLogin, emailSignUp, loginWithGoogle, logout } from "./authSliceActions";

export const blankProfile = {
  profile: {
    imageUrl: "",
    email: "",
    name: "",
    projects: [],
    _id: "",
    __v: 0,
  },
  token: "",
};

export type state = {
  status: string;
  profile: IUser;
  token: string;
};

const localprofile = localStorage.getItem("profile");

export const initialState: state = localprofile ? JSON.parse(localprofile) : { ...blankProfile, status: "" };

export const AuthSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: { logout },
  extraReducers: (builder) => {
    builder.addCase(loginWithGoogle.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(loginWithGoogle.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(loginWithGoogle.fulfilled, (state: state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload.profile;
      state.token = action.payload.token;
    });

    builder.addCase(emailLogin.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(emailLogin.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(emailLogin.fulfilled, (state: state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload.profile;
      state.token = action.payload.token;
    });
    builder.addCase(emailSignUp.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(emailSignUp.rejected, (state: state) => {
      state.status = "failed";
    });
    builder.addCase(emailSignUp.fulfilled, (state: state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload.profile;
      state.token = action.payload.token;
    });

    //appends added project to state and updates localstorage profile
    builder.addCase(addProject.fulfilled, (state: state, action: PayloadAction<IProject>) => {
      state.profile.projects.push(action.payload._id);
      localStorage.setItem("profile", JSON.stringify({ profile: state.profile, token: state.token }));
    });
    builder.addCase(deleteProject.fulfilled, (state: state, action: PayloadAction<{ id: string }>) => {
      state.profile.projects = state.profile.projects.filter((project) => project !== action.payload.id);
      localStorage.setItem("profile", JSON.stringify({ profile: state.profile, token: state.token }));
    });
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
