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
  CheckCircle2,
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

// Hero tags
const HeroTag = ({ text }: { text: string }) => (
  <div className="flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
    {text}
  </div>
);

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

        <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary px-4 py-1">
                <Zap className="mr-1.5 h-3.5 w-3.5 fill-primary/30" /> REDEFINING THE HACKATHON EXPERIENCE
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl text-foreground"
            >
              Build the <span className="text-primary italic">Future</span>. <br /> Effortlessly.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-8 max-w-2xl text-xl text-muted-foreground/80 leading-relaxed"
            >
              The unified platform where organizing and participating in hackathons becomes secondary to what matters most: <span className="text-foreground font-medium">Innovation</span>.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
            >
              <Link to="/signup">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-bold shadow-[0_0_25px_rgba(216,245,36,0.3)] hover:shadow-[0_0_40px_rgba(216,245,36,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Rocket className="mr-2 h-5 w-5" /> Start Hosting Free
                </Button>
              </Link>
              <Link to="/hackathons">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base font-semibold bg-white/5 border-white/10 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300 group backdrop-blur-sm"
                >
                  Explore Challenges <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            {/* Platform Tags */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-16 flex flex-wrap justify-center gap-3"
            >
              <HeroTag text="100% Free" />
              <HeroTag text="One Platform" />
              <HeroTag text="Easy to Use" />
              <HeroTag text="Automated Management" />
            </motion.div>
          </motion.div>
        </div>
      </section>





      <Footer />
    </div>
  );
};

export default Index;
