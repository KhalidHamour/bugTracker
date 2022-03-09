import axios, { AxiosRequestConfig } from "axios";

export const base_Url =
  process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"
    ? process.env.REACT_APP_BASE_URL_DEVELOPMENT
    : process.env.REACT_APP_BASE_URL_PRODUCTION;

export const API = axios.create({
  baseURL: base_Url,
  headers: {},
});

API.interceptors.request.use(async (config: AxiosRequestConfig) => {
  let profile = localStorage.getItem("profile");
  if (profile !== null) {
    let { token } = JSON.parse(profile);
    if (config.headers === undefined) {
      config.headers = {
        authorization: token,
      };
    } else {
      config.headers.authorization = token;
    }
  }
  return config;
});
