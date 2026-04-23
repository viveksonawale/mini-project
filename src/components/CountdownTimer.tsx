import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, Flame, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CountdownTimerProps {
  targetDate: string;
  label: string;
  variant?: "primary" | "deadline" | "event";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const calcTimeLeft = (target: string): TimeLeft => {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
};

const CountdownTimer = ({ targetDate, label, variant = "primary" }: CountdownTimerProps) => {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const isExpired = time.total <= 0;
  const isUrgent = !isExpired && time.days === 0 && time.hours < 6;
  const isWarning = !isExpired && time.days <= 1;

  const gradientClass =
    isExpired
      ? "from-muted to-muted"
      : isUrgent
      ? "from-destructive/20 to-destructive/10"
      : isWarning
      ? "from-[hsl(var(--evnova-orange)/0.2)] to-[hsl(var(--evnova-orange)/0.1)]"
      : variant === "deadline"
      ? "from-secondary/20 to-secondary/10"
      : variant === "event"
      ? "from-accent/20 to-accent/10"
      : "from-primary/20 to-primary/10";

  const borderClass = isExpired
    ? "border-muted"
    : isUrgent
    ? "border-destructive/40"
    : isWarning
    ? "border-[hsl(var(--evnova-orange)/0.4)]"
    : "border-border/50";

  const units = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Mins" },
    { value: time.seconds, label: "Secs" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className={`${borderClass} overflow-hidden`}>
        <div className={`h-1 bg-gradient-to-r ${isExpired ? "from-muted-foreground/30 to-muted-foreground/10" : isUrgent ? "from-destructive to-destructive/60" : isWarning ? "from-[hsl(var(--evnova-orange))] to-[hsl(var(--evnova-orange)/0.6)]" : variant === "deadline" ? "from-secondary to-secondary/60" : variant === "event" ? "from-accent to-accent/60" : "from-primary to-primary/60"}`} />
        <CardContent className={`p-5 bg-gradient-to-br ${gradientClass}`}>
          <div className="flex items-center gap-2 mb-3">
            {isExpired ? (
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            ) : isUrgent ? (
              <Flame className="h-4 w-4 text-destructive animate-pulse" />
            ) : isWarning ? (
              <AlertTriangle className="h-4 w-4 text-[hsl(var(--evnova-orange))]" />
            ) : (
              <Clock className="h-4 w-4 text-primary" />
            )}
            <span className="text-sm font-heading font-semibold">{label}</span>
            {isUrgent && !isExpired && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">URGENT</Badge>
            )}
            {isWarning && !isUrgent && !isExpired && (
              <Badge className="text-[10px] px-1.5 py-0 bg-[hsl(var(--evnova-orange))] text-primary-foreground">CLOSING SOON</Badge>
            )}
            {isExpired && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">ENDED</Badge>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {units.map((u, i) => (
              <motion.div
                key={u.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className={`rounded-lg py-2 px-1 font-heading text-2xl font-bold tabular-nums ${isExpired ? "bg-muted text-muted-foreground" : "bg-background/80 backdrop-blur-sm"}`}>
                  {String(u.value).padStart(2, "0")}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{u.label}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CountdownTimer;