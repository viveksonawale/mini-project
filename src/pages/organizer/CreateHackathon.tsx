import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STEPS = ["Basic Info", "Details", "Themes & Rules", "Review"];

const SUGGESTED_THEMES = ["AI/ML", "Web3", "Healthcare", "FinTech", "IoT", "Sustainability", "Education", "Gaming", "Cybersecurity", "Social Impact"];

interface FormData {
  title: string;
  description: string;
  type: "online" | "offline";
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  venue: string;
  prizePool: string;
  maxTeamSize: number;
  themes: string[];
  rules: string;
}

const initial: FormData = {
  title: "",
  description: "",
  type: "online",
  startDate: "",
  endDate: "",
  registrationDeadline: "",
  venue: "",
  prizePool: "",
  maxTeamSize: 4,
  themes: [],
  rules: "",
};

const CreateHackathon = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const navigate = useNavigate();
  const { toast } = useToast();

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const toggleTheme = (t: string) => {
    setForm((p) => ({
      ...p,
      themes: p.themes.includes(t) ? p.themes.filter((x) => x !== t) : [...p.themes, t],
    }));
  };

  const canNext = () => {
    if (step === 0) return form.title && form.description;
    if (step === 1) return form.startDate && form.endDate && form.registrationDeadline && form.prizePool;
    if (step === 2) return form.themes.length > 0;
    return true;
  };

  const handlePublish = () => {
    toast({ title: "Hackathon Created! 🎉", description: `"${form.title}" has been published successfully.` });
    navigate("/organiser/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <Button variant="ghost" className="mb-4 gap-1" onClick={() => navigate("/organiser/dashboard")}>
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>

        <h1 className="mb-2 font-heading text-3xl font-bold">Create Hackathon</h1>
        <p className="mb-8 text-muted-foreground">Fill in the details to launch your hackathon</p>

        {/* Stepper */}
        <div className="mb-8 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i <= step
                    ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-xs font-medium sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && <div className={`mx-1 h-0.5 flex-1 rounded ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-5">
                {step === 0 && (
                  <>
                    <div className="space-y-2">
                      <Label>Hackathon Title *</Label>
                      <Input placeholder="e.g. AI Innovation Challenge" value={form.title} onChange={(e) => set("title", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description *</Label>
                      <Textarea placeholder="Describe your hackathon..." rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <div className="flex gap-3">
                        {(["online", "offline"] as const).map((t) => (
                          <Button
                            key={t}
                            type="button"
                            variant={form.type === t ? "default" : "outline"}
                            className={form.type === t ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground" : ""}
                            onClick={() => set("type", t)}
                          >
                            {t === "online" ? "🌐 Online" : "🏢 Offline"}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Start Date *</Label>
                        <Input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date *</Label>
                        <Input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Registration Deadline *</Label>
                      <Input type="date" value={form.registrationDeadline} onChange={(e) => set("registrationDeadline", e.target.value)} />
                    </div>
                    {form.type === "offline" && (
                      <div className="space-y-2">
                        <Label>Venue</Label>
                        <Input placeholder="e.g. MIT Campus, Boston" value={form.venue} onChange={(e) => set("venue", e.target.value)} />
                      </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Prize Pool *</Label>
                        <Input placeholder="e.g. $10,000" value={form.prizePool} onChange={(e) => set("prizePool", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Team Size</Label>
                        <Input type="number" min={1} max={10} value={form.maxTeamSize} onChange={(e) => set("maxTeamSize", Number(e.target.value))} />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label>Select Themes * (pick at least one)</Label>
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_THEMES.map((t) => (
                          <Badge
                            key={t}
                            variant={form.themes.includes(t) ? "default" : "outline"}
                            className={`cursor-pointer transition-all ${
                              form.themes.includes(t)
                                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => toggleTheme(t)}
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Rules & Guidelines</Label>
                      <Textarea placeholder="List rules, eligibility criteria, judging criteria..." rows={5} value={form.rules} onChange={(e) => set("rules", e.target.value)} />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-heading text-xl font-bold">Review Your Hackathon</h3>
                    <div className="grid gap-3 text-sm">
                      <Row label="Title" value={form.title} />
                      <Row label="Description" value={form.description} />
                      <Row label="Type" value={form.type} />
                      <Row label="Dates" value={`${form.startDate} → ${form.endDate}`} />
                      <Row label="Registration Deadline" value={form.registrationDeadline} />
                      {form.venue && <Row label="Venue" value={form.venue} />}
                      <Row label="Prize Pool" value={form.prizePool} />
                      <Row label="Max Team Size" value={String(form.maxTeamSize)} />
                      <Row label="Themes" value={form.themes.join(", ")} />
                      {form.rules && <Row label="Rules" value={form.rules} />}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          {step < STEPS.length - 1 ? (
            <Button disabled={!canNext()} onClick={() => setStep((s) => s + 1)} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground gap-1">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handlePublish} className="bg-gradient-to-r from-accent to-primary text-primary-foreground gap-1">
              <Zap className="h-4 w-4" /> Publish Hackathon
            </Button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-3">
    <span className="w-36 shrink-0 font-medium text-muted-foreground">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

export default CreateHackathon;