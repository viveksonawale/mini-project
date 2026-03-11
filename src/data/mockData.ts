export interface Hackathon {
  id: string;
  title: string;
  description: string;
  type: "online" | "offline";
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  venue?: string;
  prizePool: string;
  maxTeamSize: number;
  themes: string[];
  status: "open" | "ongoing" | "completed" | "upcoming";
  participants: number;
  teams: number;
  organiser: string;
  bannerGradient: string;
}

export const mockHackathons: Hackathon[] = [
  {
    id: "1",
    title: "AI Innovation Challenge",
    description: "Build cutting-edge AI solutions that solve real-world problems.",
    type: "online",
    startDate: "2026-03-15",
    endDate: "2026-03-17",
    registrationDeadline: "2026-03-10",
    prizePool: "$10,000",
    maxTeamSize: 4,
    themes: ["AI/ML", "Healthcare", "Education"],
    status: "open",
    participants: 342,
    teams: 86,
    organiser: "TechCorp",
    bannerGradient: "from-primary to-hackmate-blue-glow",
  },
  {
    id: "2",
    title: "Green Tech Hackathon",
    description: "Sustainable technology solutions for a greener future.",
    type: "offline",
    startDate: "2026-04-01",
    endDate: "2026-04-03",
    registrationDeadline: "2026-03-25",
    venue: "San Francisco Convention Center",
    prizePool: "$25,000",
    maxTeamSize: 5,
    themes: ["Sustainability", "CleanTech", "IoT"],
    status: "upcoming",
    participants: 128,
    teams: 32,
    organiser: "GreenFuture Inc.",
    bannerGradient: "from-accent to-hackmate-blue-glow",
  },
  {
    id: "3",
    title: "Web3 Builder Sprint",
    description: "Decentralized apps and blockchain innovations.",
    type: "online",
    startDate: "2026-02-20",
    endDate: "2026-02-22",
    registrationDeadline: "2026-02-18",
    prizePool: "$15,000",
    maxTeamSize: 4,
    themes: ["Blockchain", "DeFi", "NFT"],
    status: "ongoing",
    participants: 560,
    teams: 140,
    organiser: "ChainLabs",
    bannerGradient: "from-hackmate-orange to-primary",
  },
  {
    id: "4",
    title: "HealthTech Innovators",
    description: "Revolutionize healthcare with technology.",
    type: "offline",
    startDate: "2026-05-10",
    endDate: "2026-05-12",
    registrationDeadline: "2026-05-01",
    venue: "MIT Campus, Boston",
    prizePool: "$20,000",
    maxTeamSize: 5,
    themes: ["Healthcare", "Biotech", "AI"],
    status: "open",
    participants: 210,
    teams: 52,
    organiser: "MedTech Labs",
    bannerGradient: "from-secondary to-accent",
  },
];

export const platformStats = {
  hackathonsHosted: 150,
  totalParticipants: 12500,
  teamsFormed: 3200,
  prizesAwarded: "$500K+",
};