import axios from "axios";

// Use env variable if set, fallback to Render backend
const REACT_APP_API_URL =
  process.env.REACT_APP_API_URL || "https://cloud-devops-api.onrender.com";

// ======== LOGIN ========
export const loginUser = async (username, password) => {
  const response = await axios.post(
    `${REACT_APP_API_URL}/auth/login`,
    new URLSearchParams({
      username,
      password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // Save token to localStorage
  localStorage.setItem("token", response.data.access_token);
  return response.data;
};

// ======== REGISTER ========
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${REACT_APP_API_URL}/auth/register`,
      { username, password } // backend now returns token
    );

    // Save token after registration
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// ======== TOKEN HELPERS ========
export const getToken = () => localStorage.getItem("token");

export const logout = () => localStorage.removeItem("token");

// ======== AXIOS INSTANCE ========
// For authorized requests
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

// Example API call
export const fetchItems = async () => {
  const response = await api.get("/items");
  return response.data;
};

export default api;
