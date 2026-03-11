import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Zap, Users, FileText, Plus, Eye, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  dashboardStats,
  participationTrend,
  domainDistribution,
  orgHackathons,
} from "@/data/organiserMockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  "file-text": <FileText className="h-5 w-5" />,
};

const PIE_COLORS = [
  "hsl(262, 83%, 58%)",
  "hsl(220, 70%, 55%)",
  "hsl(142, 76%, 46%)",
  "hsl(25, 95%, 53%)",
  "hsl(270, 90%, 65%)",
];

const statusColor: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  open: "bg-accent/20 text-accent",
  ongoing: "bg-primary/20 text-primary",
  completed: "bg-secondary/20 text-secondary",
};

const OrganiserDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Organiser Dashboard</h1>
            <p className="text-muted-foreground">Manage your hackathons and track performance</p>
          </div>
          <Link to="/organiser/create-hackathon">
            <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground gap-2">
              <Plus className="h-4 w-4" /> Create Hackathon
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-border/50">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {iconMap[stat.icon]}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-heading text-2xl font-bold">{stat.value.toLocaleString()}</p>
                    <p className="text-xs text-accent">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-lg">
                <TrendingUp className="h-5 w-5 text-primary" /> Participation Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={participationTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                  <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="participants" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} name="Participants" />
                  <Bar dataKey="teams" fill="hsl(220, 70%, 55%)" radius={[4, 4, 0, 0]} name="Teams" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Domain Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={domainDistribution} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {domainDistribution.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Hackathon list */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-lg">
              <Calendar className="h-5 w-5 text-primary" /> Your Hackathons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium hidden sm:table-cell">Participants</th>
                    <th className="pb-3 font-medium hidden sm:table-cell">Teams</th>
                    <th className="pb-3 font-medium hidden md:table-cell">Dates</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orgHackathons.map((h) => (
                    <tr key={h.id} className="border-b border-border/50 last:border-0">
                      <td className="py-3 font-medium">{h.title}</td>
                      <td className="py-3">
                        <Badge variant="secondary" className={`capitalize ${statusColor[h.status]}`}>{h.status}</Badge>
                      </td>
                      <td className="py-3 hidden sm:table-cell">{h.participants}</td>
                      <td className="py-3 hidden sm:table-cell">{h.teams}</td>
                      <td className="py-3 hidden md:table-cell text-muted-foreground">
                        {new Date(h.startDate).toLocaleDateString()} – {new Date(h.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right space-x-1">
                        {(h.status === "ongoing" || h.status === "completed") && (
                          <Link to={`/organiser/hackathon/${h.id}/submissions`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <FileText className="h-3 w-3" /> Submissions
                            </Button>
                          </Link>
                        )}
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-3 w-3" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrganiserDashboard;