import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Zap, Target, Users, Heart, Globe, Shield, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const team = [
  { name: "Vivek Sonawale", role: "Founder & CEO", bio: "Ex-Google engineer passionate about democratizing hackathons for everyone.", avatar: "V", socials: { linkedin: "#", x: "#" } },
  { name: "Jayesh Wagh", role: "CTO", bio: "Full-stack architect with 10+ years building scalable platforms.", avatar: "J", socials: { linkedin: "#", github: "#" } },
  { name: "Sarvesh Yadav", role: "Product Engineer", bio: "Award-winning engineer crafting experiences that inspire creators.", avatar: "S", socials: { linkedin: "#", twitter: "#" } },
];

const values = [
  { icon: <Target className="h-6 w-6" />, title: "Mission-Driven", description: "Every feature we build serves our mission to make hackathons accessible to everyone, everywhere." },
  { icon: <Users className="h-6 w-6" />, title: "Community First", description: "We believe the best innovations emerge when diverse minds collaborate without barriers." },
  { icon: <Shield className="h-6 w-6" />, title: "Fair & Transparent", description: "Our scoring and judging systems are designed to be unbiased, transparent, and merit-based." },
  { icon: <Sparkles className="h-6 w-6" />, title: "Innovation", description: "We dogfood our own platform — our team regularly participates in hackathons to stay sharp." },
];

const stats = [
  { value: "150+", label: "Hackathons Hosted" },
  { value: "12,500+", label: "Participants" },
  { value: "45+", label: "Countries" },
  { value: "$500K+", label: "Prizes Awarded" },
];

const About = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative">
            <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto text-center">
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
                <Heart className="h-4 w-4" /> Our Story
              </motion.div>
              <motion.h1 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Empowering Innovators{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Worldwide</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                HackMate was born from a simple idea: hackathons should be easy to organize, 
                fun to participate in, and accessible to everyone — regardless of location or experience.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border/50 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="font-heading text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We envision a world where every aspiring developer, designer, and entrepreneur can participate 
                    in hackathons — turning their boldest ideas into reality within hours.
                  </p>
                  <p>
                    HackMate isn't just a platform; it's a movement. We're building the infrastructure 
                    that connects organizers with talent, helps teams form around shared passions, and 
                    provides fair, transparent judging that celebrates true innovation.
                  </p>
                  <p>
                    From university students running their first local hack to Fortune 500 companies 
                    hosting global innovation challenges, HackMate scales to meet every need.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {values.map((v, i) => (
                  <Card key={v.title} className="border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-5">
                      <div className="text-primary mb-3">{v.icon}</div>
                      <h3 className="font-heading font-semibold mb-1">{v.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 lg:py-28 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Meet the Team</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                A passionate group of builders, designers, and community advocates.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="border-border/50 hover:shadow-lg hover:border-primary/20 transition-all group">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-primary-foreground group-hover:scale-110 transition-transform">
                        {member.avatar}
                      </div>
                      <h3 className="font-heading font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-xs text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex justify-center gap-2">
                        {member.socials.linkedin && (
                          <a href={member.socials.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a href={member.socials.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.github && (
                          <a href={member.socials.github} className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have a question, partnership proposal, or just want to say hi? We'd love to hear from you.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">hello@hackmate.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">San Francisco, CA — Working globally</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Name</label>
                        <Input
                          placeholder="Your name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email</label>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Message</label>
                        <Textarea
                          placeholder="Tell us what's on your mind..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;