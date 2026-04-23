export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  domains: string[];
  skills: string[];
  bio: string;
  rating: number;
  sessionsCompleted: number;
  availability: "available" | "busy" | "offline";
  linkedIn?: string;
}

export interface MentorRequest {
  id: string;
  participantName: string;
  participantAvatar: string;
  mentorId: string;
  domain: string;
  skills: string[];
  message: string;
  status: "pending" | "accepted" | "declined" | "completed";
  requestedAt: string;
  hackathonTitle?: string;
}

export const mentors: Mentor[] = [
  {
    id: "m1",
    name: "Dr. Priya Sharma",
    avatar: "P",
    title: "AI Research Lead",
    company: "DeepMind",
    domains: ["AI/ML", "Computer Vision"],
    skills: ["Python", "TensorFlow", "PyTorch", "Research"],
    bio: "10+ years in AI research with published papers in NeurIPS and ICML. Passionate about mentoring the next generation of ML engineers.",
    rating: 4.9,
    sessionsCompleted: 47,
    availability: "available",
  },
  {
    id: "m2",
    name: "Marcus Johnson",
    avatar: "M",
    title: "Senior Blockchain Dev",
    company: "Chainlink Labs",
    domains: ["Web3", "DeFi"],
    skills: ["Solidity", "Rust", "Smart Contracts", "DeFi Protocols"],
    bio: "Building decentralized systems since 2017. Core contributor to multiple open-source blockchain projects.",
    rating: 4.7,
    sessionsCompleted: 32,
    availability: "available",
  },
  {
    id: "m3",
    name: "Sarah Kim",
    avatar: "S",
    title: "Staff Engineer",
    company: "Stripe",
    domains: ["FinTech", "Backend"],
    skills: ["Go", "Microservices", "System Design", "APIs"],
    bio: "Specializing in payment infrastructure and high-availability distributed systems at scale.",
    rating: 4.8,
    sessionsCompleted: 55,
    availability: "busy",
  },
  {
    id: "m4",
    name: "Raj Patel",
    avatar: "R",
    title: "Design Director",
    company: "Figma",
    domains: ["UI/UX", "Product Design"],
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    bio: "Award-winning designer focused on creating intuitive, accessible digital experiences.",
    rating: 4.9,
    sessionsCompleted: 63,
    availability: "available",
  },
  {
    id: "m5",
    name: "Elena Rodriguez",
    avatar: "E",
    title: "DevOps Lead",
    company: "HashiCorp",
    domains: ["DevOps", "Cloud"],
    skills: ["Kubernetes", "Terraform", "AWS", "CI/CD"],
    bio: "Infrastructure automation enthusiast. Helping teams ship faster with robust DevOps practices.",
    rating: 4.6,
    sessionsCompleted: 28,
    availability: "offline",
  },
  {
    id: "m6",
    name: "Alex Chen",
    avatar: "A",
    title: "Full-Stack Lead",
    company: "Vercel",
    domains: ["Frontend", "Full-Stack"],
    skills: ["React", "Next.js", "TypeScript", "Node.js"],
    bio: "Open-source contributor and full-stack expert. Love helping teams build beautiful, performant web apps.",
    rating: 4.8,
    sessionsCompleted: 41,
    availability: "available",
  },
];

export const mentorRequests: MentorRequest[] = [
  {
    id: "mr1",
    participantName: "Sam Participant",
    participantAvatar: "S",
    mentorId: "m1",
    domain: "AI/ML",
    skills: ["TensorFlow", "Python"],
    message: "Working on a medical image classification project for AI Innovation Challenge. Need guidance on model architecture.",
    status: "pending",
    requestedAt: "2026-03-08",
    hackathonTitle: "AI Innovation Challenge",
  },
  {
    id: "mr2",
    participantName: "Jamie Lee",
    participantAvatar: "J",
    mentorId: "m1",
    domain: "Computer Vision",
    skills: ["PyTorch", "OpenCV"],
    message: "Building a real-time object detection system. Would love advice on optimizing inference speed.",
    status: "accepted",
    requestedAt: "2026-03-05",
    hackathonTitle: "AI Innovation Challenge",
  },
  {
    id: "mr3",
    participantName: "Chris Park",
    participantAvatar: "C",
    mentorId: "m2",
    domain: "Web3",
    skills: ["Solidity", "React"],
    message: "First time building a DeFi protocol. Need help with smart contract security patterns.",
    status: "pending",
    requestedAt: "2026-03-07",
    hackathonTitle: "Web3 Builder Sprint",
  },
];

export const allDomains = ["AI/ML", "Web3", "FinTech", "UI/UX", "DevOps", "Cloud", "Frontend", "Full-Stack", "Backend", "Computer Vision", "DeFi", "Product Design"];