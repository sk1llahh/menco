import { CONFIG } from "../model/config";
import axios from "axios";

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

export default api;
