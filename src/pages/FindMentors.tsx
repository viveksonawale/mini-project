import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, MessageSquare, Filter, Clock, CheckCircle, Send, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { hackathonService } from "@/services/hackathonService";

type Mentor = {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  domains: string[];
  skills: string[];
  rating: number;
  sessionsCompleted: number;
  availability: "available" | "busy" | "offline";
  avatar: string;
};

const availabilityConfig: Record<string, { label: string; class: string }> = {
  available: { label: "Available", class: "bg-accent/20 text-accent-foreground border-accent/30" },
  busy: { label: "Busy", class: "bg-evnova-orange/20 text-foreground border-evnova-orange/30" },
  offline: { label: "Offline", class: "bg-muted text-muted-foreground border-border" },
};

const DUMMY_MENTORS: Mentor[] = [
  {
    id: "m1",
    name: "Dr. Anika Sharma",
    title: "AI Research Lead",
    company: "DeepMind",
    bio: "10+ years in ML research. Published author, ex-Google Brain. Passionate about ethical AI and mentoring the next generation of ML engineers.",
    domains: ["AI/ML", "NLP", "Computer Vision"],
    skills: ["Python", "TensorFlow", "PyTorch", "Research", "MLOps"],
    rating: 4.9,
    sessionsCompleted: 34,
    availability: "available",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "m2",
    name: "Rohan Mehta",
    title: "Blockchain Protocol Engineer",
    company: "Polygon Labs",
    bio: "Core contributor to multiple DeFi protocols. Deep expertise in Solidity, ZK proofs, and Layer 2 scaling. Love helping teams build production-grade dApps.",
    domains: ["Blockchain", "DeFi", "Web3"],
    skills: ["Solidity", "Hardhat", "Ethers.js", "ZK Proofs", "Rust"],
    rating: 4.8,
    sessionsCompleted: 21,
    availability: "available",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "m3",
    name: "Priya Kapoor",
    title: "Senior Full Stack Engineer",
    company: "Razorpay",
    bio: "Full stack at scale. Built systems handling ₹1B+ daily transactions. Loves React, Node.js, system design, and helping hackers turn prototypes into products.",
    domains: ["Healthcare", "FinTech", "Education"],
    skills: ["React", "Node.js", "TypeScript", "System Design", "PostgreSQL"],
    rating: 4.7,
    sessionsCompleted: 28,
    availability: "available",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "m4",
    name: "Sam Chen",
    title: "IoT Solutions Architect",
    company: "Bosch",
    bio: "15 years in embedded systems and IoT. Led development of smart factory platforms. Expert in MQTT, edge computing, and real-time sensor data pipelines.",
    domains: ["IoT", "CleanTech", "Sustainability"],
    skills: ["IoT", "MQTT", "C++", "Edge AI", "Kubernetes"],
    rating: 4.6,
    sessionsCompleted: 17,
    availability: "busy",
    avatar: "https://i.pravatar.cc/150?img=67",
  },
  {
    id: "m5",
    name: "Alia Raza",
    title: "Health Tech Product Lead",
    company: "Philips Healthcare",
    bio: "Clinical informatics expert with an engineering background. Bridging the gap between medical needs and technology. Mentor for healthcare innovation challenges.",
    domains: ["Healthcare", "AI/ML", "Data Analytics"],
    skills: ["Python", "FHIR", "React", "Data Analytics", "Clinical NLP"],
    rating: 4.9,
    sessionsCompleted: 42,
    availability: "available",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "m6",
    name: "Ishaan Bhatia",
    title: "DevOps & Cloud Architect",
    company: "Microsoft",
    bio: "Cloud-native evangelist. Built and scaled infrastructure for millions of users. Helping hackathon teams deploy faster and smarter with CI/CD and cloud best practices.",
    domains: ["CleanTech", "Education", "AI/ML"],
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
    rating: 4.7,
    sessionsCompleted: 19,
    availability: "available",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
];

const FindMentors = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [requestMessage, setRequestMessage] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const all = await hackathonService.getHackathons({ page: 0, size: 100 });
        const byOrganizer = new Map<string, Mentor>();
        all.items.forEach((h) => {
          if (!h.organizer) return;
          const key = String(h.organizer.id);
          if (!byOrganizer.has(key)) {
            byOrganizer.set(key, {
              id: key,
              name: h.organizer.name,
              title: "Hackathon Organizer",
              company: "EVNOVA",
              bio: `Organizer of ${h.title} and mentor for builders.`,
              domains: h.themes?.slice(0, 3) || [],
              skills: h.themes?.slice(0, 5) || [],
              rating: 4.8,
              sessionsCompleted: 12,
              availability: "available",
              avatar: h.organizer.name.charAt(0).toUpperCase(),
            });
          }
        });
        const result = Array.from(byOrganizer.values());
        setMentors(result.length > 0 ? result : DUMMY_MENTORS);
      } catch {
        setMentors(DUMMY_MENTORS);
      }
    };
    load();
  }, []);

  const allDomains = useMemo(() => {
    const set = new Set<string>();
    mentors.forEach((m) => m.domains.forEach((d) => set.add(d)));
    return Array.from(set);
  }, [mentors]);

  const filtered = mentors.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.skills.some((s) => s.toLowerCase().includes(q)) || m.domains.some((d) => d.toLowerCase().includes(q));
    const matchesDomain = domainFilter === "all" || m.domains.includes(domainFilter);
    return matchesSearch && matchesDomain;
  });

  const handleRequest = () => {
    if (!requestMessage.trim()) return;
    toast({ title: "Request Sent!", description: `Your mentorship request has been sent to ${selectedMentor?.name}.` });
    setRequestMessage("");
    setSelectedMentor(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pb-16 pt-24">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary">
            <Users className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-4xl font-bold">Find a Mentor</h1>
          <p className="mt-2 text-muted-foreground">Connect with industry experts to level up your hackathon project</p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name, skill, or domain..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={domainFilter} onValueChange={setDomainFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {allDomains.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mentor Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((mentor, i) => {
              const avail = availabilityConfig[mentor.availability];
              return (
                <motion.div key={mentor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}>
                  <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {mentor.avatar.startsWith("http") ? (
                            <img
                              src={mentor.avatar}
                              alt={mentor.name}
                              className="h-12 w-12 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-primary-foreground">
                              {mentor.avatar}
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-base">{mentor.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">{mentor.title} · {mentor.company}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={avail.class}>{avail.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {mentor.domains.map((d) => (
                          <Badge key={d} className="bg-primary/10 text-primary border-0 text-xs">{d}</Badge>
                        ))}
                        {mentor.skills.slice(0, 3).map((s) => (
                          <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-evnova-orange">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-medium">{mentor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>{mentor.sessionsCompleted} sessions</span>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground" size="sm" disabled={mentor.availability === "offline"} onClick={() => setSelectedMentor(mentor)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Request Mentorship
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Request Mentorship from {mentor.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-bold text-primary-foreground">{mentor.avatar}</div>
                              <div>
                                <p className="font-medium">{mentor.name}</p>
                                <p className="text-xs text-muted-foreground">{mentor.domains.join(", ")}</p>
                              </div>
                            </div>
                            <div>
                              <label className="mb-1.5 block text-sm font-medium">Your Message</label>
                              <Textarea placeholder="Describe your project and what guidance you need..." value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} rows={4} />
                            </div>
                            <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground" onClick={handleRequest}>
                              <Send className="mr-2 h-4 w-4" /> Send Request
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <Users className="mx-auto mb-3 h-12 w-12 opacity-40" />
            <p className="text-lg font-medium">No mentors found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FindMentors;