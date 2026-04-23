import { api, unwrap } from "@/services/api";
import type { TeamMember } from "@/services/teamService";

export type Submission = {
  id: number;
  teamId: number;
  teamName: string;
  hackathonId: number;
  leader?: { id: number; name: string; email: string };
  members?: TeamMember[];
  projectName: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  presentationUrl?: string;
  submittedAt: string;
  score: number;
};

export const submissionService = {
  createSubmission(hackathonId: string | number, payload: Record<string, unknown>) {
    return api.post(`/api/participant/hackathons/${hackathonId}/submissions`, payload).then((r) => unwrap<Submission>(r.data));
  },
  updateSubmission(submissionId: string | number, payload: Record<string, unknown>) {
    return api.put(`/api/participant/submissions/${submissionId}`, payload).then((r) => unwrap<Submission>(r.data));
  },
  getMySubmission(hackathonId: string | number) {
    return api.get(`/api/participant/hackathons/${hackathonId}/my-submission`).then((r) => unwrap<Submission>(r.data));
  },
  getHackathonSubmissions(hackathonId: string | number) {
    return api.get(`/api/organizer/hackathons/${hackathonId}/submissions`).then((r) => unwrap<Submission[]>(r.data));
  },
  getSubmissionDetail(submissionId: string | number) {
    return api.get(`/api/organizer/submissions/${submissionId}`).then((r) => unwrap<Submission>(r.data));
  },
  scoreSubmission(submissionId: string | number, score: number) {
    return api.post(`/api/organizer/submissions/${submissionId}/score`, null, { params: { score } });
  },
};

