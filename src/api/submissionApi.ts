import apiClient from './apiClient';

export const submissionApi = {
  submitProject: async (hackathonId: string, data: any) => {
    const response = await apiClient.post(`/participant/hackathons/${hackathonId}/submissions`, data);
    return response.data;
  },
  updateSubmission: async (submissionId: string, data: any) => {
    const response = await apiClient.put(`/participant/submissions/${submissionId}`, data);
    return response.data;
  },
  getSubmissionsByHackathon: async (hackathonId: string) => {
    const response = await apiClient.get(`/organizer/hackathons/${hackathonId}/submissions`);
    return response.data;
  },
  scoreSubmission: async (submissionId: string, score: number) => {
    const response = await apiClient.post(`/organizer/submissions/${submissionId}/score`, { score });
    return response.data;
  }
};
