import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Filter, Star, MessageSquare, ExternalLink, Github, Eye, Check, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { submissions as allSubmissions, orgHackathons, type Submission } from "@/data/organiserMockData";
import { useToast } from "@/hooks/use-toast";

const statusStyle: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  reviewed: "bg-secondary/20 text-secondary",
  shortlisted: "bg-primary/20 text-primary",
  winner: "bg-accent/20 text-accent",
};

const statusFilters = ["All", "Pending", "Reviewed", "Shortlisted", "Winner"] as const;

const ManageSubmissions = () => {
  const { hackathonId } = useParams();
  const { toast } = useToast();
  const hackathon = orgHackathons.find((h) => h.id === hackathonId);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [localSubmissions, setLocalSubmissions] = useState<Submission[]>(
    allSubmissions.filter((s) => s.hackathonId === hackathonId)
  );

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

  const filtered = localSubmissions.filter((s) => {
    if (search && !s.teamName.toLowerCase().includes(search.toLowerCase()) && !s.projectTitle.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "All" && s.status !== statusFilter.toLowerCase()) return false;
    return true;
  });

  const handleScore = (id: string, scores: Submission["scores"], feedback: string) => {
    setLocalSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, scores, totalScore: scores.innovation + scores.execution + scores.design + scores.impact, status: "reviewed" as const, feedback }
          : s
      )
    );
    toast({ title: "Scores saved!", description: "Submission has been reviewed." });
  };

  const pendingCount = localSubmissions.filter((s) => s.status === "pending").length;
  const reviewedCount = localSubmissions.filter((s) => s.status !== "pending").length;
  const avgScore = localSubmissions.filter((s) => s.totalScore > 0).reduce((a, s) => a + s.totalScore, 0) / (reviewedCount || 1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/organiser/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold">Submissions</h1>
              <p className="text-muted-foreground">{hackathon.title}</p>
            </div>
            <Link to={`/organiser/hackathon/${hackathonId}/leaderboard`}>
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                <Star className="h-4 w-4" /> Leaderboard
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total", value: localSubmissions.length, icon: <Eye className="h-4 w-4" /> },
            { label: "Pending", value: pendingCount, icon: <Clock className="h-4 w-4" /> },
            { label: "Avg Score", value: avgScore.toFixed(1), icon: <Star className="h-4 w-4" /> },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="text-primary">{s.icon}</div>
                <div>
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search & filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search teams or projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statusFilters.map((f) => (
              <Button key={f} size="sm" variant={statusFilter === f ? "default" : "outline"} onClick={() => setStatusFilter(f)}>{f}</Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} submission{filtered.length !== 1 ? "s" : ""}</p>

        {/* Submission cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((sub, i) => (
              <SubmissionCard key={sub.id} submission={sub} index={i} onScore={handleScore} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No submissions match your filters.</div>
        )}
      </main>
      <Footer />
    </div>
  );
};

const SubmissionCard = ({
  submission: sub,
  index,
  onScore,
}: {
  submission: Submission;
  index: number;
  onScore: (id: string, scores: Submission["scores"], feedback: string) => void;
}) => {
  const [scores, setScores] = useState(sub.scores);
  const [feedback, setFeedback] = useState(sub.feedback || "");

  const updateScore = (key: keyof typeof scores, val: number) => {
    setScores((prev) => ({ ...prev, [key]: val }));
  };

  const criteria = [
    { key: "innovation" as const, label: "Innovation", color: "text-primary" },
    { key: "execution" as const, label: "Execution", color: "text-secondary" },
    { key: "design" as const, label: "Design", color: "text-accent" },
    { key: "impact" as const, label: "Impact", color: "text-[hsl(var(--evnova-orange))]" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="border-border/50 hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4">
            {/* Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-heading font-semibold text-lg">{sub.projectTitle}</h3>
                <Badge className={statusStyle[sub.status]}>{sub.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Team: {sub.teamName} • {sub.members.length} members</p>
              <p className="text-sm text-muted-foreground line-clamp-2">{sub.description}</p>
              <div className="flex flex-wrap gap-1">
                {sub.techStack.map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
              </div>
              <div className="flex gap-2 pt-1">
                <a href={sub.githubUrl} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline" className="gap-1 text-xs"><Github className="h-3 w-3" />Repo</Button>
                </a>
                {sub.demoUrl && (
                  <a href={sub.demoUrl} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="gap-1 text-xs"><ExternalLink className="h-3 w-3" />Demo</Button>
                  </a>
                )}
              </div>
            </div>

            {/* Score summary & action */}
            <div className="flex flex-col items-end gap-3 min-w-[140px]">
              <div className="text-right">
                <p className="text-3xl font-bold font-heading">{sub.totalScore > 0 ? sub.totalScore : "—"}</p>
                <p className="text-xs text-muted-foreground">/ 40 points</p>
              </div>
              {sub.totalScore > 0 && (
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  {criteria.map((c) => (
                    <div key={c.key} className="flex items-center gap-1">
                      <span className={c.color}>●</span>
                      <span className="text-muted-foreground">{c.label}:</span>
                      <span className="font-medium">{sub.scores[c.key]}</span>
                    </div>
                  ))}
                </div>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant={sub.status === "pending" ? "default" : "outline"} className="gap-1">
                    {sub.status === "pending" ? <><Star className="h-3 w-3" />Score</> : <><MessageSquare className="h-3 w-3" />Review</>}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading">Score: {sub.projectTitle}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-5 pt-2">
                    {criteria.map((c) => (
                      <div key={c.key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{c.label}</span>
                          <span className={`font-bold ${c.color}`}>{scores[c.key]}/10</span>
                        </div>
                        <Slider
                          value={[scores[c.key]]}
                          onValueChange={([v]) => updateScore(c.key, v)}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Feedback</label>
                      <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Comments for the team..." rows={3} />
                    </div>
                    <Button className="w-full gap-2" onClick={() => onScore(sub.id, scores, feedback)}>
                      <Check className="h-4 w-4" /> Save Scores
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ManageSubmissions;