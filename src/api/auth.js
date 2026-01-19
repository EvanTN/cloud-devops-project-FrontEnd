import axios from "axios";

const REACT_APP_API_URL= "https://cloud-devops-api.onrender.com";

// LOGIN
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

  // Save token
  localStorage.setItem("token", response.data.access_token);
  return response.data;
};

// REGISTER
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/auth/register`, { username, password });
    localStorage.setItem("token", response.data.access_token); // save token
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};


// TOKEN HELPERS
export const getToken = () => localStorage.getItem("token");

export const logout = () => localStorage.removeItem("token");
