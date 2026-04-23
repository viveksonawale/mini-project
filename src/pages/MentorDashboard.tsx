import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Clock, CheckCircle, XCircle, Star, MessageSquare, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { mentorRequests, type MentorRequest } from "../data/mentorMockData";

const MentorDashboard = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MentorRequest[]>(mentorRequests);

  const pending = requests.filter((r) => r.status === "pending");
  const accepted = requests.filter((r) => r.status === "accepted");
  const completed = requests.filter((r) => r.status === "completed");

  const updateStatus = (id: string, status: MentorRequest["status"]) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast({ title: status === "accepted" ? "Request Accepted" : status === "declined" ? "Request Declined" : "Session Completed" });
  };

  const stats = [
    { label: "Pending", value: pending.length, icon: Clock, color: "text-evnova-orange" },
    { label: "Active Mentees", value: accepted.length, icon: Users, color: "text-primary" },
    { label: "Completed", value: completed.length, icon: CheckCircle, color: "text-accent" },
    { label: "Rating", value: "4.9", icon: Star, color: "text-evnova-orange" },
  ];

  const RequestCard = ({ req }: { req: MentorRequest }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-border/50 transition-all hover:border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-bold text-primary-foreground">
              {req.participantAvatar}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{req.participantName}</p>
                  <p className="text-xs text-muted-foreground">{req.hackathonTitle} · {req.requestedAt}</p>
                </div>
                <Badge variant="outline" className={
                  req.status === "pending" ? "border-evnova-orange/30 bg-evnova-orange/10" :
                  req.status === "accepted" ? "border-accent/30 bg-accent/10" :
                  "border-muted bg-muted"
                }>
                  {req.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{req.message}</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge className="bg-primary/10 text-primary border-0 text-xs">{req.domain}</Badge>
                {req.skills.map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                ))}
              </div>
              {req.status === "pending" && (
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground" onClick={() => updateStatus(req.id, "accepted")}>
                    <CheckCircle className="mr-1 h-3.5 w-3.5" /> Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateStatus(req.id, "declined")}>
                    <XCircle className="mr-1 h-3.5 w-3.5" /> Decline
                  </Button>
                </div>
              )}
              {req.status === "accepted" && (
                <Button size="sm" variant="outline" onClick={() => updateStatus(req.id, "completed")}>
                  <Award className="mr-1 h-3.5 w-3.5" /> Mark Complete
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pb-16 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl font-bold">Mentor Dashboard</h1>
          <p className="text-muted-foreground">Manage mentorship requests and track your sessions</p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border/50">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <s.icon className={`h-5 w-5 ${s.color}`} />
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

        {/* Tabs */}
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending" className="gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Pending ({pending.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" /> Active ({accepted.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" /> Completed ({completed.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pending.length ? pending.map((r) => <RequestCard key={r.id} req={r} />) : (
              <div className="py-16 text-center text-muted-foreground">
                <Clock className="mx-auto mb-2 h-10 w-10 opacity-40" />
                <p>No pending requests</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            {accepted.length ? accepted.map((r) => <RequestCard key={r.id} req={r} />) : (
              <div className="py-16 text-center text-muted-foreground">
                <Users className="mx-auto mb-2 h-10 w-10 opacity-40" />
                <p>No active mentees</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            {completed.length ? completed.map((r) => <RequestCard key={r.id} req={r} />) : (
              <div className="py-16 text-center text-muted-foreground">
                <CheckCircle className="mx-auto mb-2 h-10 w-10 opacity-40" />
                <p>No completed sessions yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MentorDashboard;