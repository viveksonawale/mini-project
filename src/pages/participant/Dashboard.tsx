import { motion } from "framer-motion";
import { Trophy, FileText, Users, Calendar, LayoutDashboard, UserPlus, ArrowRight, Activity, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { participantStats, participantHackathons, participantTeams, participantLeaderboard } from "@/data/mockDashboards";
import { useAuth } from "@/contexts/AuthContext";

const ParticipantDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#d8f524]/30">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold font-heading tracking-tight">Participant Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your hackathons, teams, and submissions</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden relative group">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#d8f524]/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hackathons Joined</p>
                  <p className="font-heading text-3xl font-bold">{participantStats.hackathonsJoined}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden relative group">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Teams Joined</p>
                  <p className="font-heading text-3xl font-bold">{participantStats.teamsJoined}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden relative group">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submissions Made</p>
                  <p className="font-heading text-3xl font-bold">{participantStats.submissionsMade}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column (Hackathons) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-[#d8f524]" /> Joined Hackathons
              </h2>
              <Link to="/hackathons">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Browse more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {participantHackathons.map((h, i) => (
                <motion.div key={h.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                  <Card className="border-border/50 bg-card/30 backdrop-blur-md shadow-sm h-full flex flex-col hover:border-border transition-colors">
                    <CardContent className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg mb-4 line-clamp-1">{h.name}</h3>
                      
                      <div className="space-y-3 mb-6 flex-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Team</span>
                          <Badge variant="outline" className={h.teamStatus === "Formed" ? "border-primary/50 text-primary" : "border-accent/50 text-accent"}>
                            {h.teamStatus}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Submission</span>
                          <Badge variant="outline" className={h.submissionStatus === "Submitted" ? "border-secondary/50 text-secondary" : "border-muted-foreground/50 text-muted-foreground"}>
                            {h.submissionStatus}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Deadline</span>
                          <span>{new Date(h.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-auto pt-4 border-t border-border/30">
                        <Link to={`/participant/hackathons/${h.id}/team`} className="flex-1">
                          <Button size="sm" variant="secondary" className="w-full">Manage Team</Button>
                        </Link>
                        <Link to={`/participant/hackathons/${h.id}/submit`} className="flex-1">
                          <Button size="sm" className="w-full bg-[#d8f524] text-black hover:bg-[#d8f524]/90">
                            Submit <ChevronRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Team & Leaderboard */}
          <div className="space-y-8">
            {/* Team Info Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" /> Your Teams
              </h2>
              
              <div className="space-y-3">
                {participantTeams.map((team, i) => (
                  <motion.div key={team.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
                    <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{team.teamName}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{team.membersCount} Members</span>
                            <span>•</span>
                            <span className={team.role === "Leader" ? "text-primary" : ""}>{team.role}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full border-dashed border-muted-foreground/50 text-muted-foreground hover:text-foreground">
                          <UserPlus className="h-4 w-4" />
                          <span className="sr-only">Invite Member</span>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leaderboard Snapshot */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-secondary" /> Your Rankings
                </h2>
              </div>
              
              <Card className="border-border/50 bg-card/30 backdrop-blur-md overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 bg-secondary/5 blur-[50px] rounded-full"></div>
                <CardContent className="p-5 relative z-10">
                  <div className="space-y-4 mb-5">
                    {participantLeaderboard.map((lb) => (
                      <div key={lb.id} className="flex items-center justify-between pb-3 last:pb-0 border-b last:border-0 border-border/30">
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{lb.hackathonName}</p>
                          <p className="text-xs text-secondary mt-0.5">Score: {lb.score}</p>
                        </div>
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary/10 text-secondary font-bold text-sm">
                          #{lb.teamRank}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/leaderboard" className="block">
                    <Button variant="outline" className="w-full border-border/50 hover:bg-white/5">
                      <Activity className="mr-2 h-4 w-4" /> View Full Leaderboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ParticipantDashboard;