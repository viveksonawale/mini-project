import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Trophy,
  Calendar,
  Rocket,
  Zap,
  Code,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { platformStats } from "@/data/mockData";
import { hackathonService, type HackathonItem } from "@/services/hackathonService";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  const [hackathons, setHackathons] = useState<HackathonItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const data = await hackathonService.getHackathons({ page: 0, size: 4 });
        setHackathons(data.items || []);
      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  const statusColor: Record<string, string> = {
    UPCOMING: "bg-secondary text-secondary-foreground",
    ACTIVE: "bg-primary text-primary-foreground",
    COMPLETED: "bg-muted text-muted-foreground",
  };
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute -top-20 right-1/4 h-60 w-60 rounded-full bg-secondary/20 blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/15 blur-[80px]" />
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
              className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            >
              Build. Compete.{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Innovate.
              </span>
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
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
                >
                  <Rocket className="mr-2 h-4 w-4" /> Organize a Hackathon
                </Button>
              </Link>
              <Link to="/hackathons">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30"
                >
                  Join a Hackathon <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {[
            {
              label: "Hackathons Hosted",
              value: platformStats.hackathonsHosted.toString(),
              icon: Calendar,
            },
            {
              label: "Participants",
              value: platformStats.totalParticipants.toLocaleString(),
              icon: Users,
            },
            {
              label: "Teams Formed",
              value: platformStats.teamsFormed.toLocaleString(),
              icon: Code,
            },
            {
              label: "Prizes Awarded",
              value: platformStats.prizesAwarded,
              icon: Trophy,
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
              <div className="font-heading text-3xl font-bold">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
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
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : hackathons.length > 0 ? (
              hackathons.map((h, i) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/hackathons/${h.id}`}>
                    <Card className="group h-full overflow-hidden border-border/50 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                      {/* Banner */}
                      <div className="h-32 bg-gradient-to-br from-primary to-secondary p-4">
                        <Badge className={statusColor[h.status] || "bg-muted text-muted-foreground"}>
                          {h.status.charAt(0).toUpperCase() + h.status.slice(1).toLowerCase()}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-heading font-semibold leading-tight group-hover:text-primary transition-colors">
                          {h.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {h.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {h.themes?.slice(0, 2).map((t) => (
                            <Badge key={t} variant="outline" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                          <span>{h.participants || 0} joined</span>
                          <span className="font-semibold text-primary">
                            ${h.prizePool || 0}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No featured hackathons found.
              </div>
            )}
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
              Why{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EVNOVA
              </span>
              ?
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
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
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
