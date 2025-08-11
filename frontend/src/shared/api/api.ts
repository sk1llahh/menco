import { CONFIG } from "../model/config";
import axios from "axios";
import localforage from "localforage";
import {CONSTANT} from "@/shared/model/const.ts";

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = await localforage.getItem(CONSTANT.TOKEN)

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
