import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../Interfaces";
import { loginWithGoogle, logout } from "./authSliceActions";

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

export const initialState: state = localprofile
  ? JSON.parse(localprofile)
  : { ...blankProfile, status: "" };

export const AuthSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: { logout },
  extraReducers: (builder) => {
    builder.addCase(loginWithGoogle.pending, (state: state) => {
      state.status = "loading";
    });
    builder.addCase(loginWithGoogle.fulfilled, (state: state, action) => {
      state.status = "fulfilled";
      state.profile = action.payload.profile;
      state.token = action.payload.token;
    });
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
