export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Leader' | 'Member';
  avatar?: string;
}

export interface Team {
  teamId: string;
  hackathonId: string;
  teamName: string;
  leader: string;
  members: TeamMember[];
}

export const mockTeams: Team[] = [
  {
    teamId: "team-1",
    hackathonId: "hack-1",
    teamName: "Code Ninjas",
    leader: "Alice Johnson",
    members: [
      { id: "u1", name: "Alice Johnson", email: "alice@example.com", role: "Leader", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
      { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "Member", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
      { id: "u3", name: "Charlie Brown", email: "charlie@example.com", role: "Member", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d" }
    ]
  },
  {
    teamId: "team-2",
    hackathonId: "hack-2",
    teamName: "Data Wizards",
    leader: "David Lee",
    members: [
      { id: "u4", name: "David Lee", email: "david@example.com", role: "Leader", avatar: "https://i.pravatar.cc/150?u=d04258114e29026702d" },
      { id: "u5", name: "Eve Davis", email: "eve@example.com", role: "Member", avatar: "https://i.pravatar.cc/150?u=e04258114e29026702d" }
    ]
  }
];
