import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockSubmissions, type ProjectSubmission } from "@/data/mockSubmissions";
import { mockHackathons } from "@/data/mockHackathons";

const rankBadgeClass = (rank: number) => {
  if (rank === 1) return "bg-[hsl(45,93%,47%)] text-background";
  if (rank === 2) return "bg-[hsl(210,10%,70%)] text-background";
  if (rank === 3) return "bg-[hsl(30,60%,50%)] text-background";
  return "bg-muted text-muted-foreground";
};

const rankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="h-4 w-4" />;
  if (rank === 2) return <Medal className="h-4 w-4" />;
  if (rank === 3) return <Star className="h-4 w-4" />;
  return rank;
};

const Leaderboard = () => {
  const [selectedHackathon, setSelectedHackathon] = useState<string>("all");

  // Get unique hackathons from submissions
  const hackathonOptions = [
    ...new Map(
      mockSubmissions.map((s) => [s.hackathonId, { id: s.hackathonId, title: s.hackathonTitle }])
    ).values(),
  ];

  // Filter and sort
  const filtered = (
    selectedHackathon === "all"
      ? [...mockSubmissions]
      : mockSubmissions.filter((s) => s.hackathonId === selectedHackathon)
  ).sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-5xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 border-b border-border/50 pb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading tracking-tight">Leaderboard</h1>
              <p className="text-muted-foreground">Top performing teams across hackathons.</p>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        {filtered.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-10"
          >
            {[filtered[1], filtered[0], filtered[2]].map((sub, idx) => {
              const rank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.1 }}
                  className={idx === 1 ? "-mt-2" : "mt-6"}
                >
                  <Card
                    className={`text-center border-border/50 transition-all hover:border-primary/30 ${
                      rank === 1 ? "ring-2 ring-primary/30 shadow-[0_0_20px_rgba(216,245,36,0.08)]" : ""
                    }`}
                  >
                    <CardContent className="p-5 space-y-3">
                      <div
                        className={`h-11 w-11 mx-auto rounded-full flex items-center justify-center font-bold text-sm ${rankBadgeClass(
                          rank
                        )}`}
                      >
                        {rankIcon(rank)}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm leading-tight">{sub.projectName}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{sub.teamName}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                        {sub.hackathonTitle}
                      </Badge>
                      <p className="text-3xl font-bold font-heading">
                        {sub.score}
                        <span className="text-xs text-muted-foreground font-normal"> pts</span>
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <Card className="border-border/50">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                <Filter className="h-4 w-4" />
                <span className="font-medium">Filter by Hackathon</span>
              </div>
              <Select value={selectedHackathon} onValueChange={setSelectedHackathon}>
                <SelectTrigger className="w-full sm:w-[280px] h-10">
                  <SelectValue placeholder="Select Hackathon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hackathons</SelectItem>
                  {hackathonOptions.map((h) => (
                    <SelectItem key={h.id} value={h.id}>
                      {h.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="ml-auto">
                <Badge variant="secondary" className="text-xs">
                  {filtered.length} {filtered.length === 1 ? "team" : "teams"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50 shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-20 text-center font-heading font-bold">Rank</TableHead>
                  <TableHead className="font-heading font-bold">Team Name</TableHead>
                  <TableHead className="font-heading font-bold hidden sm:table-cell">Hackathon</TableHead>
                  <TableHead className="w-24 text-center font-heading font-bold">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((sub, i) => {
                  const rank = i + 1;
                  return (
                    <motion.tr
                      key={sub.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.04 }}
                      className={`border-b border-border/30 transition-colors hover:bg-muted/20 ${
                        rank <= 3 ? "bg-primary/[0.02]" : ""
                      }`}
                    >
                      <TableCell className="text-center">
                        <div
                          className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center font-bold text-xs ${rankBadgeClass(
                            rank
                          )}`}
                        >
                          {rankIcon(rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-sm">{sub.teamName}</p>
                          <p className="text-xs text-muted-foreground">{sub.projectName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs">
                          {sub.hackathonTitle}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`font-heading font-bold text-lg ${rank <= 3 ? "text-primary" : ""}`}>
                          {sub.score}
                        </span>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Trophy className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-lg font-heading">No submissions yet</p>
                <p className="text-sm mt-1">Rankings will appear once teams submit their projects.</p>
              </div>
            )}
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;