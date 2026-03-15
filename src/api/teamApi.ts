import apiClient from './apiClient';

export const teamApi = {
  createTeam: async (hackathonId: string, data: any) => {
    const response = await apiClient.post(`/participant/hackathons/${hackathonId}/teams`, data);
    return response.data;
  },
  getMyTeam: async (hackathonId: string) => {
    const response = await apiClient.get(`/participant/hackathons/${hackathonId}/my-team`);
    return response.data;
  },
  getTeamsByHackathon: async (hackathonId: string) => {
    const response = await apiClient.get(`/hackathons/${hackathonId}/teams`);
    return response.data;
  },
  updateTeam: async (teamId: string, data: any) => {
    const response = await apiClient.put(`/participant/teams/${teamId}`, data);
    return response.data;
  },
  inviteMember: async (teamId: string, email: string) => {
    const response = await apiClient.post(`/participant/teams/${teamId}/invite`, { email });
    return response.data;
  },
  removeMember: async (teamId: string, userId: string) => {
    await apiClient.delete(`/participant/teams/${teamId}/members/${userId}`);
  },
  leaveTeam: async (teamId: string) => {
    await apiClient.post(`/participant/teams/${teamId}/leave`);
  },
  deleteTeam: async (teamId: string) => {
    await apiClient.delete(`/participant/teams/${teamId}`);
  }
};
