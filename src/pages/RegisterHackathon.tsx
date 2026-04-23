import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Plus, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { hackathonService, type HackathonItem } from "@/services/hackathonService";

const RegisterHackathon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hackathon, setHackathon] = useState<HackathonItem | null>(null);

  const [teamName, setTeamName] = useState("");
  const [college, setCollege] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await hackathonService.getHackathonById(id);
        setHackathon(data);
      } catch (e) {
        toast({ title: "Could not load hackathon", description: e instanceof Error ? e.message : "Please retry", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, toast]);

  if (loading) {
    return <div className="min-h-screen bg-background"><Navbar /><div className="container mx-auto px-4 pt-24">Loading...</div></div>;
  }

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

  const addMember = () => {
    if (memberInput.trim() && members.length < (hackathon.maxTeamSize || 4) - 1) {
      setMembers([...members, memberInput.trim()]);
      setMemberInput("");
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSubmit = async () => {
    if (!id) return;
    if (!teamName.trim()) { toast({ title: "Team name is required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      await hackathonService.joinHackathon(id);
      setSubmitted(true);
      toast({ title: "Registration successful!", description: `Joined ${hackathon.title}. You can now create your team.` });
    } catch (e) {
      toast({ title: "Registration failed", description: e instanceof Error ? e.message : "Please retry", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Card className="max-w-md text-center">
              <CardContent className="p-8 space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-2xl font-bold font-heading">You're In!</h2>
                <p className="text-muted-foreground">Team <strong>{teamName}</strong> is registered for <strong>{hackathon.title}</strong></p>
                <div className="flex gap-3 justify-center pt-2">
                  <Button variant="outline" onClick={() => navigate("/participant/dashboard")}>Dashboard</Button>
                  <Button onClick={() => navigate("/hackathons")} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">Browse More</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-2xl px-4 pt-24 pb-16">
        <Link to={`/hackathons/${id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to {hackathon.title}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Register for {hackathon.title}</CardTitle>
              <CardDescription>Max team size: {hackathon.maxTeamSize || 4} members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Team Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Team Name *</label>
                <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. Neural Ninjas" />
              </div>

              {/* Members */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Team Members</label>
                <div className="flex gap-2">
                  <Input value={memberInput} onChange={(e) => setMemberInput(e.target.value)} placeholder="Member name"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addMember())} />
                  <Button type="button" size="icon" variant="outline" onClick={addMember}><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {members.map((m, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {m} <X className="h-3 w-3 cursor-pointer" onClick={() => setMembers(members.filter((_, j) => j !== i))} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* College */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">College / Organisation</label>
                <Input value={college} onChange={(e) => setCollege(e.target.value)} placeholder="e.g. MIT" />
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Skills</label>
                <div className="flex gap-2">
                  <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="e.g. React"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
                  <Button type="button" size="icon" variant="outline" onClick={addSkill}><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {skills.map((s) => (
                    <Badge key={s} variant="outline" className="gap-1">
                      {s} <X className="h-3 w-3 cursor-pointer" onClick={() => setSkills(skills.filter((x) => x !== s))} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* GitHub */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">GitHub Repository</label>
                <Input value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} placeholder="https://github.com/..." />
              </div>

              <Button disabled={submitting} onClick={handleSubmit} className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                {submitting ? "Registering..." : "Register Team"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default RegisterHackathon;