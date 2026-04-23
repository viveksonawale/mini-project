export interface Registration {
  id: string;
  hackathonId: string;
  hackathonTitle: string;
  teamName: string;
  members: string[];
  college: string;
  skills: string[];
  githubRepo: string;
  status: "registered" | "submitted" | "shortlisted" | "winner";
  submittedAt?: string;
}

export interface TeamRequest {
  id: string;
  from: string;
  avatar: string;
  skills: string[];
  message: string;
  status: "pending" | "accepted" | "rejected";
}

export const myRegistrations: Registration[] = [
  {
    id: "r1",
    hackathonId: "1",
    hackathonTitle: "AI Innovation Challenge",
    teamName: "Neural Ninjas",
    members: ["Vivek", "Jayesh", "Sarvesh"],
    college: "MIT",
    skills: ["Python", "TensorFlow", "React"],
    githubRepo: "https://github.com/atsarvesh/evnova",
    status: "registered",
  },
  {
    id: "r2",
    hackathonId: "3",
    hackathonTitle: "Web3 Builder Sprint",
    teamName: "Chain Breakers",
    members: ["Vicky", "Jay"],
    college: "Stanford",
    skills: ["Solidity", "React", "Node.js"],
    githubRepo: "https://github.com/atsarvesh/evnova",
    status: "submitted",
    submittedAt: "2026-02-21",
  },
];

export const teamRequests: TeamRequest[] = [
  {
    id: "t1",
    from: "Sarvesh",
    avatar: "S",
    skills: ["UI/UX", "Figma", "React"],
    message: "Looking for a frontend teammate for HealthTech Innovators!",
    status: "pending",
  },
  {
    id: "t2",
    from: "Vipin",
    avatar: "V",
    skills: ["Python", "ML", "Data Science"],
    message: "Need an ML expert for AI Innovation Challenge",
    status: "pending",
  },
];

export const participantStats = {
  hackathonsJoined: 5,
  submissions: 3,
  wins: 1,
  teamRequests: 2,
};