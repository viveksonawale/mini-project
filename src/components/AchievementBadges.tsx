import { motion } from "framer-motion";
import { lazy, Suspense, useMemo, useState } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Lock, type LucideProps } from "lucide-react";
import { AchievementBadge } from "@/data/badgeMockData";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const tierStyles: Record<AchievementBadge["tier"], { ring: string; bg: string; glow: string; label: string }> = {
  bronze: { ring: "ring-orange-400/60", bg: "bg-gradient-to-br from-orange-300 to-orange-500", glow: "shadow-orange-400/30", label: "Bronze" },
  silver: { ring: "ring-slate-300/70", bg: "bg-gradient-to-br from-slate-200 to-slate-400", glow: "shadow-slate-400/30", label: "Silver" },
  gold: { ring: "ring-yellow-400/70", bg: "bg-gradient-to-br from-yellow-300 to-yellow-500", glow: "shadow-yellow-400/40", label: "Gold" },
  platinum: { ring: "ring-purple-400/70", bg: "bg-gradient-to-br from-purple-300 via-fuchsia-400 to-purple-500", glow: "shadow-purple-500/40", label: "Platinum" },
};

const categoryLabels: Record<AchievementBadge["category"], string> = {
  participation: "Participation",
  winning: "Winning",
  social: "Social",
  special: "Special",
};

/* Dynamic Lucide icon */
function DynamicIcon({ name, ...props }: { name: string } & Omit<LucideProps, "ref">) {
  const kebab = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() as keyof typeof dynamicIconImports;
  if (!dynamicIconImports[kebab]) return <Lock {...props} />;
  const IconComp = lazy(dynamicIconImports[kebab]);
  return (
    <Suspense fallback={<div className="h-5 w-5" />}>
      <IconComp {...props} />
    </Suspense>
  );
}

function BadgeCard({ badge, index }: { badge: AchievementBadge; index: number }) {
  const unlocked = !!badge.unlockedAt;
  const tier = tierStyles[badge.tier];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            "relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
            unlocked
              ? "border-border bg-card hover:shadow-lg cursor-default"
              : "border-dashed border-muted-foreground/30 bg-muted/40 opacity-60"
          )}
        >
          {/* Icon circle */}
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full ring-2",
              unlocked ? `${tier.bg} ${tier.ring} shadow-lg ${tier.glow}` : "bg-muted ring-muted-foreground/20"
            )}
          >
            {unlocked ? (
              <DynamicIcon name={badge.icon} className="h-6 w-6 text-white" />
            ) : (
              <Lock className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          <p className="text-sm font-semibold leading-tight">{badge.name}</p>

          <Badge
            variant="outline"
            className={cn("text-[10px] px-1.5 py-0", unlocked && "border-primary/30 text-primary")}
          >
            {tier.label}
          </Badge>

          {/* Progress bar for locked badges */}
          {!unlocked && badge.progress && (
            <div className="w-full space-y-1">
              <Progress value={(badge.progress.current / badge.progress.target) * 100} className="h-1.5" />
              <p className="text-[10px] text-muted-foreground">
                {badge.progress.current}/{badge.progress.target}
              </p>
            </div>
          )}
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[200px] text-center">
        <p className="font-medium">{badge.name}</p>
        <p className="text-xs text-muted-foreground">{badge.description}</p>
        {unlocked && badge.unlockedAt && (
          <p className="mt-1 text-[10px] text-accent">
            Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

type FilterCategory = "all" | AchievementBadge["category"];

export default function AchievementBadges({ badges }: { badges: AchievementBadge[] }) {
  const [filter, setFilter] = useState<FilterCategory>("all");

  const filtered = useMemo(
    () => (filter === "all" ? badges : badges.filter((b) => b.category === filter)),
    [badges, filter]
  );

  const unlockedCount = badges.filter((b) => b.unlockedAt).length;

  const filters: { value: FilterCategory; label: string }[] = [
    { value: "all", label: "All" },
    ...Object.entries(categoryLabels).map(([value, label]) => ({ value: value as FilterCategory, label })),
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold">Achievement Badges</h3>
          <p className="text-sm text-muted-foreground">
            {unlockedCount}/{badges.length} unlocked
          </p>
        </div>
        <Progress value={(unlockedCount / badges.length) * 100} className="h-2 w-24" />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <Badge
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            className="cursor-pointer text-xs"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Badge>
        ))}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((badge, i) => (
          <BadgeCard key={badge.id} badge={badge} index={i} />
        ))}
      </div>
    </div>
  );
}