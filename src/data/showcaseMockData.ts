export interface ShowcaseProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  hackathonTitle: string;
  teamName: string;
  members: string[];
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  thumbnail: string;
  screenshots: string[];
  category: string;
  placement: "winner" | "runner-up" | "honorable-mention" | "participant";
  upvotes: number;
  upvotedByUser: boolean;
  submittedAt: string;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "sp1",
    title: "MediScan AI",
    tagline: "AI-powered medical image analysis for early disease detection",
    description: "MediScan AI leverages deep learning to analyze X-rays, MRIs, and CT scans in real-time, providing preliminary diagnoses with 94% accuracy. Built during the HealthTech Innovators hackathon, the platform integrates with hospital PACS systems and provides explainable AI outputs for clinicians.",
    hackathonTitle: "HealthTech Innovators",
    teamName: "Neural Diagnostics",
    members: ["Dr. Sarah Chen", "Raj Patel", "Maya Johnson"],
    techStack: ["Python", "PyTorch", "React", "FastAPI", "Docker"],
    githubUrl: "https://github.com/neural-diagnostics/mediscan",
    demoUrl: "https://mediscan-demo.vercel.app",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    screenshots: [],
    category: "Healthcare",
    placement: "winner",
    upvotes: 342,
    upvotedByUser: false,
    submittedAt: "2026-01-15",
  },
  {
    id: "sp2",
    title: "ChainVote",
    tagline: "Decentralized, transparent voting on Ethereum L2",
    description: "ChainVote enables tamper-proof elections using zero-knowledge proofs for voter privacy while maintaining full transparency of results. Deployed on Optimism for low gas fees, it supports ranked-choice and quadratic voting mechanisms.",
    hackathonTitle: "Web3 Builder Sprint",
    teamName: "Chain Breakers",
    members: ["Alex Kim", "Sam Participant", "Priya Sharma"],
    techStack: ["Solidity", "React", "Hardhat", "ZK-SNARKs", "The Graph"],
    githubUrl: "https://github.com/chainbreakers/chainvote",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    screenshots: [],
    category: "Web3",
    placement: "runner-up",
    upvotes: 218,
    upvotedByUser: true,
    submittedAt: "2026-02-21",
  },
  {
    id: "sp3",
    title: "EcoTrack",
    tagline: "Personal carbon footprint tracker with actionable insights",
    description: "EcoTrack gamifies sustainability by tracking daily activities, calculating carbon impact, and suggesting eco-friendly alternatives. Features include community challenges, a carbon offset marketplace, and integration with smart home devices.",
    hackathonTitle: "Green Future Hack",
    teamName: "Planet Coders",
    members: ["Luna Martinez", "Kai Nakamura", "Zoe Williams"],
    techStack: ["React Native", "Node.js", "MongoDB", "TensorFlow Lite"],
    githubUrl: "https://github.com/planetcoders/ecotrack",
    demoUrl: "https://ecotrack-app.netlify.app",
    thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=400&fit=crop",
    screenshots: [],
    category: "Sustainability",
    placement: "winner",
    upvotes: 456,
    upvotedByUser: false,
    submittedAt: "2025-11-30",
  },
  {
    id: "sp4",
    title: "StudyBuddy AI",
    tagline: "Adaptive learning companion powered by GPT-4",
    description: "StudyBuddy creates personalized study plans, generates practice questions from lecture notes, and provides Socratic tutoring. It adapts difficulty based on student performance and supports 15+ subjects from high school to graduate level.",
    hackathonTitle: "AI Innovation Challenge",
    teamName: "Neural Ninjas",
    members: ["Sam Participant", "Jamie Lee", "Chris Park"],
    techStack: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Tailwind"],
    githubUrl: "https://github.com/neuralninjas/studybuddy",
    demoUrl: "https://studybuddy-ai.vercel.app",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
    screenshots: [],
    category: "Education",
    placement: "honorable-mention",
    upvotes: 189,
    upvotedByUser: false,
    submittedAt: "2026-01-28",
  },
  {
    id: "sp5",
    title: "SafeRoute",
    tagline: "ML-powered pedestrian safety navigation",
    description: "SafeRoute analyzes crime data, street lighting, and real-time crowd density to suggest the safest walking routes. Features include community-reported hazards, emergency SOS with auto-location sharing, and integration with city infrastructure APIs.",
    hackathonTitle: "Smart Cities Hackathon",
    teamName: "UrbanTech",
    members: ["David Okonkwo", "Aisha Rahman", "Tom Bradley"],
    techStack: ["Python", "React", "MapboxGL", "scikit-learn", "Redis"],
    githubUrl: "https://github.com/urbantech/saferoute",
    thumbnail: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
    screenshots: [],
    category: "Urban Tech",
    placement: "winner",
    upvotes: 523,
    upvotedByUser: false,
    submittedAt: "2025-12-10",
  },
  {
    id: "sp6",
    title: "FarmSense",
    tagline: "IoT crop monitoring with drone-based analysis",
    description: "FarmSense combines soil sensors, weather APIs, and drone imagery to provide actionable farming insights. Predicts optimal harvest times, detects crop diseases early, and reduces water usage by 30% through smart irrigation scheduling.",
    hackathonTitle: "AgriTech Innovation",
    teamName: "Digital Farmers",
    members: ["Grace Mutua", "Liam O'Connor", "Ananya Gupta"],
    techStack: ["Python", "TensorFlow", "React", "MQTT", "InfluxDB"],
    githubUrl: "https://github.com/digitalfarmers/farmsense",
    thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop",
    screenshots: [],
    category: "AgriTech",
    placement: "participant",
    upvotes: 97,
    upvotedByUser: false,
    submittedAt: "2026-02-05",
  },
];

export const showcaseCategories = [
  "All",
  "Healthcare",
  "Web3",
  "Sustainability",
  "Education",
  "Urban Tech",
  "AgriTech",
];