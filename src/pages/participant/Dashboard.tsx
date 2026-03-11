import { motion } from "framer-motion";
import { Trophy, FileText, Users, Bell, Calendar, ExternalLink, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { myRegistrations, teamRequests, participantStats } from "@/data/participantMockData";
import { useAuth } from "@/contexts/AuthContext";

const statusColor: Record<string, string> = {
  registered: "bg-secondary text-secondary-foreground",
  submitted: "bg-accent text-accent-foreground",
  shortlisted: "bg-primary text-primary-foreground",
  winner: "bg-[hsl(var(--evnova-orange))] text-primary-foreground",
};

const ParticipantDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Hackathons", value: participantStats.hackathonsJoined, icon: Calendar, color: "text-primary" },
    { label: "Submissions", value: participantStats.submissions, icon: FileText, color: "text-secondary" },
    { label: "Wins", value: participantStats.wins, icon: Trophy, color: "text-accent" },
    { label: "Team Requests", value: participantStats.teamRequests, icon: Bell, color: "text-[hsl(var(--evnova-orange))]" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold font-heading">Welcome back, {user?.name?.split(" ")[0] || "Participant"} 👋</h1>
          <p className="text-muted-foreground">Here's your hackathon activity at a glance.</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`rounded-xl bg-muted p-3 ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Registrations */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-heading">My Hackathons</h2>
              <Link to="/hackathons"><Button variant="link" size="sm">Browse more</Button></Link>
            </div>
            {myRegistrations.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{r.hackathonTitle}</h3>
                          <Badge className={statusColor[r.status]}>{r.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Team: {r.teamName} • {r.members.length} members</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {r.skills.map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {r.githubRepo && (
                          <a href={r.githubRepo} target="_blank" rel="noreferrer">
                            <Button size="sm" variant="outline" className="gap-1"><ExternalLink className="h-3 w-3" />Repo</Button>
                          </a>
                        )}
                        <Link to={`/hackathons/${r.hackathonId}`}>
                          <Button size="sm" variant="ghost">View</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Team Requests */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading">Team Requests</h2>
            {teamRequests.map((t) => (
              <Card key={t.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{t.from}</p>
                      <div className="flex gap-1 mt-0.5">
                        {t.skills.slice(0, 2).map((s) => <Badge key={s} variant="outline" className="text-[10px] px-1.5 py-0">{s}</Badge>)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.message}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1 bg-accent text-accent-foreground hover:bg-accent/80"><Check className="h-3 w-3" />Accept</Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1"><X className="h-3 w-3" />Decline</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ParticipantDashboard;