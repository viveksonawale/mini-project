import { api, tokenStorage, unwrap } from "@/services/api";

export type BackendRole = "PARTICIPANT" | "ORGANIZER";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: BackendRole;
};

type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export const authService = {
  async login(email: string, password: string) {
    const res = await api.post("/api/auth/login", { email, password });
    const data = unwrap<AuthResponse>(res.data);
    tokenStorage.set(data.accessToken);
    return data;
  },

  async signup(name: string, email: string, password: string, role: BackendRole) {
    const res = await api.post("/api/auth/signup", { name, email, password, role });
    const data = unwrap<AuthResponse>(res.data);
    tokenStorage.set(data.accessToken);
    return data;
  },

  async me() {
    const res = await api.get("/api/auth/me");
    return unwrap<AuthUser>(res.data);
  },

  logout() {
    tokenStorage.clear();
    localStorage.removeItem("evnova-user");
  },
};

