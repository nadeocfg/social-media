import axios, { AxiosRequestConfig } from "axios";

const api = axios;

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = window.localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
