import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      const verifyToken = async () => {
        try {
          const response = await authAPI.verifyToken(token);
          setUser(response.data);
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          setToken(null);
        } finally {
          setLoading(false);
        }
      };
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token: newToken, ...userData } = response.data;

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  // Direct login function for when you already have user data
  const loginWithData = (userData) => {
    setUser(userData);
    setToken(userData.token);
  };

  const register = async (userData, userType) => {
    try {
      const response = await authAPI.register(userData, userType);
      const { token: newToken, ...userInfo } = response.data;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userInfo);

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    loginWithData,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    isEmployer: user?.role === "EMPLOYER",
    isCandidate: user?.role === "CANDIDATE",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
