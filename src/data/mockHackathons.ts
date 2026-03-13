export interface HackathonTimeline {
  registrationStart: string;
  registrationEnd: string;
  hackathonStart: string;
  submissionDeadline: string;
}

export interface PrizeTier {
  position: string;
  amount: string;
  description: string;
}

export interface Hackathon {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  type: "online" | "offline";
  prizePool: string;
  participants: number;
  teams: number;
  status: "upcoming" | "live" | "ended";
  organiser: string;
  venue?: string;
  maxTeamSize: number;
  
  // Overview details
  problemStatement: string;
  theme: string[];
  goals: string[];
  
  // Rules and Timeline
  rules: string[];
  timeline: HackathonTimeline;
  prizes: PrizeTier[];
}

export const mockHackathons: Hackathon[] = [
  {
    id: "1",
    title: "AI Innovation Challenge",
    shortDescription: "Build cutting-edge AI solutions that solve real-world problems.",
    description: "Welcome to the AI Innovation Challenge! We are calling all visionaries, developers, and AI enthusiasts to push the boundaries of Artificial Intelligence. In this 48-hour hackathon, you'll tackle pressing global issues using the latest in machine learning, natural language processing, and computer vision.",
    type: "online",
    prizePool: "$10,000",
    participants: 342,
    teams: 86,
    status: "live",
    organiser: "TechCorp",
    maxTeamSize: 4,
    problemStatement: "As global challenges grow more complex, we need scalable, intelligent solutions. Participants must develop AI-driven applications that address inefficiencies in healthcare diagnostics, personalize educational experiences, or optimize sustainable energy consumption. Your solution should not only be technologically advanced but also ethically sound, accessible, and ready for real-world deployment.",
    theme: ["AI/ML", "Healthcare", "Education"],
    goals: [
      "Develop functional prototypes of AI models.",
      "Integrate AI ethically and securely.",
      "Solve a tangible problem in the chosen theme."
    ],
    rules: [
      "Maximum of 4 members per team.",
      "All code must be original and written during the hackathon.",
      "Use of open-source models (like Llama, Mistral) is permitted.",
      "Submissions must include a video demo (max 3 mins) and a link to a public repository.",
      "Judging will be based on innovation, technical implementation, and potential impact."
    ],
    timeline: {
      registrationStart: "2026-02-01",
      registrationEnd: "2026-03-10",
      hackathonStart: "2026-03-15",
      submissionDeadline: "2026-03-17"
    },
    prizes: [
      { position: "1st Prize", amount: "$5,000", description: "Plus $10,000 in cloud credits and VIP mentorship." },
      { position: "2nd Prize", amount: "$3,000", description: "Plus $5,000 in cloud credits." },
      { position: "3rd Prize", amount: "$2,000", description: "Plus $2,000 in cloud credits." }
    ]
  },
  {
    id: "2",
    title: "Green Tech Hackathon",
    shortDescription: "Sustainable technology solutions for a greener future.",
    description: "The Green Tech Hackathon is the premier event for eco-conscious developers. Join us in building sustainable software and hardware solutions aimed at reducing carbon footprints, managing waste efficiently, and promoting clean energy. Let's code for a better tomorrow.",
    type: "offline",
    prizePool: "$25,000",
    participants: 128,
    teams: 32,
    status: "upcoming",
    organiser: "GreenFuture Inc.",
    venue: "San Francisco Convention Center",
    maxTeamSize: 5,
    problemStatement: "Climate change is the defining issue of our time. We challenge participants to build platforms or IoT networks that measure and reduce carbon emissions for small businesses. Alternatively, create solutions that gamify recycling and incentivize sustainable consumer behavior in urban areas.",
    theme: ["Sustainability", "CleanTech", "IoT"],
    goals: [
      "Create actionable, scalable solutions for emission tracking.",
      "Leverage IoT for real-world environmental data gathering.",
      "Construct business models alongside technical prototypes."
    ],
    rules: [
      "Teams must have between 2 and 5 members.",
      "Hardware projects must provide clear documentation and circuit designs.",
      "Submissions must be deployed and demonstrable live.",
      "Use of pre-existing templates is prohibited."
    ],
    timeline: {
      registrationStart: "2026-02-15",
      registrationEnd: "2026-03-25",
      hackathonStart: "2026-04-01",
      submissionDeadline: "2026-04-03"
    },
    prizes: [
      { position: "1st Prize", amount: "$15,000", description: "Incubation opportunity with GreenFuture." },
      { position: "2nd Prize", amount: "$7,000", description: "Tickets to the CleanTech Global Summit." },
      { position: "3rd Prize", amount: "$3,000", description: "Swag and sponsor hardware kits." }
    ]
  },
  {
    id: "3",
    title: "Web3 Builder Sprint",
    shortDescription: "Decentralized apps and blockchain innovations.",
    description: "Dive into the decentralized web. The Web3 Builder Sprint brings together top cryptographic minds to build secure, transparent, and scalable dApps. Whether you're working on DeFi protocols, new consensus mechanisms, or NFT utilities, this sprint is your launchpad.",
    type: "online",
    prizePool: "$15,000",
    participants: 560,
    teams: 140,
    status: "ended",
    organiser: "ChainLabs",
    maxTeamSize: 4,
    problemStatement: "The transition from Web2 to Web3 is hindered by UX complexity and high transaction costs. Your task is to build a dApp that abstract away the complexities of wallet management while providing robust security, or to develop Layer 2 solutions that significantly lower gas fees for daily transactions.",
    theme: ["Blockchain", "DeFi", "UX"],
    goals: [
      "Abstract away standard Web3 friction points (e.g., wallet creation).",
      "Deploy smart contracts to the testnet successfully.",
      "Provide a seamless onboarding flow for non-crypto natives."
    ],
    rules: [
      "Maximum of 4 members per team.",
      "Smart contracts must be open-source and include initial security tests.",
      "Prototypes must be deployed on the designated testnet.",
      "Submissions must include a technical architecture diagram."
    ],
    timeline: {
      registrationStart: "2026-01-10",
      registrationEnd: "2026-02-18",
      hackathonStart: "2026-02-20",
      submissionDeadline: "2026-02-22"
    },
    prizes: [
      { position: "1st Prize", amount: "$8,000", description: "Paid audit for your smart contract." },
      { position: "2nd Prize", amount: "$5,000", description: "Developer grants from ChainLabs." },
      { position: "3rd Prize", amount: "$2,000", description: "Exclusive NFTs and premium RPC access." }
    ]
  }
];
