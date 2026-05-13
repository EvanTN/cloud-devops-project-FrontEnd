import axios from "axios";
import { getToken } from "./auth";

const REACT_APP_API_URL =
  process.env.REACT_APP_API_URL || "https://cloud-devops-api.onrender.com";

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const searchItems = async (query, type = "all") => {
  const response = await api.get("/search", {
    params: { query, type },
  });

  return response.data;
};

export const fetchItemById = async (externalId) => {
  const response = await api.get(`/items/${externalId}`);
  return response.data;
};

export const fetchUserItems = async () => {
  const response = await api.get("/user/items");
  return response.data;
};

export const addUserItem = async (item) => {
  const response = await api.post("/user/items", {
    external_id: item.externalId || item.external_id || item.id,
    title: item.title || item.name,
    description: item.description || "",
    type: item.type || item.media_type,
    poster_url: item.posterUrl || item.poster_url || "",
  });

  return response.data;
};

export const updateUserItem = async (userItemId, data) => {
  const response = await api.put(`/user/items/${userItemId}`, data);
  return response.data;
};

export const deleteUserItem = async (userItemId) => {
  const response = await api.delete(`/user/items/${userItemId}`);
  return response.data;
};

export default api;