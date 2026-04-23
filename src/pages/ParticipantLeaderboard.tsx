import { motion } from "framer-motion";
import { Trophy, Medal, Star, Flame, Award, Users, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  college: string;
  wins: number;
  hackathonsJoined: number;
  submissions: number;
  contributions: number;
  topSkills: string[];
  streak: number;
}

const leaderboardData: Participant[] = [
  { id: "1", name: "Aarav Mehta", avatar: "AM", college: "IIT Bombay", wins: 8, hackathonsJoined: 15, submissions: 14, contributions: 42, topSkills: ["React", "Python", "ML"], streak: 5 },
  { id: "2", name: "Priya Sharma", avatar: "PS", college: "MIT", wins: 6, hackathonsJoined: 12, submissions: 11, contributions: 38, topSkills: ["TensorFlow", "Python", "Data Science"], streak: 3 },
  { id: "3", name: "Carlos Rivera", avatar: "CR", college: "Stanford", wins: 5, hackathonsJoined: 10, submissions: 9, contributions: 35, topSkills: ["Solidity", "Web3", "Node.js"], streak: 4 },
  { id: "4", name: "Emily Chen", avatar: "EC", college: "Carnegie Mellon", wins: 4, hackathonsJoined: 11, submissions: 10, contributions: 30, topSkills: ["Figma", "React", "TypeScript"], streak: 2 },
  { id: "5", name: "Jordan Lee", avatar: "JL", college: "UC Berkeley", wins: 4, hackathonsJoined: 9, submissions: 8, contributions: 28, topSkills: ["Rust", "Go", "Docker"], streak: 6 },
  { id: "6", name: "Sofia Nguyen", avatar: "SN", college: "Georgia Tech", wins: 3, hackathonsJoined: 8, submissions: 7, contributions: 25, topSkills: ["Flutter", "Firebase", "Dart"], streak: 1 },
  { id: "7", name: "Liam O'Brien", avatar: "LO", college: "Oxford", wins: 3, hackathonsJoined: 7, submissions: 6, contributions: 22, topSkills: ["AWS", "Python", "FastAPI"], streak: 2 },
  { id: "8", name: "Aisha Patel", avatar: "AP", college: "NUS Singapore", wins: 2, hackathonsJoined: 8, submissions: 7, contributions: 20, topSkills: ["Vue.js", "GraphQL", "PostgreSQL"], streak: 3 },
  { id: "9", name: "Marcus Johnson", avatar: "MJ", college: "University of Toronto", wins: 2, hackathonsJoined: 6, submissions: 5, contributions: 18, topSkills: ["Swift", "iOS", "CoreML"], streak: 1 },
  { id: "10", name: "Yuki Tanaka", avatar: "YT", college: "University of Tokyo", wins: 1, hackathonsJoined: 5, submissions: 5, contributions: 15, topSkills: ["C++", "OpenCV", "Robotics"], streak: 2 },
];

const podiumGradients = [
  "from-[hsl(45,93%,47%)] to-[hsl(36,100%,50%)]",
  "from-[hsl(210,10%,70%)] to-[hsl(210,10%,55%)]",
  "from-[hsl(30,60%,50%)] to-[hsl(20,50%,40%)]",
];

const statCards = [
  { icon: Users, label: "Total Participants", value: "2,340" },
  { icon: Trophy, label: "Hackathons Completed", value: "156" },
  { icon: Code, label: "Projects Submitted", value: "1,890" },
  { icon: Award, label: "Prizes Awarded", value: "312" },
];

const ParticipantLeaderboard = () => {
  const sortByWins = [...leaderboardData].sort((a, b) => b.wins - a.wins);
  const sortByContributions = [...leaderboardData].sort((a, b) => b.contributions - a.contributions);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-5xl">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <Trophy className="h-12 w-12 text-accent mx-auto mb-3" />
          <h1 className="font-heading text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Top participants ranked by hackathon wins and community contributions.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center">
                  <s.icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-2xl font-bold font-heading">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="wins" className="space-y-6">
          <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2">
            <TabsTrigger value="wins">By Wins</TabsTrigger>
            <TabsTrigger value="contributions">By Contributions</TabsTrigger>
          </TabsList>

          <TabsContent value="wins">
            <Podium data={sortByWins} metric="wins" />
            <RankList data={sortByWins} metric="wins" />
          </TabsContent>

          <TabsContent value="contributions">
            <Podium data={sortByContributions} metric="contributions" />
            <RankList data={sortByContributions} metric="contributions" />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

const Podium = ({ data, metric }: { data: Participant[]; metric: "wins" | "contributions" }) => {
  if (data.length < 3) return null;
  const order = [data[1], data[0], data[2]];
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {order.map((p, i) => {
        const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
        return (
          <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className={i === 1 ? "-mt-4" : "mt-4"}>
            <Card className={`text-center border-border/50 ${rank === 1 ? "ring-2 ring-accent/50" : ""}`}>
              <CardContent className="p-5 space-y-2">
                <div className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br ${podiumGradients[rank - 1]} text-background`}>
                  {rank}
                </div>
                <Avatar className="h-12 w-12 mx-auto">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold">{p.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="font-heading font-bold text-sm">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.college}</p>
                <p className="text-2xl font-bold font-heading">
                  {p[metric]}
                  <span className="text-xs text-muted-foreground font-normal ml-1">{metric === "wins" ? "wins" : "contrib."}</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

const RankList = ({ data, metric }: { data: Participant[]; metric: "wins" | "contributions" }) => {
  const maxVal = Math.max(...data.map((p) => p[metric]));
  return (
    <div className="space-y-3">
      {data.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
          <Card className={`border-border/50 ${i < 3 ? "ring-1 ring-accent/20" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${i < 3 ? `bg-gradient-to-br ${podiumGradients[i]} text-background` : "bg-muted text-muted-foreground"}`}>
                  {i < 3 ? <Medal className="h-4 w-4" /> : i + 1}
                </div>
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">{p.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-semibold text-sm">{p.name}</h3>
                    {p.streak >= 3 && (
                      <Badge variant="outline" className="text-xs gap-1"><Flame className="h-3 w-3 text-destructive" />{p.streak} streak</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{p.college}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.topSkills.map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={(p[metric] / maxVal) * 100} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium w-8 text-right">{p[metric]}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div><p className="text-lg font-bold font-heading">{p.wins}</p><p className="text-[10px] text-muted-foreground">Wins</p></div>
                    <div><p className="text-lg font-bold font-heading">{p.submissions}</p><p className="text-[10px] text-muted-foreground">Subs</p></div>
                    <div><p className="text-lg font-bold font-heading">{p.hackathonsJoined}</p><p className="text-[10px] text-muted-foreground">Joined</p></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ParticipantLeaderboard;