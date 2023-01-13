import Axios, { AxiosError, AxiosHeaders } from "axios";
import { API_URL } from "~/config";
import { getAccessToken } from "~/libs/auth";
import { notify } from "./notify";

async function errorInterceptor(error: AxiosError) {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    notify.error({
      title: "Error",
      message: "Please check your internet connection",
    });
  }

  return Promise.reject(error);
}

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
});

axios.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    const headers = config.headers as AxiosHeaders;
    headers.set("Authorization", `Bearer ${token}`);

    config.headers = headers;
  }

  return config;
});

axios.interceptors.response.use((response) => response, errorInterceptor);

async function setAccessToken(accessTokenFn: () => Promise<string | null>) {
  const token = await accessTokenFn();
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAccessToken,
};
