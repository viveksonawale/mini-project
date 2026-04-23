import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Award, Trophy, Medal, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CertificateTemplate from "../components/CertificateTemplate";
import type { Certificate } from "../data/certificateMockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { hackathonService } from "@/services/hackathonService";

const typeIcon = {
  participation: Award,
  winner: Trophy,
  "runner-up": Medal,
};

const typeLabel = {
  participation: "Participation",
  winner: "Winner",
  "runner-up": "Runner-up",
};

const typeBadgeClass: Record<string, string> = {
  participation: "bg-primary/10 text-primary border-primary/20",
  winner: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "runner-up": "bg-muted text-muted-foreground border-border",
};

const Certificates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userCertificates, setUserCertificates] = useState<Certificate[]>([]);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const joined = await hackathonService.getMyJoinedHackathons();
        const completed = joined.filter((h) => h.status === "COMPLETED");
        setUserCertificates(
          completed.map((h) => ({
            id: `cert-${h.id}`,
            participantName: user?.name || "Participant",
            hackathonTitle: h.title,
            teamName: "My Team",
            date: h.endDate,
            type: "participation",
            position: undefined,
            hackathonId: String(h.id),
            skills: h.themes || [],
          })) as Certificate[]
        );
      } catch {
        setUserCertificates([]);
      }
    };
    load();
  }, [user?.name]);

  const handleDownload = async (cert: Certificate) => {
    toast({ title: "Generating PDF…", description: "Please wait a moment." });

    // Dynamic imports to keep bundle size small
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    // We need to render the certificate off-screen for capture
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    document.body.appendChild(container);

    // Render a temporary certificate
    const { createRoot } = await import("react-dom/client");
    const root = createRoot(container);

    await new Promise<void>((resolve) => {
      root.render(<CertificateTemplate certificate={cert} />);
      setTimeout(resolve, 300); // wait for render + fonts
    });

    const el = container.firstElementChild as HTMLElement;
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [800, 566] });
    pdf.addImage(imgData, "PNG", 0, 0, 800, 566);
    pdf.save(`${cert.hackathonTitle.replace(/\s+/g, "-")}-certificate.pdf`);

    root.unmount();
    document.body.removeChild(container);

    toast({ title: "Certificate downloaded!", description: "Check your downloads folder." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold font-heading">My Certificates</h1>
          <p className="text-muted-foreground">
            Download your hackathon participation and achievement certificates.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mb-8">
          {(["participation", "winner", "runner-up"] as const).map((type) => {
            const count = userCertificates.filter((c) => c.type === type).length;
            const Icon = typeIcon[type];
            return (
              <Card key={type}>
                <CardContent className="flex items-center gap-3 p-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">{typeLabel[type]}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Certificate cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {userCertificates.map((cert, i) => {
            const Icon = typeIcon[cert.type];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-5 flex flex-col gap-3 h-full">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-muted p-2">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="outline" className={typeBadgeClass[cert.type]}>
                          {typeLabel[cert.type]}
                          {cert.position && ` • ${cert.position}`}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{cert.hackathonTitle}</h3>
                      <p className="text-sm text-muted-foreground">Team: {cert.teamName}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(cert.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((s) => (
                        <Badge key={s} variant="outline" className="text-[10px] px-1.5 py-0">
                          {s}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-auto pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1"
                        onClick={() => setPreviewCert(cert)}
                      >
                        <Eye className="h-3.5 w-3.5" /> Preview
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 gap-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
                        onClick={() => handleDownload(cert)}
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Preview Dialog */}
      <Dialog open={!!previewCert} onOpenChange={() => setPreviewCert(null)}>
        <DialogContent className="max-w-[860px] p-6 overflow-auto">
          <DialogTitle className="sr-only">Certificate Preview</DialogTitle>
          {previewCert && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-lg border">
                <CertificateTemplate ref={certRef} certificate={previewCert} />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => handleDownload(previewCert)}
                  className="gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Certificates;