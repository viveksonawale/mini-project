import apiClient from './apiClient';

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  type: "online" | "offline";
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  venue?: string;
  prizePool: string;
  maxTeamSize: number;
  themes: string[]; // Standardized to themes
  status: "open" | "ongoing" | "completed" | "upcoming" | "live";
  participants: number;
  teams: number;
  organiser: string;
  organizer?: {
    id: number;
    name: string;
    email: string;
  };
  bannerGradient?: string;
  problemStatement?: string;
  goals?: string[];
  rules?: string[];
  timeline?: {
    registrationStart: string;
    registrationEnd: string;
    hackathonStart: string;
    submissionDeadline: string;
  };
  prizes?: {
    position: string;
    amount: string;
    description: string;
  }[];
}

export const hackathonApi = {
  getHackathons: async () => {
    const response = await apiClient.get<Hackathon[]>('/hackathons');
    return response.data;
  },
  getHackathonById: async (id: string) => {
    const response = await apiClient.get<Hackathon>(`/hackathons/${id}`);
    return response.data;
  },
  getOrganizedHackathons: async () => {
    const response = await apiClient.get<Hackathon[]>('/hackathons/me/organized');
    return response.data;
  },
  getJoinedHackathons: async () => {
    const response = await apiClient.get<Hackathon[]>('/hackathons/me/joined');
    return response.data;
  },
  createHackathon: async (data: Partial<Hackathon>) => {
    const response = await apiClient.post<Hackathon>('/hackathons', data);
    return response.data;
  },
  updateHackathon: async (id: string, data: Partial<Hackathon>) => {
    const response = await apiClient.put<Hackathon>(`/hackathons/${id}`, data);
    return response.data;
  },
  deleteHackathon: async (id: string) => {
    await apiClient.delete(`/hackathons/${id}`);
  },
  joinHackathon: async (id: string) => {
    const response = await apiClient.post(`/hackathons/${id}/join`);
    return response.data;
  },
  getLeaderboard: async (hackathonId: string) => {
    const response = await apiClient.get(`/hackathons/${hackathonId}/leaderboard`);
    return response.data;
  }
};
