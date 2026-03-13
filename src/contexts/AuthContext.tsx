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
  quickLogin: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("evnova-user");
    return saved ? JSON.parse(saved) : null;
  });

  const persist = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("evnova-user", JSON.stringify(u));
    } else {
      localStorage.removeItem("evnova-user");
    }
  };

  const login = useCallback((email: string, _password: string) => {
    // Basic validation
    if (!email) return { success: false, error: "Email is required" };
    
    // Dummy login: accept anything
    const name = email.split('@')[0];
    const dummyUser: User = { 
      id: Math.random().toString(36).substr(2, 9), 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      email: email, 
      role: email.includes('host') ? 'organiser' : 'participant' 
    };
    persist(dummyUser);
    return { success: true };
  }, []);

  const signup = useCallback((name: string, email: string, _password: string) => {
    if (!email || !name) return { success: false, error: "Name and email are required" };
    
    const dummyUser: User = { 
      id: Math.random().toString(36).substr(2, 9), 
      name, 
      email, 
      role: null 
    };
    persist(dummyUser);
    return { success: true };
  }, []);

  const quickLogin = useCallback((role: UserRole) => {
    const dummyUser: User = {
      id: role === "organiser" ? "org-1" : "part-1",
      name: role === "organiser" ? "Host User" : "Participant User",
      email: role === "organiser" ? "host@evnova.com" : "user@evnova.com",
      role: role
    };
    persist(dummyUser);
  }, []);

  const logout = useCallback(() => persist(null), []);

  const selectRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, role };
      localStorage.setItem("evnova-user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, selectRole, quickLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
