import { api, unwrap } from "@/services/api";
import type { AuthUser } from "@/services/authService";

export const userService = {
  getMe() {
    return api.get("/api/users/me").then((r) => unwrap<AuthUser>(r.data));
  },
  updateMe(payload: { name?: string }) {
    return api.patch("/api/users/me", payload).then((r) => unwrap<AuthUser>(r.data));
  },
};

