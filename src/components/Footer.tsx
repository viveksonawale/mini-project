import { Link } from "react-router-dom";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EVNOVA</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              The ultimate platform for organizing and participating in hackathons.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/hackathons" className="hover:text-foreground">Browse Hackathons</Link></li>
              <li><Link to="/community" className="hover:text-foreground">Community</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground">API</a></li>
              <li><a href="#" className="hover:text-foreground">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold">Connect</h4>
            <div className="mt-3 flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          © 2026 EVNOVA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
