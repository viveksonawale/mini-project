import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Globe, Trophy, Users, Clock, ArrowLeft, UserPlus, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hackathonService, type HackathonItem } from "@/services/hackathonService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const HackathonDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [h, setH] = useState<HackathonItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await hackathonService.getHackathonById(id);
        setH(data);
      } catch (e) {
        toast({ title: "Failed to load hackathon", description: e instanceof Error ? e.message : "Please retry", variant: "destructive" });
        setH(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, toast]);

  if (loading) {
    return <div className="min-h-screen bg-background"><Navbar /><div className="container mx-auto px-4 pt-24">Loading...</div></div>;
  }

  if (!h) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-xl text-muted-foreground">Hackathon not found.</p>
          <Link to="/hackathons"><Button variant="link">Browse hackathons</Button></Link>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    navigate(`/hackathons/${h.id}/register`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/hackathons" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to hackathons
        </Link>

        {/* Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden relative mb-8">
          {h.bannerImageUrl && (
            <img
              src={h.bannerImageUrl}
              alt={h.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className={`relative p-8 md:p-12 ${h.bannerImageUrl
            ? "bg-gradient-to-t from-black/80 via-black/50 to-black/20"
            : "bg-gradient-to-br from-primary to-secondary"}`}>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-background/20 text-white backdrop-blur-sm">{h.status}</Badge>
              <Badge className="bg-background/20 text-white backdrop-blur-sm">{h.type?.toLowerCase() === "online" ? "🌐 Online" : "📍 Offline"}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading text-white mb-2">{h.title}</h1>
            <p className="text-white/80 text-lg max-w-2xl">{h.description}</p>
            <p className="text-white/60 text-sm mt-4">Organised by {h.organizer?.name || "Organizer"}</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Details</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <InfoRow icon={Calendar} label="Start Date" value={h.startDate} />
                <InfoRow icon={Calendar} label="End Date" value={h.endDate} />
                <InfoRow icon={Clock} label="Registration Deadline" value={h.registrationDeadline} />
                <InfoRow icon={Users} label="Max Team Size" value={String(h.maxTeamSize)} />
                {h.type?.toLowerCase() === "offline" && <InfoRow icon={MapPin} label="Venue" value="Offline Event" />}
                {h.type?.toLowerCase() === "online" && <InfoRow icon={Globe} label="Mode" value="Online" />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Themes</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {h.themes.map((t) => (
                  <Badge key={t} variant="secondary" className="text-sm">{t}</Badge>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/30">
              <CardContent className="p-6 text-center space-y-4">
                <Trophy className="h-10 w-10 mx-auto text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Prize Pool</p>
                  <p className="text-3xl font-bold font-heading">${h.prizePool ?? 0}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{h.participants}</p>
                    <p className="text-xs text-muted-foreground">Participants</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{h.teams}</p>
                    <p className="text-xs text-muted-foreground">Teams</p>
                  </div>
                </div>
                {(h.status === "UPCOMING" || h.status === "ACTIVE") && (
                  <Button onClick={handleRegister} className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground gap-2">
                    <UserPlus className="h-4 w-4" /> Register Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-5 w-5 text-primary mt-0.5" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default HackathonDetail;