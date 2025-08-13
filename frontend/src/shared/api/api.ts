import { CONFIG } from "../model/config";
import axios from "axios";
import { sessionManager } from "@/shared/model/session.ts";

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = sessionManager.token;

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      sessionManager.logout()
    }

    return Promise.reject(error);
  },
);

export default api;
