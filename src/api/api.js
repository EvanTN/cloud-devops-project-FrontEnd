import axios from "axios";
import { getToken } from "./auth";

const REACT_APP_API_URL =
  process.env.REACT_APP_API_URL || "https://cloud-devops-api.onrender.com";

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Items API --- //
export const fetchItems = async () => {
  const response = await api.get("/items");
  return response.data;
};

export const fetchItemById = async (id) => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};

export const searchItems = async (query, type) => {
  // type = "movie" or "book", optional
  const response = await api.get("/items", { params: { search: query, type } });
  return response.data;
};

// --- User Items API --- //
export const fetchUserItems = async () => {
  const response = await api.get("/user/items");
  return response.data;
};

export const addUserItem = async (itemId) => {
  const response = await api.post("/user/items", { itemId });
  return response.data;
};

export const updateUserItem = async (userItemId, data) => {
  // data = { status, rating, review }
  const response = await api.put(`/user/items/${userItemId}`, data);
  return response.data;
};

export const deleteUserItem = async (userItemId) => {
  const response = await api.delete(`/user/items/${userItemId}`);
  return response.data;
};

export default api;
