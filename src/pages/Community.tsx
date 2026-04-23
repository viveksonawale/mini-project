import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Users, MessageSquare, Send, Trophy, GraduationCap,
  Clock, Flame, UserPlus, Check, X, Filter, Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { teamService } from "@/services/teamService";
import { hackathonService } from "@/services/hackathonService";

type CommunityPost = {
  id: string;
  author: string;
  avatar: string;
  postedAt: string;
  hackathonTitle?: string;
  hackathonId?: string;
  title: string;
  description: string;
  skillsNeeded: string[];
  teamSize: { current: number; max: number };
  responses: number;
  isUrgent?: boolean;
};

type CommunityProfile = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  college: string;
  skills: string[];
  hackathonsJoined: number;
  wins: number;
  available: boolean;
};

const DUMMY_POSTS: CommunityPost[] = [
  {
    id: "d1",
    author: "Vikram Singh",
    avatar: "V",
    postedAt: "2 hours ago",
    hackathonTitle: "HackAI 2025",
    hackathonId: "1",
    title: "Team BrainWave is recruiting ML engineers",
    description: "We're building a federated learning model for mental health detection. Looking for someone with PyTorch experience and a passion for privacy-preserving AI.",
    skillsNeeded: ["Python", "TensorFlow", "Federated Learning"],
    teamSize: { current: 2, max: 4 },
    responses: 7,
    isUrgent: true,
  },
  {
    id: "d2",
    author: "Sneha Rao",
    avatar: "S",
    postedAt: "5 hours ago",
    hackathonTitle: "GreenTech Sprint",
    hackathonId: "4",
    title: "Looking for a UI/UX designer with Figma skills",
    description: "EcoBuilders needs a designer for our smart energy dashboard. We have the backend covered with IoT + Node.js but need someone who can make data beautiful.",
    skillsNeeded: ["Figma", "React", "Data Visualization"],
    teamSize: { current: 2, max: 4 },
    responses: 4,
  },
  {
    id: "d3",
    author: "Arjun Nair",
    avatar: "A",
    postedAt: "1 day ago",
    hackathonTitle: "ChainReact Hackathon",
    hackathonId: "2",
    title: "Solidity dev needed for DeFi protocol",
    description: "Building TrustLend — a reputation-based micro-lending protocol on Polygon. Need someone who can write and audit smart contracts. Zero-knowledge experience is a plus!",
    skillsNeeded: ["Solidity", "Web3.js", "Zero Knowledge"],
    teamSize: { current: 1, max: 3 },
    responses: 12,
    isUrgent: true,
  },
  {
    id: "d4",
    author: "Riya Desai",
    avatar: "R",
    postedAt: "1 day ago",
    hackathonTitle: "MediHack 2025",
    hackathonId: "3",
    title: "Healthcare team needs a backend developer",
    description: "VitalTech is building a real-time ICU patient monitoring dashboard. Need a Node.js/Go dev to handle WebSocket streams from IoT sensors at scale.",
    skillsNeeded: ["Node.js", "Go", "WebSocket"],
    teamSize: { current: 2, max: 5 },
    responses: 3,
  },
  {
    id: "d5",
    author: "Kabir Sinha",
    avatar: "K",
    postedAt: "2 days ago",
    hackathonTitle: "EduThon 2025",
    hackathonId: "5",
    title: "AR/VR developer wanted for EdTech project",
    description: "Creating an adaptive learning experience with AR flashcards and gamified quizzes for neurodiverse students. Looking for someone with Unity or A-Frame experience.",
    skillsNeeded: ["Unity", "AR/VR", "JavaScript"],
    teamSize: { current: 2, max: 4 },
    responses: 9,
  },
];

const DUMMY_PROFILES: CommunityProfile[] = [
  {
    id: "dp1",
    name: "Meera Pillai",
    avatar: "M",
    bio: "Full-stack dev passionate about AI/ML. Love building things that matter. 3x hackathon finalist.",
    college: "IIT Bombay",
    skills: ["React", "Python", "TensorFlow", "FastAPI"],
    hackathonsJoined: 8,
    wins: 2,
    available: true,
  },
  {
    id: "dp2",
    name: "Aarav Gupta",
    avatar: "A",
    bio: "Blockchain enthusiast & Solidity developer. Built 3 production dApps. Loves DeFi protocols.",
    college: "NIT Trichy",
    skills: ["Solidity", "Web3.js", "Ethers.js", "Hardhat"],
    hackathonsJoined: 5,
    wins: 1,
    available: true,
  },
  {
    id: "dp3",
    name: "Tanvi Joshi",
    avatar: "T",
    bio: "UI/UX designer who codes. Strong in Figma, React, and turning complex data into clean interfaces.",
    college: "BITS Pilani",
    skills: ["Figma", "React", "Framer", "TypeScript"],
    hackathonsJoined: 6,
    wins: 3,
    available: true,
  },
  {
    id: "dp4",
    name: "Dev Malhotra",
    avatar: "D",
    bio: "IoT & embedded systems guy. Built smart home automation from scratch. Loves combining hardware with cloud.",
    college: "DTU Delhi",
    skills: ["IoT", "Node.js", "MQTT", "Raspberry Pi"],
    hackathonsJoined: 4,
    wins: 1,
    available: false,
  },
  {
    id: "dp5",
    name: "Sara Iyer",
    avatar: "S",
    bio: "ML researcher turned product builder. Specializes in NLP and computer vision. Open to exciting projects.",
    college: "IISc Bangalore",
    skills: ["Python", "PyTorch", "NLP", "Computer Vision"],
    hackathonsJoined: 10,
    wins: 4,
    available: true,
  },
  {
    id: "dp6",
    name: "Nikhil Pandey",
    avatar: "N",
    bio: "Backend engineer who loves distributed systems and Go. Built APIs serving 100k+ req/sec.",
    college: "VIT Vellore",
    skills: ["Go", "PostgreSQL", "Redis", "Kubernetes"],
    hackathonsJoined: 7,
    wins: 2,
    available: true,
  },
];

const Community = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [tab, setTab] = useState("feed");
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [communityProfiles, setCommunityProfiles] = useState<CommunityProfile[]>([]);
  const [allSkillTags, setAllSkillTags] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [invitations, joined] = await Promise.all([
          teamService.getInvitations(),
          hackathonService.getMyJoinedHackathons(),
        ]);
        const posts = invitations.map((inv) => ({
          id: String(inv.id),
          author: inv.invitedBy.name,
          avatar: inv.invitedBy.name.charAt(0).toUpperCase(),
          postedAt: "recently",
          hackathonTitle: inv.hackathonTitle,
          hackathonId: String(inv.hackathonId),
          title: `Team ${inv.teamName} is recruiting`,
          description: `Looking for contributors for ${inv.hackathonTitle}.`,
          skillsNeeded: [],
          teamSize: { current: 1, max: 4 },
          responses: 0,
          isUrgent: inv.status === "PENDING",
        }));
        const profiles = invitations.map((inv) => ({
          id: String(inv.invitedBy.id),
          name: inv.invitedBy.name,
          avatar: inv.invitedBy.name.charAt(0).toUpperCase(),
          bio: `Active participant in ${inv.hackathonTitle}.`,
          college: "EVNOVA Community",
          skills: [],
          hackathonsJoined: joined.length,
          wins: 0,
          available: inv.status === "PENDING",
        }));
        if (posts.length > 0) setCommunityPosts(posts);
        else setCommunityPosts(DUMMY_POSTS);
        const uniqueProfiles = Array.from(new Map(profiles.map((p) => [p.id, p])).values());
        if (uniqueProfiles.length > 0) setCommunityProfiles(uniqueProfiles);
        else setCommunityProfiles(DUMMY_PROFILES);
        const tags = Array.from(new Set(joined.flatMap((h) => h.themes || [])));
        setAllSkillTags(tags.length > 0 ? tags : ["React", "Python", "TensorFlow", "Solidity", "Figma", "Node.js", "IoT", "Go", "TypeScript", "Flutter"]);
      } catch {
        setCommunityPosts(DUMMY_POSTS);
        setCommunityProfiles(DUMMY_PROFILES);
        setAllSkillTags(["React", "Python", "TensorFlow", "Solidity", "Figma", "Node.js", "IoT", "Go", "TypeScript", "Flutter"]);
      }
    };
    load();
  }, []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredPosts = useMemo(() => communityPosts.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedSkills.length > 0 && !selectedSkills.some((s) => p.skillsNeeded.includes(s))) return false;
    return true;
  }), [communityPosts, search, selectedSkills]);

  const filteredProfiles = useMemo(() => communityProfiles.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.bio.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedSkills.length > 0 && !selectedSkills.some((s) => p.skills.includes(s))) return false;
    return true;
  }), [communityProfiles, search, selectedSkills]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-4xl font-bold">Community</h1>
              <p className="text-muted-foreground">Find teammates, form teams, and build together.</p>
            </div>
            <CreatePostDialog onPost={() => toast({ title: "Post published!", description: "Your team request is now visible." })} />
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts, people, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Skill filter chips */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1.5">
            {allSkillTags.slice(0, 14).map((skill) => (
              <Button
                key={skill}
                size="sm"
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                onClick={() => toggleSkill(skill)}
                className="text-xs h-7"
              >
                {skill}
              </Button>
            ))}
            {selectedSkills.length > 0 && (
              <Button size="sm" variant="ghost" onClick={() => setSelectedSkills([])} className="text-xs h-7 text-muted-foreground">
                Clear
              </Button>
            )}
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="feed" className="gap-1.5"><MessageSquare className="h-3.5 w-3.5" />Team Requests</TabsTrigger>
            <TabsTrigger value="people" className="gap-1.5"><Users className="h-3.5 w-3.5" />Find People</TabsTrigger>
          </TabsList>

          <TabsContent value="feed">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-sm text-muted-foreground">{filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}</p>
                <AnimatePresence>
                  {filteredPosts.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </AnimatePresence>
                {filteredPosts.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground">No posts match your filters.</div>
                )}
              </div>

              {/* Sidebar: trending skills */}
              <div className="space-y-4">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-heading flex items-center gap-2">
                      <Flame className="h-4 w-4 text-[hsl(var(--evnova-orange))]" /> Trending Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {["React", "Python", "TensorFlow", "Solidity", "Figma", "Node.js"].map((skill, i) => (
                        <div key={skill} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{i + 1}. {skill}</span>
                          <Badge variant="outline" className="text-xs">{Math.floor(Math.random() * 30 + 10)} posts</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-heading flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" /> Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Active posts</span><span className="font-medium">{communityPosts.length}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Available devs</span><span className="font-medium">{communityProfiles.filter((p) => p.available).length}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Teams forming</span><span className="font-medium">12</span></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="people">
            <p className="text-sm text-muted-foreground mb-4">{filteredProfiles.length} developer{filteredProfiles.length !== 1 ? "s" : ""}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProfiles.map((profile, i) => (
                <ProfileCard key={profile.id} profile={profile} index={i} />
              ))}
            </div>
            {filteredProfiles.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">No developers match your filters.</div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

/* ---- Post Card ---- */
const PostCard = ({ post, index }: { post: CommunityPost; index: number }) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="border-border/50 hover:shadow-md transition-shadow">
        <CardContent className="p-5 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
                {post.avatar}
              </div>
              <div>
                <p className="font-medium text-sm">{post.author}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />{post.postedAt}
                  {post.hackathonTitle && (
                    <>
                      <span>•</span>
                      <Link to={`/hackathons/${post.hackathonId}`} className="text-primary hover:underline">{post.hackathonTitle}</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {post.isUrgent && <Badge className="bg-destructive/20 text-destructive text-xs">Urgent</Badge>}
              <Badge variant="outline" className="text-xs">
                <Users className="h-3 w-3 mr-1" />{post.teamSize.current}/{post.teamSize.max}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <h3 className="font-heading font-semibold">{post.title}</h3>
          <p className="text-sm text-muted-foreground">{post.description}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {post.skillsNeeded.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground">{post.responses} response{post.responses !== 1 ? "s" : ""}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                  <Send className="h-3 w-3" /> Connect
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-heading">Connect with {post.author}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <p className="text-sm text-muted-foreground">Send a message about why you'd be a great fit for "{post.title}"</p>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi! I'd love to join your team because..."
                    rows={4}
                  />
                  <Button
                    className="w-full gap-2"
                    onClick={() => {
                      toast({ title: "Request sent!", description: `Your connection request has been sent to ${post.author}.` });
                      setMessage("");
                    }}
                  >
                    <Send className="h-4 w-4" /> Send Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* ---- Profile Card ---- */
const ProfileCard = ({ profile, index }: { profile: CommunityProfile; index: number }) => {
  const { toast } = useToast();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="border-border/50 hover:shadow-md transition-shadow h-full">
        <CardContent className="p-5 space-y-3 flex flex-col h-full">
          {/* Avatar & name */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
              {profile.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm truncate">{profile.name}</p>
                {profile.available ? (
                  <span className="h-2 w-2 rounded-full bg-accent shrink-0" title="Available" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-muted-foreground shrink-0" title="Unavailable" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <GraduationCap className="h-3 w-3" />{profile.college}
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground flex-1">{profile.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1">
            {profile.skills.map((s) => (
              <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{profile.hackathonsJoined} hackathons</span>
            <span className="flex items-center gap-1"><Trophy className="h-3 w-3" />{profile.wins} wins</span>
          </div>

          {/* Action */}
          <Button
            size="sm"
            variant={profile.available ? "default" : "outline"}
            className="w-full gap-1.5"
            disabled={!profile.available}
            onClick={() => toast({ title: "Invite sent!", description: `Team invite sent to ${profile.name}.` })}
          >
            <UserPlus className="h-3.5 w-3.5" />
            {profile.available ? "Invite to Team" : "Unavailable"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* ---- Create Post Dialog ---- */
const CreatePostDialog = ({ onPost }: { onPost: () => void }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <Plus className="h-4 w-4" /> Post Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Create Team Request</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Looking for a React developer" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Description</label>
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe your project and the kind of teammate you're looking for..." rows={4} />
          </div>
          <Button className="w-full" onClick={() => { onPost(); setTitle(""); setDesc(""); }}>
            Publish Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Community;