import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast({ title: "Reset link sent!", description: "Check your email for the reset link (mock)." });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-80 w-80 rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EVNOVA</span>
        </Link>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Reset password</CardTitle>
            <CardDescription>
              {sent ? "We've sent a password reset link to your email." : "Enter your email and we'll send you a reset link."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">Didn't receive it? Check spam or try again.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSent(false)}>
                  Try again
                </Button>
              </div>
            )}

            <Link to="/login" className="mt-6 flex items-center justify-center gap-1 text-sm text-primary hover:underline">
              <ArrowLeft className="h-3 w-3" /> Back to login
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
