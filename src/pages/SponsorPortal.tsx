import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye, MousePointerClick, Users, MessageSquare, TrendingUp, ExternalLink,
  Edit3, Save, BarChart3, Globe, Sparkles, Crown, Medal, Award, Star,
  Calendar, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useToast } from "@/hooks/use-toast";
import {
  sponsorBranding, sponsorEngagement, sponsoredHackathons, sponsorAnalytics,
  type SponsorBranding,
} from "../data/sponsorMockData";

const tierConfig: Record<string, { icon: React.ElementType; color: string }> = {
  platinum: { icon: Crown, color: "text-purple-400" },
  gold: { icon: Medal, color: "text-yellow-400" },
  silver: { icon: Award, color: "text-slate-400" },
  bronze: { icon: Star, color: "text-orange-400" },
};

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  completed: "bg-muted text-muted-foreground border-border",
  upcoming: "bg-primary/10 text-primary border-primary/20",
};

const chartConfig = {
  impressions: { label: "Impressions", color: "hsl(var(--primary))" },
  clicks: { label: "Clicks", color: "hsl(var(--secondary))" },
};

const pieColors = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
];

const SponsorPortal = () => {
  const { toast } = useToast();
  const [branding, setBranding] = useState<SponsorBranding>(sponsorBranding);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(branding);

  const saveBranding = () => {
    setBranding(editForm);
    setEditing(false);
    toast({ title: "Branding updated", description: "Your changes have been saved." });
  };

  const stats = [
    { label: "Total Impressions", value: sponsorEngagement.impressions.toLocaleString(), icon: Eye, change: "+12.4%", up: true },
    { label: "Total Clicks", value: sponsorEngagement.clicks.toLocaleString(), icon: MousePointerClick, change: "+8.2%", up: true },
    { label: "Applications", value: sponsorEngagement.applications.toLocaleString(), icon: Users, change: "+15.7%", up: true },
    { label: "Mentor Sessions", value: sponsorEngagement.mentorSessions.toLocaleString(), icon: MessageSquare, change: "-2.1%", up: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading">Sponsor Portal</h1>
              <p className="text-muted-foreground text-sm">Manage branding, track engagement & view analytics</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <s.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? "text-green-500" : "text-red-500"}`}>
                      {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {s.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="branding" className="space-y-6">
          <TabsList className="bg-muted/50 border border-border/50">
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Branding Tab */}
          <TabsContent value="branding">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="border-border/50">
                <CardHeader className="flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Brand Profile</CardTitle>
                    <CardDescription>Manage how your brand appears across hackathons</CardDescription>
                  </div>
                  {!editing ? (
                    <Button variant="outline" size="sm" onClick={() => { setEditForm(branding); setEditing(true); }}>
                      <Edit3 className="h-3.5 w-3.5 mr-1.5" /> Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                      <Button size="sm" onClick={saveBranding}><Save className="h-3.5 w-3.5 mr-1.5" /> Save</Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="shrink-0">
                      <img
                        src={branding.logo}
                        alt="Sponsor logo"
                        className="h-28 w-28 rounded-xl border border-border/50 object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      {editing ? (
                        <>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Tagline</label>
                            <Input value={editForm.tagline} onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })} />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Website</label>
                            <Input value={editForm.website} onChange={(e) => setEditForm({ ...editForm, website: e.target.value })} />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Description</label>
                            <Textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={3} />
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-semibold">{branding.tagline}</p>
                          <a href={branding.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-primary hover:underline">
                            <Globe className="h-3.5 w-3.5" /> {branding.website}
                          </a>
                          <p className="text-sm text-muted-foreground leading-relaxed">{branding.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Hackathons Tab */}
          <TabsContent value="hackathons">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {sponsoredHackathons.map((h) => {
                const TierIcon = tierConfig[h.tier]?.icon || Star;
                const tierColor = tierConfig[h.tier]?.color || "text-muted-foreground";
                const ctr = h.impressions > 0 ? ((h.clicks / h.impressions) * 100).toFixed(1) : "0";
                return (
                  <Card key={h.id} className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold truncate">{h.name}</h3>
                            <Badge variant="outline" className={statusColors[h.status]}>
                              {h.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {h.date}</span>
                            <span className={`flex items-center gap-1 ${tierColor}`}>
                              <TierIcon className="h-3 w-3" /> {h.tier}
                            </span>
                            {h.participants > 0 && (
                              <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {h.participants}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="font-bold">{(h.impressions / 1000).toFixed(1)}k</p>
                            <p className="text-xs text-muted-foreground">Views</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold">{(h.clicks / 1000).toFixed(1)}k</p>
                            <p className="text-xs text-muted-foreground">Clicks</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold">{ctr}%</p>
                            <p className="text-xs text-muted-foreground">CTR</p>
                          </div>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {h.status === "active" && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Campaign Progress</span>
                            <span>68%</span>
                          </div>
                          <Progress value={68} className="h-1.5" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-2">
              {/* Engagement Over Time */}
              <Card className="border-border/50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> Engagement Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <LineChart data={sponsorAnalytics.monthlyImpressions}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="impressions" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="clicks" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* ROI by Hackathon */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" /> ROI by Hackathon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[260px] w-full">
                    <BarChart data={sponsorAnalytics.topHackathons}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                      <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 10 }} />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="roi" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Tier Distribution */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Sponsorship Tiers</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ChartContainer config={chartConfig} className="h-[260px] w-full">
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie data={sponsorAnalytics.tierDistribution} dataKey="count" nameKey="tier" cx="50%" cy="50%" outerRadius={90} label>
                        {sponsorAnalytics.tierDistribution.map((_, i) => (
                          <Cell key={i} fill={pieColors[i % pieColors.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default SponsorPortal;