import { motion } from "framer-motion";
import { Trophy, FileText, Users, Calendar, LayoutDashboard, UserPlus, ArrowRight, Activity, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { hackathonApi } from "@/api/hackathonApi";

const ParticipantDashboard = () => {
  const { user } = useAuth();

  const { data: hackathons = [], isLoading, isError } = useQuery({
    queryKey: ['joined-hackathons'],
    queryFn: hackathonApi.getJoinedHackathons
  });

  const stats = {
    hackathonsJoined: hackathons.length,
    teamsJoined: 0, // Mocked for now until Team API supports global count
    submissionsMade: 0, // Mocked for now
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#d8f524]/30">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 md:pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold font-heading tracking-tight">Participant Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user?.name || 'Participant'}. Track your hackathons and activity here.</p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#d8f524] mb-4" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-destructive">
            <p className="text-lg">Failed to load dashboard data.</p>
            <p className="text-sm">Please check if the backend is running.</p>
          </div>
        ) : (
          <>
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
                      <p className="font-heading text-3xl font-bold">{stats.hackathonsJoined}</p>
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
                      <p className="font-heading text-3xl font-bold">{stats.teamsJoined}</p>
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
                      <p className="font-heading text-3xl font-bold">{stats.submissionsMade}</p>
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
                
                {hackathons.length === 0 ? (
                  <Card className="border-border/30 bg-card/20 backdrop-blur-sm border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <Calendar className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No joined hackathons</h3>
                      <p className="text-muted-foreground max-w-sm mb-6">
                        You haven't joined any hackathons yet. Explore our open events and start building!
                      </p>
                      <Link to="/hackathons">
                        <Button className="bg-[#d8f524] text-black hover:bg-[#d8f524]/90">
                          Browse Hackathons
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hackathons.map((h, i) => (
                      <motion.div key={h.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                        <Card className="border-border/50 bg-card/30 backdrop-blur-md shadow-sm h-full flex flex-col hover:border-border transition-colors">
                          <CardContent className="p-5 flex flex-col flex-1">
                            <h3 className="font-semibold text-lg mb-4 line-clamp-1">{h.title}</h3>
                            
                            <div className="space-y-3 mb-6 flex-1">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Status</span>
                                <Badge variant="outline" className="capitalize">
                                  {h.status}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Dates</span>
                                <span className="text-xs">{new Date(h.startDate).toLocaleDateString()} - {new Date(h.endDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-auto pt-4 border-t border-border/30">
                              <Link to={`/hackathons/${h.id}`} className="flex-1">
                                <Button size="sm" variant="secondary" className="w-full">View Details</Button>
                              </Link>
                              <Link to={`/participant/hackathons/${h.id}/team`} className="flex-1">
                                <Button size="sm" className="w-full bg-[#d8f524] text-black hover:bg-[#d8f524]/90">
                                  Manage Team
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - Teams snippet or placeholders */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-secondary" /> Recent Activity
                  </h2>
                  <Card className="border-border/50 bg-card/30 backdrop-blur-md p-6">
                    <p className="text-sm text-muted-foreground text-center">
                      Join a hackathon to see your team activity and rankings here.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ParticipantDashboard;