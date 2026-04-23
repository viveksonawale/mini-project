import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, XCircle, RefreshCcw, ShieldAlert } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { authService } from "@/services/authService";
import { hackathonService } from "@/services/hackathonService";
import { teamService } from "@/services/teamService";
import { submissionService } from "@/services/submissionService";
import { leaderboardService } from "@/services/leaderboardService";
import { userService } from "@/services/userService";
import { notificationService } from "@/services/notificationService";
import { useAuth } from "@/contexts/AuthContext";

type CheckResult = {
  key: string;
  label: string;
  ok: boolean;
  message: string;
  ms: number;
  authRequired: boolean;
};

type CheckSpec = {
  key: string;
  label: string;
  authRequired: boolean;
  run: () => Promise<unknown>;
};

const ApiHealth = () => {
  const { isAuthenticated, user } = useAuth();
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [ids, setIds] = useState({ hackathon: "1", team: "1", submission: "1" });

  const checks = useMemo<CheckSpec[]>(() => [
    { key: "auth.me", label: "Auth /me", authRequired: true, run: () => authService.me() },
    { key: "hackathons.list", label: "Hackathons list", authRequired: false, run: () => hackathonService.getHackathons({ page: 0, size: 5 }) },
    { key: "hackathons.detail", label: "Hackathon detail", authRequired: false, run: () => hackathonService.getHackathonById(ids.hackathon) },
    { key: "teams.invitations", label: "Team invitations", authRequired: true, run: () => teamService.getInvitations() },
    { key: "submissions.my", label: "My submission", authRequired: true, run: () => submissionService.getMySubmission(ids.hackathon) },
    { key: "submissions.detail", label: "Submission detail", authRequired: true, run: () => submissionService.getSubmissionDetail(ids.submission) },
    { key: "leaderboard", label: "Leaderboard", authRequired: false, run: () => leaderboardService.getLeaderboard(ids.hackathon) },
    { key: "users.me", label: "Users /me", authRequired: true, run: () => userService.getMe() },
    { key: "notifications.list", label: "Notifications list", authRequired: true, run: () => notificationService.getAll() },
    { key: "teams.byId", label: "Team detail", authRequired: true, run: () => teamService.getTeamById(ids.team) },
  ], [ids]);

  const runChecks = async () => {
    setRunning(true);
    
    // 1. Try to fetch some real IDs if possible
    let hackathonId = "1";
    let teamId = "1";
    let submissionId = "1";

    try {
      const hackathons = await hackathonService.getHackathons({ page: 0, size: 5 });
      if (hackathons.items?.length) {
        hackathonId = String(hackathons.items[0].id);
        
        // Try to find a team for this hackathon
        const teams = await teamService.getTeamsByHackathon(hackathonId);
        if (teams.length) {
          teamId = String(teams[0].id);
        }

        // Try to find submissions for this hackathon
        if (user?.role === "organiser") {
          const subs = await submissionService.getHackathonSubmissions(hackathonId);
          if (subs.length) {
            submissionId = String(subs[0].id);
          }
        }
      }
    } catch (e) {
      console.warn("Failed to fetch dynamic IDs for health check, falling back to defaults", e);
    }

    setIds({ hackathon: hackathonId, team: teamId, submission: submissionId });

    const settled = await Promise.all(
      checks.map(async (check): Promise<CheckResult> => {
        if (check.authRequired && !isAuthenticated) {
          return {
            key: check.key,
            label: check.label,
            ok: false,
            message: "Skipped: login required",
            ms: 0,
            authRequired: true,
          };
        }

        const start = performance.now();
        try {
          await check.run();
          return {
            key: check.key,
            label: check.label,
            ok: true,
            message: "OK",
            ms: Math.round(performance.now() - start),
            authRequired: check.authRequired,
          };
        } catch (e) {
          return {
            key: check.key,
            label: check.label,
            ok: false,
            message: e instanceof Error ? e.message : "Failed",
            ms: Math.round(performance.now() - start),
            authRequired: check.authRequired,
          };
        }
      })
    );
    setResults(settled);
    setRunning(false);
  };

  const okCount = results.filter((r) => r.ok).length;
  const failCount = results.filter((r) => !r.ok).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold">API Health</h1>
              <p className="text-muted-foreground">Quickly verify frontend-backend integration across all connected modules.</p>
            </div>
            <Button className="gap-2" onClick={runChecks} disabled={running}>
              <RefreshCcw className={`h-4 w-4 ${running ? "animate-spin" : ""}`} />
              {running ? "Running..." : "Run checks"}
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">Total checks</div><div className="text-2xl font-bold">{checks.length}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">Passed</div><div className="text-2xl font-bold text-accent">{okCount}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-sm text-muted-foreground">Failed / Skipped</div><div className="text-2xl font-bold text-destructive">{failCount}</div></CardContent></Card>
        </div>

        {!isAuthenticated && (
          <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            Protected checks will be skipped until you login.
          </div>
        )}

        <div className="space-y-3">
          {checks.map((check) => {
            const result = results.find((r) => r.key === check.key);
            const ok = result?.ok;
            return (
              <Card key={check.key} className="border-border/50">
                <CardHeader className="py-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span className="flex items-center gap-2"><Activity className="h-4 w-4" />{check.label}</span>
                    {result ? (
                      ok ? <Badge className="bg-accent/20 text-accent"><CheckCircle2 className="h-3 w-3 mr-1" />OK</Badge> : <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Fail</Badge>
                    ) : (
                      <Badge variant="outline">Not run</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-3 text-sm text-muted-foreground">
                  {result ? `${result.message}${result.ms ? ` • ${result.ms}ms` : ""}` : "No data yet"}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiHealth;

