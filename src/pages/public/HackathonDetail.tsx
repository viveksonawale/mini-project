import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, MapPin, Globe, Trophy, Users, Clock, 
  ArrowLeft, UserPlus, FileText, CheckCircle2, Target,
  Lightbulb, ChevronRight, Award, AlignLeft, ShieldCheck,
  Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { hackathonApi, Hackathon } from "@/api/hackathonApi";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

const HackathonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: h, isLoading, isError } = useQuery({
    queryKey: ['hackathon', id],
    queryFn: () => hackathonApi.getHackathonById(id!),
    enabled: !!id
  });

  const joinMutation = useMutation({
    mutationFn: () => hackathonApi.joinHackathon(id!),
    onSuccess: () => {
      toast({ title: "Joined!", description: `Successfully joined ${h?.title}!` });
      queryClient.invalidateQueries({ queryKey: ['hackathon', id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Failed to join hackathon.", 
        variant: "destructive" 
      });
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-lime-500 mb-4" />
          <p className="text-zinc-400">Loading hackathon details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !h) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pt-24 text-center">
          <p className="text-xl text-zinc-400 mb-4 font-heading">Hackathon not found.</p>
          <Link to="/hackathons">
            <Button className="bg-lime-500 hover:bg-lime-600 text-black">Browse hackathons</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    joinMutation.mutate();
  };

  const statusColors: Record<string, string> = {
    live: "bg-green-500/10 text-green-500 border-green-500/20",
    open: "bg-green-500/10 text-green-500 border-green-500/20",
    upcoming: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    ended: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    completed: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-lime-500/30 font-sans dark">
      <Navbar />
      
      <main className="container max-w-5xl mx-auto px-4 pt-28 pb-20 space-y-16">
        
        {/* SECTION 1 — Hackathon Header */}
        <section className="relative space-y-6">
          <Link to="/hackathons" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to hackathons
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className={`capitalize px-3 py-1 ${statusColors[h.status] || statusColors.upcoming}`}>
                <span className="relative flex h-2 w-2 mr-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${(h.status === 'live' || h.status === 'open' || h.status === 'ongoing') ? 'bg-green-400' : 'hidden'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${(h.status === 'live' || h.status === 'open' || h.status === 'ongoing') ? 'bg-green-500' : h.status === 'upcoming' ? 'bg-blue-500' : 'bg-zinc-500'}`}></span>
                </span>
                {h.status}
              </Badge>
              <Badge variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 px-3 py-1">
                {h.type === "online" ? <Globe className="w-3 h-3 mr-2 inline" /> : <MapPin className="w-3 h-3 mr-2 inline" />}
                {h.type === "online" ? "Online" : h.type === "offline" ? "Offline" : "Hybrid/TBD"}
              </Badge>
              <Badge variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 px-3 py-1">
                <Users className="w-3 h-3 mr-2 inline" />
                {h.participants || 0} Joined
              </Badge>
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">{h.title}</h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">{h.shortDescription || h.description.slice(0, 150) + "..."}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-zinc-800/50 mt-8">
              <div className="flex items-center gap-6 flex-1">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Prize Pool</p>
                  <p className="text-2xl font-bold text-lime-400">{h.prizePool}</p>
                </div>
                <div className="h-12 w-px bg-zinc-800 shrink-0"></div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Registration Closes</p>
                  <p className="text-lg font-medium text-zinc-200">
                    {h.timeline?.registrationEnd ? new Date(h.timeline.registrationEnd).toLocaleDateString() : 
                     h.registrationDeadline ? new Date(h.registrationDeadline).toLocaleDateString() : "TBD"}
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-auto mt-4 sm:mt-0">
                {(h.status === "live" || h.status === "upcoming" || h.status === "open") ? (
                  <Button 
                    onClick={handleRegister} 
                    disabled={joinMutation.isPending}
                    size="lg" 
                    className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600 text-black font-semibold shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transition-all duration-300 text-lg px-8 h-14"
                  >
                    {joinMutation.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
                    Join Hackathon
                  </Button>
                ) : (
                  <Button disabled size="lg" className="w-full sm:w-auto bg-zinc-800 text-zinc-500 font-semibold text-lg px-8 h-14">
                    Hackathon Ended
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* SECTION 2 — Overview */}
            <section className="space-y-6 scroll-mt-24" id="overview">
              <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
                <AlignLeft className="h-6 w-6 text-lime-500" />
                <h2>Overview</h2>
              </div>
              
              <div className="prose prose-invert max-w-none text-zinc-300 space-y-6">
                <p className="text-lg leading-relaxed">{h.description || "No description provided."}</p>
                
                {h.problemStatement && (
                  <Card className="bg-zinc-900/50 border-zinc-800/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg text-white">
                        <Target className="h-5 w-5 text-lime-500" />
                        Problem Statement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-400 leading-relaxed">{h.problemStatement}</p>
                    </CardContent>
                  </Card>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="bg-zinc-900/50 border-zinc-800/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg text-white">
                        <Lightbulb className="h-5 w-5 text-lime-500" />
                        Themes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {h.themes?.map((t) => (
                        <Badge key={t} variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200">{t}</Badge>
                      ))}
                    </CardContent>
                  </Card>
                  
                  {h.goals && h.goals.length > 0 && (
                    <Card className="bg-zinc-900/50 border-zinc-800/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-white">
                          <CheckCircle2 className="h-5 w-5 text-lime-500" />
                          Goals
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-zinc-400">
                          {h.goals.map((g, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-lime-500 mt-1 shrink-0">•</span>
                              <span className="text-sm">{g}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </section>

            {h.rules && h.rules.length > 0 && (
              <>
                <hr className="border-zinc-800/50" />
                <section className="space-y-6 scroll-mt-24" id="rules">
                  <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
                    <ShieldCheck className="h-6 w-6 text-lime-500" />
                    <h2>Rules & Requirements</h2>
                  </div>
                  <Card className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden">
                    <div className="divide-y divide-zinc-800/50">
                      {h.rules.map((rule, idx) => (
                        <div key={idx} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-zinc-800/20 transition-colors">
                          <div className="bg-zinc-800/80 rounded-full h-8 w-8 flex items-center justify-center shrink-0 text-lime-500 font-medium text-sm">
                            {idx + 1}
                          </div>
                          <p className="text-zinc-300 mt-1">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </section>
              </>
            )}
            
            <hr className="border-zinc-800/50 block lg:hidden" />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8 lg:sticky lg:top-28">
            
            {/* SECTION 3 — Timeline */}
            {h.timeline && (
              <Card className="bg-zinc-900/80 border-zinc-800 backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <Clock className="h-5 w-5 text-lime-500" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l border-zinc-700/50 ml-3 space-y-6 pb-2">
                    <TimelineItem 
                      title="Registration Opens" 
                      date={h.timeline.registrationStart} 
                      isActive={new Date() >= new Date(h.timeline.registrationStart)} 
                    />
                    <TimelineItem 
                      title="Registration Ends" 
                      date={h.timeline.registrationEnd} 
                      isActive={new Date() >= new Date(h.timeline.registrationEnd)} 
                    />
                    <TimelineItem 
                      title="Hackathon Starts" 
                      date={h.timeline.hackathonStart} 
                      isActive={new Date() >= new Date(h.timeline.hackathonStart)} 
                    />
                    <TimelineItem 
                      title="Submission Deadline" 
                      date={h.timeline.submissionDeadline} 
                      isActive={new Date() >= new Date(h.timeline.submissionDeadline)} 
                      isLast 
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* SECTION 5 — Prizes */}
            {h.prizes && h.prizes.length > 0 && (
              <Card className="bg-zinc-900/80 border-zinc-800 backdrop-blur-xl overflow-hidden">
                <div className="bg-gradient-to-r from-lime-500/10 to-transparent p-6 border-b border-zinc-800">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-1">
                    <Trophy className="h-5 w-5 text-lime-500" />
                    Prize Tiers
                  </h3>
                  <p className="text-zinc-400 text-sm">Total Pool: <span className="text-lime-400 font-bold">{h.prizePool}</span></p>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y divide-zinc-800/50">
                    {h.prizes.map((prize, i) => (
                      <div key={i} className="p-6 flex flex-col gap-1 hover:bg-zinc-800/20 transition-colors">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-white flex items-center gap-2">
                            {i === 0 && <Award className="h-4 w-4 text-yellow-500" />}
                            {i === 1 && <Award className="h-4 w-4 text-zinc-300" />}
                            {i === 2 && <Award className="h-4 w-4 text-orange-400" />}
                            {prize.position}
                          </span>
                          <span className="text-lg font-bold text-lime-400">{prize.amount}</span>
                        </div>
                        <p className="text-sm text-zinc-400">{prize.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* SECTION 6 — Participants */}
            <Card className="bg-zinc-900/80 border-zinc-800 backdrop-blur-xl">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center -space-x-4 mb-4">
                  {[...Array(Math.min(5, h.participants || 0))].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-zinc-500" />
                    </div>
                  ))}
                  {(h.participants || 0) > 5 && (
                    <div className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center shrink-0 z-10 text-xs text-zinc-400 font-medium">
                      +{(h.participants || 0) - 5}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-white text-lg">{h.participants || 0} Hackers</h4>
                  <p className="text-sm text-zinc-400">have already registered</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper component for timeline
const TimelineItem = ({ title, date, isActive, isLast = false }: { title: string, date: string, isActive: boolean, isLast?: boolean }) => (
  <div className="relative pl-6">
    <div className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 bg-zinc-900 ${isActive ? 'border-lime-500' : 'border-zinc-700'}`}></div>
    <div>
      <h4 className={`text-sm font-medium ${isActive ? 'text-zinc-200' : 'text-zinc-500'}`}>{title}</h4>
      <p className="text-xs text-zinc-500 mt-1">
        {date ? new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
      </p>
    </div>
  </div>
);

export default HackathonDetail;