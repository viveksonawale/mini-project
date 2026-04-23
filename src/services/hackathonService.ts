import { api, unwrap } from "@/services/api";

export type HackathonStatus = "UPCOMING" | "ACTIVE" | "COMPLETED";

export type HackathonItem = {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  type: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  prizePool: number;
  maxTeamSize: number;
  themes: string[];
  status: HackathonStatus;
  participants: number;
  teams: number;
  organizer?: { id: number; name: string; email: string };
  bannerImageUrl?: string;
};

type PagedHackathons = {
  items: HackathonItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const hackathonService = {
  async getHackathons(params?: { search?: string; status?: string; page?: number; size?: number }) {
    const res = await api.get("/api/hackathons", { params });
    return unwrap<PagedHackathons>(res.data);
  },

  async getHackathonById(id: string | number) {
    const res = await api.get(`/api/hackathons/${id}`);
    return unwrap<HackathonItem>(res.data);
  },

  async createHackathon(payload: Record<string, unknown>) {
    const res = await api.post("/api/hackathons", payload);
    return unwrap<HackathonItem>(res.data);
  },

  async updateHackathon(id: string | number, payload: Record<string, unknown>) {
    const res = await api.put(`/api/hackathons/${id}`, payload);
    return unwrap<HackathonItem>(res.data);
  },

  async deleteHackathon(id: string | number) {
    await api.delete(`/api/hackathons/${id}`);
  },

  async joinHackathon(id: string | number) {
    await api.post(`/api/hackathons/${id}/join`);
  },

  async getMyOrganizedHackathons() {
    const res = await api.get("/api/hackathons/me/organized");
    return unwrap<HackathonItem[]>(res.data);
  },

  async getMyJoinedHackathons() {
    const res = await api.get("/api/hackathons/me/joined");
    return unwrap<HackathonItem[]>(res.data);
  },
};

