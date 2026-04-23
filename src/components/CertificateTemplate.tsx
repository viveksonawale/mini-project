import { forwardRef } from "react";
import { Certificate } from "@/data/certificateMockData";
import { cn } from "@/lib/utils";

const typeConfig = {
  participation: {
    title: "Certificate of Participation",
    accent: "#7c3aed", // primary purple
    ribbon: "linear-gradient(135deg, #7c3aed, #3b82f6)",
  },
  winner: {
    title: "Certificate of Achievement",
    accent: "#eab308", // gold
    ribbon: "linear-gradient(135deg, #eab308, #f59e0b)",
  },
  "runner-up": {
    title: "Certificate of Achievement",
    accent: "#94a3b8", // silver
    ribbon: "linear-gradient(135deg, #94a3b8, #cbd5e1)",
  },
};

interface Props {
  certificate: Certificate;
  className?: string;
}

const CertificateTemplate = forwardRef<HTMLDivElement, Props>(
  ({ certificate, className }, ref) => {
    const config = typeConfig[certificate.type];

    return (
      <div
        ref={ref}
        className={cn("relative w-[800px] h-[566px] bg-white overflow-hidden select-none", className)}
        style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
      >
        {/* Decorative border */}
        <div className="absolute inset-3 border-2 rounded-lg" style={{ borderColor: config.accent + "40" }} />
        <div className="absolute inset-5 border rounded-lg" style={{ borderColor: config.accent + "20" }} />

        {/* Corner ornaments */}
        {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-20 h-20 opacity-10`}
            style={{ background: config.ribbon, borderRadius: i < 2 ? "0 0 100% 0" : "100% 0 0 0" }}
          />
        ))}

        {/* Top ribbon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 rounded-b-full" style={{ background: config.ribbon }} />

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full px-16 text-center">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: config.ribbon }}>
              H
            </div>
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#64748b" }}>
              Evnova
            </span>
          </div>

          {/* Certificate type */}
          <h1
            className="text-2xl font-bold tracking-wide uppercase mb-1"
            style={{ color: config.accent, letterSpacing: "0.15em" }}
          >
            {config.title}
          </h1>

          {certificate.position && (
            <div
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-3"
              style={{ background: config.ribbon }}
            >
              🏆 {certificate.position}
            </div>
          )}

          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
            This is proudly presented to
          </p>

          {/* Participant name */}
          <h2
            className="text-4xl font-bold mb-1"
            style={{
              color: "#1e293b",
              borderBottom: `3px solid ${config.accent}`,
              paddingBottom: "4px",
            }}
          >
            {certificate.participantName}
          </h2>

          {/* Team */}
          <p className="text-sm text-gray-500 mt-2 mb-4">
            Team <span className="font-semibold text-gray-700">{certificate.teamName}</span>
          </p>

          {/* Hackathon name */}
          <p className="text-sm text-gray-500 mb-1">for {certificate.type === "participation" ? "participating" : "outstanding achievement"} in</p>
          <h3 className="text-xl font-bold mb-4" style={{ color: "#1e293b" }}>
            {certificate.hackathonTitle}
          </h3>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
            {certificate.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                style={{ background: config.accent + "15", color: config.accent }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Date & signature area */}
          <div className="flex items-end justify-between w-full mt-auto px-8">
            <div className="text-left">
              <p className="text-xs text-gray-400 mb-1">Date Issued</p>
              <p className="text-sm font-semibold text-gray-700">
                {new Date(certificate.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 border-b border-gray-300 mb-1" />
              <p className="text-xs text-gray-400">Authorized Signature</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1">Certificate ID</p>
              <p className="text-sm font-mono text-gray-500">{certificate.id.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = "CertificateTemplate";
export default CertificateTemplate;