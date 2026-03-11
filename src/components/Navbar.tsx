import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Zap, LogOut } from "lucide-react";
import NotificationDropdown from "@/components/NotificationDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import { useState } from "react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openLogin = () => {
    setAuthView("login");
    setAuthOpen(true);
    setMobileOpen(false);
  };

  const openSignup = () => {
    setAuthView("signup");
    setAuthOpen(true);
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Hackathons", to: "/hackathons" },
    { label: "Leaderboard", to: "/leaderboard" },
    { label: "About", to: "/about" },
    ...(isAuthenticated && user?.role === "organiser" ? [{ label: "Dashboard", to: "/organizer/dashboard" }] : []),
    ...(isAuthenticated && user?.role === "participant" ? [{ label: "Dashboard", to: "/participant/dashboard" }] : []),
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold z-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-foreground">
              evnova
            </span>
          </Link>

          {/* Desktop links - absolutely centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-medium text-muted-foreground transition-colors hover:text-foreground" style={{ fontSize: '17px' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated && <NotificationDropdown />}
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-3 py-1.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm font-medium">{user?.name?.split(" ")[0]}</span>
                  {user?.role && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary capitalize">{user.role}</span>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  className="bg-transparent text-muted-foreground shadow-none hover:bg-primary hover:text-primary-foreground hover:shadow-none hover:-translate-y-0"
                  onClick={openLogin}
                >
                  Log in
                </Button>
                <Button size="sm" className="hover:translate-y-0" onClick={openSignup}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated && <NotificationDropdown />}
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
            <div className="container mx-auto flex flex-col gap-3 px-4 py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm font-medium text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-sm font-medium">{user?.name}</span>
                    {user?.role && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary capitalize">{user.role}</span>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => { handleLogout(); setMobileOpen(false); }}>
                    <LogOut className="mr-1 h-3 w-3" /> Log out
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 bg-transparent text-muted-foreground hover:bg-primary border border-border/50 hover:text-primary-foreground hover:-translate-y-0 shadow-none hover:shadow-none"
                    size="sm"
                    onClick={openLogin}
                  >
                    Log in
                  </Button>
                  <Button size="sm" className="flex-1" onClick={openSignup}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultView={authView} />
    </>
  );
};

export default Navbar;