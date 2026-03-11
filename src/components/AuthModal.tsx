import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type AuthView = "login" | "signup";

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultView?: AuthView;
}

const AuthModal = ({ open, onOpenChange, defaultView = "login" }: AuthModalProps) => {
    const [view, setView] = useState<AuthView>(defaultView);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<"organiser" | "participant">("participant");
    const { login, signup, selectRole } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Reset form when view changes
    const switchView = (newView: AuthView) => {
        setView(newView);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setRole("participant");
    };

    // Sync defaultView when modal opens
    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            switchView(defaultView);
        }
        onOpenChange(isOpen);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const result = login(email, password);
        if (result.success) {
            toast({ title: "Welcome back!", description: "You've been logged in successfully." });
            onOpenChange(false);
            navigate("/");
        } else {
            toast({ title: "Login failed", description: result.error, variant: "destructive" });
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({ title: "Passwords don't match", variant: "destructive" });
            return;
        }
        if (password.length < 6) {
            toast({ title: "Password must be at least 6 characters", variant: "destructive" });
            return;
        }
        const result = signup(name, email, password);
        if (result.success) {
            selectRole(role);
            toast({ title: "Account created!", description: "Welcome to EVNOVA." });
            onOpenChange(false);
            navigate("/");
        } else {
            toast({ title: "Signup failed", description: result.error, variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {/* Header with Logo moved outside the main card padding */}
            <div className="bg-background pt-6 pb-4 flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                        <Zap className="h-6 w-6 text-black" fill="currentColor" />
                    </div>
                    <span className="font-heading text-xl font-bold text-foreground tracking-wide">
                        EVNOVA
                    </span>
                </div>
            </div>

            <div className="px-6 pb-8 pt-4 border-t border-border/50 bg-card">
                <DialogHeader className="text-center mb-6">
                    <DialogTitle className="font-heading text-2xl font-semibold">
                        {view === "login" ? "Welcome back" : "Create your account"}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        {view === "login" ? "Log in to your EVNOVA account" : "Join the EVNOVA community"}
                    </DialogDescription>
                </DialogHeader>

                {view === "login" ? (
                    /* ─── Login Form ─── */
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="modal-email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="modal-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-10 bg-black/40 border-border/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modal-password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="modal-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 bg-black/40 border-border/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold hover:-translate-y-0 border-0 shadow-none">
                            Log in
                        </Button>
                    </form>
                ) : (
                    /* ─── Signup Form ─── */
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="modal-name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="modal-name"
                                    placeholder="John Doe"
                                    className="pl-10 bg-black/40 border-border/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modal-signup-email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="modal-signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-10 bg-black/40 border-border/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modal-signup-password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="modal-signup-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 bg-black/40 border-border/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modal-confirm-password">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="modal-confirm-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 bg-black/40 border-border/50 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Role selector */}
                        <div className="space-y-3 pb-1 pt-1">
                            <Label>I want to:</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    type="button"
                                    variant={role === "participant" ? "default" : "outline"}
                                    className={`hover:-translate-y-0 border-0 shadow-none font-semibold ${role === "participant" ? "bg-primary text-black hover:bg-primary/90" : "bg-black/40 text-muted-foreground hover:bg-black/60"}`}
                                    onClick={() => setRole("participant")}
                                >
                                    Join Hackathons
                                </Button>
                                <Button
                                    type="button"
                                    variant={role === "organiser" ? "default" : "outline"}
                                    className={`hover:-translate-y-0 border-0 shadow-none font-semibold ${role === "organiser" ? "bg-primary text-black hover:bg-primary/90" : "bg-black/40 text-muted-foreground hover:bg-black/60"}`}
                                    onClick={() => setRole("organiser")}
                                >
                                    Host Hackathons
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold hover:-translate-y-0 border-0 shadow-none">
                            Create Account
                        </Button>
                    </form>
                )}

                {/* Toggle between login / signup */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    {view === "login" ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => switchView("signup")}
                                className="font-medium text-[#c0e000] hover:underline hover:text-primary transition-colors"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => switchView("login")}
                                className="font-medium text-[#c0e000] hover:underline hover:text-primary transition-colors"
                            >
                                Log in
                            </button>
                        </>
                    )}
                </p>
            </div>
        </DialogContent>
        </Dialog >
    );
};

export default AuthModal;
