import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, User, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"ORGANIZER" | "PARTICIPANT">("PARTICIPANT");
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup, selectRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await signup(name, email, password, role);
      if (result.success) {
        toast({ title: "Account created!", description: "Welcome to EVNOVA." });
        navigate("/");
      } else {
        toast({ title: "Signup failed", description: result.error, variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-background">
      
      {/* Left Branding Section */}
      <div className="relative hidden w-full flex-col justify-center overflow-hidden p-10 md:w-[40%] md:flex lg:p-16">
        {/* Glow Effects */}
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
        
        <div className="relative z-10 mx-auto max-w-sm">
          <Link to="/" className="mb-12 flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_15px_rgba(216,245,36,0.3)]">
              <Zap className="h-7 w-7" />
            </div>
            <span className="font-heading text-3xl font-bold tracking-tight text-foreground">
              EVNOVA
            </span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              Join the <br /> <span className="text-primary">Hackathon</span> Hub
            </h1>
            <p className="text-lg text-muted-foreground/80 leading-relaxed mb-8">
              Create an account to discover, organize, and participate in top-tier hackathons around the globe.
            </p>
            
            <div className="space-y-4">
              {[
                "Connect with top developers",
                "Showcase your amazing projects",
                "Host seamless events"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-foreground/90 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Auth Section */}
      <div className="flex w-full items-center justify-center p-6 md:w-[60%] bg-[#0c0e0c]/50 backdrop-blur-sm border-l border-border/10 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl px-4"
        >
          {/* Mobile Logo */}
          <Link to="/" className="mb-8 flex items-center justify-center gap-2 md:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_10px_rgba(216,245,36,0.3)]">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">
              EVNOVA
            </span>
          </Link>

          <Card className="border-2 border-primary/20 bg-[#0c0e0c]/90 shadow-[0_0_40px_rgba(216,245,36,0.08)] backdrop-blur-md">
            <CardHeader className="space-y-1 text-center pb-4">
              <CardTitle className="font-heading text-3xl tracking-tight text-white">Create an account</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Enter any details to get started instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground/90">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        className="h-11 pl-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 rounded-lg text-base text-white" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground/90">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        className="h-11 pl-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 rounded-lg text-base text-white" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Passwords Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground/90">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-11 pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 rounded-lg text-base text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/90">Confirm Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-11 pl-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 rounded-lg text-base text-white"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Role Selection Radio Cards */}
                <div className="space-y-2 pt-1 pb-4">
                  <Label className="text-sm font-medium text-foreground/90">I want to:</Label>
                  <RadioGroup 
                    value={role} 
                    onValueChange={(val) => setRole(val as "PARTICIPANT" | "ORGANIZER")}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="PARTICIPANT" id="participant" className="peer sr-only" />
                      <Label
                        htmlFor="participant"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-border/50 bg-background/50 p-4 hover:bg-muted/30 hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <span className="font-semibold text-center text-white">Join<br/>Hackathons</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="ORGANIZER" id="organiser" className="peer sr-only" />
                      <Label
                        htmlFor="organiser"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-border/50 bg-background/50 p-4 hover:bg-muted/30 hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <span className="font-semibold text-center text-white">Host<br/>Hackathons</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 mt-2 text-base font-medium shadow-[0_0_15px_rgba(216,245,36,0.15)] hover:shadow-[0_0_25px_rgba(216,245,36,0.25)] transition-all duration-300 rounded-lg group"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>

              <div className="mt-8 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  Log in here
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
