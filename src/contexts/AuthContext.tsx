import React, { createContext, useContext, useState, useCallback } from "react";

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
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  selectRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Mock user database
const mockUsers: { name: string; email: string; password: string; role: UserRole }[] = [
  { name: "Jayesh", email: "organiser@evnova", password: "password", role: "organiser" },
  { name: "Vivek", email: "participant@evnova", password: "password", role: "participant" },
];

let nextId = 3;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("evnova-user");
    return saved ? JSON.parse(saved) : null;
  });

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem("evnova-user", JSON.stringify(u));
    else localStorage.removeItem("evnova-user");
  };

  const login = useCallback((email: string, password: string) => {
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (!found) return { success: false, error: "Invalid email or password" };
    const u: User = { id: String(mockUsers.indexOf(found) + 1), name: found.name, email: found.email, role: found.role };
    persist(u);
    return { success: true };
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    if (mockUsers.find((u) => u.email === email)) return { success: false, error: "Email already exists" };
    const newUser = { name, email, password, role: null as UserRole };
    mockUsers.push(newUser);
    const u: User = { id: String(nextId++), name, email, role: null };
    persist(u);
    return { success: true };
  }, []);

  const logout = useCallback(() => persist(null), []);

  const selectRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, role };
      localStorage.setItem("evnova-user", JSON.stringify(updated));
      // Also update mock DB
      const found = mockUsers.find((u) => u.email === prev.email);
      if (found) found.role = role;
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, selectRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
