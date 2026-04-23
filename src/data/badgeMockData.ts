export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  tier: "bronze" | "silver" | "gold" | "platinum";
  unlockedAt?: string; // ISO date string, undefined = locked
  category: "participation" | "winning" | "social" | "special";
  progress?: { current: number; target: number }; // for locked badges
}

export const allBadges: AchievementBadge[] = [
  // Participation
  { id: "b1", name: "First Steps", description: "Register for your first hackathon", icon: "Rocket", tier: "bronze", category: "participation", unlockedAt: "2025-11-10" },
  { id: "b2", name: "Hat Trick", description: "Participate in 3 hackathons", icon: "Repeat", tier: "silver", category: "participation", unlockedAt: "2026-01-15" },
  { id: "b3", name: "Veteran", description: "Participate in 5 hackathons", icon: "Shield", tier: "gold", category: "participation", unlockedAt: "2026-02-20" },
  { id: "b4", name: "Legend", description: "Participate in 10 hackathons", icon: "Crown", tier: "platinum", category: "participation", progress: { current: 5, target: 10 } },

  // Winning
  { id: "b5", name: "First Win", description: "Win your first hackathon", icon: "Trophy", tier: "gold", category: "winning", unlockedAt: "2026-01-20" },
  { id: "b6", name: "Submission Pro", description: "Submit 3 projects", icon: "FileCheck", tier: "silver", category: "winning", unlockedAt: "2026-02-21" },
  { id: "b7", name: "Champion", description: "Win 3 hackathons", icon: "Medal", tier: "platinum", category: "winning", progress: { current: 1, target: 3 } },

  // Social
  { id: "b8", name: "Team Player", description: "Join a team for the first time", icon: "Users", tier: "bronze", category: "social", unlockedAt: "2025-11-10" },
  { id: "b9", name: "Networker", description: "Be part of 3 different teams", icon: "Network", tier: "silver", category: "social", unlockedAt: "2026-02-01" },
  { id: "b10", name: "Mentor's Pick", description: "Get recommended by a mentor", icon: "Star", tier: "gold", category: "social", progress: { current: 0, target: 1 } },

  // Special
  { id: "b11", name: "Early Bird", description: "Register within the first hour of a hackathon going live", icon: "Zap", tier: "silver", category: "special", unlockedAt: "2025-12-05" },
  { id: "b12", name: "Top Contributor", description: "Reach top 10 on the global leaderboard", icon: "TrendingUp", tier: "platinum", category: "special", progress: { current: 15, target: 10 } },
];

export const userBadges = allBadges; // the current participant's badges