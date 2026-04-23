export interface Certificate {
  id: string;
  hackathonTitle: string;
  participantName: string;
  teamName: string;
  type: "participation" | "winner" | "runner-up";
  position?: string;
  date: string;
  hackathonId: string;
  skills: string[];
}

export const userCertificates: Certificate[] = [
  {
    id: "cert-1",
    hackathonTitle: "AI Innovation Challenge",
    participantName: "Sam Participant",
    teamName: "Neural Ninjas",
    type: "participation",
    date: "2026-01-20",
    hackathonId: "1",
    skills: ["Python", "TensorFlow", "React"],
  },
  {
    id: "cert-2",
    hackathonTitle: "Web3 Builder Sprint",
    participantName: "Sam Participant",
    teamName: "Chain Breakers",
    type: "winner",
    position: "1st Place",
    date: "2026-02-21",
    hackathonId: "3",
    skills: ["Solidity", "React", "Node.js"],
  },
  {
    id: "cert-3",
    hackathonTitle: "HealthTech Innovators",
    participantName: "Sam Participant",
    teamName: "MedTech Crew",
    type: "runner-up",
    position: "2nd Place",
    date: "2025-12-15",
    hackathonId: "2",
    skills: ["React", "Firebase", "UI/UX"],
  },
];