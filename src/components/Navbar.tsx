import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, Zap, LogOut, Settings } from "lucide-react";
import NotificationDropdown from "@/components/NotificationDropdown";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { label: "Hackathons", to: "/hackathons" },
    ...(isAuthenticated && user?.role === "organiser" ? [{ label: "Dashboard", to: "/organiser/dashboard" }] : []),
    ...(isAuthenticated && user?.role === "participant" ? [
      { label: "Dashboard", to: "/participant/dashboard" },
      { label: "Certificates", to: "/certificates" },
    ] : []),
    { label: "Leaderboard", to: "/leaderboard" },
    { label: "Showcase", to: "/showcase" },
    { label: "Mentors", to: "/mentors" },
    { label: "API Health", to: "/api-health" },
    { label: "Community", to: "/community" },
    { label: "About", to: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            EVNOVA
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {isAuthenticated && <NotificationDropdown />}
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-3 py-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm font-medium">{user?.name?.split(" ")[0]}</span>
                {user?.role && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary capitalize">{user.role}</span>
                )}
              </div>
              <Link to="/profile">
                <Button variant="ghost" size="icon" aria-label="Profile settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {isAuthenticated && <NotificationDropdown />}
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
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
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground">
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
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full" size="sm" onClick={() => setMobileOpen(false)}>Log in</Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground" onClick={() => setMobileOpen(false)}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;