import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Camera, X, Plus, Bell, Mail, Users, Trophy, Megaphone, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { userService } from "@/services/userService";

const SUGGESTED_SKILLS = [
  "React", "TypeScript", "Python", "Node.js", "Machine Learning",
  "UI/UX Design", "Data Science", "Blockchain", "DevOps", "Mobile Dev",
  "Rust", "Go", "AWS", "Firebase", "Figma",
];

const ProfileSettings = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");

  const [notifications, setNotifications] = useState({
    teamInvites: true,
    submissionUpdates: true,
    announcements: true,
    emailDigest: false,
    communityMentions: true,
  });

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    const load = async () => {
      try {
        const me = await userService.getMe();
        setName(me.name || "");
      } catch {
        // noop: fallback to auth context values
      }
    };
    load();
  }, []);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 15) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const handleSave = async () => {
    try {
      await userService.updateMe({ name });
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (e) {
      toast({
        title: "Update failed",
        description: e instanceof Error ? e.message : "Please retry",
        variant: "destructive",
      });
    }
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pb-20 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="mb-1 font-heading text-3xl font-bold">Profile Settings</h1>
          <p className="mb-8 text-muted-foreground">Manage your account details and preferences</p>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your name, bio, and avatar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-20 w-20 border-2 border-border">
                        {avatarUrl ? (
                          <AvatarImage src={avatarUrl} alt={name} />
                        ) : null}
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-lg font-bold text-primary-foreground">
                          {initials || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-110"
                        onClick={() =>
                          toast({ title: "Coming soon", description: "Avatar upload will be available with Cloud storage." })
                        }
                        aria-label="Change avatar"
                      >
                        <Camera className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium">{name || "Your Name"}</p>
                      <p className="text-sm text-muted-foreground">{email}</p>
                      {user?.role && (
                        <Badge variant="secondary" className="mt-1 capitalize">
                          {user.role}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={email} disabled className="opacity-60" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell others a bit about yourself…"
                      className="min-h-[100px]"
                      maxLength={300}
                    />
                    <p className="text-xs text-muted-foreground">{bio.length}/300</p>
                  </div>

                  <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills &amp; Expertise</CardTitle>
                  <CardDescription>Add skills to help teams find you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current skills */}
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="gap-1 pl-3 pr-1.5 py-1 text-sm"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">No skills added yet.</p>
                    )}
                  </div>

                  {/* Add skill */}
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill…"
                      onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
                      className="max-w-xs"
                    />
                    <Button variant="outline" size="icon" onClick={() => addSkill(newSkill)} disabled={!newSkill.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">Suggested</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
                        <Badge
                          key={s}
                          variant="outline"
                          className="cursor-pointer transition-colors hover:bg-primary/10 hover:text-primary"
                          onClick={() => addSkill(s)}
                        >
                          <Plus className="mr-1 h-3 w-3" /> {s}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose which alerts you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {[
                    { key: "teamInvites" as const, icon: Users, label: "Team Invites", desc: "When someone invites you to a team" },
                    { key: "submissionUpdates" as const, icon: Trophy, label: "Submission Updates", desc: "Scores, feedback, and results" },
                    { key: "announcements" as const, icon: Megaphone, label: "Announcements", desc: "Platform and hackathon announcements" },
                    { key: "communityMentions" as const, icon: Bell, label: "Community Mentions", desc: "When you're mentioned in discussions" },
                    { key: "emailDigest" as const, icon: Mail, label: "Email Digest", desc: "Weekly summary of activity" },
                  ].map(({ key, icon: Icon, label, desc }) => (
                    <div key={key} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications[key]}
                        onCheckedChange={(v) => setNotifications({ ...notifications, [key]: v })}
                      />
                    </div>
                  ))}

                  <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileSettings;