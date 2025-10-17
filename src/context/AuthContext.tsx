import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// User Interface
interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = "https://dummyjson.com/auth";

// Auth Provider Context
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verify user token on first load
  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const response = await axios.get<User>(`${API_BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch {
          logout();
        }
      }
      setIsLoading(false);
    };
    verifyUser();
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (refreshToken) refreshAuthToken();
    }, 25 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshToken]);

  // Login function
  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post<
        User & { token: string; refreshToken: string }
      >(`${API_BASE_URL}/login`, { username, password, expiresInMins: 30 });
      const { token, refreshToken, ...userData } = response.data;

      setToken(token);
      setRefreshToken(refreshToken);
      setUser(userData);

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/dashboard/users");
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Invalid credentials",
      };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.clear();
    navigate("/");
  };

  // Refresh token function
  const refreshAuthToken = async () => {
    if (!refreshToken) return;
    try {
      const response = await axios.post<{
        token: string;
        refreshToken: string;
      }>(
        `${API_BASE_URL}/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );
      setToken(response.data.token);
      setRefreshToken(response.data.refreshToken);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch {
      logout();
    }
  };

  const value = { user, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for easy access to the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
