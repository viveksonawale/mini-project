import { motion } from "framer-motion";
import { Bell, CheckCircle2, Circle, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Milestone {
  label: string;
  date: string;
  completed: boolean;
  isCurrent: boolean;
}

interface MilestoneAlertsProps {
  registrationDeadline: string;
  startDate: string;
  endDate: string;
}

const MilestoneAlerts = ({ registrationDeadline, startDate, endDate }: MilestoneAlertsProps) => {
  const now = Date.now();

  const milestones: Milestone[] = [
    {
      label: "Registration Opens",
      date: "Open now",
      completed: true,
      isCurrent: false,
    },
    {
      label: "Registration Deadline",
      date: registrationDeadline,
      completed: new Date(registrationDeadline).getTime() < now,
      isCurrent: !!(new Date(registrationDeadline).getTime() >= now && now < new Date(startDate).getTime()),
    },
    {
      label: "Hackathon Begins",
      date: startDate,
      completed: new Date(startDate).getTime() < now,
      isCurrent: !!(new Date(startDate).getTime() <= now && now < new Date(endDate).getTime()),
    },
    {
      label: "Submissions Due",
      date: endDate,
      completed: new Date(endDate).getTime() < now,
      isCurrent: false,
    },
    {
      label: "Results Announced",
      date: "TBA",
      completed: false,
      isCurrent: false,
    },
  ];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-heading flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          Milestones
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-5">
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 relative"
            >
              {/* Vertical line */}
              {i < milestones.length - 1 && (
                <div className={`absolute left-[9px] top-5 w-0.5 h-full ${m.completed ? "bg-accent" : "bg-border"}`} />
              )}
              {/* Icon */}
              <div className="shrink-0 mt-0.5 z-10">
                {m.completed ? (
                  <CheckCircle2 className="h-[18px] w-[18px] text-accent" />
                ) : m.isCurrent ? (
                  <Zap className="h-[18px] w-[18px] text-primary animate-pulse" />
                ) : (
                  <Circle className="h-[18px] w-[18px] text-muted-foreground/40" />
                )}
              </div>
              {/* Text */}
              <div className="pb-4 min-w-0">
                <p className={`text-sm font-medium leading-tight ${m.isCurrent ? "text-primary font-semibold" : m.completed ? "text-foreground" : "text-muted-foreground"}`}>
                  {m.label}
                </p>
                <p className="text-[11px] text-muted-foreground">{m.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneAlerts;