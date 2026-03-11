export interface DashboardStat {
  label: string;
  value: string | number;
  change: string;
  icon: string;
}

export const dashboardStats: DashboardStat[] = [
  { label: "Total Hackathons", value: 12, change: "+3 this month", icon: "trophy" },
  { label: "Active Now", value: 3, change: "2 ending soon", icon: "zap" },
  { label: "Total Participants", value: 2450, change: "+180 this week", icon: "users" },
  { label: "Submissions", value: 342, change: "+28 today", icon: "file-text" },
];

export const participationTrend = [
  { month: "Aug", participants: 180, teams: 45 },
  { month: "Sep", participants: 320, teams: 80 },
  { month: "Oct", participants: 250, teams: 62 },
  { month: "Nov", participants: 410, teams: 103 },
  { month: "Dec", participants: 380, teams: 95 },
  { month: "Jan", participants: 520, teams: 130 },
  { month: "Feb", participants: 490, teams: 122 },
];

export const domainDistribution = [
  { name: "AI/ML", value: 35 },
  { name: "Web3", value: 20 },
  { name: "HealthTech", value: 18 },
  { name: "FinTech", value: 15 },
  { name: "IoT", value: 12 },
];

export interface OrgHackathon {
  id: string;
  title: string;
  status: "draft" | "open" | "ongoing" | "completed";
  participants: number;
  teams: number;
  startDate: string;
  endDate: string;
}

export const orgHackathons: OrgHackathon[] = [
  { id: "1", title: "AI Innovation Challenge", status: "open", participants: 342, teams: 86, startDate: "2026-03-15", endDate: "2026-03-17" },
  { id: "2", title: "Web3 Builder Sprint", status: "ongoing", participants: 560, teams: 140, startDate: "2026-02-20", endDate: "2026-02-22" },
  { id: "3", title: "HealthTech Innovators", status: "draft", participants: 0, teams: 0, startDate: "2026-05-10", endDate: "2026-05-12" },
  { id: "4", title: "FinTech Disrupt 2025", status: "completed", participants: 890, teams: 223, startDate: "2025-12-01", endDate: "2025-12-03" },
];

// submission management
export interface Submission {
  id: string;
  hackathonId: string;
  teamName: string;
  projectTitle: string;
  description: string;
  members: string[];
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  submittedAt: string;
  scores: {
    innovation: number;
    execution: number;
    design: number;
    impact: number;
  };
  totalScore: number;
  status: "pending" | "reviewed" | "shortlisted" | "winner";
  feedback?: string;
}

export const submissions: Submission[] = [
  {
    id: "s1", hackathonId: "4", teamName: "Neural Ninjas", projectTitle: "AI Health Predictor",
    description: "An ML-powered health risk assessment tool that uses patient data to predict potential conditions early.",
    members: ["Sarvesh", "Devesh", "Krith"], techStack: ["Python", "TensorFlow", "React", "FastAPI"],
    githubUrl: "https://github.com/atsarvesh/evnova", demoUrl: "https://example.com",
    submittedAt: "2025-12-02", scores: { innovation: 9, execution: 8, design: 7, impact: 9 }, totalScore: 33, status: "winner",
    feedback: "Outstanding innovation with real-world healthcare impact. Clean execution."
  },
  {
    id: "s2", hackathonId: "4", teamName: "Code Wizards", projectTitle: "FinBot Advisor",
    description: "Conversational AI assistant for personal finance management and investment recommendations.",
    members: ["Vivek", "Jayesh"], techStack: ["Node.js", "OpenAI", "React", "PostgreSQL"],
    githubUrl: "https://github.com/atsarvesh/evnova", demoUrl: "https://example.com",
    submittedAt: "2025-12-02", scores: { innovation: 8, execution: 9, design: 8, impact: 7 }, totalScore: 32, status: "shortlisted",
    feedback: "Excellent technical execution. Could improve on market differentiation."
  },
  {
    id: "s3", hackathonId: "4", teamName: "Byte Builders", projectTitle: "DeFi Dashboard",
    description: "Unified dashboard for tracking DeFi portfolio performance across multiple chains.",
    members: ["Taylor", "Billie", "Justin", "Katy"], techStack: ["Solidity", "React", "Ethers.js", "The Graph"],
    githubUrl: "https://github.com/atsarvesh/evnova", demoUrl: "https://example.com",
    submittedAt: "2025-12-03", scores: { innovation: 7, execution: 7, design: 9, impact: 6 }, totalScore: 29, status: "reviewed",
    feedback: "Beautiful design. Needs stronger technical innovation."
  },
  {
    id: "s4", hackathonId: "4", teamName: "Pixel Pirates", projectTitle: "EcoTrack",
    description: "Carbon footprint tracker for individuals with gamified sustainability challenges.",
    members: ["Johnson", "Blake"], techStack: ["React Native", "Firebase", "Node.js"],
    githubUrl: "https://github.com/atsarvesh/evnova", demoUrl: "https://example.com",
    submittedAt: "2025-12-03", scores: { innovation: 6, execution: 6, design: 7, impact: 8 }, totalScore: 27, status: "reviewed",
  },
  {
    id: "s5", hackathonId: "4", teamName: "Data Dynamos", projectTitle: "SmartSupply",
    description: "AI-driven supply chain optimization platform for small businesses.",
    members: ["Quinn Martinez", "Riley Thompson", "Sage Brown"], techStack: ["Python", "Flask", "Vue.js", "MongoDB"],
    githubUrl: "https://github.com/atsarvesh/evnova", demoUrl: "https://example.com",
    submittedAt: "2025-12-01", scores: { innovation: 0, execution: 0, design: 0, impact: 0 }, totalScore: 0, status: "pending",
  },
  {
    id: "s6", hackathonId: "2", teamName: "Chain Breakers", projectTitle: "NFT Marketplace",
    description: "Decentralized NFT marketplace with cross-chain bridging and social features.",
    members: ["Sam", "Alex"], techStack: ["Solidity", "React", "IPFS", "Hardhat"],
    githubUrl: "https://github.com/atsarvesh/evnova", demoUrl: "https://example.com",
    submittedAt: "2026-02-21", scores: { innovation: 0, execution: 0, design: 0, impact: 0 }, totalScore: 0, status: "pending",
  },
];