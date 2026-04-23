import { api, unwrap } from "@/services/api";

export type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type TeamResponse = {
  id: number;
  name: string;
  hackathonId: number;
  hackathon?: { id: number; title: string; startDate: string; endDate: string; status: string };
  leader: { id: number; name: string; email: string };
  members: TeamMember[];
};

export type Invitation = {
  id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  teamId: number;
  teamName: string;
  hackathonId: number;
  hackathonTitle: string;
  createdAt: string;
  invitedBy: { id: number; name: string; email: string };
};

export const teamService = {
  createTeam(hackathonId: string | number, name: string) {
    return api.post(`/api/participant/hackathons/${hackathonId}/teams`, { name }).then((r) => unwrap<TeamResponse>(r.data));
  },
  getTeamsByHackathon(hackathonId: string | number) {
    return api.get(`/api/hackathons/${hackathonId}/teams`).then((r) => unwrap<TeamResponse[]>(r.data));
  },
  getMyTeam(hackathonId: string | number) {
    return api.get(`/api/participant/hackathons/${hackathonId}/my-team`).then((r) => unwrap<TeamResponse>(r.data));
  },
  getTeamById(teamId: string | number) {
    return api.get(`/api/participant/teams/${teamId}`).then((r) => unwrap<TeamResponse>(r.data));
  },
  updateTeam(teamId: string | number, name: string) {
    return api.put(`/api/participant/teams/${teamId}`, { name }).then((r) => unwrap<TeamResponse>(r.data));
  },
  inviteMember(teamId: string | number, email: string) {
    return api.post(`/api/participant/teams/${teamId}/invite`, { email });
  },
  getInvitations() {
    return api.get("/api/participant/invitations").then((r) => unwrap<Invitation[]>(r.data));
  },
  acceptInvitation(id: string | number) {
    return api.post(`/api/participant/invitations/${id}/accept`).then((r) => unwrap<TeamResponse>(r.data));
  },
  rejectInvitation(id: string | number) {
    return api.post(`/api/participant/invitations/${id}/reject`);
  },
};

