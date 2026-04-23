import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { authService, type BackendRole } from "@/services/authService";
import { tokenStorage } from "@/services/api";

export type UserRole = "organiser" | "participant" | null;

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
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  selectRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("evnova-user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem("evnova-user", JSON.stringify(u));
    else localStorage.removeItem("evnova-user");
  };

  const mapRole = (role: BackendRole): UserRole => (role === "ORGANIZER" ? "organiser" : "participant");

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await authService.login(email, password);
      const u: User = { id: String(res.user.id), name: res.user.name, email: res.user.email, role: mapRole(res.user.role) };
      persist(u);
      return { success: true };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : "Login failed" };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const backendRole: BackendRole = role === "organiser" ? "ORGANIZER" : "PARTICIPANT";
      const res = await authService.signup(name, email, password, backendRole);
      const u: User = { id: String(res.user.id), name: res.user.name, email: res.user.email, role: mapRole(res.user.role) };
      persist(u);
      return { success: true };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : "Signup failed" };
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    persist(null);
  }, []);

  const selectRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, role };
      localStorage.setItem("evnova-user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const token = tokenStorage.get();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const current = await authService.me();
        persist({ id: String(current.id), name: current.name, email: current.email, role: mapRole(current.role) });
      } catch {
        authService.logout();
        persist(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout, selectRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
