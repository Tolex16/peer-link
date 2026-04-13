import axios from "axios";

// Create a base Axios instance
const instance = axios.create({
  baseURL: "/api/v1",
  timeout: 10000, // Optional: prevent hanging requests
  //withCredentials: true, // ✅ this enables sending cookies/token securely
});

// Request Interceptor: Add token to headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle auth errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Handle unauthorized token (e.g., expired, invalid)
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      //window.location.href = "/unauthorized"; // Redirect to login
      // Instead of forcing logout here
      console.warn("Unauthorized request:", error.config.url);
    }
    return Promise.reject(error);
  }
);

export default instance;
