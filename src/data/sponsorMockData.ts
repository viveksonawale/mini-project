export interface SponsorBranding {
  logo: string;
  tagline: string;
  website: string;
  primaryColor: string;
  description: string;
}

export interface SponsorEngagement {
  impressions: number;
  clicks: number;
  applications: number;
  mentorSessions: number;
}

export interface SponsoredHackathon {
  id: string;
  name: string;
  date: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
  participants: number;
  impressions: number;
  clicks: number;
  status: "active" | "completed" | "upcoming";
}

export interface SponsorAnalytics {
  monthlyImpressions: { month: string; impressions: number; clicks: number }[];
  tierDistribution: { tier: string; count: number }[];
  topHackathons: { name: string; roi: number }[];
}

export const sponsorBranding: SponsorBranding = {
  logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop",
  tagline: "Empowering the next generation of innovators",
  website: "https://techcorp.example.com",
  primaryColor: "#6366f1",
  description:
    "TechCorp is a leading technology company dedicated to fostering innovation through hackathons, mentorship programs, and developer communities worldwide.",
};

export const sponsorEngagement: SponsorEngagement = {
  impressions: 284500,
  clicks: 18320,
  applications: 4250,
  mentorSessions: 186,
};

export const sponsoredHackathons: SponsoredHackathon[] = [
  { id: "1", name: "AI Innovation Challenge 2025", date: "2025-12-15", tier: "platinum", participants: 1240, impressions: 85000, clicks: 6200, status: "active" },
  { id: "2", name: "Green Tech Hackathon", date: "2025-11-20", tier: "gold", participants: 680, impressions: 42000, clicks: 3100, status: "completed" },
  { id: "3", name: "Web3 Builder Sprint", date: "2025-10-05", tier: "silver", participants: 520, impressions: 31000, clicks: 2400, status: "completed" },
  { id: "4", name: "HealthTech Summit 2026", date: "2026-04-10", tier: "platinum", participants: 0, impressions: 12000, clicks: 890, status: "upcoming" },
  { id: "5", name: "Cybersecurity CTF", date: "2025-09-18", tier: "gold", participants: 390, impressions: 28000, clicks: 1800, status: "completed" },
  { id: "6", name: "EdTech Innovation Lab", date: "2026-05-22", tier: "bronze", participants: 0, impressions: 5500, clicks: 320, status: "upcoming" },
];

export const sponsorAnalytics: SponsorAnalytics = {
  monthlyImpressions: [
    { month: "Sep", impressions: 32000, clicks: 2100 },
    { month: "Oct", impressions: 38000, clicks: 2800 },
    { month: "Nov", impressions: 45000, clicks: 3400 },
    { month: "Dec", impressions: 52000, clicks: 4200 },
    { month: "Jan", impressions: 58000, clicks: 4800 },
    { month: "Feb", impressions: 59500, clicks: 5020 },
  ],
  tierDistribution: [
    { tier: "Platinum", count: 2 },
    { tier: "Gold", count: 2 },
    { tier: "Silver", count: 1 },
    { tier: "Bronze", count: 1 },
  ],
  topHackathons: [
    { name: "AI Innovation Challenge", roi: 340 },
    { name: "Green Tech Hackathon", roi: 280 },
    { name: "Cybersecurity CTF", roi: 220 },
    { name: "Web3 Builder Sprint", roi: 190 },
  ],
};