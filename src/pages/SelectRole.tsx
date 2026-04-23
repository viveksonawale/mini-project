import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const roles: { value: UserRole; title: string; desc: string; icon: typeof Rocket; gradient: string }[] = [
  {
    value: "organiser",
    title: "Organiser",
    desc: "Create hackathons, manage submissions, track participants, and declare winners.",
    icon: Rocket,
    gradient: "from-primary to-secondary",
  },
  {
    value: "participant",
    title: "Participant",
    desc: "Browse hackathons, form teams, submit projects, and build your portfolio.",
    icon: Users,
    gradient: "from-secondary to-accent",
  },
];

const SelectRole = () => {
  const { user, selectRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    if (user?.role) navigate("/");
  }, [isAuthenticated, user?.role, navigate]);

  const handleSelect = (role: UserRole) => {
    selectRole(role);
    toast({ title: `You're now a${role === "organiser" ? "n" : ""} ${role}!`, description: "Redirecting to your dashboard..." });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-20 right-1/3 h-60 w-60 rounded-full bg-accent/15 blur-[100px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EVNOVA</span>
        </div>

        <h1 className="mb-2 text-center font-heading text-3xl font-bold">Choose your role</h1>
        <p className="mb-8 text-center text-muted-foreground">How would you like to use EVNOVA?</p>

        <div className="grid gap-6 sm:grid-cols-2">
          {roles.map((role, i) => (
            <motion.div
              key={role.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            >
              <Card
                className="group cursor-pointer border-border/50 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                onClick={() => handleSelect(role.value)}
              >
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${role.gradient} transition-transform group-hover:scale-110`}>
                    <role.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h2 className="font-heading text-xl font-bold">{role.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{role.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SelectRole;
