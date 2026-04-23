import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MapPin, Globe, Calendar, Trophy, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { hackathonService, type HackathonItem } from "@/services/hackathonService";
import { useToast } from "@/hooks/use-toast";

const typeFilters = ["All", "Online", "Offline"] as const;
const statusFilters = ["All", "Upcoming", "Active", "Completed"] as const;
const domainFilters = ["All", "AI/ML", "Blockchain", "Healthcare", "Sustainability", "IoT", "DeFi", "Education", "Biotech", "NFT", "CleanTech"];

const statusColor: Record<string, string> = {
  UPCOMING: "bg-secondary text-secondary-foreground",
  ACTIVE: "bg-primary text-primary-foreground",
  COMPLETED: "bg-muted text-muted-foreground",
};

const BrowseHackathons = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [domainFilter, setDomainFilter] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [hackathons, setHackathons] = useState<HackathonItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const status = statusFilter === "All" ? undefined : statusFilter.toUpperCase();
        const data = await hackathonService.getHackathons({ search, status, page: 0, size: 50 });
        setHackathons(data.items || []);
      } catch (e) {
        toast({ title: "Failed to load hackathons", description: e instanceof Error ? e.message : "Please retry", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search, statusFilter, toast]);

  const filtered = useMemo(() => hackathons.filter((h) => {
    if (search && !h.title.toLowerCase().includes(search.toLowerCase()) && !h.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "All" && h.type?.toLowerCase() !== typeFilter.toLowerCase()) return false;
    if (domainFilter !== "All" && !h.themes.includes(domainFilter)) return false;
    return true;
  }), [hackathons, search, typeFilter, domainFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-2">Browse Hackathons</h1>
          <p className="text-muted-foreground">Discover and join exciting hackathons from around the world.</p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search hackathons..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>

        {/* Filter Chips */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2 text-muted-foreground">Type</p>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((t) => (
                    <Button key={t} size="sm" variant={typeFilter === t ? "default" : "outline"} onClick={() => setTypeFilter(t)}>{t}</Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-muted-foreground">Status</p>
                <div className="flex flex-wrap gap-2">
                  {statusFilters.map((s) => (
                    <Button key={s} size="sm" variant={statusFilter === s ? "default" : "outline"} onClick={() => setStatusFilter(s)}>{s}</Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-muted-foreground">Domain</p>
                <div className="flex flex-wrap gap-2">
                  {domainFilters.map((d) => (
                    <Button key={d} size="sm" variant={domainFilter === d ? "default" : "outline"} onClick={() => setDomainFilter(d)}>{d}</Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">{loading ? "Loading..." : `${filtered.length} hackathon${filtered.length !== 1 ? "s" : ""} found`}</p>

        {/* Hackathon Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h, i) => (
            <HackathonCard key={h.id} hackathon={h} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No hackathons match your filters.</p>
            <Button variant="link" onClick={() => { setSearch(""); setTypeFilter("All"); setStatusFilter("All"); setDomainFilter("All"); }}>Clear filters</Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

const HackathonCard = ({ hackathon: h, index }: { hackathon: HackathonItem; index: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
    <Link to={`/hackathons/${h.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border/50">
        {/* Banner */}
        <div className="h-36 relative overflow-hidden flex flex-col justify-between p-4">
          {h.bannerImageUrl ? (
            <img
              src={h.bannerImageUrl}
              alt={h.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : null}
          <div className={`absolute inset-0 ${h.bannerImageUrl ? "bg-gradient-to-t from-black/70 via-black/40 to-black/20" : "bg-gradient-to-br from-primary to-secondary"}`} />
          <div className="relative flex justify-between items-start">
            <Badge className={statusColor[h.status] || "bg-muted text-muted-foreground"}>{h.status}</Badge>
            {h.type?.toLowerCase() === "online" ? <Globe className="h-4 w-4 text-white/80" /> : <MapPin className="h-4 w-4 text-white/80" />}
          </div>
          <h3 className="relative text-lg font-bold text-white font-heading drop-shadow-sm">{h.title}</h3>
        </div>
        <CardContent className="p-4 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{h.description}</p>
          <div className="flex flex-wrap gap-1">
            {h.themes.slice(0, 3).map((t) => (
              <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{h.startDate?.slice(5)}</div>
            <div className="flex items-center gap-1"><Trophy className="h-3 w-3" />${h.prizePool ?? 0}</div>
            <div className="flex items-center gap-1"><Users className="h-3 w-3" />{h.participants}</div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground">by {h.organizer?.name || "Organizer"}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

export default BrowseHackathons;