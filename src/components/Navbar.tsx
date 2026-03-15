import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Zap, LogOut, Shield, User as UserIcon } from "lucide-react";
import NotificationDropdown from "@/components/NotificationDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { user, isAuthenticated, logout, quickLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleQuickLogin = (role: "ORGANIZER" | "PARTICIPANT") => {
    quickLogin(role);
    toast({ 
      title: `Demo Mode: ${role === 'ORGANIZER' ? 'Host' : 'Participant'}`, 
      description: "Logged in automatically for demo purpose." 
    });
    setMobileOpen(false);
    navigate(role === 'ORGANIZER' ? '/organizer/dashboard' : '/participant/dashboard');
  };

  const openLogin = () => {
    navigate("/login");
    setMobileOpen(false);
  };

  const openSignup = () => {
    navigate("/signup");
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Hackathons", to: "/hackathons" },
    { label: "Leaderboard", to: "/leaderboard" },
    { label: "About", to: "/about" },
    ...(isAuthenticated && user?.role === "ORGANIZER" ? [{ label: "Dashboard", to: "/organizer/dashboard" }] : []),
    ...(isAuthenticated && user?.role === "PARTICIPANT" ? [{ label: "Dashboard", to: "/participant/dashboard" }] : []),
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold z-10 transition-transform hover:scale-105">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-[0_0_15px_rgba(216,245,36,0.3)]">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-foreground tracking-tight">
              evnova
            </span>
          </Link>

          {/* Desktop links - absolutely centered */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-medium text-muted-foreground transition-all hover:text-primary relative group" style={{ fontSize: '16px' }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {!isAuthenticated && (
              <div className="flex items-center gap-1.5 mr-2 pr-2 border-r border-border/50">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleQuickLogin("PARTICIPANT")}
                  className="h-8 text-[11px] uppercase tracking-wider font-bold hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20"
                >
                  User Demo
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleQuickLogin("ORGANIZER")}
                  className="h-8 text-[11px] uppercase tracking-wider font-bold hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20"
                >
                  Host Demo
                </Button>
              </div>
            )}

            {isAuthenticated && <NotificationDropdown />}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 pl-1.5 pr-3 py-1 transition-all hover:bg-muted/50">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold leading-none">{user?.name?.split(" ")[0]}</span>
                    {user?.role && (
                      <span className="text-[10px] text-primary font-medium capitalize mt-0.5">{user.role}</span>
                    )}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout} 
                  className="h-9 w-9 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  onClick={openLogin}
                >
                  Log in
                </Button>
                <Button 
                  size="sm" 
                  className="font-bold shadow-[0_0_10px_rgba(216,245,36,0.2)] hover:shadow-[0_0_20px_rgba(216,245,36,0.4)] px-5" 
                  onClick={openSignup}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated && <NotificationDropdown />}
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden overflow-hidden transition-all duration-300">
            <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="flex items-center h-12 px-4 rounded-xl text-base font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              
              <div className="pt-4 mt-2 border-t border-border/50 space-y-4">
                {!isAuthenticated ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleQuickLogin("PARTICIPANT")}
                        className="h-11 rounded-xl font-bold border-border/50"
                      >
                        <UserIcon className="mr-2 h-4 w-4" /> User Demo
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleQuickLogin("ORGANIZER")}
                        className="h-11 rounded-xl font-bold border-border/50"
                      >
                        <Shield className="mr-2 h-4 w-4" /> Host Demo
                      </Button>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        className="flex-1 h-12 rounded-xl font-bold text-muted-foreground"
                        onClick={openLogin}
                      >
                        Log in
                      </Button>
                      <Button className="flex-1 h-12 rounded-xl font-bold" onClick={openSignup}>
                        Sign Up
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{user?.name}</span>
                        <span className="text-xs text-primary font-medium capitalize">{user?.role}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => { handleLogout(); setMobileOpen(false); }}
                      className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;