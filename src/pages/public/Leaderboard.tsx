import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Star, Github, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { submissions, orgHackathons, type Submission } from "@/data/organiserMockData";

const rankStyle = [
  "bg-gradient-to-r from-[hsl(45,93%,47%)] to-[hsl(36,100%,50%)] text-background",
  "bg-gradient-to-r from-[hsl(210,10%,70%)] to-[hsl(210,10%,55%)] text-background",
  "bg-gradient-to-r from-[hsl(30,60%,50%)] to-[hsl(20,50%,40%)] text-background",
];

const Leaderboard = () => {
  const { hackathonId } = useParams();
  const hackathon = orgHackathons.find((h) => h.id === hackathonId);

  const ranked = submissions
    .filter((s) => s.hackathonId === hackathonId && s.totalScore > 0)
    .sort((a, b) => b.totalScore - a.totalScore);

  const unscored = submissions.filter((s) => s.hackathonId === hackathonId && s.totalScore === 0);

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-muted-foreground">Hackathon not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <Link to={`/organiser/hackathon/${hackathonId}/submissions`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Submissions
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <Trophy className="h-10 w-10 text-accent mx-auto mb-2" />
          <h1 className="font-heading text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">{hackathon.title}</p>
        </motion.div>

        {/* Top 3 Podium */}
        {ranked.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[ranked[1], ranked[0], ranked[2]].map((sub, podiumIdx) => {
              const actualRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: podiumIdx * 0.15 }}
                  className={podiumIdx === 1 ? "-mt-4" : "mt-4"}
                >
                  <Card className={`text-center border-border/50 ${actualRank === 1 ? "ring-2 ring-accent/50" : ""}`}>
                    <CardContent className="p-5 space-y-2">
                      <div className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold ${rankStyle[actualRank - 1]}`}>
                        {actualRank}
                      </div>
                      <h3 className="font-heading font-bold text-sm">{sub.projectTitle}</h3>
                      <p className="text-xs text-muted-foreground">{sub.teamName}</p>
                      <p className="text-2xl font-bold font-heading">{sub.totalScore}<span className="text-xs text-muted-foreground font-normal">/40</span></p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Full ranking */}
        <div className="space-y-3">
          {ranked.map((sub, i) => (
            <RankCard key={sub.id} submission={sub} rank={i + 1} index={i} />
          ))}
        </div>

        {unscored.length > 0 && (
          <div className="mt-10">
            <h2 className="font-heading text-lg font-bold mb-4 text-muted-foreground">Awaiting Review ({unscored.length})</h2>
            <div className="space-y-2">
              {unscored.map((sub) => (
                <Card key={sub.id} className="border-border/30 opacity-60">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{sub.projectTitle}</p>
                      <p className="text-xs text-muted-foreground">{sub.teamName}</p>
                    </div>
                    <Badge className="bg-muted text-muted-foreground">Pending</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {ranked.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No scored submissions yet.</p>
            <Link to={`/organiser/hackathon/${hackathonId}/submissions`}>
              <Button variant="link">Start reviewing</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};


const RankCard = ({ submission: sub, rank, index }: { submission: Submission; rank: number; index: number }) => {
  const criteria = [
    { key: "innovation" as const, label: "Innovation", color: "bg-primary" },
    { key: "execution" as const, label: "Execution", color: "bg-secondary" },
    { key: "design" as const, label: "Design", color: "bg-accent" },
    { key: "impact" as const, label: "Impact", color: "bg-[hsl(var(--evnova-orange))]" },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
      <Card className={`border-border/50 ${rank <= 3 ? "ring-1 ring-accent/20" : ""}`}>
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Rank badge */}
            <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${rank <= 3 ? rankStyle[rank - 1] : "bg-muted text-muted-foreground"}`}>
              {rank <= 3 ? <Medal className="h-5 w-5" /> : rank}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-heading font-semibold">{sub.projectTitle}</h3>
                {sub.status === "winner" && <Badge className="bg-accent/20 text-accent">🏆 Winner</Badge>}
                {sub.status === "shortlisted" && <Badge className="bg-primary/20 text-primary">Shortlisted</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">{sub.teamName} • {sub.members.length} members</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {sub.techStack.slice(0, 3).map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
              </div>

              {/* Score bars */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
                {criteria.map((c) => (
                  <div key={c.key} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-16">{c.label}</span>
                    <Progress value={sub.scores[c.key] * 10} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium w-4 text-right">{sub.scores[c.key]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total score */}
            <div className="text-right shrink-0">
              <p className="text-3xl font-bold font-heading">{sub.totalScore}</p>
              <p className="text-xs text-muted-foreground">/ 40 pts</p>
              <div className="flex gap-1 mt-2 justify-end">
                <a href={sub.githubUrl} target="_blank" rel="noreferrer">
                  <Button size="icon" variant="ghost" className="h-7 w-7"><Github className="h-3.5 w-3.5" /></Button>
                </a>
                {sub.demoUrl && (
                  <a href={sub.demoUrl} target="_blank" rel="noreferrer">
                    <Button size="icon" variant="ghost" className="h-7 w-7"><ExternalLink className="h-3.5 w-3.5" /></Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Leaderboard;