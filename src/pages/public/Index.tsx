import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Users,
  Trophy,
  Calendar,
  Rocket,
  Zap,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockHackathons, platformStats } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

// Count-up hook
const useCountUp = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuart for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

interface StatItem {
  label: string;
  numericValue: number;
  prefix: string;
  suffix: string;
  icon: React.ComponentType<{ className?: string }>;
}

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(stat.numericValue, 2000, isInView);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 text-center transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(217,240,41,0.08)] hover:-translate-y-1 cursor-default overflow-hidden"
    >
      {/* Hover glow background */}
      <div className="absolute inset-0 rounded-2xl transition-all duration-500 group-hover:bg-primary/5" />

      <div className="relative z-10">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
          <stat.icon className="h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="font-heading text-3xl font-bold">
          {stat.prefix}{count.toLocaleString()}{stat.suffix}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {stat.label}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Orbiting Blob 1 - slow clockwise drift */}
          <motion.div
            className="absolute h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px]"
            animate={{
              x: ["-10%", "60%", "80%", "30%", "-10%"],
              y: ["-20%", "10%", "60%", "80%", "-20%"],
              scale: [1, 1.2, 0.9, 1.1, 1],
              opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Orbiting Blob 2 - slower counter drift */}
          <motion.div
            className="absolute h-[400px] w-[400px] rounded-full bg-primary/20 blur-[100px]"
            animate={{
              x: ["80%", "20%", "-10%", "50%", "80%"],
              y: ["60%", "-10%", "30%", "70%", "60%"],
              scale: [1.1, 0.9, 1.2, 1, 1.1],
              opacity: [0.5, 0.8, 0.4, 0.7, 0.5],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Orbiting Blob 3 - center pulsing anchor */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary">
                <Zap className="mr-1 h-3 w-3" /> The Future of Hackathons
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl text-foreground"
            >
              Build. Compete. Innovate.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
            >
              The ultimate platform for organizing and participating in
              hackathons. Connect with developers, form teams, and build the
              future.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link to="/signup">
                <Button
                  size="lg"
                  className="font-semibold shadow-[0_0_20px_rgba(217,240,41,0.25)] hover:shadow-[0_0_30px_rgba(217,240,41,0.4)]"
                >
                  <Rocket className="mr-2 h-4 w-4" /> Organize a Hackathon
                </Button>
              </Link>
              <Link to="/hackathons">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-medium bg-transparent border-white/20 hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(217,240,41,0.15)] group"
                >
                  Join a Hackathon <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 text-primary" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-card/30 py-16">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {[
            {
              label: "Hackathons Hosted",
              numericValue: platformStats.hackathonsHosted,
              prefix: "",
              suffix: "",
              icon: Calendar,
            },
            {
              label: "Participants",
              numericValue: platformStats.totalParticipants,
              prefix: "",
              suffix: "",
              icon: Users,
            },
            {
              label: "Teams Formed",
              numericValue: platformStats.teamsFormed,
              prefix: "",
              suffix: "",
              icon: Code,
            },
            {
              label: "Prizes Awarded",
              numericValue: 500,
              prefix: "$",
              suffix: "K+",
              icon: Trophy,
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <StatCard stat={stat} index={i} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold">
              Featured Hackathons
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover exciting challenges and competitions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {mockHackathons.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group overflow-hidden border-border/50 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  {/* Banner */}
                  <div
                    className={`h-32 bg-primary p-4`}
                  >
                    <Badge
                      className={
                        h.status === "open"
                          ? "bg-accent/90 text-accent-foreground"
                          : h.status === "ongoing"
                            ? "bg-evnova-orange/90 text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }
                    >
                      {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-heading font-semibold leading-tight">
                      {h.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {h.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {h.themes.slice(0, 2).map((t) => (
                        <Badge key={t} variant="outline" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{h.participants} joined</span>
                      <span className="font-semibold text-primary">
                        {h.prizePool}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/hackathons">
              <Button variant="outline" className="border-primary/30">
                View All Hackathons <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-border/50 bg-card/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold">
              Why EVNOVA?
            </h2>
            <p className="mt-4 text-muted-foreground">
              We're building the most vibrant hackathon ecosystem in the world —
              connecting organisers, developers, and sponsors to create
              unforgettable innovation experiences.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Rocket,
                title: "For Organisers",
                desc: "Create, manage, and run hackathons effortlessly with our powerful tools.",
              },
              {
                icon: Users,
                title: "For Participants",
                desc: "Discover hackathons, form teams, submit projects, and build your portfolio.",
              },
              {
                icon: Trophy,
                title: "For Everyone",
                desc: "A thriving community of innovators pushing the boundaries of technology.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="border-border/50 p-6 text-center transition-all hover:border-primary/30">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
