import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, quickLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        toast({ title: "Welcome back!", description: "You've been logged in successfully." });
        navigate("/");
      } else {
        toast({ title: "Login failed", description: result.error, variant: "destructive" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (role: "ORGANIZER" | "PARTICIPANT") => {
    quickLogin(role);
    toast({ 
      title: `Logged in as ${role === 'ORGANIZER' ? 'Host' : 'Participant'}`, 
      description: "You've been logged in automatically." 
    });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-background">
      
      {/* Left Branding Section */}
      <div className="relative hidden w-full flex-col justify-center overflow-hidden p-10 md:w-[40%] md:flex lg:p-16 text-foreground">
        {/* Glow Effects */}
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
        
        <div className="relative z-10 mx-auto max-w-sm">
          <Link to="/" className="mb-12 flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_15px_rgba(216,245,36,0.3)]">
              <Zap className="h-7 w-7" />
            </div>
            <span className="font-heading text-3xl font-bold tracking-tight">
              EVNOVA
            </span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight lg:text-5xl">
              Welcome back to <br /> the <span className="text-primary">Hackathon</span> Hub
            </h1>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              Login to continue building, organizing, and collaborating on next-generation projects.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Auth Section */}
      <div className="flex w-full items-center justify-center p-6 md:w-[60%] bg-[#0c0e0c]/50 backdrop-blur-sm border-l border-border/10 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl px-4"
        >
          {/* Mobile Logo Logo */}
          <Link to="/" className="mb-8 flex items-center justify-center gap-2 md:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_10px_rgba(216,245,36,0.3)]">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">
              EVNOVA
            </span>
          </Link>

          <Card className="border-2 border-primary/20 bg-[#0c0e0c]/90 shadow-[0_0_40px_rgba(216,245,36,0.08)] backdrop-blur-md">
            <CardHeader className="space-y-2 text-center pb-8">
              <CardTitle className="font-heading text-3xl tracking-tight text-white">Login</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Enter any email/password to login, or use quick access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2.5">
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
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground/90">Password</Label>
                    <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
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

                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-medium shadow-[0_0_15px_rgba(216,245,36,0.15)] hover:shadow-[0_0_25px_rgba(216,245,36,0.25)] transition-all duration-300 rounded-lg group"
                >
                  Login to continue
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0c0e0c] px-2 text-muted-foreground font-medium">Quick Access</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => handleQuickLogin("PARTICIPANT")}
                    className="h-11 border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all rounded-lg"
                  >
                    Participant
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => handleQuickLogin("ORGANIZER")}
                    className="h-11 border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all rounded-lg"
                  >
                    Host
                  </Button>
                </div>
              </form>

              <div className="mt-8 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  Create one now
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
