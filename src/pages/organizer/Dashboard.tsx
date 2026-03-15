import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Users, FileText, Plus, Eye, Settings, Calendar, LayoutDashboard, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { hackathonApi } from "@/api/hackathonApi";

const statusColor: Record<string, string> = {
  upcoming: "bg-accent/20 text-accent border-accent/30",
  live: "bg-[#d8f524]/20 text-[#d8f524] border-[#d8f524]/30",
  open: "bg-[#d8f524]/20 text-[#d8f524] border-[#d8f524]/30",
  ended: "bg-secondary/20 text-secondary border-secondary/30",
};

const OrganiserDashboard = () => {
  const { data: hackathons = [], isLoading, isError } = useQuery({
    queryKey: ['organised-hackathons'],
    queryFn: hackathonApi.getOrganizedHackathons
  });

  const stats = {
    totalHackathonsCreated: hackathons.length,
    totalParticipants: hackathons.reduce((acc, h) => acc + (h.participants || 0), 0),
    totalSubmissions: hackathons.reduce((acc, h) => acc + (h.teams || 0), 0),
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#d8f524]/30">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 md:pt-24 pb-16">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">Organizer Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your hackathons and track activity</p>
          </div>
          <div className="flex gap-3">
            <Link to="/organizer/dashboard">
              <Button variant="secondary" className="gap-2 border-border/50">
                <Settings className="h-4 w-4" /> Manage Hackathons
              </Button>
            </Link>
            <Link to="/organizer/create-hackathon">
              <Button className="bg-[#d8f524] text-black hover:bg-[#d8f524]/90 gap-2 font-medium">
                <Plus className="h-4 w-4" /> Create Hackathon
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#d8f524] mb-4" />
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-destructive">
            <p className="text-lg">Failed to load dashboard data.</p>
            <p className="text-sm">Please check if the backend is running and you are logged in as an organizer.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Stats Section */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden relative group">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#d8f524]/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Hackathons Created</p>
                      <p className="font-heading text-3xl font-bold">{stats.totalHackathonsCreated}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden relative group">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
                      <p className="font-heading text-3xl font-bold">{stats.totalParticipants.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="sm:col-span-2 lg:col-span-1">
                <Card className="border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden relative group">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Teams</p>
                      <p className="font-heading text-3xl font-bold">{stats.totalSubmissions.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Hackathon List */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#d8f524]" /> Your Hackathons
              </h2>
              
              {hackathons.length === 0 ? (
                <Card className="border-border/30 bg-card/20 backdrop-blur-sm border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <LayoutDashboard className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No hackathons yet</h3>
                    <p className="text-muted-foreground max-w-sm mb-6">
                      You haven't created any hackathons yet. Start your journey by creating your first event.
                    </p>
                    <Link to="/organizer/create-hackathon">
                      <Button className="bg-[#d8f524] text-black hover:bg-[#d8f524]/90">
                        <Plus className="h-4 w-4 mr-2" /> Create Your First Hackathon
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border/50 bg-card/30 backdrop-blur-md shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50 text-left text-muted-foreground bg-muted/20">
                          <th className="px-6 py-4 font-medium">Hackathon Title</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium hidden sm:table-cell">Participants</th>
                          <th className="px-6 py-4 font-medium hidden md:table-cell">Teams</th>
                          <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hackathons.map((h, i) => (
                          <motion.tr 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.1 * i }}
                            key={h.id} 
                            className="border-b border-border/30 last:border-0 hover:bg-muted/10 transition-colors group"
                          >
                            <td className="px-6 py-4 font-medium">{h.title}</td>
                            <td className="px-6 py-4">
                              <Badge variant="outline" className={`capitalize border ${statusColor[h.status] || "bg-muted text-muted-foreground"}`}>
                                {h.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 hidden sm:table-cell text-muted-foreground">
                              {(h.participants || 0).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell text-muted-foreground">
                              {(h.teams || 0).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                <Link to={`/organizer/hackathon/${h.id}/manage`}>
                                  <Button variant="ghost" size="sm" className="h-8 hover:bg-white/5 hover:text-white">
                                    <Settings className="h-3.5 w-3.5 mr-1.5" /> Manage
                                  </Button>
                                </Link>
                                <Link to={`/organizer/hackathon/${h.id}/submissions`}>
                                  <Button variant="outline" size="sm" className="h-8 border-border/50 hover:bg-[#d8f524]/10 hover:text-[#d8f524] hover:border-[#d8f524]/30">
                                    <FileText className="h-3.5 w-3.5 mr-1.5" /> Submissions
                                  </Button>
                                </Link>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrganiserDashboard;