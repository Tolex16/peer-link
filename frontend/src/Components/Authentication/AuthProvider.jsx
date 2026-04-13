// src/context/AuthProvider.js
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // ✅ now navigate is defined
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  };

  // Sync with localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && !isTokenExpired(storedToken) && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      // ❌ remove this: logout();
      // ✅ just clear without navigating
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      if (token) {
        const response = await axios.post("/user/logout");
        toast.success(response.data || "Logged out successfully");
      }
    } catch (error) {
      console.warn(
        "Server logout failed:",
        error?.response?.data || error.message
      );
      toast.success("Logged out successfully"); // ✅ fallback success toast
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  const isAuthenticated = !!token && !isTokenExpired(token);

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
