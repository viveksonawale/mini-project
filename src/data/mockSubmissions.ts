export interface ProjectSubmission {
  id: string;
  hackathonId: string;
  hackathonTitle: string;
  teamName: string;
  projectName: string;
  description: string;
  githubUrl: string;
  liveDemoUrl?: string;
  presentationLink?: string;
  submittedAt: string;
  score: number;
}

export const mockSubmissions: ProjectSubmission[] = [
  {
    id: "ps1",
    hackathonId: "1",
    hackathonTitle: "AI Innovation Challenge",
    teamName: "Neural Ninjas",
    projectName: "AI Health Predictor",
    description: "An ML-powered health risk assessment tool that uses patient data to predict potential conditions early.",
    githubUrl: "https://github.com/neural-ninjas/ai-health",
    liveDemoUrl: "https://ai-health-demo.vercel.app",
    presentationLink: "https://docs.google.com/presentation/d/1a2b3c",
    submittedAt: "2026-03-16T14:30:00Z",
    score: 93,
  },
  {
    id: "ps2",
    hackathonId: "1",
    hackathonTitle: "AI Innovation Challenge",
    teamName: "Code Wizards",
    projectName: "FinBot Advisor",
    description: "Conversational AI assistant for personal finance management and investment recommendations.",
    githubUrl: "https://github.com/code-wizards/finbot",
    liveDemoUrl: "https://finbot.netlify.app",
    presentationLink: "https://docs.google.com/presentation/d/4d5e6f",
    submittedAt: "2026-03-16T16:00:00Z",
    score: 88,
  },
  {
    id: "ps3",
    hackathonId: "1",
    hackathonTitle: "AI Innovation Challenge",
    teamName: "Byte Builders",
    projectName: "EduAI Tutor",
    description: "Personalized AI tutoring platform that adapts to each student's learning style and pace.",
    githubUrl: "https://github.com/byte-builders/eduai",
    liveDemoUrl: "https://eduai-tutor.vercel.app",
    submittedAt: "2026-03-16T18:45:00Z",
    score: 85,
  },
  {
    id: "ps4",
    hackathonId: "2",
    hackathonTitle: "Green Tech Hackathon",
    teamName: "EcoCoders",
    projectName: "CarbonTrack Pro",
    description: "Carbon footprint tracker for businesses with IoT sensor integration and real-time dashboards.",
    githubUrl: "https://github.com/ecocoders/carbontrack",
    liveDemoUrl: "https://carbontrack.demo.app",
    presentationLink: "https://slides.com/ecocoders/carbontrack",
    submittedAt: "2026-04-02T10:00:00Z",
    score: 91,
  },
  {
    id: "ps5",
    hackathonId: "2",
    hackathonTitle: "Green Tech Hackathon",
    teamName: "Green Machines",
    projectName: "RecycleReward",
    description: "Gamified recycling app that incentivizes sustainable behavior in urban communities.",
    githubUrl: "https://github.com/green-machines/recycleward",
    submittedAt: "2026-04-02T12:30:00Z",
    score: 82,
  },
  {
    id: "ps6",
    hackathonId: "2",
    hackathonTitle: "Green Tech Hackathon",
    teamName: "Pixel Pirates",
    projectName: "SolarSync",
    description: "Smart solar panel management system with predictive maintenance and energy optimization.",
    githubUrl: "https://github.com/pixel-pirates/solarsync",
    liveDemoUrl: "https://solarsync.demo.app",
    presentationLink: "https://docs.google.com/presentation/d/7g8h9i",
    submittedAt: "2026-04-02T14:15:00Z",
    score: 78,
  },
  {
    id: "ps7",
    hackathonId: "3",
    hackathonTitle: "Web3 Builder Sprint",
    teamName: "Chain Breakers",
    projectName: "EasyWallet",
    description: "Abstracted wallet experience that lets non-crypto users interact with dApps seamlessly.",
    githubUrl: "https://github.com/chain-breakers/easywallet",
    liveDemoUrl: "https://easywallet.eth.link",
    presentationLink: "https://slides.com/chainbreakers/easywallet",
    submittedAt: "2026-02-21T09:00:00Z",
    score: 95,
  },
  {
    id: "ps8",
    hackathonId: "3",
    hackathonTitle: "Web3 Builder Sprint",
    teamName: "Data Dynamos",
    projectName: "GasSaver L2",
    description: "Layer 2 rollup solution that reduces gas fees by up to 90% for daily DeFi transactions.",
    githubUrl: "https://github.com/data-dynamos/gassaver",
    submittedAt: "2026-02-21T11:30:00Z",
    score: 89,
  },
  {
    id: "ps9",
    hackathonId: "3",
    hackathonTitle: "Web3 Builder Sprint",
    teamName: "DeFi Dreamers",
    projectName: "CrossBridge DEX",
    description: "Cross-chain decentralized exchange with unified liquidity pools and instant settlement.",
    githubUrl: "https://github.com/defi-dreamers/crossbridge",
    liveDemoUrl: "https://crossbridge.finance",
    submittedAt: "2026-02-21T15:00:00Z",
    score: 86,
  },
];
