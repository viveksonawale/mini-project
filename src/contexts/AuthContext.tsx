import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { authApi, LoginResponse } from "@/api/authApi";
import { AxiosError } from "axios";

export type UserRole = "ORGANIZER" | "PARTICIPANT" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  selectRole: (role: UserRole) => void;
  quickLogin: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("evnova-user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  const persist = useCallback((data: LoginResponse | null) => {
    if (data) {
      setUser(data.user);
      localStorage.setItem("evnova-user", JSON.stringify(data.user));
      localStorage.setItem("evnova-token", data.accessToken);
    } else {
      setUser(null);
      localStorage.removeItem("evnova-user");
      localStorage.removeItem("evnova-token");
    }
  }, []);

  const logout = useCallback(() => persist(null), [persist]);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("evnova-token");
      if (token) {
        try {
          const userData = await authApi.getMe();
          setUser(userData);
          localStorage.setItem("evnova-user", JSON.stringify(userData));
        } catch (error) {
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [logout]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = await authApi.login({ email, password });
      persist(data);
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string; error?: string }>;
      return { 
        success: false, 
        error: axiosError.response?.data?.message || axiosError.response?.data?.error || "Login failed. Please check your credentials." 
      };
    }
  }, [persist]);

  const signup = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
    try {
      if (!role) throw new Error("Role is required");
      const data = await authApi.signup({ name, email, password, role });
      persist(data);
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string; error?: string }>;
      return { 
        success: false, 
        error: axiosError.response?.data?.message || axiosError.response?.data?.error || "Signup failed. Please try again." 
      };
    }
  }, [persist]);

  const quickLogin = useCallback((role: UserRole) => {
    const dummyUser: User = {
      id: role === "ORGANIZER" ? "org-1" : "part-1",
      name: role === "ORGANIZER" ? "Host User" : "Participant User",
      email: role === "ORGANIZER" ? "host@evnova.com" : "user@evnova.com",
      role: role
    };
    persist({ accessToken: "dummy-token", user: dummyUser });
  }, [persist]);

  const selectRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, role };
      localStorage.setItem("evnova-user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout, selectRole, quickLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
