import { API } from "./apiConfig";

const loginGoogleUser = (
  email: string,
  givenName: string,
  familyName: string,
  imageUrl: string,
  name: string,
  googleId: string,
  token: string
) =>
  API.request({
    method: "post",
    url: `/users/fetchGoogleUser`,
    data: {
      email: email,
      givenName: givenName,
      familyName: familyName,
      imageUrl: imageUrl,
      name: name,
      _id: googleId,
      token: token,
    },
  });

const emailLogin = (data: { email: string; password: string }) =>
  API.request({
    method: "post",
    url: `/users/emailLogin`,
    data: { data },
  });

const emailSignUp = (data: {
  firstName: string;
  familyName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) =>
  API.request({
    method: "post",
    url: `/users/emailSignUp`,
    data: { data },
  });

const userServices = {
  loginGoogleUser,
  emailLogin,
  emailSignUp,
};

export default userServices;
