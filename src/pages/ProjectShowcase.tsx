import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ExternalLink, Github, Trophy, Medal, Award, Star, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { hackathonService } from "@/services/hackathonService";
import { leaderboardService } from "@/services/leaderboardService";

type ShowcaseProject = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  placement: "winner" | "runner-up" | "honorable-mention" | "participant";
  teamName: string;
  members: string[];
  hackathonTitle: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  upvotes: number;
  upvotedByUser: boolean;
  submittedAt: string;
  thumbnail: string;
};

const placementConfig = {
  winner: { icon: Trophy, label: "Winner", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  "runner-up": { icon: Medal, label: "Runner-up", className: "bg-muted text-muted-foreground border-border" },
  "honorable-mention": { icon: Award, label: "Honorable Mention", className: "bg-primary/20 text-primary border-primary/30" },
  participant: { icon: Star, label: "Participant", className: "bg-secondary/50 text-secondary-foreground border-secondary" },
};

const sortOptions = [
  { label: "Most Upvoted", value: "upvotes" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
] as const;

const ProjectShowcase = () => {
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"upvotes" | "newest" | "oldest">("upvotes");
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const all = await hackathonService.getHackathons({ status: "COMPLETED", page: 0, size: 20 });
        const assembled: ShowcaseProject[] = [];
        for (const h of all.items) {
          const board = await leaderboardService.getLeaderboard(h.id);
          board.forEach((entry, idx) => {
            assembled.push({
              id: `${h.id}-${entry.teamId}`,
              title: entry.teamName,
              tagline: `${h.title} finalist project`,
              description: `Team ${entry.teamName} scored ${entry.score} in ${h.title}.`,
              category: h.themes?.[0] || "General",
              placement: idx === 0 ? "winner" : idx === 1 ? "runner-up" : idx === 2 ? "honorable-mention" : "participant",
              teamName: entry.teamName,
              members: entry.members.map((m) => m.name),
              hackathonTitle: h.title,
              techStack: h.themes || [],
              githubUrl: "#",
              upvotes: Math.max(1, Math.round(entry.score || 0)),
              upvotedByUser: false,
              submittedAt: h.endDate,
              thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
            });
          });
        }
        setProjects(assembled);
      } catch {
        setProjects([]);
      }
    };
    load();
  }, []);

  const showcaseCategories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const handleUpvote = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, upvotes: p.upvotedByUser ? p.upvotes - 1 : p.upvotes + 1, upvotedByUser: !p.upvotedByUser }
          : p
      )
    );
  };

  const filtered = projects
    .filter((p) => category === "All" || p.category === category)
    .filter(
      (p) =>
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === "upvotes") return b.upvotes - a.upvotes;
      if (sort === "newest") return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Project{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Showcase</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Explore innovative projects built during hackathons. Upvote your favorites and get inspired.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects, tech stack..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {sortOptions.map((s) => (
                <Button
                  key={s.value}
                  variant={sort === s.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSort(s.value)}
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {showcaseCategories.map((c) => (
              <Button
                key={c}
                variant={category === c ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(c)}
                className="rounded-full"
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center text-muted-foreground">
              <Filter className="mx-auto mb-3 h-10 w-10 opacity-40" />
              <p className="text-lg font-medium">No projects found</p>
              <p className="text-sm">Try adjusting your filters or search terms.</p>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => {
                const placement = placementConfig[project.placement];
                const PlacementIcon = placement.icon;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className="group cursor-pointer overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <Badge className={`absolute left-3 top-3 ${placement.className}`}>
                          <PlacementIcon className="mr-1 h-3 w-3" />
                          {placement.label}
                        </Badge>
                      </div>

                      <CardContent className="p-5">
                        <h3 className="font-heading text-lg font-bold leading-tight">{project.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 4).map((t) => (
                            <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                              {t}
                            </span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                              +{project.techStack.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            by <span className="font-medium text-foreground">{project.teamName}</span>
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`gap-1.5 ${project.upvotedByUser ? "text-primary" : "text-muted-foreground"}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpvote(project.id);
                            }}
                          >
                            <ArrowUp className={`h-4 w-4 ${project.upvotedByUser ? "fill-primary" : ""}`} />
                            {project.upvotes}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <DialogTitle className="font-heading text-2xl">{selectedProject.title}</DialogTitle>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedProject.tagline}</p>
                </div>
                <Badge className={placementConfig[selectedProject.placement].className}>
                  {placementConfig[selectedProject.placement].label}
                </Badge>
              </div>
            </DialogHeader>

            <img
              src={selectedProject.thumbnail}
              alt={selectedProject.title}
              className="mt-2 w-full rounded-lg object-cover"
            />

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold">About</h4>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold">Team</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedProject.teamName}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedProject.members.map((m) => (
                      <span key={m} className="text-xs text-muted-foreground">{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Hackathon</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedProject.hackathonTitle}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold">Tech Stack</h4>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button asChild className="flex-1">
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View on GitHub
                  </a>
                </Button>
                {selectedProject.demoUrl && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
                <Button
                  variant={selectedProject.upvotedByUser ? "default" : "outline"}
                  onClick={() => handleUpvote(selectedProject.id)}
                >
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {projects.find((p) => p.id === selectedProject.id)?.upvotes}
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </div>
  );
};

export default ProjectShowcase;