import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { User } from "../types";

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
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Single effect to initialize and verify user on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Try to verify with stored token
        const response = await axios.get<User>(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(response.data);
      } catch (error) {
        // Token is invalid, try to refresh it
        if (storedRefreshToken) {
          try {
            const refreshResponse = await axios.post<{
              token: string;
              refreshToken: string;
            }>(`${API_BASE_URL}/refresh`, { refreshToken: storedRefreshToken });

            const newToken = refreshResponse.data.token;
            const newRefreshToken = refreshResponse.data.refreshToken;

            localStorage.setItem("token", newToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            setToken(newToken);
            setRefreshToken(newRefreshToken);

            // Verify with new token
            const userResponse = await axios.get<User>(`${API_BASE_URL}/me`, {
              headers: { Authorization: `Bearer ${newToken}` },
            });

            setUser(userResponse.data);
          } catch {
            logoutUser();
          }
        } else {
          logoutUser();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Auto-refresh token interval
  useEffect(() => {
    if (!token || !refreshToken) return;

    const interval = setInterval(() => {
      refreshAuthToken();
    }, 25 * 60 * 1000); // 25 minutes

    return () => clearInterval(interval);
  }, [token, refreshToken]);

  // Login function
  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post<
        User & { accessToken: string; refreshToken: string }
      >(`${API_BASE_URL}/login`, { username, password, expiresInMins: 30 });

      const { accessToken, refreshToken, ...userData } = response.data;

      setToken(token);
      setRefreshToken(refreshToken);
      setUser(userData);

      localStorage.setItem("token", accessToken);
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

  // Refresh token function
  const refreshAuthToken = async () => {
    if (!refreshToken) return;

    try {
      const response = await axios.post<{
        token: string;
        refreshToken: string;
      }>(`${API_BASE_URL}/refresh`, { refreshToken });

      const newToken = response.data.token;
      const newRefreshToken = response.data.refreshToken;

      setToken(newToken);
      setRefreshToken(newRefreshToken);
      localStorage.setItem("token", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    } catch {
      logoutUser();
    }
  };

  // Logout function
  const logoutUser = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const value = {
    user,
    isLoading,
    login,
    logout: logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
