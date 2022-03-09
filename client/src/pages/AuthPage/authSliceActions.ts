import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../Interfaces";

import userServices from "../../api/userServices";
import { blankProfile, state } from "./authSlice";

type loginWithGoogleReturn = { profile: IUser; token: string };
type loginWithGoogleInput = {
  profile: {
    email: string;
    givenName: string;
    familyName: string;
    imageUrl: string;
    name: string;
    googleId: string;
  };
  token: string;
};

export const loginWithGoogle = createAsyncThunk<loginWithGoogleReturn, loginWithGoogleInput>(
  "auth/loginWithGoogle",
  async (user, thunkAPI) => {
    const { email, givenName, familyName, imageUrl, name, googleId } = user.profile;
    try {
      const response = await userServices.loginGoogleUser(
        email,
        givenName,
        familyName,
        imageUrl,
        name,
        googleId,
        user.token
      );
      localStorage.setItem("profile", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const emailLogin = createAsyncThunk(
  "auth/emailLogin",
  async (data: { email: string; password: string }) => {
    try {
      const response = await userServices.emailLogin(data);
      localStorage.setItem("profile", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const emailSignUp = createAsyncThunk(
  "auth/emailSignUp",
  async (data: {
    firstName: string;
    familyName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await userServices.emailSignUp(data);
      localStorage.setItem("profile", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = (state: state) => {
  localStorage.clear();
  const { profile, token } = blankProfile;

  state.profile = profile;
  state.token = token;
  state.status = "";
};
