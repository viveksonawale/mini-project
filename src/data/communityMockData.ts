export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  role: "participant" | "organiser";
  hackathonTitle?: string;
  hackathonId?: string;
  title: string;
  description: string;
  skillsNeeded: string[];
  teamSize: { current: number; max: number };
  postedAt: string;
  responses: number;
  isUrgent?: boolean;
}

export interface CommunityProfile {
  id: string;
  name: string;
  avatar: string;
  college: string;
  skills: string[];
  hackathonsJoined: number;
  wins: number;
  bio: string;
  available: boolean;
}

export interface ConnectionRequest {
  id: string;
  from: CommunityProfile;
  postId: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  sentAt: string;
}

export const communityPosts: CommunityPost[] = [
  {
    id: "cp1", author: "Jayesh", avatar: "J", role: "participant",
    hackathonTitle: "AI Innovation Challenge", hackathonId: "1",
    title: "Looking for ML Engineer & Backend Dev",
    description: "Building an AI-powered health diagnostic tool. Need someone strong in TensorFlow/PyTorch and a backend dev familiar with FastAPI or Flask. We already have a solid frontend person.",
    skillsNeeded: ["Python", "TensorFlow", "FastAPI"],
    teamSize: { current: 2, max: 4 }, postedAt: "2h ago", responses: 3,
  },
  {
    id: "cp2", author: "Tanishq", avatar: "T", role: "participant",
    hackathonTitle: "Web3 Builder Sprint", hackathonId: "3",
    title: "Need a React + Solidity dev for DeFi project",
    description: "Working on a cross-chain yield aggregator. Looking for someone who can bridge frontend and smart contracts. Experience with Hardhat and ethers.js preferred.",
    skillsNeeded: ["Solidity", "React", "Ethers.js"],
    teamSize: { current: 1, max: 3 }, postedAt: "5h ago", responses: 7, isUrgent: true,
  },
  {
    id: "cp3", author: "Moksh", avatar: "M", role: "participant",
    hackathonTitle: "HealthTech Innovators", hackathonId: "4",
    title: "UI/UX Designer needed for health app",
    description: "We're building a telemedicine platform with video calls and prescription management. Need a designer who can create intuitive patient-facing flows.",
    skillsNeeded: ["Figma", "UI/UX", "Prototyping"],
    teamSize: { current: 3, max: 5 }, postedAt: "1d ago", responses: 2,
  },
  {
    id: "cp4", author: "Amanat", avatar: "A", role: "participant",
    title: "Full-stack dev looking for a team!",
    description: "I'm a full-stack developer with 3 years of experience in React, Node.js, and PostgreSQL. Open to any interesting hackathon — especially AI/ML or FinTech themed ones.",
    skillsNeeded: ["React", "Node.js", "PostgreSQL"],
    teamSize: { current: 1, max: 4 }, postedAt: "3h ago", responses: 5,
  },
  {
    id: "cp5", author: "Chetan", avatar: "C", role: "participant",
    hackathonTitle: "Green Tech Hackathon", hackathonId: "2",
    title: "Sustainability project needs data scientist",
    description: "We're building a carbon footprint calculator for supply chains. Need someone comfortable with data analysis, ML models, and visualization dashboards.",
    skillsNeeded: ["Python", "Data Science", "D3.js"],
    teamSize: { current: 2, max: 4 }, postedAt: "8h ago", responses: 1,
  },
  {
    id: "cp6", author: "Robin", avatar: "R", role: "participant",
    title: "Mobile developer seeking hackathon team",
    description: "Experienced in React Native and Flutter. Looking for a team working on something impactful — health, education, or sustainability preferred.",
    skillsNeeded: ["React Native", "Flutter", "Firebase"],
    teamSize: { current: 1, max: 3 }, postedAt: "12h ago", responses: 4,
  },
];

export const communityProfiles: CommunityProfile[] = [
  { id: "u1", name: "Jordan Rivera", avatar: "J", college: "MIT", skills: ["UI/UX", "Figma", "React", "TypeScript"], hackathonsJoined: 8, wins: 2, bio: "Design-focused developer. Love creating intuitive interfaces.", available: true },
  { id: "u2", name: "Taylor Chen", avatar: "T", college: "Stanford", skills: ["Python", "ML", "TensorFlow", "Data Science"], hackathonsJoined: 12, wins: 3, bio: "ML engineer passionate about NLP and computer vision.", available: true },
  { id: "u3", name: "Morgan Davis", avatar: "M", college: "CMU", skills: ["Node.js", "React", "PostgreSQL", "AWS"], hackathonsJoined: 6, wins: 1, bio: "Full-stack developer. Cloud infrastructure enthusiast.", available: false },
  { id: "u4", name: "Alex Kim", avatar: "A", college: "Georgia Tech", skills: ["Solidity", "React", "Ethers.js", "Hardhat"], hackathonsJoined: 10, wins: 2, bio: "Web3 builder. Smart contracts and DeFi protocols.", available: true },
  { id: "u5", name: "Casey Lee", avatar: "C", college: "UC Berkeley", skills: ["Python", "Flask", "D3.js", "Pandas"], hackathonsJoined: 5, wins: 0, bio: "Data scientist exploring sustainability tech.", available: true },
  { id: "u6", name: "Robin Patel", avatar: "R", college: "IIT Bombay", skills: ["React Native", "Flutter", "Firebase", "Kotlin"], hackathonsJoined: 7, wins: 1, bio: "Mobile-first developer. Cross-platform apps.", available: true },
  { id: "u7", name: "Avery Johnson", avatar: "AJ", college: "Harvard", skills: ["Python", "Django", "React", "Docker"], hackathonsJoined: 4, wins: 0, bio: "Backend dev. APIs and microservices.", available: true },
  { id: "u8", name: "Quinn Martinez", avatar: "Q", college: "Caltech", skills: ["Rust", "Go", "Kubernetes", "Systems"], hackathonsJoined: 9, wins: 2, bio: "Systems programmer. Performance-first.", available: false },
];

export const connectionRequests: ConnectionRequest[] = [
  { id: "cr1", from: communityProfiles[0], postId: "cp2", message: "I'd love to join your DeFi project! I have React experience and can pick up Solidity fast.", status: "pending", sentAt: "1h ago" },
  { id: "cr2", from: communityProfiles[4], postId: "cp1", message: "Data science background — I can help with ML model training and evaluation.", status: "pending", sentAt: "3h ago" },
  { id: "cr3", from: communityProfiles[5], postId: "cp3", message: "I can contribute mobile development for the health app!", status: "accepted", sentAt: "1d ago" },
];

export const allSkillTags = [
  "React", "Python", "Node.js", "TensorFlow", "Solidity", "Figma", "UI/UX",
  "TypeScript", "Flutter", "Firebase", "PostgreSQL", "Docker", "AWS",
  "ML", "Data Science", "D3.js", "FastAPI", "Go", "Rust", "React Native",
  "Ethers.js", "Hardhat", "Kubernetes", "Django",
];