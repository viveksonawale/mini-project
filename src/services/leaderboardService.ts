import { api, unwrap } from "@/services/api";
import type { TeamMember } from "@/services/teamService";

export type LeaderboardEntry = {
  rank: number;
  teamId: number;
  teamName: string;
  score: number;
  members: TeamMember[];
};

export const leaderboardService = {
  getLeaderboard(hackathonId: string | number) {
    return api.get(`/api/hackathons/${hackathonId}/leaderboard`).then((r) => unwrap<LeaderboardEntry[]>(r.data));
  },
};

