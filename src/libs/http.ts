import Axios, { AxiosError } from "axios";
import { API_URL } from "~/config";
import { notify } from "./notify";

function errorInterceptor(error: AxiosError) {
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

axios.interceptors.response.use((response) => response, errorInterceptor);

async function setAccessToken(accessToken: Promise<string | null>) {
  const token = await accessToken;
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
