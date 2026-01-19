import axios from "axios";
import { getToken } from "./auth";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "https://cloud-devops-api.onrender.com";


const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchItems = async () => {
  const response = await api.get("/items");
  return response.data;
};

export default api;
